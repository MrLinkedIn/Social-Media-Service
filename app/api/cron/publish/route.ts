import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { publishToFacebook, publishToInstagram } from "@/lib/meta";

export async function POST() {
  const now = new Date();

  const posts = await prisma.post.findMany({
    where: {
      status: "SCHEDULED",
      scheduledAt: { lte: now },
    },
    include: {
      user: {
        include: {
          business: { include: { socialAccounts: true } },
        },
      },
    },
  });

  const results: { id: string; success: boolean }[] = [];

  for (const post of posts) {
    const business = post.user.business;
    if (!business) continue;

    const platformPostIds: Record<string, string> = {};
    let failed = false;

    for (const platform of post.platforms) {
      const account = business.socialAccounts.find((a) => a.platform === platform);
      if (!account) continue;

      try {
        if (platform === "facebook" && account.pageId) {
          platformPostIds[platform] = await publishToFacebook(
            account.pageId,
            account.accessToken,
            post.content
          );
        } else if (platform === "instagram" && account.pageId) {
          platformPostIds[platform] = await publishToInstagram(
            account.pageId,
            account.accessToken,
            post.content,
            post.imageUrl ?? undefined
          );
        }
      } catch (err) {
        console.error(`Cron publish failed for post ${post.id} on ${platform}:`, err);
        failed = true;
      }
    }

    await prisma.post.update({
      where: { id: post.id },
      data: {
        status: failed ? "FAILED" : "PUBLISHED",
        publishedAt: failed ? undefined : new Date(),
        platformPostIds,
      },
    });

    results.push({ id: post.id, success: !failed });
  }

  return NextResponse.json({ processed: results.length, results });
}
