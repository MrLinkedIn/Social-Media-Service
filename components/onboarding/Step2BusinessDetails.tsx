"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Details {
  name: string;
  description: string;
  website: string;
  phone: string;
  address: string;
}

interface Props {
  value: Details;
  onChange: (v: Details) => void;
}

export default function Step2BusinessDetails({ value, onChange }: Props) {
  function update(key: keyof Details, val: string) {
    onChange({ ...value, [key]: val });
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Tell us about your business</h2>
        <p className="text-sm text-gray-500 mt-1">
          This information helps personalize your content.
        </p>
      </div>

      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="biz-name">Business Name *</Label>
          <Input
            id="biz-name"
            value={value.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="e.g. Sunny Side Café"
            required
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="biz-desc">Short Description</Label>
          <Textarea
            id="biz-desc"
            value={value.description}
            onChange={(e) => update("description", e.target.value)}
            placeholder="What makes your business special?"
            rows={2}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="biz-website">Website</Label>
          <Input
            id="biz-website"
            type="url"
            value={value.website}
            onChange={(e) => update("website", e.target.value)}
            placeholder="https://..."
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label htmlFor="biz-phone">Phone</Label>
            <Input
              id="biz-phone"
              value={value.phone}
              onChange={(e) => update("phone", e.target.value)}
              placeholder="(555) 000-0000"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="biz-address">Address</Label>
            <Input
              id="biz-address"
              value={value.address}
              onChange={(e) => update("address", e.target.value)}
              placeholder="123 Main St"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
