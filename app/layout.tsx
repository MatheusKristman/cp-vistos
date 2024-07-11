import type { Metadata } from "next";
import { Montserrat as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";
import { NextAuthSessionProvider } from "@/providers/sessionProvider";

const montserrat = FontSans({
  subsets: ["latin"],
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
          montserrat.variable,
        )}
      >
        <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
