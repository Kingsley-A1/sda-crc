/**
 * Join Us Page
 * ============
 * Membership registration and interest form for the SDA Cross River Conference.
 * Features worker recognition section with golden badges.
 *
 * "Behold, I stand at the door and knock." — Revelation 3:20
 */

import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/layout/container";
import { RegistrationForm } from "@/components/sanctuary/join/registration-form";
import { MembershipBenefits } from "@/components/sanctuary/join/membership-benefits";
import { Skeleton } from "@/components/ui/skeleton";

// ============================================================================
// Metadata
// ============================================================================

export const metadata: Metadata = {
  title: "Join Us",
  description:
    "Become a part of the SDA Cross River Conference family. Register your membership or express your interest in joining.",
};

// ============================================================================
// Page Component
// ============================================================================

export default function JoinPage() {
  return (
    <>
      <PageHeader
        title="Join Our Family"
        subtitle="You belong here"
        backgroundImage="/images/join-header.jpg"
      />

      <Container className="py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Registration Form */}
          <div>
            <h2 className="text-2xl font-serif font-bold mb-6">
              Register with Us
            </h2>
            <Suspense fallback={<Skeleton className="h-[600px] rounded-xl" />}>
              <RegistrationForm />
            </Suspense>
          </div>

          {/* Benefits & Info */}
          <div className="space-y-8">
            <MembershipBenefits />

            {/* Welcome Message */}
            <div className="rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 p-6">
              <h3 className="text-xl font-serif font-bold mb-4">
                Welcome to the Family
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Whether you&apos;re a lifelong Adventist, recently baptized, or
                just exploring, we welcome you with open arms. The SDA Cross
                River Conference is more than a church—it&apos;s a family.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                By registering, you&apos;ll:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mt-2 space-y-1">
                <li>Connect with local congregations near you</li>
                <li>Receive updates on events and programs</li>
                <li>Access exclusive resources and materials</li>
                <li>Be recognized if you serve in any capacity</li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="rounded-xl border p-6">
              <h3 className="text-lg font-semibold mb-4">Need Help?</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                If you have questions about registration or membership, please
                reach out to us.
              </p>
              <div className="space-y-2">
                <p>
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:membership@sdacrc.org"
                    className="text-primary hover:underline"
                  >
                    membership@sdacrc.org
                  </a>
                </p>
                <p>
                  <strong>Phone:</strong>{" "}
                  <a
                    href="tel:+2348012345678"
                    className="text-primary hover:underline"
                  >
                    +234 801 234 5678
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
