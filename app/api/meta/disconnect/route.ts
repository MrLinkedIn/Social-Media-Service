import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { platform } = await req.json();
  const userId = (session.user as any).id as string;

  const business = await prisma.business.findUnique({ where: { userId } });
  if (!business) return NextResponse.json({ error: "No business" }, { status: 404 });

  await prisma.socialAccount.deleteMany({
    where: { businessId: business.id, platform },
  });

  return NextResponse.json({ success: true });
}
