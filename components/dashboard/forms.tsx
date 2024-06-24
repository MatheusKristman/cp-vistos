import { Button } from "@/components/ui/button";
import { FormView } from "./form-view";
import { Plus } from "lucide-react";
import { Form } from "@prisma/client";

interface Props {
  forms: Form[] | null;
}

export function Forms({ forms }: Props) {
  if (!forms) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full flex flex-col gap-8">
      {forms.map((form, index) => (
        <FormView key={index} form={form} />
      ))}

      <Button asChild>
        <div className="w-full flex justify-center items-center gap-2 !bg-green-500 border-0 h-24 hover:!bg-green-500/70 cursor-pointer">
          <Plus color="#FFF" />

          <span className="text-white text-lg font-medium">Adicionar Novo Formulário</span>
        </div>
      </Button>
    </div>
  );
}
