"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Sparkles, Loader2 } from "lucide-react";
import { PostType } from "@/types";
import { POST_TEMPLATES } from "@/lib/templates";

interface Props {
  postType: PostType;
  platforms: string[];
  onGenerate: (opts: { prompt: string; platforms: string[]; postType: PostType }) => void;
  isLoading: boolean;
  error: string | null;
}

export default function AIPromptForm({ postType, platforms, onGenerate, isLoading, error }: Props) {
  const [prompt, setPrompt] = useState("");

  const templates = POST_TEMPLATES.filter((t) => t.postType === postType);

  return (
    <div className="bg-white border rounded-lg p-5 space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-blue-600" />
        <span className="font-medium text-gray-800">AI Content Generator</span>
      </div>

      {templates.length > 0 && (
        <div>
          <Label className="text-xs text-gray-500 mb-1.5 block">Quick Templates</Label>
          <div className="flex flex-wrap gap-2">
            {templates.map((t) => (
              <button
                key={t.id}
                onClick={() => setPrompt(t.prompt)}
                className="text-xs px-3 py-1.5 rounded-full bg-gray-100 hover:bg-blue-50 hover:text-blue-700 transition-colors"
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-1.5">
        <Label htmlFor="prompt">Describe what you want to post</Label>
        <Textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g. We're having a flash sale this weekend — 20% off everything in-store!"
          rows={3}
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button
        onClick={() => onGenerate({ prompt, platforms, postType })}
        disabled={isLoading || !prompt.trim()}
        className="gap-2 w-full"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Generating…
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4" /> Generate with AI
          </>
        )}
      </Button>
    </div>
  );
}
