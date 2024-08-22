"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowRight, Loader2, Plus, Save, Trash } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useFormStore from "@/constants/stores/useFormStore";
import { FullForm } from "@/types";

const formSchema = z
  .object({
    otherPeopleTravelingConfirmation: z.enum(["Sim", "Não"]),
    groupMemberConfirmation: z.enum(["Sim", "Não"]),
    groupName: z.string(),
  })
  .superRefine(({ groupMemberConfirmation, groupName }, ctx) => {
    if (
      groupMemberConfirmation === "Sim" &&
      groupName &&
      groupName.length === 0
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Campo vazio, preencha para prosseguir",
        path: ["groupName"],
      });
    }
  });

interface Props {
  currentForm: FullForm;
}

export function TravelCompanyForm({ currentForm }: Props) {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const params = useParams();

  const {
    otherPeopleTraveling,
    otherPeopleTravelingError,
    otherPeopleTravelingIndex,
    setOtherPeopleTraveling,
    setOtherPeopleTravelingIndex,
  } = useFormStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otherPeopleTravelingConfirmation:
        currentForm.otherPeopleTravelingConfirmation
          ? currentForm.otherPeopleTravelingConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
      groupMemberConfirmation: currentForm.groupMemberConfirmation
        ? currentForm.groupMemberConfirmation === true
          ? "Sim"
          : "Não"
        : "Não",
      groupName: currentForm.groupName ? currentForm.groupName : "",
    },
  });

  const otherPeopleTravelingConfirmation: "Sim" | "Não" = form.watch(
    "otherPeopleTravelingConfirmation",
  );
  const groupMemberConfirmation: "Sim" | "Não" = form.watch(
    "groupMemberConfirmation",
  );

  useEffect(() => {
    if (currentForm && currentForm.otherPeopleTraveling) {
      setOtherPeopleTraveling(currentForm.otherPeopleTraveling);
      setOtherPeopleTravelingIndex(currentForm.otherPeopleTraveling.length);
    }
  }, [currentForm, setOtherPeopleTravelingIndex, setOtherPeopleTraveling]);

  function handleOtherPeopleTravelingChange(
    event: ChangeEvent<HTMLInputElement>,
    property: "name" | "relation",
    index: number,
  ) {
    if (!otherPeopleTraveling) return;

    const values = [...otherPeopleTraveling];

    values[index][property] = event.target.value;

    setOtherPeopleTraveling(values);
  }

  function handleAddOtherPeopleTravelingInput() {
    if (!otherPeopleTraveling || !params.formId) return;

    setIsFetching(true);

    axios
      .post("/api/form/other-people-traveling/create", {
        otherPeopleTraveling,
        formId: params.formId,
      })
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
      .put("/api/form/other-people-traveling/delete", {
        otherPeopleTravelingId: id,
        otherPeopleTraveling,
        formId: params.formId,
      })
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col flex-grow gap-6"
      >
        <h2 className="w-full text-center text-2xl sm:text-3xl text-foreground font-semibold mb-6">
          Companhia de Viagem
        </h2>

        <div className="w-full flex flex-col gap-12 justify-between flex-grow">
          <div className="w-full flex flex-col gap-4">
            <div className="w-full grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="otherPeopleTravelingConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Há outras pessoas viajando com você?
                    </FormLabel>

                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex space-x-4"
                      >
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
                        <div
                          key={obj.id}
                          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                        >
                          <Input
                            className="order-2 w-[calc(100%-58px)] sm:order-1 sm:w-full placeholder:text-foreground/70"
                            value={obj.name!}
                            placeholder="Nome completo"
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                              handleOtherPeopleTravelingChange(e, "name", i)
                            }
                          />

                          <div className="flex gap-2 justify-between items-end order-1 sm:order-2">
                            <Input
                              value={obj.relation!}
                              className="placeholder:text-foreground/70"
                              placeholder="Relação com a pessoa"
                              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                handleOtherPeopleTravelingChange(
                                  e,
                                  "relation",
                                  i,
                                )
                              }
                            />

                            {i === otherPeopleTravelingIndex - 1 ? (
                              <Button
                                type="button"
                                size="xl"
                                className="px-3"
                                disabled={
                                  obj.relation === "" ||
                                  obj.name === "" ||
                                  isFetching
                                }
                                onClick={handleAddOtherPeopleTravelingInput}
                              >
                                {isFetching ? (
                                  <Loader2 className="animate-spin" />
                                ) : (
                                  <Plus />
                                )}
                              </Button>
                            ) : (
                              <Button
                                disabled={isFetching}
                                type="button"
                                size="xl"
                                className="px-3"
                                onClick={() =>
                                  handleRemoveOtherPeopleTravelingInput(obj.id)
                                }
                              >
                                {isFetching ? (
                                  <Loader2 className="animate-spin" />
                                ) : (
                                  <Trash />
                                )}
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
                    <span className="text-sm text-red-500">
                      {otherPeopleTravelingError}
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="w-full grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="groupMemberConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground text-sm">
                      Está viajando como integrante de um grupo de viagem?
                    </FormLabel>

                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex space-x-4"
                      >
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
                control={form.control}
                name="groupName"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-between">
                    <FormLabel className="text-foreground text-sm">
                      Nome da Organização ou Grupo
                    </FormLabel>

                    <FormControl>
                      <Input
                        disabled={groupMemberConfirmation === "Não"}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="w-full flex flex-col-reverse items-center gap-4 sm:flex-row sm:justify-end">
            <Button
              size="xl"
              variant="outline"
              type="button"
              className="w-full flex items-center gap-2 sm:w-fit"
            >
              Salvar
              <Save className="size-5" strokeWidth={1.5} />
            </Button>

            <Button
              size="xl"
              // disabled={isSubmitting || isSaving}
              type="submit"
              className="w-full flex items-center gap-2 sm:w-fit"
            >
              Enviar{" "}
              {false ? (
                <Loader2 className="animate-spin" />
              ) : (
                <ArrowRight className="hidden" />
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
