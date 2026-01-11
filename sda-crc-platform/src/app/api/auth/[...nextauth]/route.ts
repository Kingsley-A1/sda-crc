/**
 * NextAuth Route Handlers
 * =======================
 * Handles all authentication-related routes.
 * 
 * "Come to me, all you who are weary and burdened, and I will give you rest." — Matthew 11:28
 */

import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
