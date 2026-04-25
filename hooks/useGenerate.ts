"use client";

import { useState } from "react";
import { PostType } from "@/types";

interface GenerateOptions {
  prompt: string;
  platforms: string[];
  postType: PostType;
}

export function useGenerate() {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generate(options: GenerateOptions) {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(options),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Generation failed");
      }
      const data = await res.json();
      setContent(data.content);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }

  return { content, setContent, isLoading, error, generate };
}
