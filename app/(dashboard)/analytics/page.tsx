import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import MetricCard from "@/components/analytics/MetricCard";
import EngagementChart from "@/components/analytics/EngagementChart";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

export default async function AnalyticsPage() {
  const session = await getServerSession(authOptions);
  const userId = (session!.user as any).id as string;

  const posts = await prisma.post.findMany({
    where: { userId, status: "PUBLISHED" },
    include: { analytics: true },
    orderBy: { publishedAt: "desc" },
    take: 30,
  });

  const totals = posts.reduce(
    (acc, p) => {
      if (p.analytics) {
        acc.likes += p.analytics.likes;
        acc.comments += p.analytics.comments;
        acc.shares += p.analytics.shares;
        acc.reach += p.analytics.reach;
        acc.impressions += p.analytics.impressions;
      }
      return acc;
    },
    { likes: 0, comments: 0, shares: 0, reach: 0, impressions: 0 }
  );

  const chartData = posts
    .filter((p) => p.analytics && p.publishedAt)
    .slice(0, 14)
    .reverse()
    .map((p) => ({
      date: new Date(p.publishedAt!).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      likes: p.analytics!.likes,
      comments: p.analytics!.comments,
      reach: p.analytics!.reach,
    }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <form action="/api/analytics/sync" method="POST">
          <Button variant="outline" size="sm" className="gap-2" type="submit">
            <RefreshCw className="h-4 w-4" /> Sync
          </Button>
        </form>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard label="Total Likes" value={totals.likes} />
        <MetricCard label="Comments" value={totals.comments} />
        <MetricCard label="Total Reach" value={totals.reach} />
        <MetricCard label="Impressions" value={totals.impressions} />
      </div>

      <EngagementChart data={chartData} />
    </div>
  );
}
