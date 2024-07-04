"use client";

import Link from "next/link";
import { LogIn, Menu, Users } from "lucide-react";

import { Button } from "../ui/button";
import useHeader from "@/constants/stores/useHeader";
import { useSession } from "next-auth/react";

export function MobileBtns() {
  const session = useSession();
  const { openMenu } = useHeader();

  return (
    <div className="h-full flex items-center">
      <Button
        variant="link"
        size="icon"
        asChild
        className="flex lg:hidden aspect-square w-auto h-full border-l border-secondary"
      >
        {session.status === "authenticated" ? (
          <Link href="/verificando-usuario">
            <Users color="#2E3675" />
          </Link>
        ) : (
          <Link href="/login">
            <LogIn color="#2E3675" />
          </Link>
        )}
      </Button>

      <Button
        onClick={openMenu}
        variant="link"
        size="icon"
        className="flex lg:hidden aspect-square w-auto h-full border-l border-secondary"
      >
        <Menu color="#2E3675" />
      </Button>
    </div>
  );
}
