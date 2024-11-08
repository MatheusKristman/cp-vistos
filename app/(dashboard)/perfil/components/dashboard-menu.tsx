"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import useUserStore from "@/constants/stores/useUserStore";
import { trpc } from "@/lib/trpc-client";

export function DashboardMenu() {
  const { role, setRole } = useUserStore();
  const pathname = usePathname();
  const { data } = trpc.userRouter.getRole.useQuery();

  useEffect(() => {
    if (data) {
      setRole(data.role);
    }
  }, [data, setRole]);

  return (
    <div className="hidden lg:flex p-6 h-full lg:min-h-full w-[250px] flex-col justify-between border-r border-secondary lg:fixed lg:top-0 lg:left-0">
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
            "font-semibold": pathname === "/perfil/criar-conta",
          })}
        >
          <Link href="/perfil/criar-conta">Criar Conta</Link>
        </li>

        {role === "ADMIN" && (
          <>
            <div className="w-full h-px bg-muted" />

            <li
              className={cn("text-xl", {
                "font-semibold": pathname === "/perfil/gerenciar-colaboradores",
              })}
            >
              <Link href="/perfil/gerenciar-colaboradores">Colaboradores</Link>
            </li>

            <li
              className={cn("text-xl", {
                "font-semibold": pathname === "/perfil/gerenciar-banners",
              })}
            >
              <Link href="/perfil/gerenciar-banners">Gerenciar Banners</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
