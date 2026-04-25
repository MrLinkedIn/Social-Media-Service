"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Step1BusinessType from "./Step1BusinessType";
import Step2BusinessDetails from "./Step2BusinessDetails";
import Step3Tone from "./Step3Tone";

const STEPS = ["Business Type", "Details", "Brand Voice"];

export default function OnboardingFlow() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [businessType, setBusinessType] = useState("");
  const [details, setDetails] = useState({
    name: "",
    description: "",
    website: "",
    phone: "",
    address: "",
  });
  const [tone, setTone] = useState("professional");
  const [saving, setSaving] = useState(false);

  function canAdvance() {
    if (step === 0) return !!businessType;
    if (step === 1) return !!details.name.trim();
    return true;
  }

  async function handleFinish() {
    setSaving(true);
    try {
      await fetch("/api/business", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: businessType,
          ...details,
          tone,
        }),
      });
      router.push("/dashboard");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Card className="shadow-lg">
      <CardContent className="p-6 space-y-6">
        {/* Step indicators */}
        <div className="flex items-center gap-2">
          {STEPS.map((label, i) => (
            <div key={i} className="flex items-center gap-2 flex-1">
              <div
                className={cn(
                  "h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0",
                  i < step
                    ? "bg-blue-600 text-white"
                    : i === step
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-400"
                )}
              >
                {i < step ? "✓" : i + 1}
              </div>
              <span
                className={cn(
                  "text-xs font-medium hidden sm:block",
                  i === step ? "text-blue-700" : "text-gray-400"
                )}
              >
                {label}
              </span>
              {i < STEPS.length - 1 && (
                <div className={cn("flex-1 h-px", i < step ? "bg-blue-300" : "bg-gray-200")} />
              )}
            </div>
          ))}
        </div>

        {/* Step content */}
        {step === 0 && <Step1BusinessType value={businessType} onChange={setBusinessType} />}
        {step === 1 && <Step2BusinessDetails value={details} onChange={setDetails} />}
        {step === 2 && <Step3Tone value={tone} onChange={setTone} />}

        {/* Navigation */}
        <div className="flex gap-3">
          {step > 0 && (
            <Button variant="outline" onClick={() => setStep(step - 1)} className="flex-1">
              Back
            </Button>
          )}
          {step < STEPS.length - 1 ? (
            <Button onClick={() => setStep(step + 1)} disabled={!canAdvance()} className="flex-1">
              Continue
            </Button>
          ) : (
            <Button onClick={handleFinish} disabled={saving} className="flex-1">
              {saving ? "Setting up…" : "Finish Setup"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
