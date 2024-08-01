"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, PanelRightOpen } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function DashboardMobileMenu() {
    const pathname = usePathname();

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
                        </ul>

                        <Button variant="secondary" className="flex items-center gap-2 text-base">
                            <LogOut />
                            Sair
                        </Button>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}
