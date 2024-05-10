import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, Users } from "lucide-react";

export function Header() {
  return (
    <header className="w-full bg-background h-20 flex items-center">
      <div className="w-full h-full flex items-center justify-between gap-12 border-t border-b border-secondary">
        <Link href="/" className="relative w-16 h-16 ml-6">
          <Image
            src="/assets/images/logo.jpeg"
            alt="CP Vistos"
            fill
            className="object-center object-contain"
          />
        </Link>

        <div className="h-full flex items-center">
          <Button
            variant="link"
            size="icon"
            asChild
            className="flex aspect-square w-auto h-full border-l border-secondary"
          >
            <Link href="/login">
              <Users color="#2E3675" />
            </Link>
          </Button>

          <Button
            variant="link"
            size="icon"
            className="flex aspect-square w-auto h-full border-l border-secondary"
          >
            <Menu color="#2E3675" />
          </Button>
        </div>
      </div>
    </header>
  );
}
