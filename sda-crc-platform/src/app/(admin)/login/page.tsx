/**
 * Login Page
 * ==========
 * Authentication page for the Command Center.
 * 
 * "Knock and the door will be opened to you." — Matthew 7:7
 */

import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { LoginForm } from "@/components/command/shared/login-form";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Login | SDA CRC Command Center",
  description: "Sign in to the SDA CRC Command Center",
};

export default async function LoginPage() {
  // Redirect if already logged in
  const session = await getServerSession(authOptions);
  
  if (session) {
    redirect("/command");
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark" />
        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12 text-white">
          <div className="w-24 h-24 mb-8 rounded-full bg-white/10 flex items-center justify-center">
            <Image
              src="/images/logo-white.png"
              alt="SDA CRC Logo"
              width={64}
              height={64}
              className="object-contain"
            />
          </div>
          <h1 className="text-4xl font-serif font-bold text-center mb-4">
            Command Center
          </h1>
          <p className="text-xl text-white/80 text-center max-w-md">
            SDA Cross River Conference Digital Sanctuary Administration
          </p>
          <div className="mt-12 text-center text-sm text-white/60">
            <p>&quot;Well done, good and faithful servant!&quot;</p>
            <p className="mt-1">— Matthew 25:21</p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary flex items-center justify-center">
              <Image
                src="/images/logo-white.png"
                alt="SDA CRC Logo"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <h1 className="text-2xl font-serif font-bold text-primary">
              Command Center
            </h1>
          </div>

          {/* Login Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Sign in to access the Command Center
            </p>

            <LoginForm />
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Need access?{" "}
            <a
              href="mailto:admin@sdacrc.org"
              className="text-primary hover:underline"
            >
              Contact an administrator
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
