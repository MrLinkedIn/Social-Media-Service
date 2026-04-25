import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import CalendarClient from "./CalendarClient";

export default async function CalendarPage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id as string | undefined;

  const posts = userId
    ? await prisma.post.findMany({
        where: {
          userId,
          OR: [{ status: "SCHEDULED" }, { status: "PUBLISHED" }],
        },
        orderBy: { scheduledAt: "asc" },
      })
    : [];

  return <CalendarClient posts={posts} />;
}
