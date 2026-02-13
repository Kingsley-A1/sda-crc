/**
 * Footer — Site footer with green gradient top border
 */
import Link from "next/link";
import { Cross, Phone, Envelope, MapPin } from "@phosphor-icons/react";

const quickLinks = [
  { href: "/sermons", label: "Sermons" },
  { href: "/events", label: "Events" },
  { href: "/departments", label: "Departments" },
  { href: "/small-groups", label: "Small Groups" },
  { href: "/workers", label: "Workers" },
  { href: "/gallery", label: "Gallery" },
];

const aboutLinks = [
  { href: "/about", label: "About Us" },
  { href: "/evangelism", label: "Evangelism" },
  { href: "/live", label: "Live Stream" },
  { href: "/join", label: "Become a Member" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Green gradient top strip */}
      <div className="h-1 bg-gradient-to-r from-green-600 via-emerald-500 to-green-400" />

      <div className="container mx-auto px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center">
                <Cross size={18} weight="bold" className="text-white" />
              </div>
              <span className="font-heading font-bold text-white text-lg">SDA CRC</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Seventh-day Adventist Church, Cross River Conference — Integrated for Mission.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Explore</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-green-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Connect</h4>
            <ul className="space-y-2">
              {aboutLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-green-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-green-400" />
                <span>Conference Headquarters, Calabar, Cross River State, Nigeria</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="shrink-0 text-green-400" />
                <span>+234 XXX XXX XXXX</span>
              </li>
              <li className="flex items-center gap-2">
                <Envelope size={16} className="shrink-0 text-green-400" />
                <span>info@sdacrossriver.org</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-gray-800 text-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} SDA Cross River Conference. All rights reserved.</p>
          <p className="mt-1 italic">&ldquo;Integrated for Mission&rdquo;</p>
        </div>
      </div>
    </footer>
  );
}
