"use client";

import CalendarGrid from "@/components/calendar/CalendarGrid";

interface Props {
  posts: any[];
}

export default function CalendarClient({ posts }: Props) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Content Calendar</h1>
      <CalendarGrid posts={posts} />
    </div>
  );
}
