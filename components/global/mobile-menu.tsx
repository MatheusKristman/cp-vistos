"use client";

import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import useHeader from "@/constants/stores/useHeader";
import { Button } from "../ui/button";
import { mobileHeaderAnimation } from "@/constants/animations/header";
import { signOut } from "next-auth/react";

export function MobileMenu() {
  const { isMenuOpen, closeMenu } = useHeader();

  function handleLogOut() {
    closeMenu();

    setTimeout(() => {
      signOut({ callbackUrl: "/" });
    }, 300);
  }

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          key="mobile-menu"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={mobileHeaderAnimation}
          className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-50 bg-background flex flex-col justify-between gap-12"
        >
          <div className="w-full flex flex-col gap-6">
            <div className="w-full bg-background h-20 lg:h-24 flex items-center">
              <div className="w-full h-full flex items-center justify-between gap-12">
                <div className="flex items-center gap-24">
                  <Link href="/" className="relative w-20 h-20 ml-6">
                    <Image
                      src="/assets/images/cp-vistos-logo-azul.png"
                      alt="CP Vistos"
                      fill
                      className="object-center object-contain"
                    />
                  </Link>
                </div>

                <div className="h-full flex items-center">
                  <Button
                    onClick={closeMenu}
                    variant="link"
                    size="icon"
                    className="flex lg:hidden aspect-square w-auto h-full"
                  >
                    <X color="#2E3675" />
                  </Button>
                </div>
              </div>
            </div>

            <nav>
              <ul className="flex flex-col px-6">
                <li className="text-lg text-foreground font-medium hover:opacity-70 py-4 border-b border-secondary">
                  <Link href="/servicos">Serviços</Link>
                </li>

                <li className="text-lg text-foreground font-medium hover:opacity-70 py-4 border-b border-secondary">
                  <Link href="/diferenciais">Diferenciais</Link>
                </li>

                <li className="text-lg text-foreground font-medium hover:opacity-70 py-4 border-b border-secondary">
                  <Link href="/depoimentos">Depoimentos</Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="mb-12 px-6 flex flex-col gap-4 items-center w-full">
            <Button size="lg" asChild className="w-full">
              <Link href="/login">Perfil</Link>
            </Button>

            <Button onClick={handleLogOut} variant="outline" size="lg" className="w-full">
              Sair
            </Button>

            <Button variant="outline" size="lg" asChild className="w-full">
              <Link href="/contato">Contato</Link>
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
