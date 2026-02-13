/**
 * Sermons Page — List all sermons from API
 */
export const metadata = { title: "Sermons" };

export default function SermonsPage() {
  return (
    <>
      <section className="gradient-hero text-white">
        <div className="container mx-auto px-4 py-16 sm:py-20 text-center">
          <h1 className="text-white font-heading font-bold text-3xl sm:text-4xl mb-3">Sermons</h1>
          <p className="text-green-100 max-w-xl mx-auto">
            Watch and listen to inspiring messages from our pastors and evangelists.
          </p>
        </div>
      </section>
      <section className="section-padding">
        <div className="container mx-auto px-4">
          {/* SermonGrid component will be built here */}
          <p className="text-gray-500 text-center">Sermon grid loading from API...</p>
        </div>
      </section>
    </>
  );
}
