import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import CreatePostClient from "./CreatePostClient";

export default async function CreatePage() {
  const session = await getServerSession(authOptions);
  const userId = (session!.user as any).id as string;

  const business = await prisma.business.findUnique({
    where: { userId },
    include: { socialAccounts: true },
  });

  return <CreatePostClient business={business} />;
}
