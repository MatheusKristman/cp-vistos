import { Button } from "@/components/ui/button";
import { FormView } from "./form-view";
import { Plus } from "lucide-react";

export function Forms() {
  return (
    <div className="w-full flex flex-col gap-8">
      <FormView />

      <Button asChild>
        <div className="w-full flex justify-center items-center gap-2 !bg-green-500 border-0 h-24 hover:!bg-green-500/70 cursor-pointer">
          <Plus color="#FFF" />

          <span className="text-white text-lg font-medium">Adicionar Novo Formulário</span>
        </div>
      </Button>
    </div>
  );
}
