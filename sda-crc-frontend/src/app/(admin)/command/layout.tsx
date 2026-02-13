/**
 * Command Center Layout — Sidebar + content area
 */
export default function CommandLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar will be a client component */}
      <aside className="hidden lg:block w-64 bg-gray-900 text-white p-4">
        <div className="mb-8">
          <h2 className="font-heading font-bold text-lg text-green-400">Command Center</h2>
          <p className="text-xs text-gray-400">SDA CRC Admin</p>
        </div>
        <nav className="space-y-1 text-sm">
          <a href="/command" className="block px-3 py-2 rounded-lg hover:bg-gray-800">Dashboard</a>
          <a href="/command/sermons" className="block px-3 py-2 rounded-lg hover:bg-gray-800">Sermons</a>
          <a href="/command/events" className="block px-3 py-2 rounded-lg hover:bg-gray-800">Events</a>
          <a href="/command/departments" className="block px-3 py-2 rounded-lg hover:bg-gray-800">Departments</a>
          <a href="/command/members" className="block px-3 py-2 rounded-lg hover:bg-gray-800">Members</a>
          <a href="/command/workers" className="block px-3 py-2 rounded-lg hover:bg-gray-800">Workers</a>
          <a href="/command/evangelism" className="block px-3 py-2 rounded-lg hover:bg-gray-800">Evangelism</a>
          <a href="/command/settings" className="block px-3 py-2 rounded-lg hover:bg-gray-800">Settings</a>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}
