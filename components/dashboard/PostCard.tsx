"use client";

import { Badge } from "@/components/ui/badge";
import { SocialIcons } from "@/components/ui/social-icons";
import { formatRelativeTime, truncate } from "@/lib/utils";
import { Post } from "@/types";

const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  PUBLISHED: "default",
  SCHEDULED: "secondary",
  DRAFT: "outline",
  FAILED: "destructive",
};

interface Props {
  post: Post & { analytics?: any };
}

export default function PostCard({ post }: Props) {
  return (
    <div className="bg-white border rounded-lg p-4 flex gap-4">
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-700 leading-relaxed">{truncate(post.content, 160)}</p>
        <div className="flex items-center gap-3 mt-2">
          <div className="flex gap-1">
            {post.platforms.map((p) => (
              <SocialIcons key={p} platform={p} className="h-4 w-4" />
            ))}
          </div>
          <span className="text-xs text-gray-400">
            {post.scheduledAt
              ? `Scheduled ${formatRelativeTime(post.scheduledAt)}`
              : formatRelativeTime(post.createdAt)}
          </span>
        </div>
      </div>
      <div className="shrink-0">
        <Badge variant={statusVariant[post.status] ?? "outline"}>
          {post.status.charAt(0) + post.status.slice(1).toLowerCase()}
        </Badge>
      </div>
    </div>
  );
}
