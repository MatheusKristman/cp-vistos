"use client";

import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Form as FormType } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2, Plus, Save, X } from "lucide-react";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { cn } from "@/lib/utils";
import { trpc } from "@/lib/trpc-client";
import useFormStore from "@/constants/stores/useFormStore";
import { TravelCompanyFormType } from "@/types";

const formSchema = z
  .object({
    otherPeopleTravelingConfirmation: z.enum(["Sim", "Não"]),
    otherPeopleTraveling: z.array(
      z.object({
        name: z.string(),
        relation: z.string(),
      })
    ),
    groupMemberConfirmation: z.enum(["Sim", "Não"]),
    groupName: z.string(),
  })
  .superRefine(
    ({ otherPeopleTravelingConfirmation, otherPeopleTraveling, groupMemberConfirmation, groupName }, ctx) => {
      if (groupMemberConfirmation === "Sim" && groupName.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Campo vazio, preencha para prosseguir",
          path: ["groupName"],
        });
      }

      if (
        otherPeopleTravelingConfirmation === "Sim" &&
        otherPeopleTraveling.length === 1 &&
        otherPeopleTraveling.filter((item) => item.name === "").length === 1
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Campo vazio, preencha para prosseguir",
          path: [`otherPeopleTraveling.${otherPeopleTraveling.length - 1}.name`],
        });
      }

      if (
        otherPeopleTravelingConfirmation === "Sim" &&
        otherPeopleTraveling.length === 1 &&
        otherPeopleTraveling.filter((item) => item.relation === "").length === 1
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Campo vazio, preencha para prosseguir",
          path: [`otherPeopleTraveling.${otherPeopleTraveling.length - 1}.relation`],
        });
      }
    }
  );

interface Props {
  profileId: string;
  travelCompanyForm: TravelCompanyFormType;
  isEditing: boolean;
}

