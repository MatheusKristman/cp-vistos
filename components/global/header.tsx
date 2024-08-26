"use client";

import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { MobileBtns } from "./mobile-btns";

export function Header() {
  const session = useSession();

  return (
    <header className="w-full bg-background h-20 lg:h-24 flex items-center">
      <div className="w-full h-full flex items-center justify-between gap-12 border-t border-b border-secondary">
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
      </div>
    </header>
  );
}
