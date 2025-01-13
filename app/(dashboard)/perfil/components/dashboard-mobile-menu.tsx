"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Grid4 } from "iconsax-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { cn } from "@/lib/utils";
import { trpc } from "@/lib/trpc-client";
import useUserStore from "@/constants/stores/useUserStore";

export function DashboardMobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

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
      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetTrigger className="hover:bg-secondary/50 rounded-xl h-12 w-12 flex items-center justify-center transition-colors">
          <Grid4 size={30} />
        </SheetTrigger>
        <SheetContent side="left" className="w-[250px]">
          <div className="h-full flex flex-col justify-between">
            <ul className="mt-10 flex flex-col gap-6">
              <li
                className={cn("text-xl", {
                  "font-semibold": pathname === "/perfil/clientes",
                })}
                onClick={() => setIsMenuOpen(false)}
              >
                <Link href="/perfil/clientes">Clientes</Link>
              </li>

              <li
                className={cn("text-xl", {
                  "font-semibold": pathname === "/perfil/prospects",
                })}
                onClick={() => setIsMenuOpen(false)}
              >
                <Link href="/perfil/prospects">Prospects</Link>
              </li>

              <li
                className={cn("text-xl", {
                  "font-semibold": pathname === "/perfil/arquivados",
                })}
                onClick={() => setIsMenuOpen(false)}
              >
                <Link href="/perfil/arquivados">Arquivados</Link>
              </li>

              <li
                className={cn("text-xl", {
                  "font-semibold": pathname === "/perfil/criar-conta",
                })}
                onClick={() => setIsMenuOpen(false)}
              >
                <Link href="/perfil/criar-conta">Criar Conta</Link>
              </li>

              {role === "ADMIN" && (
                <>
                  <div className="w-full h-px bg-muted" />

                  <li
                    className={cn("text-xl", {
                      "font-semibold": pathname.includes(
                        "/perfil/gerenciar-colaboradores",
                      ),
                    })}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Link href="/perfil/gerenciar-colaboradores">
                      Colaboradores
                    </Link>
                  </li>

                  <li
                    className={cn("text-xl", {
                      "font-semibold": pathname === "/perfil/gerenciar-banners",
                    })}
                  >
                    <Link href="/perfil/gerenciar-banners">
                      Gerenciar Banners
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
