/**
 * About Page
 * ==========
 * Information about the SDA Cross River Conference.
 * 
 * "I will build my church, and the gates of Hades will not overcome it." — Matthew 16:18
 */

import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/layout/container";
import { AboutHistory } from "@/components/sanctuary/about/about-history";
import { AboutMission } from "@/components/sanctuary/about/about-mission";
import { AboutBeliefs } from "@/components/sanctuary/about/about-beliefs";

// ============================================================================
// Metadata
// ============================================================================

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about the Seventh-day Adventist Cross River Conference. Our history, mission, beliefs, and vision for the future.",
};

// ============================================================================
// Page Component
// ============================================================================

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Us"
        subtitle="Our story, mission, and beliefs"
        backgroundImage="/images/about-header.jpg"
      />

      <Container className="py-12 md:py-16">
        {/* Welcome Section */}
        <section className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Welcome to the SDA Cross River Conference
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            The Seventh-day Adventist Church in Cross River State, Nigeria, is 
            committed to sharing the everlasting gospel in the context of the 
            three angels&apos; messages. We are a diverse, welcoming community 
            dedicated to worship, discipleship, and service.
          </p>
        </section>

        {/* Mission & Vision */}
        <section className="mb-16">
          <AboutMission />
        </section>

        {/* History */}
        <section className="mb-16">
          <AboutHistory />
        </section>

        {/* Core Beliefs */}
        <section className="mb-16">
          <AboutBeliefs />
        </section>

        {/* Conference Leadership */}
        <section className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-center mb-8">
            Conference Leadership
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* President */}
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <Image
                  src="/images/leadership/president.jpg"
                  alt="Conference President"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-lg">Pastor John Doe</h3>
              <p className="text-primary font-medium">Conference President</p>
            </div>

            {/* Executive Secretary */}
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <Image
                  src="/images/leadership/secretary.jpg"
                  alt="Executive Secretary"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-lg">Pastor Jane Smith</h3>
              <p className="text-primary font-medium">Executive Secretary</p>
            </div>

            {/* Treasurer */}
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <Image
                  src="/images/leadership/treasurer.jpg"
                  alt="Conference Treasurer"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-lg">Elder James Brown</h3>
              <p className="text-primary font-medium">Conference Treasurer</p>
            </div>
          </div>
        </section>
      </Container>
    </>
  );
}
