/**
 * Admin Base Layout
 * =================
 * Base layout for all admin routes (including login).
 * Does NOT include sidebar - that's in the command layout.
 */

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
