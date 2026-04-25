"use client";

import { cn } from "@/lib/utils";
import { PostType } from "@/types";
import { MessageSquare, Tag, Calendar, Lightbulb } from "lucide-react";

const types: { value: PostType; label: string; icon: React.ElementType }[] = [
  { value: "text", label: "General", icon: MessageSquare },
  { value: "promotion", label: "Promotion", icon: Tag },
  { value: "event", label: "Event", icon: Calendar },
  { value: "tips", label: "Tips", icon: Lightbulb },
];

interface Props {
  value: PostType;
  onChange: (v: PostType) => void;
}

export default function PostTypeSelector({ value, onChange }: Props) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700 block mb-2">Post Type</label>
      <div className="grid grid-cols-4 gap-2">
        {types.map(({ value: v, label, icon: Icon }) => (
          <button
            key={v}
            onClick={() => onChange(v)}
            className={cn(
              "flex flex-col items-center gap-1.5 p-3 rounded-lg border text-sm font-medium transition-colors",
              value === v
                ? "border-blue-600 bg-blue-50 text-blue-700"
                : "border-gray-200 text-gray-600 hover:border-gray-300"
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
