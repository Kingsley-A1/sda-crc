/**
 * Contact Page
 * ============
 * "Call to me and I will answer you." — Jeremiah 33:3
 */

import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/sanctuary/contact/contact-form";
import {
  MapPin,
  Phone,
  EnvelopeSimple,
  Clock,
  ArrowRight,
  CaretRight,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the SDA Cross River Conference. We'd love to hear from you.",
};

const contactMethods = [
  {
    icon: MapPin,
    title: "Visit Our Office",
    description: "SDA Conference Office, Calabar",
    detail: "Cross River State, Nigeria",
    color: "bg-rose-50 text-rose-600",
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "+234 800 000 0000",
    detail: "Mon - Thu, 8AM - 5PM",
    href: "tel:+2348000000000",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: EnvelopeSimple,
    title: "Email Us",
    description: "info@sdacrc.org",
    detail: "We reply within 24 hours",
    href: "mailto:info@sdacrc.org",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: WhatsappLogo,
    title: "WhatsApp",
    description: "+234 800 000 0000",
    detail: "Quick responses",
    href: "https://wa.me/2348000000000",
    color: "bg-green-50 text-green-600",
  },
];

const faqs = [
  {
    question: "What time are Sabbath services?",
    answer:
      "Sabbath School begins at 9:00 AM, followed by Divine Service at 11:00 AM every Saturday.",
  },
  {
    question: "How can I join the church?",
    answer:
      "Visit our Join page to register online, or speak with a pastor after any service. We'd love to welcome you!",
  },
  {
    question: "Can I request a Bible study?",
    answer:
      "Absolutely! Send us a message through the form and we'll connect you with a Bible worker in your area.",
  },
  {
    question: "Do you offer online services?",
    answer:
      "Yes! We stream our services live on YouTube and Facebook every Sabbath. Visit our Live page to join.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact Us"
        subtitle="Get in Touch"
        description="We'd love to hear from you. Reach out with questions, prayer requests, or just to say hello."
        size="sm"
      />

      {/* Contact Methods Grid */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {contactMethods.map((method) => {
              const Icon = method.icon;
              const Wrapper = method.href ? "a" : "div";
              return (
                <Wrapper
                  key={method.title}
                  href={method.href}
                  target={
                    method.href?.startsWith("http") ? "_blank" : undefined
                  }
                  rel={
                    method.href?.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="block"
                >
                  <Card
                    className={`group relative p-6 bg-card hover:shadow-card-hover transition-all duration-300 h-full ${
                      method.href ? "cursor-pointer" : ""
                    }`}
                    hover="lift"
                  >
                    <div
                      className={`flex items-center justify-center w-12 h-12 rounded-xl ${method.color} mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon size={24} weight="duotone" />
                    </div>
                    <h3 className="font-semibold text-foreground">
                      {method.title}
                    </h3>
                    <p className="text-primary font-medium text-sm mt-1">
                      {method.description}
                    </p>
                    <p className="text-muted-foreground text-xs mt-1">
                      {method.detail}
                    </p>
                    {method.href && (
                      <ArrowRight
                        size={16}
                        className="absolute top-6 right-6 text-border group-hover:text-primary group-hover:translate-x-1 transition-all duration-300"
                      />
                    )}
                  </Card>
                </Wrapper>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Contact Form Card */}
            <div className="lg:col-span-3">
              <Card className="p-6 sm:p-8 lg:p-10 bg-card" variant="elevated">
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="h-px w-6 bg-primary-500" />
                    <span className="text-xs font-bold text-primary-600 uppercase tracking-widest">
                      Send a Message
                    </span>
                  </div>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
                    We&apos;d Love to Hear From You
                  </h2>
                  <p className="text-muted-foreground mt-2">
                    Fill out the form below and we&apos;ll get back to you as
                    soon as possible.
                  </p>
                </div>
                <ContactForm />
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              {/* Office Hours Card */}
              <Card className="p-6 bg-card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary-100 text-primary">
                    <Clock size={20} weight="duotone" />
                  </div>
                  <h3 className="font-semibold text-foreground">
                    Office Hours
                  </h3>
                </div>
                <div className="space-y-3">
                  {[
                    { day: "Monday - Thursday", time: "8:00 AM - 5:00 PM" },
                    { day: "Friday", time: "8:00 AM - 12:00 PM" },
                    {
                      day: "Saturday & Sunday",
                      time: "Closed",
                      note: "(Sabbath)",
                    },
                  ].map((schedule) => (
                    <div
                      key={schedule.day}
                      className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
                    >
                      <span className="text-sm text-muted-foreground">
                        {schedule.day}
                        {schedule.note && (
                          <span className="text-muted-foreground/60 text-xs ml-1">
                            {schedule.note}
                          </span>
                        )}
                      </span>
                      <span
                        className={`text-sm font-medium ${
                          schedule.time === "Closed"
                            ? "text-muted-foreground"
                            : "text-foreground"
                        }`}
                      >
                        {schedule.time}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* FAQ Card */}
              <Card className="p-6 bg-gradient-to-br from-primary-50 to-primary-100/50 border-primary-200">
                <h3 className="font-semibold text-foreground mb-4">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                  {faqs.map((faq, i) => (
                    <details key={i} className="group">
                      <summary className="flex items-start gap-2 cursor-pointer list-none">
                        <CaretRight
                          size={16}
                          className="text-primary mt-0.5 flex-shrink-0 group-open:rotate-90 transition-transform duration-200"
                        />
                        <span className="text-sm font-medium text-foreground">
                          {faq.question}
                        </span>
                      </summary>
                      <p className="text-sm text-muted-foreground mt-2 ml-6 leading-relaxed">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </Card>

              {/* Quick Links Card */}
              <Card className="p-6 bg-card">
                <h3 className="font-semibold text-foreground mb-4">
                  Quick Links
                </h3>
                <div className="space-y-2">
                  {[
                    { label: "Join Our Church", href: "/join" },
                    { label: "Watch Live Services", href: "/live" },
                    { label: "Find a Small Group", href: "/small-groups" },
                    { label: "View Events", href: "/events" },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center justify-between py-2.5 px-4 rounded-xl hover:bg-primary-50 transition-colors group"
                    >
                      <span className="text-sm font-medium text-muted-foreground group-hover:text-primary">
                        {link.label}
                      </span>
                      <ArrowRight
                        size={16}
                        className="text-border group-hover:text-primary group-hover:translate-x-1 transition-all duration-300"
                      />
                    </Link>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section Placeholder */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-6 bg-primary-500" />
              <span className="text-xs font-bold text-primary-600 uppercase tracking-widest">
                Find Us
              </span>
              <span className="h-px w-6 bg-primary-500" />
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
              Visit Our Office
            </h2>
          </div>
          <Card className="relative aspect-[21/9] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
            {/* Replace with actual map integration */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-lg mb-4 mx-auto">
                  <MapPin size={32} className="text-primary" weight="duotone" />
                </div>
                <p className="text-foreground font-medium">
                  SDA Conference Office, Calabar
                </p>
                <p className="text-muted-foreground text-sm mt-1">
                  Cross River State, Nigeria
                </p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-block"
                >
                  <Button
                    variant="outline-muted"
                    size="sm"
                    rightIcon={<ArrowRight size={14} />}
                  >
                    Get Directions
                  </Button>
                </a>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </>
  );
}
