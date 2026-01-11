/**
 * Footer Component
 * ================
 * Site footer with navigation, contact info, and social links.
 *
 * "To the only wise God be glory forever through Jesus Christ." — Romans 16:27
 */

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  EnvelopeSimple,
  FacebookLogo,
  YoutubeLogo,
  InstagramLogo,
  Heart,
} from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";
import { Container } from "./container";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const footerSections: FooterSection[] = [
  {
    title: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Sermons", href: "/sermons" },
      { label: "Events", href: "/events" },
      { label: "Departments", href: "/departments" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Small Groups", href: "/small-groups" },
      { label: "Join Us", href: "/join" },
      { label: "Workers", href: "/workers" },
      { label: "Contact", href: "/contact" },
      { label: "Live Stream", href: "/live" },
    ],
  },
  {
    title: "Evangelism",
    links: [
      { label: "Vision 2026", href: "/evangelism" },
      { label: "I Will Go", href: "/evangelism#pledge" },
      { label: "Bible Studies", href: "/contact" },
      { label: "Resources", href: "/resources" },
    ],
  },
];

interface FooterProps {
  className?: string;
}

function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn("bg-[var(--primary)] text-white", className)}>
      {/* Main Footer */}
      <Container className="py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-5">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="relative h-12 w-12">
                <Image
                  src="/logo.svg"
                  alt="SDA CRC Logo"
                  fill
                  className="object-contain brightness-0 invert"
                />
              </div>
              <div>
                <p className="font-bold text-lg">SDA Cross River</p>
                <p className="text-sm text-white/70">Conference</p>
              </div>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/80">
              Sharing the everlasting gospel and preparing a people for the soon
              coming of Jesus Christ. We are a family of believers committed to
              serving God and our community.
            </p>

            {/* Contact Info */}
            <div className="mt-6 space-y-3">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-sm text-white/80 hover:text-white transition-colors"
              >
                <MapPin className="h-5 w-5 shrink-0 mt-0.5" />
                <span>
                  Conference Headquarters, 42 Marian Road,
                  <br />
                  Calabar, Cross River State, Nigeria
                </span>
              </a>
              <a
                href="tel:+2348012345678"
                className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors"
              >
                <Phone className="h-5 w-5 shrink-0" />
                <span>+234 801 234 5678</span>
              </a>
              <a
                href="mailto:info@sdacrc.org"
                className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors"
              >
                <EnvelopeSimple className="h-5 w-5 shrink-0" />
                <span>info@sdacrc.org</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white/10 p-2.5 transition-colors hover:bg-white/20"
                aria-label="Facebook"
              >
                <FacebookLogo className="h-5 w-5" weight="fill" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white/10 p-2.5 transition-colors hover:bg-white/20"
                aria-label="YouTube"
              >
                <YoutubeLogo className="h-5 w-5" weight="fill" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white/10 p-2.5 transition-colors hover:bg-white/20"
                aria-label="Instagram"
              >
                <InstagramLogo className="h-5 w-5" weight="fill" />
              </a>
            </div>
          </div>

          {/* Navigation Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-bold text-[var(--secondary)] mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/80 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <Container className="py-6">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <p className="text-sm text-white/60">
              © {currentYear} SDA Cross River Conference. All rights reserved.
            </p>
            <p className="flex items-center gap-1 text-sm text-white/60">
              Built with{" "}
              <Heart
                className="h-4 w-4 text-[var(--secondary)]"
                weight="fill"
              />{" "}
              for the glory of God
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}

export { Footer };
export type { FooterProps };
