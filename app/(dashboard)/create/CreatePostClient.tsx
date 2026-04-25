"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGenerate } from "@/hooks/useGenerate";
import { useToast } from "@/hooks/use-toast";
import PostTypeSelector from "@/components/create/PostTypeSelector";
import PlatformSelector from "@/components/create/PlatformSelector";
import AIPromptForm from "@/components/create/AIPromptForm";
import GeneratedPostPreview from "@/components/create/GeneratedPostPreview";
import { PostType } from "@/types";

interface Props {
  business: any;
}

export default function CreatePostClient({ business }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const { content, setContent, isLoading, error, generate } = useGenerate();

  const [postType, setPostType] = useState<PostType>("text");
  const [platforms, setPlatforms] = useState<string[]>(["facebook"]);
  const [scheduledAt, setScheduledAt] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSave(status: "DRAFT" | "SCHEDULED") {
    if (!content.trim()) {
      toast({ title: "No content", description: "Generate or write some content first.", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          platforms,
          status,
          scheduledAt: status === "SCHEDULED" && scheduledAt ? scheduledAt : undefined,
        }),
      });
      if (!res.ok) throw new Error("Failed to save post");
      toast({ title: status === "DRAFT" ? "Draft saved" : "Post scheduled" });
      router.push("/dashboard");
    } catch {
      toast({ title: "Error", description: "Could not save post.", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Create Post</h1>

      <PostTypeSelector value={postType} onChange={setPostType} />
      <PlatformSelector value={platforms} onChange={setPlatforms} />
      <AIPromptForm
        postType={postType}
        platforms={platforms}
        onGenerate={generate}
        isLoading={isLoading}
        error={error}
      />

      {content && (
        <GeneratedPostPreview
          content={content}
          onChange={setContent}
          scheduledAt={scheduledAt}
          onScheduledAtChange={setScheduledAt}
          onSaveDraft={() => handleSave("DRAFT")}
          onSchedule={() => handleSave("SCHEDULED")}
          saving={saving}
        />
      )}
    </div>
  );
}
