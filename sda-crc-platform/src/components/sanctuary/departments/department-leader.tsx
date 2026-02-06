/**
 * Department Leader Component
 * ===========================
 * Display department leader information.
 */

import Image from "next/image";

interface Leader {
  id: string;
  firstName: string;
  lastName: string;
  email?: string | null;
  phone?: string | null;
  photoUrl?: string | null;
  role?: string;
  bio?: string | null;
}

interface DepartmentLeaderProps {
  leader: Leader;
}

export function DepartmentLeader({ leader }: DepartmentLeaderProps) {
  return (
    <div className="rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 p-6">
      <h3 className="font-semibold text-lg mb-4">Department Leader</h3>

      <div className="text-center">
        {/* Photo */}
        <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
          {leader.photoUrl ? (
            <Image
              src={leader.photoUrl}
              alt={`${leader.firstName} ${leader.lastName}`}
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-gray-400">
              {leader.firstName.charAt(0)}
              {leader.lastName.charAt(0)}
            </div>
          )}
        </div>

        {/* Name & Role */}
        <h4 className="font-semibold text-lg">
          {leader.firstName} {leader.lastName}
        </h4>
        <p className="text-primary text-sm font-medium mb-3">Director</p>

        {/* Bio */}
        {leader.bio && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            {leader.bio}
          </p>
        )}

        {/* Contact */}
        <div className="space-y-2 text-sm">
          {leader.email && (
            <a
              href={`mailto:${leader.email}`}
              className="block text-primary hover:underline"
            >
              {leader.email}
            </a>
          )}
          {leader.phone && (
            <a
              href={`tel:${leader.phone}`}
              className="block text-primary hover:underline"
            >
              {leader.phone}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
