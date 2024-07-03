"use client";

import { Loader2, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

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

  if (!forms) {
    return <div>Loading...</div>;
  }

  function handleNext() {
    setIsLoading(true);

    axios
      .post("/api/additional-form/create", {
        isSameAddress: isSameAddress === "sim",
        isSameTravelDate: isSameTravelDate === "sim",
      })
      .then((res) => {
        router.push(`/formulario-adicional/${res.data.formId}`);
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className="w-full flex flex-col gap-8">
      {forms.map((form, index) => (
        <FormView key={index} form={form} />
      ))}

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button disabled={isLoading} asChild>
            <div className="w-full flex justify-center items-center gap-2 !bg-green-500 border-0 h-24 hover:!bg-green-500/70 cursor-pointer">
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Plus color="#FFF" />
              )}

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
            <AlertDialogCancel disabled={isLoading}>Cancelar</AlertDialogCancel>

            <AlertDialogAction
              disabled={isLoading}
              onClick={handleNext}
              className="flex items-center gap-2"
            >
              Prosseguir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
