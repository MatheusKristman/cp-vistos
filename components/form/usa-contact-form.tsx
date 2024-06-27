//TODO: criar função para submit
//TODO: mandar para o proximo formulário
// TODO: adicionar input de telefone no formulário de telefone

"use client";

import { Control } from "react-hook-form";
import { Element } from "react-scroll";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PrimaryFormControl } from "@/types";

interface Props {
  formControl: Control<PrimaryFormControl>;
}

export function USAContactForm({ formControl }: Props) {
  return (
    <Element name="usa-contact" className="w-full flex flex-col gap-6">
      <h2 className="w-full text-center text-2xl sm:text-3xl text-foreground font-semibold my-12">
        Contato nos estados unidades
      </h2>

      <span className="text-foreground text-base font-medium">
        Preencher apenas se houver contato frequente com alguém dos EUA{" "}
      </span>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          control={formControl}
          name="organizationOrUSAResidentName"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-between">
              <FormLabel className="text-foreground text-sm">Nome completo da pessoa ou Organização</FormLabel>

              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={formControl}
          name="organizationOrUSAResidentRelation"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-between">
              <FormLabel className="text-foreground text-sm">Qual é a relação do contato com você?</FormLabel>

              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          control={formControl}
          name="organizationOrUSAResidentAddress"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-between">
              <FormLabel className="text-foreground text-sm">Endereço do contato nos EUA</FormLabel>

              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={formControl}
          name="organizationOrUSAResidentZipCode"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-between">
              <FormLabel className="text-foreground text-sm">Zip code</FormLabel>

              <FormControl>
                <Input maxLength={5} {...field} />
              </FormControl>

              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
        <FormField
          control={formControl}
          name="organizationOrUSAResidentCity"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-between">
              <FormLabel className="text-foreground text-sm">Cidade</FormLabel>

              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={formControl}
          name="organizationOrUSAResidentState"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-between">
              <FormLabel className="text-foreground text-sm">Estado</FormLabel>

              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={formControl}
          name="organizationOrUSAResidentCountry"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-between">
              <FormLabel className="text-foreground text-sm">País</FormLabel>

              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          control={formControl}
          name="organizationOrUSAResidentTel"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-between">
              <FormLabel className="text-foreground text-sm">Telefone</FormLabel>

              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={formControl}
          name="organizationOrUSAResidentEmail"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-between">
              <FormLabel className="text-foreground text-sm">E-mail</FormLabel>

              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />
      </div>
    </Element>
  );
}