export function TravelCompanyForm({ travelCompanyForm, profileId, isEditing }: Props) {
  const [currentOtherPeopleTravelingIndex, setCurrentOtherPeopleTravelingIndex] = useState<number>(
    travelCompanyForm.otherPeopleTraveling.length ?? 0
  );
  const [otherPeopleTravelingItems, setOtherPeopleTravelingItems] = useState<{ name: string; relation: string }[]>([]);
  const [resetOtherPeopleTravelingFields, setResetOtherPeopleTravelingFields] = useState<boolean>(false);

  const { redirectStep, setRedirectStep } = useFormStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otherPeopleTravelingConfirmation: travelCompanyForm.otherPeopleTravelingConfirmation ? "Sim" : "Não",
      otherPeopleTraveling:
        travelCompanyForm.otherPeopleTraveling.length > 0
          ? [...travelCompanyForm.otherPeopleTraveling, { name: "", relation: "" }]
          : [{ name: "", relation: "" }],
      groupMemberConfirmation: travelCompanyForm.groupMemberConfirmation ? "Sim" : "Não",
      groupName: travelCompanyForm.groupName ? travelCompanyForm.groupName : "",
    },
  });

  const otherPeopleTravelingConfirmation: "Sim" | "Não" = form.watch("otherPeopleTravelingConfirmation");
  const groupMemberConfirmation: "Sim" | "Não" = form.watch("groupMemberConfirmation");
  const otherPeopleTraveling = form.watch("otherPeopleTraveling");
  const utils = trpc.useUtils();
  const router = useRouter();

  const { mutate: submitTravelCompany, isPending } = trpc.formsRouter.submitTravelCompany.useMutation({
    onSuccess: (data) => {
      toast.success(data.message);
      utils.formsRouter.getForm.invalidate();

      if (data.isEditing) {
        router.push(`/resumo-formulario/${profileId}`);
      } else {
        router.push(`/formulario/${profileId}?formStep=5`);
      }
    },
    onError: (error) => {
      console.error(error.data);

      if (error.data && error.data.code === "NOT_FOUND") {
        toast.error(error.message);
      } else {
        toast.error("Erro ao enviar as informações do formulário, tente novamente mais tarde");
      }
    },
  });
  const { mutate: saveTravelCompany, isPending: isSavePending } = trpc.formsRouter.saveTravelCompany.useMutation({
    onSuccess: (data) => {
      toast.success(data.message);
      utils.formsRouter.getForm.invalidate();

      if (data.redirectStep !== undefined) {
        router.push(`/formulario/${profileId}?formStep=${data.redirectStep}`);
      }
    },
    onError: (error) => {
      console.error(error.data);

      if (error.data && error.data.code === "NOT_FOUND") {
        toast.error(error.message);
      } else {
        toast.error("Ocorreu um erro ao salvar os dados");
      }
    },
  });

  useEffect(() => {
    if (travelCompanyForm.otherPeopleTraveling.length > 0) {
      setCurrentOtherPeopleTravelingIndex(travelCompanyForm.otherPeopleTraveling.length);

      const otherPeopleTravelingFiltered = travelCompanyForm.otherPeopleTraveling.filter(
        (item) => item.name !== "" && item.relation !== ""
      );

      setOtherPeopleTravelingItems(otherPeopleTravelingFiltered);
    }
  }, [travelCompanyForm]);

  useEffect(() => {
    if (resetOtherPeopleTravelingFields) {
      form.setValue(`otherPeopleTraveling.${currentOtherPeopleTravelingIndex}.name`, "");
      form.setValue(`otherPeopleTraveling.${currentOtherPeopleTravelingIndex}.relation`, "");

      setResetOtherPeopleTravelingFields(false);
    }
  }, [resetOtherPeopleTravelingFields]);

  useEffect(() => {
    if (redirectStep !== null) {
      const values = form.getValues();

      saveTravelCompany({
        profileId,
        redirectStep,
        otherPeopleTravelingConfirmation:
          values.otherPeopleTravelingConfirmation ?? travelCompanyForm.otherPeopleTravelingConfirmation,
        otherPeopleTraveling:
          otherPeopleTravelingItems.length > 0 ? otherPeopleTravelingItems : travelCompanyForm.otherPeopleTraveling,
        groupMemberConfirmation: values.groupMemberConfirmation ?? travelCompanyForm.groupMemberConfirmation,
        groupName: values.groupName !== "" ? values.groupName : travelCompanyForm.groupName,
      });
      setRedirectStep(null);
    }
  }, [redirectStep, setRedirectStep, saveTravelCompany, profileId]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    submitTravelCompany({
      ...values,
      otherPeopleTraveling: otherPeopleTravelingItems,
      profileId,
      step: 5,
      isEditing,
    });
  }

  function onSave() {
    const values = form.getValues();

    saveTravelCompany({
      profileId,
      otherPeopleTravelingConfirmation:
        values.otherPeopleTravelingConfirmation ?? travelCompanyForm.otherPeopleTravelingConfirmation,
      otherPeopleTraveling:
        otherPeopleTravelingItems.length > 0 ? otherPeopleTravelingItems : travelCompanyForm.otherPeopleTraveling,
      groupMemberConfirmation: values.groupMemberConfirmation ?? travelCompanyForm.groupMemberConfirmation,
      groupName: values.groupName !== "" ? values.groupName : travelCompanyForm.groupName,
    });
  }

  function addOtherPeopleTraveling() {
    form
      .trigger(
        [
          `otherPeopleTraveling.${currentOtherPeopleTravelingIndex}.name`,
          `otherPeopleTraveling.${currentOtherPeopleTravelingIndex}.relation`,
        ],
        { shouldFocus: true }
      )
      .then(() => {
        if (Object.keys(form.formState.errors).length === 0) {
          form.setValue("otherPeopleTraveling", [
            ...otherPeopleTraveling,
            {
              name: "",
              relation: "",
            },
          ]);

          const otherPeopleTravelingFiltered = otherPeopleTraveling.filter(
            (item) => item.name !== "" && item.relation !== ""
          );

          setCurrentOtherPeopleTravelingIndex((prev) => prev + 1);
          setOtherPeopleTravelingItems(otherPeopleTravelingFiltered);
          setResetOtherPeopleTravelingFields(true);
        }
      });
  }

  function removeOtherPeopleTraveling(index: number) {
    const newArr = otherPeopleTraveling.filter((_, i) => i !== index);

    form.setValue("otherPeopleTraveling", newArr);

    const otherPeopleTravelingFiltered = newArr.filter((item) => item.name !== "" && item.relation !== "");

    setCurrentOtherPeopleTravelingIndex((prev) => prev - 1);
    setOtherPeopleTravelingItems(otherPeopleTravelingFiltered);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col flex-grow gap-6">
        <h2 className="w-full text-center text-2xl sm:text-3xl text-foreground font-semibold mb-6">
          Companhia de Viagem
        </h2>

        <div className="w-full flex flex-col gap-12 justify-between flex-grow">
          <div className="w-full flex flex-col">
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-6 mb-6">
              <FormField
                control={form.control}
                name="otherPeopleTravelingConfirmation"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">Você viajará com alguém?</FormLabel>

                    <FormControl>
                      <RadioGroup
                        disabled={isPending || isSavePending}
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

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />

              <div
                className={cn(
                  "flex flex-col gap-2 bg-secondary rounded-xl p-4",
                  otherPeopleTravelingConfirmation === "Não" && "hidden"
                )}
              >
                <span className="text-sm font-medium text-foreground">
                  Adicione as pessoas que estão viajando com você
                </span>

                <div className="!mt-auto w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`otherPeopleTraveling.${currentOtherPeopleTravelingIndex}.name`}
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-2">
                        <FormControl>
                          <Input
                            className="!mt-auto"
                            disabled={isPending || isSavePending}
                            {...field}
                            placeholder="Nome completo"
                          />
                        </FormControl>

                        <FormMessage className="text-sm text-destructive" />
                      </FormItem>
                    )}
                  />

                  <div className="w-full flex gap-2">
                    <FormField
                      control={form.control}
                      name={`otherPeopleTraveling.${currentOtherPeopleTravelingIndex}.relation`}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <Input
                              className="!mt-auto"
                              disabled={isPending || isSavePending}
                              {...field}
                              placeholder="Relação parental"
                            />
                          </FormControl>

                          <FormMessage className="text-sm text-destructive" />
                        </FormItem>
                      )}
                    />

                    <Button
                      disabled={isPending || isSavePending}
                      type="button"
                      size="xl"
                      className="px-3 shrink-0"
                      onClick={addOtherPeopleTraveling}
                    >
                      <Plus />
                    </Button>
                  </div>
                </div>

                {otherPeopleTravelingItems.length > 0 && (
                  <div className="w-full flex flex-wrap gap-2">
                    {otherPeopleTravelingItems.map((item, index) => (
                      <div
                        key={`otherName-${index}`}
                        className="py-2 px-4 bg-primary/50 rounded-full flex items-center gap-2 group"
                      >
                        <span className="text-sm font-medium text-white">{item.name}</span>

                        <Button
                          type="button"
                          variant="link"
                          size="icon"
                          className="size-5 hidden opacity-0 transition-all group-hover:block group-hover:opacity-100"
                          disabled={isPending || isSavePending}
                          onClick={() => removeOtherPeopleTraveling(index)}
                        >
                          <X strokeWidth={1} size={20} color="#FFF" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
              <FormField
                control={form.control}
                name="groupMemberConfirmation"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground text-sm">
                      Está viajando como integrante de um grupo de viagem?
                    </FormLabel>

                    <FormControl>
                      <RadioGroup
                        disabled={isPending || isSavePending}
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

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="groupName"
                render={({ field }) => (
                  <FormItem className={cn("flex flex-col gap-2", groupMemberConfirmation === "Não" && "hidden")}>
                    <FormLabel className="text-foreground text-sm">Nome da Organização ou Grupo</FormLabel>

                    <FormControl>
                      <Input className="!mt-auto" disabled={isPending || isSavePending} {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="w-full flex flex-col-reverse items-center gap-4 sm:flex-row sm:justify-end">
            {isEditing ? (
              <>
                <Button
                  size="xl"
                  variant="outline"
                  type="button"
                  className="w-full flex items-center gap-2 sm:w-fit"
                  disabled={isPending || isSavePending}
                  onClick={() => router.push(`/resumo-formulario/${profileId}`)}
                >
                  Cancelar
                </Button>

                <Button
                  size="xl"
                  type="submit"
                  className="w-full flex items-center gap-2 sm:w-fit"
                  disabled={isPending || isSavePending}
                >
                  {isPending ? (
                    <>
                      Salvando
                      <Loader2 className="size-5 animate-spin" strokeWidth={1.5} />
                    </>
                  ) : (
                    <>
                      Salvar
                      <Save className="size-5" strokeWidth={1.5} />
                    </>
                  )}
                </Button>
              </>
            ) : (
              <>
                <Button
                  size="xl"
                  variant="outline"
                  type="button"
                  className="w-full flex items-center gap-2 sm:w-fit"
                  disabled={isPending || isSavePending}
                  onClick={onSave}
                >
                  {isSavePending ? (
                    <>
                      Salvando
                      <Loader2 className="size-5 animate-spin" strokeWidth={1.5} />
                    </>
                  ) : (
                    <>
                      Salvar
                      <Save className="size-5" strokeWidth={1.5} />
                    </>
                  )}
                </Button>

                <Button
                  size="xl"
                  type="submit"
                  className="w-full flex items-center gap-2 sm:w-fit"
                  disabled={isPending || isSavePending}
                >
                  {isPending ? (
                    <>
                      Enviando
                      <Loader2 className="size-5 animate-spin" strokeWidth={1.5} />
                    </>
                  ) : (
                    <>
                      Proximo
                      <ArrowRight className="size-5" strokeWidth={1.5} />
                    </>
                  )}
                </Button>
              </>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
}
