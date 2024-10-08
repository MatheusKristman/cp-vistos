"use client";

import Image from "next/image";
import Link from "next/link";
import { Dot, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import useHeader from "@/constants/stores/useHeader";
import { Button } from "../ui/button";
import { mobileHeaderAnimation } from "@/constants/animations/header";
import { signOut } from "next-auth/react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

interface Props {
  isFormMenu?: boolean;
  profileId?: string;
  formStep?: string | null;
}

export function MobileMenu({ isFormMenu, profileId, formStep }: Props) {
  const { isMenuOpen, closeMenu } = useHeader();

  function handleLogOut() {
    closeMenu();

    setTimeout(() => {
      signOut({ callbackUrl: "/" });
    }, 300);
  }

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "unset";
    }

    return () => {
      document.body.style.overflowY = "unset";
    };
  }, [isMenuOpen]);

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          key="mobile-menu"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={mobileHeaderAnimation}
          className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-50 bg-background flex flex-col justify-between gap-12 overflow-y-auto"
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
                {isFormMenu ? (
                  <>
                    <li className="text-lg text-foreground font-medium hover:opacity-70 py-4 border-b border-secondary flex items-center justify-between">
                      <Link href={`/formulario/${profileId}?formStep=0`}>Dados Pessoais</Link>

                      {formStep === "0" && <Dot className="size-5" strokeWidth={5} />}
                    </li>

                    <li className="text-lg text-foreground font-medium hover:opacity-70 py-4 border-b border-secondary flex items-center justify-between">
                      <Link href={`/formulario/${profileId}?formStep=1`}>Endereço e Contatos</Link>

                      {formStep === "1" && <Dot className="size-5" strokeWidth={5} />}
                    </li>

                    <li className="text-lg text-foreground font-medium hover:opacity-70 py-4 border-b border-secondary flex items-center justify-between">
                      <Link href={`/formulario/${profileId}?formStep=2`}>Passaporte</Link>

                      {formStep === "2" && <Dot className="size-5" strokeWidth={5} />}
                    </li>

                    <li className="text-lg text-foreground font-medium hover:opacity-70 py-4 border-b border-secondary flex items-center justify-between">
                      <Link href={`/formulario/${profileId}?formStep=3`}>Sobre a Viagem</Link>

                      {formStep === "3" && <Dot className="size-5" strokeWidth={5} />}
                    </li>

                    <li className="text-lg text-foreground font-medium hover:opacity-70 py-4 border-b border-secondary flex items-center justify-between">
                      <Link href={`/formulario/${profileId}?formStep=4`}>Companhia de Viagem</Link>

                      {formStep === "4" && <Dot className="size-5" strokeWidth={5} />}
                    </li>

                    <li className="text-lg text-foreground font-medium hover:opacity-70 py-4 border-b border-secondary flex items-center justify-between">
                      <Link href={`/formulario/${profileId}?formStep=5`}>Viagens Anteriores</Link>

                      {formStep === "5" && <Dot className="size-5" strokeWidth={5} />}
                    </li>

                    <li className="text-lg text-foreground font-medium hover:opacity-70 py-4 border-b border-secondary flex items-center justify-between">
                      <Link href={`/formulario/${profileId}?formStep=6`}>Contato nos Estados Unidos</Link>

                      {formStep === "6" && <Dot className="size-5" strokeWidth={5} />}
                    </li>

                    <li className="text-lg text-foreground font-medium hover:opacity-70 py-4 border-b border-secondary flex items-center justify-between">
                      <Link href={`/formulario/${profileId}?formStep=7`}>Informações da Família</Link>

                      {formStep === "7" && <Dot className="size-5" strokeWidth={5} />}
                    </li>

                    <li className="text-lg text-foreground font-medium hover:opacity-70 py-4 border-b border-secondary flex items-center justify-between">
                      <Link href={`/formulario/${profileId}?formStep=8`}>Trabalho e Educação</Link>

                      {formStep === "8" && <Dot className="size-5" strokeWidth={5} />}
                    </li>

                    <li className="text-lg text-foreground font-medium hover:opacity-70 py-4 border-b border-secondary flex items-center justify-between">
                      <Link href={`/formulario/${profileId}?formStep=9`}>Informações Adicionais</Link>

                      {formStep === "9" && <Dot className="size-5" strokeWidth={5} />}
                    </li>

                    <li className="text-lg text-foreground font-medium hover:opacity-70 py-4 border-b border-secondary flex items-center justify-between">
                      <Link href={`/formulario/${profileId}?formStep=10`}>Segurança</Link>

                      {formStep === "10" && <Dot className="size-5" strokeWidth={5} />}
                    </li>
                  </>
                ) : (
                  <>
                    <li className="text-lg text-foreground font-medium hover:opacity-70 py-4 border-b border-secondary">
                      <Link href="/servicos">Serviços</Link>
                    </li>

                    <li className="text-lg text-foreground font-medium hover:opacity-70 py-4 border-b border-secondary">
                      <Link href="/diferenciais">Diferenciais</Link>
                    </li>

                    <li className="text-lg text-foreground font-medium hover:opacity-70 py-4 border-b border-secondary">
                      <Link href="/depoimentos">Depoimentos</Link>
                    </li>
                  </>
                )}
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

            <Button variant="outline" size="lg" asChild className={cn("w-full", isFormMenu && "hidden")}>
              <Link href="/contato">Contato</Link>
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
