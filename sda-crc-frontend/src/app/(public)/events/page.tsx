/**
 * Events Page — Upcoming events
 */
export const metadata = { title: "Events" };

export default function EventsPage() {
  return (
    <>
      <section className="gradient-hero text-white">
        <div className="container mx-auto px-4 py-16 sm:py-20 text-center">
          <h1 className="text-white font-heading font-bold text-3xl sm:text-4xl mb-3">Events</h1>
          <p className="text-green-100 max-w-xl mx-auto">
            Conferences, camp meetings, evangelism programs and more.
          </p>
        </div>
      </section>
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <p className="text-gray-500 text-center">Events loading from API...</p>
        </div>
      </section>
    </>
  );
}
