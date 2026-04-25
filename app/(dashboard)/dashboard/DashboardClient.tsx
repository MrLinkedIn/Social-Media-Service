"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import QuickStats from "@/components/dashboard/QuickStats";
import PostCard from "@/components/dashboard/PostCard";
import EmptyState from "@/components/shared/EmptyState";

interface Props {
  posts: any[];
  stats: { total: number; published: number; scheduled: number; draft: number };
  business: any;
}

export default function DashboardClient({ posts, stats, business }: Props) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-0.5">{business?.name}</p>
        </div>
        <Link href="/create">
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> New Post
          </Button>
        </Link>
      </div>

      <QuickStats stats={stats} />

      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Recent Posts</h2>
        {posts.length === 0 ? (
          <EmptyState
            title="No posts yet"
            description="Create your first post to get started."
            action={
              <Link href="/create">
                <Button>Create Post</Button>
              </Link>
            }
          />
        ) : (
          <div className="space-y-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
