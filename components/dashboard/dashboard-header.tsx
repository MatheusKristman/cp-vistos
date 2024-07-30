"use client";

import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import { LogIn, LogOut, Users } from "lucide-react";

export function DashboardHeader() {
  const session = useSession();

  return (
    <header className="w-full bg-background h-20 lg:h-24 flex items-center fixed top-0 left-0 right-0 z-10">
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
        </div>

        <div className="lg:hidden h-full flex items-center">
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
            onClick={() => signOut({ callbackUrl: "/" })}
            variant="secondary"
            className="flex aspect-square w-auto h-full border-l border-secondary"
          >
            <LogOut />
          </Button>
        </div>

        <div className="hidden lg:flex items-center h-full">
          <Button
            variant="link"
            size="icon"
            asChild
            className="hidden lg:flex px-6 w-auto h-full border-l border-secondary text-lg font-medium hover:no-underline transition-opacity hover:opacity-70"
          >
            {session ? <Link href="/verificando-usuario">Perfil</Link> : <Link href="/login">Entrar</Link>}
          </Button>

          <Button
            onClick={() => signOut({ callbackUrl: "/" })}
            variant="secondary"
            className="hidden lg:flex px-6 w-auto h-full border-l border-secondary text-lg font-medium hover:no-underline transition-opacity hover:opacity-70"
          >
            Sair
          </Button>
        </div>
      </div>
    </header>
  );
}
