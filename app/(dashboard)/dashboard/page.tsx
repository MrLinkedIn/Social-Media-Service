import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const userId = (session!.user as any).id as string;

  const [posts, business] = await Promise.all([
    prisma.post.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 10,
      include: { analytics: true },
    }),
    prisma.business.findUnique({
      where: { userId },
      include: { socialAccounts: true },
    }),
  ]);

  const stats = {
    total: posts.length,
    published: posts.filter((p) => p.status === "PUBLISHED").length,
    scheduled: posts.filter((p) => p.status === "SCHEDULED").length,
    draft: posts.filter((p) => p.status === "DRAFT").length,
  };

  return <DashboardClient posts={posts} stats={stats} business={business} />;
}
