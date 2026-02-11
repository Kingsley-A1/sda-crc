import { PageHeader } from "@/components/layout";
import { JoinForm } from "@/components/sanctuary/join/join-form";
import { Container } from "@/components/layout";
import { SERVICE_TIMES } from "@/lib/constants";

export const metadata = {
  title: "Join Us | SDA Cross River Conference",
  description:
    "Register as a member of SDA Cross River Conference. Join our family of believers.",
};

export default function JoinPage() {
  return (
    <>
      <PageHeader
        subtitle="Become Part of Our Family"
        title="Join Us"
        description="We would love to welcome you into the SDA Cross River Conference family."
      />
      <section className="section-padding">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Registration Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-border p-6 sm:p-8">
                <h2 className="text-xl font-bold text-foreground mb-1">
                  Member Registration
                </h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Fill in the form below to register. Fields marked with * are
                  required.
                </p>
                <JoinForm />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Why Join */}
              <div className="bg-gradient-to-br from-primary to-primary-700 rounded-2xl p-6 text-white">
                <h3 className="text-lg font-bold mb-4">Why Join Us?</h3>
                <ul className="space-y-3 text-sm text-white/90">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/60 shrink-0" />
                    Be part of a loving, Bible-believing community
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/60 shrink-0" />
                    Grow spiritually through fellowship and study
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/60 shrink-0" />
                    Discover and use your God-given gifts
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/60 shrink-0" />
                    Connect with small groups in your area
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/60 shrink-0" />
                    Serve alongside passionate believers
                  </li>
                </ul>
              </div>

              {/* Service Times */}
              <div className="bg-white rounded-2xl shadow-sm border border-border p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">
                  Service Times
                </h3>
                <div className="space-y-3">
                  {SERVICE_TIMES.map((service) => (
                    <div
                      key={service.name}
                      className="flex items-center justify-between text-sm"
                    >
                      <div>
                        <p className="font-medium text-foreground">
                          {service.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {service.day}
                        </p>
                      </div>
                      <span className="text-xs font-medium text-primary bg-primary-50 px-2 py-1 rounded-full">
                        {service.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Need Help? */}
              <div className="bg-muted rounded-2xl p-6">
                <h3 className="text-lg font-bold text-foreground mb-2">
                  Need Help?
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  If you have questions about joining or need assistance with
                  registration, reach out to us.
                </p>
                <a
                  href="/contact"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Contact Us →
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
