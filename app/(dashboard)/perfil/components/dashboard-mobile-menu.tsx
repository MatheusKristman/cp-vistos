"use client";

import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { LogOut, PanelRightOpen } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { trpc } from "@/lib/trpc-client";
import useUserStore from "@/constants/stores/useUserStore";

export function DashboardMobileMenu() {
  const { role, setRole } = useUserStore();
  const pathname = usePathname();
  const { data } = trpc.userRouter.getRole.useQuery();

  useEffect(() => {
    if (data) {
      setRole(data.role);
    }
  }, [data, setRole]);

  return (
    <div className="w-full px-6 sm:px-16 mt-12 lg:hidden">
      <Sheet>
        <SheetTrigger>
          <PanelRightOpen size={30} />
        </SheetTrigger>
        <SheetContent side="left" className="w-[250px]">
          <div className="h-full flex flex-col justify-between">
            <ul className="mt-10 flex flex-col gap-6">
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
                      "font-semibold":
                        pathname === "/perfil/gerenciar-colaboradores",
                    })}
                  >
                    <Link href="/perfil/gerenciar-colaboradores">
                      Colaboradores
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
