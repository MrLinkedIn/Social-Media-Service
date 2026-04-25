import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AccountsClient from "./AccountsClient";

export default async function AccountsPage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id as string | undefined;

  const business = userId
    ? await prisma.business.findUnique({
        where: { userId },
        include: { socialAccounts: true },
      })
    : null;

  return <AccountsClient business={business} />;
}
