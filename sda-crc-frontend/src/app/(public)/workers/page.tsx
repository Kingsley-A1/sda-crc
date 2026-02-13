/**
 * Workers Page — Honour Roll
 */
export const metadata = { title: "Our Workers" };

export default function WorkersPage() {
  return (
    <>
      <section className="gradient-hero text-white">
        <div className="container mx-auto px-4 py-16 sm:py-20 text-center">
          <h1 className="text-white font-heading font-bold text-3xl sm:text-4xl mb-3">Our Workers</h1>
          <p className="text-green-100 max-w-xl mx-auto">
            Honouring those who serve in God&apos;s house with dedication and love.
          </p>
        </div>
      </section>
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <p className="text-gray-500 text-center">Workers grid loading from API...</p>
        </div>
      </section>
    </>
  );
}
