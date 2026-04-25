"use client";

import { cn } from "@/lib/utils";
import { TONE_OPTIONS } from "@/lib/templates";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function Step3Tone({ value, onChange }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Choose your brand voice</h2>
        <p className="text-sm text-gray-500 mt-1">
          The AI will write in this tone for all your posts.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {TONE_OPTIONS.map((t) => (
          <button
            key={t.value}
            onClick={() => onChange(t.value)}
            className={cn(
              "px-4 py-3 rounded-lg border text-sm font-medium text-left transition-colors",
              value === t.value
                ? "border-blue-600 bg-blue-50 text-blue-700"
                : "border-gray-200 text-gray-700 hover:border-gray-300"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}
