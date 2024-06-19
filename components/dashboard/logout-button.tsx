"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";

export function LogoutButton() {
  return (
    <Button
      onClick={() => signOut({ callbackUrl: "/" })}
      variant="secondary"
      className="flex items-center gap-2 text-base"
    >
      <LogOut />
      Sair
    </Button>
  );
}
