/**
 * Admin Dashboard Page
 */
export const metadata = { title: "Dashboard" };

export default function DashboardPage() {
  return (
    <div>
      <h1 className="font-heading font-bold text-2xl mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Members", value: "—", color: "green" },
          { label: "Active Sermons", value: "—", color: "blue" },
          { label: "Upcoming Events", value: "—", color: "amber" },
          { label: "Evangelism Sites", value: "—", color: "purple" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-5 shadow-card">
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
