import { ArrowUpRight } from "lucide-react";

import { FullForm } from "@/types";
import { format } from "date-fns";

interface Props {
  form: FullForm;
}

export function FormBox({ form }: Props) {
  console.log(form);

  return (
    <div role="button" className="w-full bg-secondary p-4 flex flex-col justify-between gap-4 lg:cursor-pointer group">
      <div className="w-full flex justify-between">
        <span className="font-medium text-lg">
          {form.firstName && form.firstName.length > 0 && form.lastName && form.lastName.length > 0
            ? form.firstName + " " + form.lastName
            : "Formulário Incompleto"}
        </span>

        <ArrowUpRight className="flex-shrink-0 flex lg:group-hover:rotate-45 lg:transition-all" />
      </div>

      <span className="text-sm">Ultima atualização: {format(form.updatedAt, "dd/MM/yyyy")}</span>
    </div>
  );
}
