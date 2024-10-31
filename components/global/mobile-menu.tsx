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
    // <AnimatePresence>
    //   {isMenuOpen && (
    //     <motion.div
    //       key="mobile-menu"
    //       initial="initial"
    //       animate="animate"
    //       exit="exit"
    //       variants={mobileHeaderAnimation}
    //       className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-50 bg-background flex flex-col justify-between gap-12 overflow-y-auto"
    //     >
    //       <div className="w-full flex flex-col gap-6">
    //         <div className="w-full bg-background h-20 lg:h-24 flex items-center">
    //           <div className="w-full h-full flex items-center justify-between gap-12">
    //             <div className="flex items-center gap-24">
    //               <Link href="/" className="relative w-20 h-20 ml-6">
    //                 <Image
    //                   src="/assets/images/cp-vistos-logo-azul.png"
    //                   alt="CP Vistos"
    //                   fill
    //                   className="object-center object-contain"
    //                 />
    //               </Link>
    //             </div>

    //             <div className="h-full flex items-center">
    //               <Button
    //                 onClick={closeMenu}
    //                 variant="link"
    //                 size="icon"
    //                 className="flex lg:hidden aspect-square w-auto h-full"
    //               >
    //                 <X color="#2E3675" />
    //               </Button>
    //             </div>
    //           </div>
    //         </div>

    //         <nav>
    //           <ul className="flex flex-col px-6">
    //             {isFormMenu ? (
    //               <>
    //                 <li className="text-lg text-foreground font-medium hover:opacity-70 py-4 border-b border-secondary flex items-center justify-between">
    //                   <Link href={`/formulario/${profileId}?formStep=0`}>Dados Pessoais</Link>

    //                   {formStep === "0" && <Dot className="size-5" strokeWidth={5} />}
    //                 </li>

    //                 <li className="text-lg text-foreground font-medium hover:opacity-70 py-4 border-b border-secondary flex items-center justify-between">
    //                   <Link href={`/formulario/${profileId}?formStep=1`}>Endereço e Contatos</Link>

    //                   {formStep === "1" && <Dot className="size-5" strokeWidth={5} />}
    //                 </li>

    //                 <li className="text-lg text-foreground font-medium hover:opacity-70 py-4 border-b border-secondary flex items-center justify-between">
    //                   <Link href={`/formulario/${profileId}?formStep=2`}>Passaporte</Link>

    //                   {formStep === "2" && <Dot className="size-5" strokeWidth={5} />}
    //                 </li>

    //                 <li className="text-lg text-foreground font-medium hover:opacity-70 py-4 border-b border-secondary flex items-center justify-between">
    //                   <Link href={`/formulario/${profileId}?formStep=3`}>Sobre a Viagem</Link>

    //                   {formStep === "3" && <Dot className="size-5" strokeWidth={5} />}
    //                 </li>

    //                 <li className="text-lg text-foreground font-medium hover:opacity-70 py-4 border-b border-secondary flex items-center justify-between">
    //                   <Link href={`/formulario/${profileId}?formStep=4`}>Companhia de Viagem</Link>

    //                   {formStep === "4" && <Dot className="size-5" strokeWidth={5} />}
    //                 </li>

    //                 <li className="text-lg text-foreground font-medium hover:opacity-70 py-4 border-b border-secondary flex items-center justify-between">
    //                   <Link href={`/formulario/${profileId}?formStep=5`}>Viagens Anteriores</Link>

    //                   {formStep === "5" && <Dot className="size-5" strokeWidth={5} />}
    //                 </li>

    //                 <li className="text-lg text-foreground font-medium hover:opacity-70 py-4 border-b border-secondary flex items-center justify-between">
    //                   <Link href={`/formulario/${profileId}?formStep=6`}>Contato nos Estados Unidos</Link>

    //                   {formStep === "6" && <Dot className="size-5" strokeWidth={5} />}
    //                 </li>

    //                 <li className="text-lg text-foreground font-medium hover:opacity-70 py-4 border-b border-secondary flex items-center justify-between">
    //                   <Link href={`/formulario/${profileId}?formStep=7`}>Informações da Família</Link>

    //                   {formStep === "7" && <Dot className="size-5" strokeWidth={5} />}
    //                 </li>

    //                 <li className="text-lg text-foreground font-medium hover:opacity-70 py-4 border-b border-secondary flex items-center justify-between">
    //                   <Link href={`/formulario/${profileId}?formStep=8`}>Trabalho e Educação</Link>

    //                   {formStep === "8" && <Dot className="size-5" strokeWidth={5} />}
    //                 </li>

    //                 <li className="text-lg text-foreground font-medium hover:opacity-70 py-4 border-b border-secondary flex items-center justify-between">
    //                   <Link href={`/formulario/${profileId}?formStep=9`}>Informações Adicionais</Link>

    //                   {formStep === "9" && <Dot className="size-5" strokeWidth={5} />}
    //                 </li>

    //                 <li className="text-lg text-foreground font-medium hover:opacity-70 py-4 border-b border-secondary flex items-center justify-between">
    //                   <Link href={`/formulario/${profileId}?formStep=10`}>Segurança</Link>

    //                   {formStep === "10" && <Dot className="size-5" strokeWidth={5} />}
    //                 </li>
    //               </>
    //             ) : (
    //               <>
    //                 <li className="text-lg text-foreground font-medium hover:opacity-70 py-4 border-b border-secondary">
    //                   <Link href="/servicos">Serviços</Link>
    //                 </li>

    //                 <li className="text-lg text-foreground font-medium hover:opacity-70 py-4 border-b border-secondary">
    //                   <Link href="/diferenciais">Diferenciais</Link>
    //                 </li>

    //                 <li className="text-lg text-foreground font-medium hover:opacity-70 py-4 border-b border-secondary">
    //                   <Link href="/depoimentos">Depoimentos</Link>
    //                 </li>
    //               </>
    //             )}
    //           </ul>
    //         </nav>
    //       </div>

    //       <div className="mb-12 px-6 flex flex-col gap-4 items-center w-full">
    //         <Button size="lg" asChild className="w-full">
    //           <Link href="/login">Perfil</Link>
    //         </Button>

    //         <Button onClick={handleLogOut} variant="outline" size="lg" className="w-full">
    //           Sair
    //         </Button>

    //         <Button variant="outline" size="lg" asChild className={cn("w-full", isFormMenu && "hidden")}>
    //           <Link href="/contato">Contato</Link>
    //         </Button>
    //       </div>
    //     </motion.div>
    //   )}
    // </AnimatePresence>
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

        {/* TODO: adicionar link para seções */}
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
            <Button variant="destructive">Entrar</Button>

            <Button variant="outline">Contato</Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
