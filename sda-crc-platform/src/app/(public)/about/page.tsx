/**
 * About Page
 * ==========
 * "For we are God's handiwork, created in Christ Jesus to do good works." — Ephesians 2:10
 */

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Lightning,
  Eye,
  BookOpen,
  Users,
  Heart,
  Cross,
  Church,
  Calendar,
  ArrowRight,
} from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about the Seventh-day Adventist Cross River Conference — our mission, history, and beliefs.",
};

const beliefs = [
  { title: "The Holy Scriptures", icon: BookOpen },
  { title: "The Trinity", icon: Cross },
  { title: "God the Father", icon: Heart },
  { title: "God the Son", icon: Cross },
  { title: "God the Holy Spirit", icon: Heart },
  { title: "Creation", icon: Lightning },
  { title: "The Nature of Humanity", icon: Users },
  { title: "The Great Controversy", icon: Lightning },
  { title: "The Sabbath", icon: Calendar },
  { title: "The Church", icon: Church },
  { title: "The Second Coming", icon: Eye },
  { title: "Growing in Christ", icon: Heart },
];

const serviceTimes = [
  {
    service: "Divine Worship",
    day: "Saturday",
    time: "9:00 AM - 12:30 PM",
    primary: true,
  },
  {
    service: "AY Programs",
    day: "Saturday",
    time: "2:00 PM - 4:00 PM",
    primary: false,
  },
  {
    service: "Prayer Meeting",
    day: "Wednesday",
    time: "6:00 PM - 7:30 PM",
    primary: false,
  },
  {
    service: "Vespers",
    day: "Friday",
    time: "6:00 PM - 7:30 PM",
    primary: false,
  },
];

const stats = [
  { value: "50+", label: "Churches" },
  { value: "10K+", label: "Members" },
  { value: "100+", label: "Workers" },
  { value: "30+", label: "Years" },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Us"
        subtitle="Our Story"
        description="A family united in faith, worship, and mission across Cross River State."
        size="md"
      />

      {/* Who We Are Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-8 bg-primary-500" />
                <span className="text-xs font-bold text-primary-600 uppercase tracking-widest">
                  Who We Are
                </span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
                A Conference United{" "}
                <span className="text-primary">in Mission</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  The Seventh-day Adventist Cross River Conference is a vibrant
                  community of believers in Cross River State, Nigeria. We are
                  part of the global Seventh-day Adventist Church, united by our
                  shared faith in Jesus Christ and His soon return.
                </p>
                <p>
                  Our conference encompasses churches, schools, and health
                  institutions across Cross River State, all working together to
                  share the love of God through worship, education, health, and
                  community service.
                </p>
                <p>
                  We believe in the wholistic development of every person —
                  spiritual, mental, physical, and social — as we prepare for
                  the second coming of Jesus Christ.
                </p>
              </div>

              {/* Stats */}
              <div className="mt-10 grid grid-cols-4 gap-4">
                {stats.map((stat) => (
                  <Card key={stat.label} className="text-center p-4 bg-card">
                    <p className="text-2xl sm:text-3xl font-bold text-primary">
                      {stat.value}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                      {stat.label}
                    </p>
                  </Card>
                ))}
              </div>
            </div>

            {/* Image Card */}
            <div className="relative">
              <Card className="overflow-hidden" variant="elevated">
                <div className="relative aspect-[4/3]">
                  <Image
                    src="/hero/divine service 2.jpg"
                    alt="SDA Cross River Conference Worship"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <p className="text-sm font-medium text-primary-200">
                      Seventh-day Adventist Church
                    </p>
                    <p className="text-xl font-bold mt-1">
                      Cross River Conference
                    </p>
                    <p className="text-sm text-white/80 mt-1">
                      Integrated for Mission
                    </p>
                  </div>
                </div>
              </Card>
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary-100 rounded-2xl -z-10" />
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-primary-50 rounded-xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Cards */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-8 bg-primary-500" />
              <span className="text-xs font-bold text-primary-600 uppercase tracking-widest">
                Our Purpose
              </span>
              <span className="h-px w-8 bg-primary-500" />
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              Mission & Vision
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Mission Card */}
            <Card
              className="group relative p-8 lg:p-10 bg-card overflow-hidden"
              hover="lift"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary-100 to-transparent rounded-bl-full opacity-60" />
              <div className="relative">
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-100 text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <Lightning size={28} weight="duotone" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
                  Our Mission
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  To proclaim the everlasting gospel of Jesus Christ to every
                  nation, tribe, tongue, and people in Cross River State,
                  calling all to worship God, accept His grace, and prepare for
                  His soon return.
                </p>
              </div>
            </Card>

            {/* Vision Card */}
            <Card
              className="group relative p-8 lg:p-10 bg-card overflow-hidden"
              hover="lift"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary-100 to-transparent rounded-bl-full opacity-60" />
              <div className="relative">
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-100 text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <Eye size={28} weight="duotone" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
                  Our Vision
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  To be a thriving Adventist community where every member is
                  discipled, equipped, and empowered to share Christ&apos;s love
                  in their sphere of influence, transforming Cross River State
                  one soul at a time.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Beliefs Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-8 bg-primary-500" />
              <span className="text-xs font-bold text-primary-600 uppercase tracking-widest">
                What We Believe
              </span>
              <span className="h-px w-8 bg-primary-500" />
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              28 Fundamental Beliefs
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Seventh-day Adventists accept the Bible as our only creed and hold
              28 fundamental beliefs rooted in Scripture.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {beliefs.map((belief, i) => {
              const Icon = belief.icon;
              return (
                <Card
                  key={i}
                  className="group p-5 bg-card hover:bg-primary-50 transition-all duration-300"
                  hover="lift"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-primary-100 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <Icon size={20} weight="duotone" />
                    </span>
                    <div>
                      <span className="text-xs font-bold text-primary">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-sm font-semibold text-foreground mt-0.5 leading-snug">
                        {belief.title}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <a
              href="https://www.adventist.org/beliefs/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline-muted"
                rightIcon={<ArrowRight size={16} />}
              >
                View all 28 beliefs
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Service Times Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800" />

        {/* Pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="container relative z-10">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-8 bg-white/40" />
              <span className="text-xs font-bold text-white/80 uppercase tracking-widest">
                Join Us
              </span>
              <span className="h-px w-8 bg-white/40" />
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Service Times
            </h2>
            <p className="text-white/70 max-w-md mx-auto text-lg">
              We gather to worship, pray, and grow together. Join us!
            </p>
          </div>

          <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
            {serviceTimes.map((s) => (
              <Card
                key={s.service}
                className={`p-6 transition-all duration-300 ${
                  s.primary
                    ? "bg-white"
                    : "bg-white/10 backdrop-blur-sm border-white/20"
                }`}
                hover="lift"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p
                      className={`text-lg font-bold ${
                        s.primary ? "text-foreground" : "text-white"
                      }`}
                    >
                      {s.service}
                    </p>
                    <p
                      className={`text-sm mt-1 ${
                        s.primary ? "text-muted-foreground" : "text-white/70"
                      }`}
                    >
                      {s.day}
                    </p>
                  </div>
                  <Badge
                    variant={s.primary ? "primary-subtle" : "muted"}
                    size="sm"
                    rounded="full"
                    className={
                      s.primary ? "" : "bg-white/20 text-white border-0"
                    }
                  >
                    {s.time.split(" - ")[0]}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/join">
              <Button
                size="lg"
                variant="white"
                rightIcon={<ArrowRight size={18} />}
                className="text-primary-700"
              >
                Plan Your Visit
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
