//TODO: criar função para submit
//TODO: mandar para o proximo formulário

"use client";

import { ChangeEvent, useState } from "react";
import { Control } from "react-hook-form";
import { Loader2, Plus, Trash } from "lucide-react";
import { Element } from "react-scroll";
import { OtherPeopleTraveling } from "@prisma/client";
import { toast } from "sonner";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useFormStore from "@/constants/stores/useFormStore";
import { PrimaryFormControl } from "@/types";

interface Props {
  formControl: Control<PrimaryFormControl>;
  otherPeopleTravelingConfirmation: "Sim" | "Não";
  groupMemberConfirmation: "Sim" | "Não";
}

export function TravelCompanyForm({ formControl, otherPeopleTravelingConfirmation, groupMemberConfirmation }: Props) {
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const {
    otherPeopleTraveling,
    otherPeopleTravelingError,
    otherPeopleTravelingIndex,
    setOtherPeopleTraveling,
    setOtherPeopleTravelingIndex,
  } = useFormStore();

  function handleOtherPeopleTravelingChange(
    event: ChangeEvent<HTMLInputElement>,
    property: "name" | "relation",
    index: number
  ) {
    if (!otherPeopleTraveling) return;

    const values = [...otherPeopleTraveling];

    values[index][property] = event.target.value;

    setOtherPeopleTraveling(values);
  }

  function handleAddOtherPeopleTravelingInput() {
    if (!otherPeopleTraveling) return;

    setIsFetching(true);

    axios
      .post("/api/form/other-people-traveling/create", { otherPeopleTraveling })
      .then((res) => {
        setOtherPeopleTravelingIndex(otherPeopleTravelingIndex + 1);
        setOtherPeopleTraveling(res.data.updatedOtherPeopleTraveling);
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response.data);
      })
      .finally(() => {
        setIsFetching(false);
      });
  }

  function handleRemoveOtherPeopleTravelingInput(id: string) {
    if (!otherPeopleTraveling) return;

    setIsFetching(true);

    axios
      .put("/api/form/other-people-traveling/delete", { otherPeopleTravelingId: id, otherPeopleTraveling })
      .then((res) => {
        setOtherPeopleTravelingIndex(otherPeopleTravelingIndex - 1);
        setOtherPeopleTraveling(res.data.updatedOtherPeopleTraveling);
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response.data);
      })
      .finally(() => {
        setIsFetching(false);
      });
  }

  return (
    <Element name="travel-company" className="w-full flex flex-col gap-6">
      <h2 className="w-full text-center text-2xl sm:text-3xl text-foreground font-semibold my-12">
        Companhia de Viagem
      </h2>

      <div className="w-full grid grid-cols-1 gap-4">
        <FormField
          control={formControl}
          name="otherPeopleTravelingConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">Há outras pessoas viajando com você?</FormLabel>

              <FormControl>
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Não" />
                    </FormControl>

                    <FormLabel className="font-normal">Não</FormLabel>
                  </FormItem>

                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Sim" />
                    </FormControl>

                    <FormLabel className="font-normal">Sim</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>

              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />

        {otherPeopleTravelingConfirmation === "Sim" && (
          <div className="w-full bg-secondary p-4 flex flex-col space-y-3">
            <label className="text-sm font-medium text-foreground">
              Adicione as pessoas que estão viajando com você
            </label>

            <div className="flex flex-col gap-4 w-full">
              {otherPeopleTraveling ? (
                otherPeopleTraveling.map((obj, i) => (
                  <div key={obj.id} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      className="order-2 w-[calc(100%-58px)] sm:order-1 sm:w-full placeholder:text-foreground/70"
                      value={obj.name!}
                      placeholder="Nome completo"
                      onChange={(e: ChangeEvent<HTMLInputElement>) => handleOtherPeopleTravelingChange(e, "name", i)}
                    />

                    <div className="flex gap-2 justify-between items-end order-1 sm:order-2">
                      <Input
                        value={obj.relation!}
                        className="placeholder:text-foreground/70"
                        placeholder="Relação com a pessoa"
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleOtherPeopleTravelingChange(e, "relation", i)
                        }
                      />

                      {i === otherPeopleTravelingIndex - 1 ? (
                        <Button
                          type="button"
                          size="xl"
                          className="px-3"
                          disabled={obj.relation === "" || obj.name === "" || isFetching}
                          onClick={handleAddOtherPeopleTravelingInput}
                        >
                          {isFetching ? <Loader2 className="animate-spin" /> : <Plus />}
                        </Button>
                      ) : (
                        <Button
                          disabled={isFetching}
                          type="button"
                          size="xl"
                          className="px-3"
                          onClick={() => handleRemoveOtherPeopleTravelingInput(obj.id)}
                        >
                          {isFetching ? <Loader2 className="animate-spin" /> : <Trash />}
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div>Loading...</div>
              )}
            </div>

            {otherPeopleTravelingError.length > 0 && (
              <span className="text-sm text-red-500">{otherPeopleTravelingError}</span>
            )}
          </div>
        )}
      </div>

      <div className="w-full grid grid-cols-1 gap-4">
        <FormField
          control={formControl}
          name="groupMemberConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground text-sm">
                Está viajando como integrante de um grupo de viagem?
              </FormLabel>

              <FormControl>
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Não" />
                    </FormControl>

                    <FormLabel className="font-normal">Não</FormLabel>
                  </FormItem>

                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Sim" />
                    </FormControl>

                    <FormLabel className="font-normal">Sim</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>

              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={formControl}
          name="groupName"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-between">
              <FormLabel className="text-foreground text-sm">Nome da Organização ou Grupo</FormLabel>

              <FormControl>
                <Input disabled={groupMemberConfirmation === "Não"} {...field} />
              </FormControl>

              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />
      </div>
    </Element>
  );
}
