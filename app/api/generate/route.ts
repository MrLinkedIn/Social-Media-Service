import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generatePost } from "@/lib/anthropic";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const business = await prisma.business.findUnique({
    where: { userId: (session.user as any).id },
  });

  if (!business) return NextResponse.json({ error: "No business found" }, { status: 404 });

  const body = await req.json();
  const { prompt, platforms, postType } = body;

  if (!prompt) return NextResponse.json({ error: "Prompt is required" }, { status: 400 });

  const content = await generatePost({
    businessName: business.name,
    businessType: business.type,
    tone: business.tone,
    prompt,
    platforms: platforms ?? ["facebook"],
    postType: postType ?? "text",
  });

  return NextResponse.json({ content });
}
