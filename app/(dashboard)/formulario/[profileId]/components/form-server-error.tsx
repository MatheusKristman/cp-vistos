import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";

export const FormServerError = () => {
  return (
    <div className="w-full my-24 flex flex-col gap-6 items-center justify-center">
      <div className="w-full flex flex-col items-center gap-4">
        <Image src="/assets/images/not-found.svg" alt="Página não encontrada" width={200} height={200} />

        <span className="text-xl font-medium text-center max-w-xs">
          Ocorreu um erro no servidor! Tente novamente mais tarde.
        </span>
      </div>

      <Button size="xl" asChild>
        <Link href="/">Ir para Home</Link>
      </Button>
    </div>
  );
};
