/**
 * NextAuth Configuration
 * ======================
 * Authentication setup with Prisma adapter and credentials provider.
 * Implements secure session management for the Command Center.
 * 
 * "For where two or three gather in my name, there am I with them." — Matthew 18:20
 */

import NextAuth, { type NextAuthOptions, type User as NextAuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { db } from "./db";
import { LoginSchema } from "./validators";

// ============================================================================
// Type Extensions
// ============================================================================

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: "SUPER_ADMIN" | "ADMIN" | "EDITOR" | "VIEWER";
      image?: string | null;
    };
  }

  interface User {
    id: string;
    email: string;
    name: string;
    role: "SUPER_ADMIN" | "ADMIN" | "EDITOR" | "VIEWER";
    image?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "SUPER_ADMIN" | "ADMIN" | "EDITOR" | "VIEWER";
  }
}

// ============================================================================
// Configuration
// ============================================================================

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as NextAuthOptions["adapter"],
  
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Validate input
        const parsed = LoginSchema.safeParse(credentials);
        if (!parsed.success) {
          return null;
        }

        const { email, password } = parsed.data;

        // Find user by email
        const user = await db.user.findUnique({
          where: { email: email.toLowerCase() },
          select: {
            id: true,
            email: true,
            name: true,
            password: true,
            role: true,
            image: true,
            isActive: true,
          },
        });

        if (!user || !user.password) {
          return null;
        }

        // Check if user is active
        if (!user.isActive) {
          return null;
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          return null;
        }

        // Update last login
        await db.user.update({
          where: { id: user.id },
          data: { lastLoginAt: new Date() },
        });

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role as "SUPER_ADMIN" | "ADMIN" | "EDITOR" | "VIEWER",
          image: user.image,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: NextAuthUser }) {
      if (user) {
        token.id = user.id;
        // User role is already validated as one of the allowed values from authorize()
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      if (token && session.user) {
        (session.user as { id: string }).id = token.id as string;
        (session.user as { role: string }).role = token.role as string;
      }
      return session;
    },
  },

  events: {
    async signIn({ user }: { user: NextAuthUser }) {
      console.log(`User signed in: ${user.email}`);
    },
    async signOut() {
      console.log("User signed out");
    },
  },

  debug: process.env.NODE_ENV === "development",
};

// ============================================================================
// Auth Handlers
// ============================================================================

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

// Export auth function for server-side session retrieval
export async function auth() {
  const { getServerSession } = await import("next-auth");
  return getServerSession(authOptions);
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get the current session (server-side)
 */
export async function getSession() {
  return await auth();
}

/**
 * Check if user has required role
 */
export function hasRole(
  userRole: string,
  requiredRole: "SUPER_ADMIN" | "ADMIN" | "EDITOR" | "VIEWER"
): boolean {
  const roleHierarchy = {
    SUPER_ADMIN: 4,
    ADMIN: 3,
    EDITOR: 2,
    VIEWER: 1,
  };

  return (roleHierarchy[userRole as keyof typeof roleHierarchy] || 0) >= roleHierarchy[requiredRole];
}

/**
 * Require authentication in server actions/API routes
 */
export async function requireAuth() {
  const session = await auth();
  
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  
  return session;
}

/**
 * Require specific role in server actions/API routes
 */
export async function requireRole(role: "SUPER_ADMIN" | "ADMIN" | "EDITOR" | "VIEWER") {
  const session = await requireAuth();
  
  if (!hasRole(session.user.role, role)) {
    throw new Error("Forbidden");
  }
  
  return session;
}

/**
 * Hash a password for storage
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

/**
 * Verify a password against a hash
 */
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}
