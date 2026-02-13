/**
 * Live Stream Page
 */
export const metadata = { title: "Live Stream" };

export default function LivePage() {
  return (
    <>
      <section className="gradient-hero text-white">
        <div className="container mx-auto px-4 py-16 sm:py-20 text-center">
          <h1 className="text-white font-heading font-bold text-3xl sm:text-4xl mb-3">Live Stream</h1>
          <p className="text-green-100 max-w-xl mx-auto">
            Join our live worship services from anywhere.
          </p>
        </div>
      </section>
      <section className="section-padding">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <p className="text-gray-500">Live stream player will be embedded here.</p>
        </div>
      </section>
    </>
  );
}
