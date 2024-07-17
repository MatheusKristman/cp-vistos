"use client";

import { Loader2, Plus } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
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

export function AddFormButton() {
  const [isSameAddress, setSameAddress] = useState<string>("nao");
  const [isSameTravelDate, setSameTravelDate] = useState<string>("nao");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
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
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button disabled={isLoading} size="lg" variant="default" className="flex items-center gap-2 w-full sm:w-fit">
          {isLoading ? <Loader2 className="animate-spin" /> : <Plus />}
          Novo Formulário
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl">Antes de começar...</AlertDialogTitle>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <span>A pessoa que será adicionada mora no mesmo endereço que o seu?</span>

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
              <span>A pessoa que será adicionada fará a viagem na mesma data que a sua?</span>

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

          <AlertDialogAction disabled={isLoading} onClick={handleNext} className="flex items-center gap-2">
            Prosseguir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
