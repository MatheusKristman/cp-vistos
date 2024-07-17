import { Header } from "@/components/global/header";
import { MobileMenu } from "@/components/global/mobile-menu";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function NotFoundPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <>
      <Header />
      <MobileMenu />

      <div className="w-full h-[calc(100vh-80px)] flex flex-col gap-6 items-center justify-center md:gap-10">
        <div className="flex flex-col gap-4 justify-center items-center md:gap-9">
          <Image
            src="/assets/images/not-found.svg"
            alt="Página não encontrada"
            width={200}
            height={200}
          />
          <span className="text-xl font-medium text-center md:text-2xl">
            Página não encontrada
          </span>
        </div>

        <Button size="xl" asChild>
          <Link href="/">Voltar para início</Link>
        </Button>
      </div>
    </>
  );
}
