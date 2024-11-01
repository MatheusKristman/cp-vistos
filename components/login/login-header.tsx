import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface LoginHeaderProps {
  className?: string;
}

export function LoginHeader({ className }: LoginHeaderProps) {
  return (
    <header
      className={cn(
        "absolute top-6 left-0 right-0 px-6 flex items-center justify-between sm:px-16 lg:px-12 lg:top-9",
        className,
      )}
    >
      <div className="relative w-14 h-7 sm:w-20 sm:h-11">
        <Image
          src="/assets/images/cp-vistos-logo-azul.png"
          alt="CP Vistos"
          fill
          className="object-contain object-center lg:hidden"
        />

        <Image
          src="/assets/images/cp-vistos-logo.png"
          alt="CP Vistos"
          fill
          className="object-contain object-center hidden lg:block"
        />
      </div>

      <Button
        className="bg-secondary/25 border-secondary/25 text-foreground lg:bg-white/25 lg:border-white/25 lg:text-white lg:hover:text-white lg:backdrop-blur-sm"
        asChild
      >
        <Link href="/" className="flex items-center gap-2">
          Voltar
          <ArrowRight />
        </Link>
      </Button>
    </header>
  );
}
