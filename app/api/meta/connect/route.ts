import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getMetaAuthUrl } from "@/lib/meta";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const state = (session.user as any).id as string;
  const url = getMetaAuthUrl(state);
  return NextResponse.json({ url });
}
