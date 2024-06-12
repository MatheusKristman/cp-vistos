//TODO: criar função para submit
//TODO: mandar para o proximo formulário

"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  ArrowLeft,
  ArrowRight,
  Loader2,
  Plus,
  Save,
  Trash,
} from "lucide-react";
import { format, getYear } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { Form as FormType, OtherPeopleTraveling } from "@prisma/client";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { CheckedState } from "@radix-ui/react-checkbox";

interface Props {
  currentForm: FormType | null;
}

// otherPeopleTravelingConfirmation              Boolean?
// otherPeopleTraveling                          OtherPeopleTraveling[]
// groupMemberConfirmation                       Boolean?
// groupName                                     String?

const formSchema = z
  .object({
    otherPeopleTravelingConfirmation: z.enum(["Sim", "Não"]),
    groupMemberConfirmation: z.enum(["Sim", "Não"]),
    groupName: z.string(),
  })
  .superRefine(({ groupMemberConfirmation, groupName }, ctx) => {
    if (groupMemberConfirmation && groupName && groupName.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Campo vazio, preencha para prosseguir",
        path: ["groupName"],
      });
    }
  });

export function TravelCompanyForm({ currentForm }: Props) {
  const [otherPeopleTraveling, setOtherPeopleTraveling] = useState<
    OtherPeopleTraveling[]
  >([{ name: "", relation: "", id: "", formId: "" }]);
  const [otherPeopleTravelingIndex, setOtherPeopleTravelingIndex] =
    useState<number>(1);
  const [otherPeopleTravelingError, setOtherPeopleTravelingError] =
    useState<string>("");
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const [isSaving, setSaving] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otherPeopleTravelingConfirmation:
        currentForm && currentForm.otherPeopleTravelingConfirmation
          ? currentForm.otherPeopleTravelingConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
      groupMemberConfirmation:
        currentForm && currentForm.groupMemberConfirmation
          ? currentForm.groupMemberConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
      groupName:
        currentForm && currentForm.groupName ? currentForm.groupName : "",
    },
  });
  const otherPeopleTravelingConfirmation = form.watch(
    "otherPeopleTravelingConfirmation",
  );
  const groupMemberConfirmation = form.watch("groupMemberConfirmation");

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  function handleOtherPeopleTravelingChange(
    event: ChangeEvent<HTMLInputElement>,
    property: "name" | "relation",
    index: number,
  ) {
    const values = [...otherPeopleTraveling];
    values[index][property] = event.target.value;
    setOtherPeopleTraveling(values);
  }

  function handleAddOtherPeopleTravelingInput() {
    setOtherPeopleTravelingIndex((prev: number) => prev + 1);

    const values = [...otherPeopleTraveling];
    values[values.length] = { name: "", relation: "", id: "", formId: "" };

    console.log(values);

    setOtherPeopleTraveling(values);
  }

  function handleRemoveOtherPeopleTravelingInput(index: number) {
    setOtherPeopleTravelingIndex((prev: number) => prev - 1);

    const values = [...otherPeopleTraveling].filter(
      (value: OtherPeopleTraveling, i: number) => i !== index,
    );
    setOtherPeopleTraveling(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-12 mb-12"
      >
        <div className="w-full flex flex-col gap-6">
          <h2 className="w-full text-center text-2xl sm:text-3xl text-primary font-semibold mb-12">
            Companhia de viagem
          </h2>

          <div className="w-full grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="otherPeopleTravelingConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">
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
                <label className="text-sm font-medium text-primary">
                  Adicione as pessoas que estão viajando com você
                </label>

                <div className="flex flex-col gap-4 w-full">
                  {otherPeopleTraveling.map((obj, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                      <Input
                        className="order-2 w-[calc(100%-58px)] sm:order-1 sm:w-full placeholder:text-primary/70"
                        value={obj.name!}
                        placeholder="Nome completo"
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleOtherPeopleTravelingChange(e, "name", i)
                        }
                      />

                      <div className="flex gap-2 justify-between items-end order-1 sm:order-2">
                        <Input
                          value={obj.relation!}
                          className="placeholder:text-primary/70"
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
                            disabled={obj.relation === "" || obj.name === ""}
                            onClick={handleAddOtherPeopleTravelingInput}
                          >
                            <Plus />
                          </Button>
                        ) : (
                          <Button
                            type="button"
                            size="xl"
                            className="px-3"
                            onClick={() =>
                              handleRemoveOtherPeopleTravelingInput(i)
                            }
                          >
                            <Trash />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
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
                  <FormLabel className="text-primary text-sm">
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
                  <FormLabel className="text-primary text-sm">
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

        <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
          <Button
            type="button"
            disabled={isSubmitting || isSaving}
            className="w-full flex items-center gap-2 order-3 sm:w-fit sm:order-1"
          >
            <ArrowLeft className="hidden" /> Voltar
          </Button>

          <Button
            disabled={isSubmitting || isSaving}
            // onClick={handleSave}
            onClick={() => {}}
            type="button"
            variant="link"
            className="w-full flex items-center gap-2 order-1 sm:order-2 sm:w-fit"
          >
            {isSaving ? (
              <>
                <Loader2 className="animate-spin" />
                Salvando progresso
              </>
            ) : (
              <>
                <Save />
                Salvar progresso
              </>
            )}
          </Button>

          <Button
            disabled={isSubmitting || isSaving}
            type="submit"
            className="w-full flex items-center gap-2 order-2 sm:order-3 sm:w-fit"
          >
            Próximo{" "}
            {isSubmitting ? (
              <Loader2 className="animate-spin" />
            ) : (
              <ArrowRight className="hidden" />
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
