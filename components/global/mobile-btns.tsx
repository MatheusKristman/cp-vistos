"use client";

import Link from "next/link";
import { Menu, Users } from "lucide-react";

import { Button } from "../ui/button";
import useHeader from "@/constants/stores/useHeader";

export function MobileBtns() {
  const { openMenu } = useHeader();

  return (
    <div className="h-full flex items-center">
      <Button
        variant="link"
        size="icon"
        asChild
        className="flex lg:hidden aspect-square w-auto h-full border-l border-secondary"
      >
        <Link href="/login">
          <Users color="#2E3675" />
        </Link>
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
