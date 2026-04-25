"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";

interface Props {
  businessName: string;
  userName: string;
}

export default function TopNav({ businessName, userName }: Props) {
  return (
    <header className="h-16 bg-white border-b px-6 flex items-center justify-between shrink-0">
      <div className="text-sm text-gray-500">{businessName}</div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <User className="h-4 w-4" />
          {userName}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-gray-500"
          onClick={() => signOut({ callbackUrl: "/sign-in" })}
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </header>
  );
}
