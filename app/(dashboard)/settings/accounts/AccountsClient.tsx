"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SocialIcons } from "@/components/ui/social-icons";
import { useToast } from "@/hooks/use-toast";
import { Trash2 } from "lucide-react";

interface Props {
  business: any;
}

export default function AccountsClient({ business }: Props) {
  const { toast } = useToast();
  const [accounts, setAccounts] = useState<any[]>(business?.socialAccounts ?? []);

  async function handleConnect() {
    const res = await fetch("/api/meta/connect");
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  }

  async function handleDisconnect(platform: string) {
    await fetch("/api/meta/disconnect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ platform }),
    });
    setAccounts((prev) => prev.filter((a) => a.platform !== platform));
    toast({ title: "Account disconnected" });
  }

  const connected = accounts.map((a) => a.platform);

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Connected Accounts</h1>

      <Card>
        <CardHeader>
          <CardTitle>Social Platforms</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {["facebook", "instagram"].map((platform) => {
            const account = accounts.find((a) => a.platform === platform);
            return (
              <div
                key={platform}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <SocialIcons platform={platform} className="h-6 w-6" />
                  <div>
                    <div className="font-medium capitalize">{platform}</div>
                    {account && (
                      <div className="text-sm text-gray-500">
                        {account.pageName ?? account.accountName}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {account ? (
                    <>
                      <Badge variant="secondary">Connected</Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDisconnect(platform)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </>
                  ) : (
                    <Button size="sm" onClick={handleConnect}>
                      Connect
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
