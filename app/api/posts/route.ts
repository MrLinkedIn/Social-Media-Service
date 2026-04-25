import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const posts = await prisma.post.findMany({
    where: { userId: (session.user as any).id },
    orderBy: { createdAt: "desc" },
    include: { analytics: true },
  });

  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const post = await prisma.post.create({
    data: {
      userId: (session.user as any).id,
      content: body.content,
      platforms: body.platforms ?? [],
      status: body.status ?? "DRAFT",
      scheduledAt: body.scheduledAt ? new Date(body.scheduledAt) : null,
      imageUrl: body.imageUrl,
    },
  });

  return NextResponse.json(post, { status: 201 });
}
