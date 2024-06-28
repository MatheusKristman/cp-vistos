"use client";

import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { FullForm } from "@/types";
import { FormView } from "./form-view";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter } from "next/navigation";

interface Props {
  forms: FullForm[] | null;
}

export function Forms({ forms }: Props) {
  const [isSameAddress, setSameAddress] = useState<string>("nao");
  const [isSameTravelDate, setSameTravelDate] = useState<string>("nao");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    console.log("isSameAddress", isSameAddress);
    console.log("isSameTravelDate", isSameTravelDate);
  }, [isSameAddress, isSameTravelDate]);

  if (!forms) {
    return <div>Loading...</div>;
  }

  function handleNext() {
    //TODO: adicionar rota da api para criar o formulário e depois redirecionar para o formulário adicionar com o id de parametro, ao ser redirecionado, usar o id para pegar as informações do formulário para preencher o que precisar ser preenchido
    router.push(
      `/formulario-adicional?isSameAddress=${isSameAddress === "sim"}&isSameTravelDate=${isSameTravelDate === "sim"}`,
    );
  }

  return (
    <div className="w-full flex flex-col gap-8">
      {forms.map((form, index) => (
        <FormView key={index} form={form} />
      ))}

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button asChild>
            <div className="w-full flex justify-center items-center gap-2 !bg-green-500 border-0 h-24 hover:!bg-green-500/70 cursor-pointer">
              <Plus color="#FFF" />

              <span className="text-white text-lg font-medium">
                Adicionar Novo Formulário
              </span>
            </div>
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl">
              Antes de começar...
            </AlertDialogTitle>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <span>
                  A pessoa que será adicionada mora no mesmo endereço que o seu?
                </span>

                <div className="flex items-center gap-4">
                  <RadioGroup
                    defaultValue={isSameAddress}
                    onValueChange={setSameAddress}
                    className="flex items-center gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="nao" id="address-no" />
                      <Label htmlFor="address-no">Não</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sim" id="address-yes" />
                      <Label htmlFor="address-yes">Sim</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span>
                  A pessoa que será adicionada fará a viagem na mesma data que a
                  sua?
                </span>

                <div className="flex items-center gap-4">
                  <RadioGroup
                    defaultValue={isSameTravelDate}
                    onValueChange={setSameTravelDate}
                    className="flex items-center gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="nao" id="travel-no" />
                      <Label htmlFor="travel-no">Não</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sim" id="travel-yes" />
                      <Label htmlFor="travel-yes">Sim</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleNext}>
              Prosseguir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
