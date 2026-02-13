/**
 * Join / Membership Registration Page
 */
export const metadata = { title: "Become a Member" };

export default function JoinPage() {
  return (
    <>
      <section className="gradient-hero text-white">
        <div className="container mx-auto px-4 py-16 sm:py-20 text-center">
          <h1 className="text-white font-heading font-bold text-3xl sm:text-4xl mb-3">Join Our Family</h1>
          <p className="text-green-100 max-w-xl mx-auto">
            Register as a member of the SDA Cross River Conference family.
          </p>
        </div>
      </section>
      <section className="section-padding">
        <div className="container mx-auto px-4 max-w-2xl">
          <p className="text-gray-500 text-center">Membership form coming soon.</p>
        </div>
      </section>
    </>
  );
}
