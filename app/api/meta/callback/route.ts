import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  exchangeCodeForToken,
  getLongLivedToken,
  getUserPages,
} from "@/lib/meta";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  if (!code || !state) {
    return NextResponse.redirect(new URL("/settings/accounts?error=missing_params", req.url));
  }

  const userId = state;

  try {
    const { access_token: shortToken } = await exchangeCodeForToken(code);
    const longToken = await getLongLivedToken(shortToken);
    const pagesData = await getUserPages(longToken);
    const pages = pagesData.data ?? [];

    const business = await prisma.business.findUnique({ where: { userId } });
    if (!business) {
      return NextResponse.redirect(new URL("/onboarding", req.url));
    }

    if (pages.length > 0) {
      const page = pages[0];
      await prisma.socialAccount.upsert({
        where: { businessId_platform: { businessId: business.id, platform: "facebook" } },
        create: {
          businessId: business.id,
          platform: "facebook",
          accountId: page.id,
          accountName: page.name,
          accessToken: page.access_token,
          pageId: page.id,
          pageName: page.name,
        },
        update: {
          accountName: page.name,
          accessToken: page.access_token,
          pageId: page.id,
          pageName: page.name,
        },
      });
    }

    return NextResponse.redirect(new URL("/settings/accounts?success=1", req.url));
  } catch (err) {
    console.error("Meta callback error:", err);
    return NextResponse.redirect(new URL("/settings/accounts?error=auth_failed", req.url));
  }
}
