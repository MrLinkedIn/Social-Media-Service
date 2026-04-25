import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Calendar, BarChart2 } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="container mx-auto px-6 py-6 flex items-center justify-between">
        <div className="text-2xl font-bold text-blue-700">LocalPost</div>
        <div className="flex gap-3">
          <Link href="/sign-in">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link href="/sign-up">
            <Button>Get Started</Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
          <Sparkles className="h-4 w-4" />
          AI-Powered for Local Shops
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-6 max-w-3xl mx-auto leading-tight">
          Social media made simple for your local business
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Create, schedule, and publish posts to Facebook and Instagram in
          minutes. Let AI write the copy — you just approve and post.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/sign-up">
            <Button size="lg" className="gap-2">
              Start for Free <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/sign-in">
            <Button size="lg" variant="outline">
              Sign In
            </Button>
          </Link>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-4xl mx-auto">
          {[
            {
              icon: <Sparkles className="h-6 w-6 text-blue-600" />,
              title: "AI Content Generation",
              desc: "Claude writes tailored posts for your business type and tone.",
            },
            {
              icon: <Calendar className="h-6 w-6 text-blue-600" />,
              title: "Content Calendar",
              desc: "Schedule posts weeks ahead and visualize your content plan.",
            },
            {
              icon: <BarChart2 className="h-6 w-6 text-blue-600" />,
              title: "Real Analytics",
              desc: "See likes, reach, and engagement synced directly from Meta.",
            },
          ].map((f) => (
            <div key={f.title} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="mb-3">{f.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-1">{f.title}</h3>
              <p className="text-gray-500 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
