"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function DashboardMenu() {
  const pathname = usePathname();

  return (
    <div className="hidden lg:flex p-6 h-full min-h-[calc(100vh-80px)] lg:min-h-[calc(100vh-96px)] w-[250px] flex-col justify-between border-r border-secondary">
      <ul className="mt-4 flex flex-col gap-6">
        <li
          className={cn("text-xl", {
            "font-semibold": pathname === "/perfil/clientes",
          })}
        >
          <Link href="/perfil/clientes">Clientes</Link>
        </li>

        <li
          className={cn("text-xl", {
            "font-semibold": pathname === "/perfil/criar-contas",
          })}
        >
          <Link href="/perfil/criar-contas">Criar Contas</Link>
        </li>

        <li
          className={cn("text-xl", {
            "font-semibold": pathname === "/perfil/editar-conta",
          })}
        >
          <Link href="/perfil/editar-conta">Editar Conta</Link>
        </li>
      </ul>

      <Button
        onClick={() => signOut({ callbackUrl: "/" })}
        variant="secondary"
        className="flex items-center gap-2 text-base"
      >
        <LogOut />
        Sair
      </Button>
    </div>
  );
}
