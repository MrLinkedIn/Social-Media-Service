"use client";

import { cn } from "@/lib/utils";
import { BUSINESS_TYPES } from "@/lib/templates";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function Step1BusinessType({ value, onChange }: Props) {
  return (
    <div className="space-y-3">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">What type of business do you run?</h2>
        <p className="text-sm text-gray-500 mt-1">
          This helps us tailor the AI-generated content to your industry.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2 max-h-72 overflow-y-auto pr-1">
        {BUSINESS_TYPES.map((type) => (
          <button
            key={type}
            onClick={() => onChange(type)}
            className={cn(
              "px-4 py-2.5 rounded-lg border text-sm text-left transition-colors",
              value === type
                ? "border-blue-600 bg-blue-50 text-blue-700 font-medium"
                : "border-gray-200 text-gray-700 hover:border-gray-300"
            )}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
}
