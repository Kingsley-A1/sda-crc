/**
 * Contact Page
 */
export const metadata = { title: "Contact Us" };

export default function ContactPage() {
  return (
    <>
      <section className="gradient-hero text-white">
        <div className="container mx-auto px-4 py-16 sm:py-20 text-center">
          <h1 className="text-white font-heading font-bold text-3xl sm:text-4xl mb-3">Contact Us</h1>
          <p className="text-green-100 max-w-xl mx-auto">
            We&apos;d love to hear from you. Reach out anytime.
          </p>
        </div>
      </section>
      <section className="section-padding">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* ContactForm component will be built here */}
          <p className="text-gray-500 text-center">Contact form coming soon.</p>
        </div>
      </section>
    </>
  );
}
