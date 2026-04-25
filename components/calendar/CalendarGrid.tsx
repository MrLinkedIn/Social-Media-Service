"use client";

import { useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  posts: any[];
}

export default function CalendarGrid({ posts }: Props) {
  const [current, setCurrent] = useState(new Date());

  const monthStart = startOfMonth(current);
  const monthEnd = endOfMonth(current);
  const calStart = startOfWeek(monthStart);
  const calEnd = endOfWeek(monthEnd);
  const days = eachDayOfInterval({ start: calStart, end: calEnd });

  function postsOnDay(day: Date) {
    return posts.filter((p) => {
      const d = p.scheduledAt ?? p.publishedAt;
      return d && isSameDay(new Date(d), day);
    });
  }

  return (
    <div className="bg-white border rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <h2 className="font-semibold text-gray-900">
          {format(current, "MMMM yyyy")}
        </h2>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" onClick={() => setCurrent(subMonths(current, 1))}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setCurrent(addMonths(current, 1))}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="text-center text-xs font-medium text-gray-400 py-2 border-b">
            {d}
          </div>
        ))}
        {days.map((day) => {
          const dayPosts = postsOnDay(day);
          const isCurrentMonth = isSameMonth(day, current);
          const isToday = isSameDay(day, new Date());

          return (
            <div
              key={day.toISOString()}
              className={cn(
                "min-h-[80px] p-1.5 border-b border-r text-xs",
                !isCurrentMonth && "bg-gray-50",
                isToday && "bg-blue-50"
              )}
            >
              <div
                className={cn(
                  "w-6 h-6 flex items-center justify-center rounded-full font-medium mb-1",
                  isToday ? "bg-blue-600 text-white" : "text-gray-700",
                  !isCurrentMonth && "text-gray-300"
                )}
              >
                {format(day, "d")}
              </div>
              <div className="space-y-0.5">
                {dayPosts.slice(0, 2).map((p) => (
                  <div
                    key={p.id}
                    className="truncate text-[10px] bg-blue-100 text-blue-700 rounded px-1 py-0.5"
                  >
                    {p.content.slice(0, 30)}…
                  </div>
                ))}
                {dayPosts.length > 2 && (
                  <Badge variant="secondary" className="text-[10px] px-1 py-0">
                    +{dayPosts.length - 2}
                  </Badge>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
