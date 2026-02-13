/**
 * Admin Login Page
 */
export const metadata = { title: "Admin Login" };

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-6">
          <div className="h-14 w-14 mx-auto rounded-full bg-gradient-to-br from-green-600 to-emerald-500 flex items-center justify-center mb-3">
            <span className="text-white font-bold text-lg">SDA</span>
          </div>
          <h1 className="font-heading font-bold text-xl">Command Center</h1>
          <p className="text-sm text-gray-500">Sign in to manage the platform</p>
        </div>
        {/* LoginForm component will be built here */}
        <p className="text-gray-400 text-center text-sm">Login form coming soon.</p>
      </div>
    </div>
  );
}
