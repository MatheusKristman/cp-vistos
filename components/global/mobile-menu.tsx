"use client";

import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Dot, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { HambergerMenu } from "iconsax-react";
import { Link as ScrollLink, Events } from "react-scroll";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import { mobileHeaderAnimation } from "@/constants/animations/header";
import { cn } from "@/lib/utils";

interface Props {
  isFormMenu?: boolean;
  profileId?: string;
  formStep?: string | null;
}

export function MobileMenu({ isFormMenu, profileId, formStep }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function handleLogOut() {
    setIsOpen(false);

    setTimeout(() => {
      signOut({ callbackUrl: "/" });
    }, 300);
  }

  useEffect(() => {
    Events.scrollEvent.register("begin", () => {
      setIsOpen(false);
    });

    return () => {
      Events.scrollEvent.remove("begin");
    };
  }, []);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button size="icon" variant="link" className="z-20 text-foreground lg:hidden">
          <HambergerMenu size={36} />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-full sm:w-3/4">
        <Image
          src="/assets/images/cp-vistos-logo-azul.png"
          alt="CP Vistos Logo"
          width={65}
          height={36}
          className="object-center object-contain"
        />

        <nav className="mt-6 h-[calc(100%-24px-36px)] flex flex-col justify-between">
          <ul className="w-full flex flex-col gap-y-4 sm:gap-y-7">
            <li>
              <ScrollLink
                to="home"
                activeClass="active"
                spy={true}
                smooth={true}
                offset={-176}
                duration={1000}
                className="w-full border-b border-border/25 py-2 flex items-center gap-2 group"
              >
                <div className="w-0 h-[2px] bg-destructive transition-all group-hover:w-6" />

                <span className="text-lg sm:text-xl font-medium text-foreground transition-colors group-hover:text-destructive">
                  Início
                </span>
              </ScrollLink>
            </li>

            <li>
              <ScrollLink
                to="about"
                activeClass="active"
                spy={true}
                smooth={true}
                offset={-176}
                duration={1000}
                className="w-full border-b border-border/25 py-2 flex items-center gap-2 group"
              >
                <div className="w-0 h-[2px] bg-destructive transition-all group-hover:w-6" />

                <span className="text-lg sm:text-xl font-medium text-foreground transition-colors group-hover:text-destructive">
                  Sobre
                </span>
              </ScrollLink>
            </li>

            <li>
              <ScrollLink
                to="how-it-works"
                activeClass="active"
                spy={true}
                smooth={true}
                offset={-176}
                duration={1000}
                className="w-full border-b border-border/25 py-2 flex items-center gap-2 group"
              >
                <div className="w-0 h-[2px] bg-destructive transition-all group-hover:w-6" />

                <span className="text-lg sm:text-xl font-medium text-foreground transition-colors group-hover:text-destructive">
                  Como Funciona
                </span>
              </ScrollLink>
            </li>

            <li>
              <ScrollLink
                to="services"
                activeClass="active"
                spy={true}
                smooth={true}
                offset={-176}
                duration={1000}
                className="w-full border-b border-border/25 py-2 flex items-center gap-2 group"
              >
                <div className="w-0 h-[2px] bg-destructive transition-all group-hover:w-6" />

                <span className="text-lg sm:text-xl font-medium text-foreground transition-colors group-hover:text-destructive">
                  Serviços
                </span>
              </ScrollLink>
            </li>

            <li>
              <ScrollLink
                to="testimonials"
                activeClass="active"
                spy={true}
                smooth={true}
                offset={-176}
                duration={1000}
                className="w-full border-b border-border/25 py-2 flex items-center gap-2 group"
              >
                <div className="w-0 h-[2px] bg-destructive transition-all group-hover:w-6" />

                <span className="text-lg sm:text-xl font-medium text-foreground transition-colors group-hover:text-destructive">
                  Depoimentos
                </span>
              </ScrollLink>
            </li>

            <li>
              <ScrollLink
                to="features"
                activeClass="active"
                spy={true}
                smooth={true}
                offset={-176}
                duration={1000}
                className="w-full border-b border-border/25 py-2 flex items-center gap-2 group"
              >
                <div className="w-0 h-[2px] bg-destructive transition-all group-hover:w-6" />

                <span className="text-lg sm:text-xl font-medium text-foreground transition-colors group-hover:text-destructive">
                  Diferenciais
                </span>
              </ScrollLink>
            </li>
          </ul>

          <div className="w-full flex flex-col gap-4">
            <Button variant="destructive" asChild>
              <Link href="/login">Entrar</Link>
            </Button>

            <Button variant="outline">Contato</Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
