"use client";

import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useWindowScroll } from "react-use";

import { Button } from "@/components/ui/button";
import { MobileMenu } from "./mobile-menu";
import { cn } from "@/lib/utils";

export function Header() {
  const session = useSession();
  const { y } = useWindowScroll();

  return (
    <header className="w-full bg-transparent h-14 px-6 flex items-center justify-between sticky top-0 left-0 z-10 sm:px-16 sm:top-4 lg:container">
      <div
        className={cn(
          "w-full h-14 absolute top-0 left-0 transform -translate-y-full bg-primary rounded-b-xl transition-transform duration-500 sm:rounded-b-3xl sm:h-[calc(56px+32px)] sm:-translate-y-[calc(100%+16px)]",
          {
            "translate-y-0 sm:-translate-y-4": y > 0,
          }
        )}
      />

      <Link href="/" className="relative w-12 h-7 z-20 sm:w-16 sm:h-9">
        {y > 0 ? (
          <Image
            src="/assets/images/cp-vistos-logo.png"
            alt="CP Vistos Logo"
            fill
            className="object-center object-contain"
          />
        ) : (
          <Image
            src="/assets/images/cp-vistos-logo-azul.png"
            alt="CP Vistos Logo"
            fill
            className="object-center object-contain"
          />
        )}
      </Link>

      <MobileMenu windowPosition={y} />

      {/* TODO: adicionar link para seções */}
      <nav className="z-20 hidden lg:flex lg:items-center lg:gap-12">
        <ul className="flex items-center gap-1">
          <li className="text-base font-medium text-foreground transition-colors hover:bg-secondary rounded-2xl px-5 py-3">
            Início
          </li>

          <li className="text-base font-medium text-foreground transition-colors hover:bg-secondary rounded-2xl px-5 py-3">
            Sobre
          </li>

          <li className="text-base font-medium text-foreground transition-colors hover:bg-secondary rounded-2xl px-5 py-3">
            Como Funciona
          </li>

          <li className="text-base font-medium text-foreground transition-colors hover:bg-secondary rounded-2xl px-5 py-3">
            Serviços
          </li>

          <li className="text-base font-medium text-foreground transition-colors hover:bg-secondary rounded-2xl px-5 py-3">
            Depoimentos
          </li>

          <li className="text-base font-medium text-foreground transition-colors hover:bg-secondary rounded-2xl px-5 py-3">
            Diferenciais
          </li>

          <li className="text-base font-medium text-foreground transition-colors hover:bg-secondary rounded-2xl px-5 py-3">
            Contato
          </li>
        </ul>

        <Button variant="destructive">Entrar</Button>
      </nav>
      {/* <div className="w-full h-full flex items-center justify-between gap-12 border-t border-b border-secondary">
        <div className="flex items-center gap-24">
          <Link href="/" className="relative w-20 h-20 ml-6">
            <Image
              src="/assets/images/cp-vistos-logo-azul.png"
              alt="CP Vistos"
              fill
              className="object-center object-contain"
            />
          </Link>

          <nav className="hidden lg:block">
            <ul className="flex items-center gap-12">
              <li className="text-lg font-medium text-foreground hover:opacity-70">
                <Link href="/servicos">Serviços</Link>
              </li>

              <li className="text-lg font-medium text-foreground hover:opacity-70">
                <Link href="/diferenciais">Diferenciais</Link>
              </li>

              <li className="text-lg font-medium text-foreground hover:opacity-70">
                <Link href="/depoimentos">Depoimentos</Link>
              </li>
            </ul>
          </nav>
        </div>

        <MobileBtns />

        <div className="hidden lg:flex items-center h-full">
          <Button
            variant="link"
            size="icon"
            asChild
            className="hidden lg:flex px-6 w-auto h-full border-l border-secondary text-lg font-medium hover:no-underline transition-opacity hover:opacity-70"
          >
            <Link href="/contato">Contato</Link>
          </Button>

          <Button
            variant="link"
            size="icon"
            asChild
            className="hidden lg:flex px-6 w-auto h-full border-l border-secondary text-lg font-medium hover:no-underline transition-opacity hover:opacity-70"
          >
            {session.status === "authenticated" ? (
              <Link href="/verificando-usuario">Perfil</Link>
            ) : (
              <Link href="/login">Entrar</Link>
            )}
          </Button>

          {session.status === "authenticated" ? (
            <Button
              onClick={() => signOut({ callbackUrl: "/" })}
              variant="secondary"
              className="hidden lg:flex px-6 w-auto h-full border-l border-secondary text-lg font-medium hover:no-underline transition-opacity hover:opacity-70"
            >
              Sair
            </Button>
          ) : null}
        </div>
      </div> */}
    </header>
  );
}
