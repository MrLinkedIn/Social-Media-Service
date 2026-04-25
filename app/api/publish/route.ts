import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { publishToFacebook, publishToInstagram } from "@/lib/meta";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { postId } = await req.json();
  const userId = (session.user as any).id as string;

  const post = await prisma.post.findFirst({
    where: { id: postId, userId },
  });

  if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });

  const business = await prisma.business.findUnique({
    where: { userId },
    include: { socialAccounts: true },
  });

  if (!business) return NextResponse.json({ error: "No business" }, { status: 404 });

  const platformPostIds: Record<string, string> = {};

  for (const platform of post.platforms) {
    const account = business.socialAccounts.find((a) => a.platform === platform);
    if (!account) continue;

    try {
      if (platform === "facebook" && account.pageId) {
        const id = await publishToFacebook(account.pageId, account.accessToken, post.content);
        platformPostIds[platform] = id;
      } else if (platform === "instagram" && account.pageId) {
        const id = await publishToInstagram(account.pageId, account.accessToken, post.content, post.imageUrl ?? undefined);
        platformPostIds[platform] = id;
      }
    } catch (err) {
      console.error(`Failed to publish to ${platform}:`, err);
    }
  }

  const updated = await prisma.post.update({
    where: { id: postId },
    data: {
      status: "PUBLISHED",
      publishedAt: new Date(),
      platformPostIds,
    },
  });

  return NextResponse.json(updated);
}
