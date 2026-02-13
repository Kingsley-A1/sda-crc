/**
 * Sermon Detail Page
 */
export const metadata = { title: "Sermon" };

export default function SermonDetailPage({ params }: { params: { slug: string } }) {
  return (
    <section className="section-padding">
      <div className="container mx-auto px-4 max-w-4xl">
        <p className="text-gray-500">Loading sermon detail...</p>
      </div>
    </section>
  );
}
