import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const business = await prisma.business.findUnique({
    where: { userId: (session.user as any).id },
    include: { socialAccounts: true },
  });

  return NextResponse.json(business);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const business = await prisma.business.create({
    data: {
      userId: (session.user as any).id,
      name: body.name,
      type: body.type,
      description: body.description,
      tone: body.tone ?? "professional",
      website: body.website,
      phone: body.phone,
      address: body.address,
    },
  });

  return NextResponse.json(business, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const business = await prisma.business.update({
    where: { userId: (session.user as any).id },
    data: {
      name: body.name,
      description: body.description,
      tone: body.tone,
      website: body.website,
      phone: body.phone,
      address: body.address,
    },
  });

  return NextResponse.json(business);
}
