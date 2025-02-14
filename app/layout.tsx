import type { Metadata } from "next";
import { Poppins as FontSans } from "next/font/google";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { HeroUIProvider } from "@heroui/react";

import { Toaster } from "@/components/ui/sonner";
import { NextAuthSessionProvider } from "@/providers/sessionProvider";
import TRPCProvider from "@/providers/TRPCProvider";

import { ourFileRouter } from "@/app/api/uploadthing/core";
import { cn } from "@/lib/utils";

import "./globals.css";

const poppins = FontSans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "CP Vistos",
  description:
    "CP Vistos - Facilitamos o processo de obtenção do visto americano para você. Oferecemos assistência completa, desde a preparação da documentação até a entrevista no consulado.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="min-h-screen" lang="pt-BR">
      <body
        className={cn(
          "relative min-h-screen overflow-x-hidden bg-background font-sans antialiased",
          poppins.variable,
        )}
      >
        <NextAuthSessionProvider>
          <TRPCProvider>
            <NextSSRPlugin
              /**
               * The `extractRouterConfig` will extract **only** the route configs
               * from the router to prevent additional information from being
               * leaked to the client. The data passed to the client is the same
               * as if you were to fetch `/api/uploadthing` directly.
               */
              routerConfig={extractRouterConfig(ourFileRouter)}
            />
            <HeroUIProvider>{children}</HeroUIProvider>
          </TRPCProvider>
        </NextAuthSessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
