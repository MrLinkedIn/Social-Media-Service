import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as any).id as string;

  const posts = await prisma.post.findMany({
    where: { userId, status: "PUBLISHED" },
    include: { analytics: true },
  });

  // In production, fetch real metrics from Meta Graph API per post
  // For now we upsert placeholder analytics to demonstrate the schema
  for (const post of posts) {
    if (!post.analytics) {
      await prisma.postAnalytics.create({
        data: {
          postId: post.id,
          likes: Math.floor(Math.random() * 50),
          comments: Math.floor(Math.random() * 10),
          shares: Math.floor(Math.random() * 5),
          reach: Math.floor(Math.random() * 500),
          impressions: Math.floor(Math.random() * 800),
        },
      });
    }
  }

  return NextResponse.json({ synced: posts.length });
}
