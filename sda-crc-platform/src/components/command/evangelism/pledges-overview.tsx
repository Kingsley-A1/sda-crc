/**
 * Pledges Overview Component
 * ==========================
 * Server component that displays soul pledges overview.
 */

import { db } from "@/lib/db";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface Pledge {
  id: string;
  pledgedSouls: number;
  wonSouls: number;
  member: {
    firstName: string;
    lastName: string;
  };
  campaign: {
    name: string;
  } | null;
}

interface PledgesData {
  pledges: Pledge[];
  totalPledged: number;
  totalWon: number;
}

async function getPledges(): Promise<PledgesData> {
  const pledges = await db.soulPledge.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    include: {
      member: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
      campaign: {
        select: {
          name: true,
        },
      },
    },
  });

  const stats = await db.soulPledge.aggregate({
    _sum: {
      pledgedSouls: true,
      wonSouls: true,
    },
  });

  return {
    pledges,
    totalPledged: stats._sum.pledgedSouls || 0,
    totalWon: stats._sum.wonSouls || 0,
  };
}

export async function PledgesOverview() {
  const { pledges, totalPledged, totalWon } = await getPledges();

  const progressPercent = totalPledged > 0 ? Math.round((totalWon / totalPledged) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-4">Overall Progress</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-3xl font-bold text-primary">{totalPledged}</p>
            <p className="text-sm text-muted-foreground">Souls Pledged</p>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-3xl font-bold text-green-600">{totalWon}</p>
            <p className="text-sm text-muted-foreground">Souls Won</p>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-3xl font-bold">{progressPercent}%</p>
            <p className="text-sm text-muted-foreground">Completion</p>
          </div>
        </div>
        <Progress value={progressPercent} className="h-3" />
      </Card>

      {/* Pledges Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  Member
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  Campaign
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  Pledged
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  Won
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {pledges.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                    No pledges yet.
                  </td>
                </tr>
              ) : (
                pledges.map((pledge) => {
                  const progress = pledge.pledgedSouls > 0
                    ? Math.round((pledge.wonSouls / pledge.pledgedSouls) * 100)
                    : 0;
                  return (
                    <tr
                      key={pledge.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    >
                      <td className="px-4 py-3">
                        <p className="font-medium">
                          {pledge.member.firstName} {pledge.member.lastName}
                        </p>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {pledge.campaign?.name || "General"}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {pledge.pledgedSouls} souls
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {pledge.wonSouls} souls
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          variant={progress >= 100 ? "default" : "secondary"}
                        >
                          {progress >= 100 ? "Completed" : `${progress}%`}
                        </Badge>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
