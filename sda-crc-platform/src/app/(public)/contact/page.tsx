/**
 * Contact Page
 * ============
 * Contact information and inquiry form for the SDA Cross River Conference.
 *
 * "Ask and it will be given to you; seek and you will find." — Matthew 7:7
 */

import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/layout/container";
import { ContactForm } from "@/components/sanctuary/contact/contact-form";
import { ContactInfo } from "@/components/sanctuary/contact/contact-info";
import { ContactMap } from "@/components/sanctuary/contact/contact-map";
import { Skeleton } from "@/components/ui/skeleton";

// ============================================================================
// Metadata
// ============================================================================

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the SDA Cross River Conference. Find our location, contact details, and send us a message.",
};

// ============================================================================
// Page Component
// ============================================================================

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact Us"
        subtitle="We'd love to hear from you"
        backgroundImage="/images/contact-header.jpg"
      />

      <Container className="py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-serif font-bold mb-6">
              Send Us a Message
            </h2>
            <Suspense fallback={<Skeleton className="h-[400px] rounded-xl" />}>
              <ContactForm />
            </Suspense>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <ContactInfo />

            {/* Office Hours */}
            <div className="rounded-xl bg-gray-50 dark:bg-gray-800/50 p-6">
              <h3 className="text-lg font-semibold mb-4">Office Hours</h3>
              <div className="space-y-2 text-gray-600 dark:text-gray-400">
                <div className="flex justify-between">
                  <span>Monday - Thursday</span>
                  <span>8:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Friday</span>
                  <span>8:00 AM - 12:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday (Sabbath)</span>
                  <span className="text-primary">Worship Services</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>

            {/* Map */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Find Us</h3>
              <Suspense
                fallback={<Skeleton className="h-[300px] rounded-xl" />}
              >
                <ContactMap />
              </Suspense>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-serif font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="rounded-xl border p-6">
              <h3 className="font-semibold mb-2">
                What time are Sabbath services?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our Sabbath School begins at 9:00 AM, followed by Divine Worship
                at 11:00 AM. Afternoon programs vary by church.
              </p>
            </div>
            <div className="rounded-xl border p-6">
              <h3 className="font-semibold mb-2">How can I become a member?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Visit our Join Us page to register your interest. You can also
                attend any of our local churches and speak with the pastor.
              </p>
            </div>
            <div className="rounded-xl border p-6">
              <h3 className="font-semibold mb-2">How can I request prayer?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Use the contact form above to send a prayer request, or call our
                office. All requests are treated with confidentiality.
              </p>
            </div>
          </div>
        </section>
      </Container>
    </>
  );
}
