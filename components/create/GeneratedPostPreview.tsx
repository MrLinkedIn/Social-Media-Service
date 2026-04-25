"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, Clock, Loader2 } from "lucide-react";

interface Props {
  content: string;
  onChange: (v: string) => void;
  scheduledAt: string;
  onScheduledAtChange: (v: string) => void;
  onSaveDraft: () => void;
  onSchedule: () => void;
  saving: boolean;
}

export default function GeneratedPostPreview({
  content,
  onChange,
  scheduledAt,
  onScheduledAtChange,
  onSaveDraft,
  onSchedule,
  saving,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Generated Content</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          value={content}
          onChange={(e) => onChange(e.target.value)}
          rows={6}
          className="resize-none"
        />

        <div className="space-y-1.5">
          <Label htmlFor="scheduled-at">Schedule for (optional)</Label>
          <input
            id="scheduled-at"
            type="datetime-local"
            value={scheduledAt}
            onChange={(e) => onScheduledAtChange(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={onSaveDraft}
            disabled={saving}
            className="gap-2 flex-1"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save Draft
          </Button>
          <Button
            onClick={onSchedule}
            disabled={saving || !scheduledAt}
            className="gap-2 flex-1"
          >
            <Clock className="h-4 w-4" />
            Schedule
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
