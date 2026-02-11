import * as React from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  EnvelopeSimple,
  FacebookLogo,
  YoutubeLogo,
  InstagramLogo,
  Heart,
} from "@phosphor-icons/react/dist/ssr";
import { Logo } from "@/components/ui/logo";

const quickLinks = [
  { href: "/about", label: "About Us" },
  { href: "/sermons", label: "Sermons" },
  { href: "/events", label: "Events" },
  { href: "/departments", label: "Departments" },
  { href: "/gallery", label: "Gallery" },
];

const connectLinks = [
  { href: "/join", label: "Join Us" },
  { href: "/contact", label: "Contact" },
  { href: "/small-groups", label: "Small Groups" },
  { href: "/evangelism", label: "Evangelism" },
  { href: "/workers", label: "Workers" },
  { href: "/live", label: "Watch Live" },
];

const socialLinks = [
  { href: "https://facebook.com", icon: FacebookLogo, label: "Facebook" },
  { href: "https://youtube.com", icon: YoutubeLogo, label: "YouTube" },
  { href: "https://instagram.com", icon: InstagramLogo, label: "Instagram" },
];

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Top Accent Bar */}
      <div className="h-1 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-400" />

      <div className="container">
        {/* Main Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-14 lg:py-20">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-5">
              <Logo variant="full" size="md" inverted linked={false} />
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-xs">
              Seventh-day Adventist Church, Cross River Conference — Integrated
              for Mission. Serving communities with faith, hope, and love.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 hover:bg-primary-600 border border-white/10 hover:border-primary-600 transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon size={20} weight="fill" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold mb-5 text-white tracking-wide uppercase">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white hover:translate-x-1 inline-flex transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-sm font-semibold mb-5 text-white tracking-wide uppercase">
              Connect
            </h3>
            <ul className="space-y-3">
              {connectLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white hover:translate-x-1 inline-flex transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold mb-5 text-white tracking-wide uppercase">
              Contact Us
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-sm text-gray-400 group">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 group-hover:bg-primary-600/20 transition-colors">
                  <MapPin size={16} className="text-primary-400" />
                </div>
                <span className="pt-1">
                  SDA Conference Office, Calabar, Cross River State, Nigeria
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400 group">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 group-hover:bg-primary-600/20 transition-colors">
                  <Phone size={16} className="text-primary-400" />
                </div>
                <a
                  href="tel:+2348000000000"
                  className="hover:text-white transition-colors"
                >
                  +234 800 000 0000
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400 group">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 group-hover:bg-primary-600/20 transition-colors">
                  <EnvelopeSimple size={16} className="text-primary-400" />
                </div>
                <a
                  href="mailto:info@sdacrc.org"
                  className="hover:text-white transition-colors"
                >
                  info@sdacrc.org
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} SDA Cross River Conference. All
            rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            Built with{" "}
            <Heart size={14} weight="fill" className="text-red-500" /> for the
            glory of God
          </p>
        </div>
      </div>
    </footer>
  );
}
