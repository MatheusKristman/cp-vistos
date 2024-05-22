//TODO: criar função para pegar os formulários anexados a conta e informar quantos formulários tem

import { ArrowUpRight } from "lucide-react";
import { format } from "date-fns";

interface Props {
  name: string;
  createdAt: Date;
}

export function ClientItem({ name, createdAt }: Props) {
  return (
    <div className="w-full flex flex-col gap-4 bg-secondary px-6 py-4 border border-secondary transition-colors lg:cursor-pointer lg:hover:border-primary">
      <div className="flex items-center justify-between gap-2">
        <span className="text-lg sm:text-xl text-primary font-medium">
          {name}
        </span>

        <ArrowUpRight color="#2E3675" className="min-w-[24px] min-h-[24px]" />
      </div>

      <span className="text-base text-primary">
        Criado em {format(createdAt, "dd/MM/yyyy")}
      </span>
    </div>
  );
}
