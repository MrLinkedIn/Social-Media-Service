import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import OnboardingFlow from "@/components/onboarding/StepIndicator";

export default async function OnboardingPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/sign-in");

  const business = await prisma.business.findUnique({
    where: { userId: (session.user as any).id },
  });

  if (business) redirect("/dashboard");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome to LocalPost</h1>
          <p className="text-gray-500 mt-2">
            Let&apos;s set up your business profile to get started.
          </p>
        </div>
        <OnboardingFlow />
      </div>
    </div>
  );
}
