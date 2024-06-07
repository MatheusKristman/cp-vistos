"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const formSchema = z
  .object({
    firstName: z.string().min(1, "Campo obrigatório"),
    lastName: z.string().min(1, "Campo obrigatório"),
    cpf: z.string().min(1, "Campo obrigatório").min(14, "CPF Inválido"),
    warNameConfirmation: z.enum(["Sim", "Não"]),
    warName: z.string().optional(),
    otherNamesConfirmation: z.boolean(),
    sex: z.enum(["Masculino", "Feminino"]),
    maritalStatus: z.enum([
      "Casado(a)",
      "União Estável",
      "Parceiro(a) Doméstico(a)",
      "Solteiro(a)",
      "Viúvo(a)",
      "Divorciado(a)",
      "Separado(a)",
    ]),
    birthDate: z.date(),
    birthCity: z.string().min(1, "Campo obrigatório"),
    birthState: z.string().min(1, "Campo obrigatório"),
    birthCountry: z.string().min(1, "Campo obrigatório"),
    originCountry: z.string().min(1, "Campo obrigatório"),
    otherNationalityConfirmation: z.boolean(),
    otherNationalityPassport: z.string().optional(),
    otherCountryResidentConfirmation: z.boolean(),
    USSocialSecurityNumber: z.string(),
    USTaxpayerIDNumber: z.string(),
  })
  .superRefine(({ warNameConfirmation, warName, otherNationalityConfirmation, otherNationalityPassport }, ctx) => {
    if (warNameConfirmation && warName && warName.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Campo vazio, preencha para prosseguir",
        path: ["warName"],
      });
    }

    if (otherNationalityConfirmation && otherNationalityPassport && otherNationalityPassport.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Campo vazio, preencha para prosseguir",
        path: ["otherNationalityPassport"],
      });
    }
  });

export function PersonalDataForm() {
  const [otherNames, setOtherNames] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      cpf: "",
      warNameConfirmation: "Não",
      warName: undefined,
      otherNamesConfirmation: false,
      sex: undefined,
      maritalStatus: undefined,
      birthDate: undefined,
      birthCity: "",
      birthState: "",
      birthCountry: "",
      originCountry: "",
      otherNationalityConfirmation: false,
      otherNationalityPassport: "",
      otherCountryResidentConfirmation: false,
      USSocialSecurityNumber: "",
      USTaxpayerIDNumber: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-12">
        <div className="w-full flex flex-col gap-6">
          <div className="w-full grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primeiro nome (Conforme passaporte)*</FormLabel>

                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sobrenome (Conforme passaporte)*</FormLabel>

                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF*</FormLabel>

                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-full grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="warNameConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código ou nome de guerra se possuir</FormLabel>

                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Não" />
                        </FormControl>

                        <FormLabel className="font-normal">Não</FormLabel>
                      </FormItem>

                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Sim" />
                        </FormControl>

                        <FormLabel className="font-normal">Sim</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  );
}
