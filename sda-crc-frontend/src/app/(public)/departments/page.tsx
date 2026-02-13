/**
 * Departments Page
 */
export const metadata = { title: "Departments" };

export default function DepartmentsPage() {
  return (
    <>
      <section className="gradient-hero text-white">
        <div className="container mx-auto px-4 py-16 sm:py-20 text-center">
          <h1 className="text-white font-heading font-bold text-3xl sm:text-4xl mb-3">Departments</h1>
          <p className="text-green-100 max-w-xl mx-auto">
            Discover the ministries that drive our mission across Cross River State.
          </p>
        </div>
      </section>
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <p className="text-gray-500 text-center">Departments loading from API...</p>
        </div>
      </section>
    </>
  );
}
