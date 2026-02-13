/**
 * About Page — Conference history & beliefs
 */
export const metadata = { title: "About Us" };

export default function AboutPage() {
  return (
    <>
      <section className="gradient-hero text-white">
        <div className="container mx-auto px-4 py-16 sm:py-20 text-center">
          <h1 className="text-white font-heading font-bold text-3xl sm:text-4xl mb-3">About Our Conference</h1>
          <p className="text-green-100 max-w-xl mx-auto">
            Learn about the Seventh-day Adventist Church in Cross River State.
          </p>
        </div>
      </section>
      <section className="section-padding">
        <div className="container mx-auto px-4 max-w-3xl prose prose-green">
          {/* Content will be fetched from backend settings */}
          <p className="text-gray-500">About page content coming soon.</p>
        </div>
      </section>
    </>
  );
}
