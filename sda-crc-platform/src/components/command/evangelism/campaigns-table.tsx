/**
 * Campaigns Table Component
 * =========================
 * Server component that displays evangelism campaigns in a table.
 */

import { db } from "@/lib/db";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface Campaign {
  id: string;
  name: string;
  theme: string | null;
  startDate: Date;
  endDate: Date;
  _count: {
    pledges: number;
  };
}

async function getCampaigns(): Promise<Campaign[]> {
  const campaigns = await db.evangelismCampaign.findMany({
    orderBy: { startDate: "desc" },
    take: 50,
    include: {
      _count: {
        select: { pledges: true },
      },
    },
  });
  return campaigns;
}

function getCampaignStatus(startDate: Date, endDate: Date): "upcoming" | "active" | "ended" {
  const now = new Date();
  if (now < startDate) return "upcoming";
  if (now > endDate) return "ended";
  return "active";
}

export async function CampaignsTable() {
  const campaigns = await getCampaigns();

  if (campaigns.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">No campaigns found.</p>
        <p className="text-sm text-muted-foreground mt-2">
          Create your first evangelism campaign to get started.
        </p>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                Campaign Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                Theme
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                Dates
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                Status
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                Pledges
              </th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-500 dark:text-gray-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {campaigns.map((campaign) => {
              const status = getCampaignStatus(campaign.startDate, campaign.endDate);
              return (
                <tr
                  key={campaign.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
                >
                  <td className="px-4 py-3">
                    <p className="font-medium">{campaign.name}</p>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {campaign.theme || "—"}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {campaign.startDate.toLocaleDateString("en-NG", {
                      day: "numeric",
                      month: "short",
                    })}{" "}
                    -{" "}
                    {campaign.endDate.toLocaleDateString("en-NG", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      variant={
                        status === "active"
                          ? "default"
                          : status === "upcoming"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {status === "active"
                        ? "Active"
                        : status === "upcoming"
                        ? "Upcoming"
                        : "Ended"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {campaign._count.pledges} pledges
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/command/evangelism/campaigns/${campaign.id}`}
                      className="text-sm text-primary hover:underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
