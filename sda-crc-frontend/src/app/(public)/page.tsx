/**
 * Homepage — SDA Cross River Conference
 * "The Lord is my light and my salvation." — Psalm 27:1
 */
import Link from "next/link";
import { Button } from "@/components/ui";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative gradient-hero text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container mx-auto px-4 py-20 sm:py-28 lg:py-36 text-center">
          <p className="text-green-100 text-sm sm:text-base font-medium uppercase tracking-widest mb-4">
            Seventh-day Adventist Church
          </p>
          <h1 className="text-white font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Cross River Conference
          </h1>
          <p className="text-green-50 text-lg sm:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
            Integrated for Mission — Join our community of faith, worship, and service across Cross River State.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/sermons">
              <Button size="lg" className="bg-white text-green-700 hover:bg-green-50 w-full sm:w-auto">
                Watch Sermons
              </Button>
            </Link>
            <Link href="/join">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 w-full sm:w-auto">
                Become a Member
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Worship Times", desc: "Saturday: Sabbath School 9:30 AM | Divine Service 11:00 AM", icon: "🕐" },
              { title: "Upcoming Events", desc: "View our calendar of conferences, camp meetings and more", icon: "📅" },
              { title: "Find a Group", desc: "Connect with a small care group near you", icon: "🤝" },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-green-100 p-6 text-center hover-lift">
                <span className="text-3xl mb-3 block">{item.icon}</span>
                <h3 className="font-heading font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments preview */}
      <section className="section-padding gradient-hero-soft">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading font-bold mb-3">Our Departments</h2>
          <p className="text-gray-500 mb-8 max-w-xl mx-auto">
            Explore the ministries that make our conference vibrant and impactful.
          </p>
          <Link href="/departments">
            <Button variant="secondary">View All Departments</Button>
          </Link>
        </div>
      </section>
    </>
  );
}
