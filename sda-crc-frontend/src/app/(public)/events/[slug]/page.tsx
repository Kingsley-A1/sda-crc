export const metadata = { title: "Event" };

export default function EventDetailPage({ params }: { params: { slug: string } }) {
  return (
    <section className="section-padding">
      <div className="container mx-auto px-4 max-w-4xl">
        <p className="text-gray-500">Loading event detail...</p>
      </div>
    </section>
  );
}
