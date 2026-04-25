"use client";

import { cn } from "@/lib/utils";
import { SocialIcons } from "@/components/ui/social-icons";

const platforms = ["facebook", "instagram", "twitter"];

interface Props {
  value: string[];
  onChange: (v: string[]) => void;
}

export default function PlatformSelector({ value, onChange }: Props) {
  function toggle(p: string) {
    onChange(value.includes(p) ? value.filter((x) => x !== p) : [...value, p]);
  }

  return (
    <div>
      <label className="text-sm font-medium text-gray-700 block mb-2">Platforms</label>
      <div className="flex gap-2">
        {platforms.map((p) => (
          <button
            key={p}
            onClick={() => toggle(p)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors capitalize",
              value.includes(p)
                ? "border-blue-600 bg-blue-50 text-blue-700"
                : "border-gray-200 text-gray-600 hover:border-gray-300"
            )}
          >
            <SocialIcons platform={p} className="h-4 w-4" />
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}
