"use client";

//TODO: adicionar campo de valor e status do pagamento somente no modo admin, não aparecer para colaborador

import { ChangeEvent } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CurrencyInput from "react-currency-input-field";
import { CircleDollarSign } from "lucide-react";

import { FormAnimation } from "@/constants/animations/modal";
import { Button } from "@/components/ui/button";
import useClientDetailsModalStore from "@/constants/stores/useClientDetailsModalStore";
import { Form, FormField, FormLabel, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Props {
  handleClose: () => void;
}

const formSchema = z.object({
  name: z
    .string({
      required_error: "Nome é obrigatório",
      invalid_type_error: "Nome inválido",
    })
    .min(1, { message: "Nome é obrigatório" })
    .min(4, { message: "Nome precisa ter no mínimo 4 caracteres" }),
  cpf: z
    .string({
      required_error: "CPF é obrigatório",
      invalid_type_error: "CPF inválido",
    })
    .refine((val) => val.length > 0 && val.length === 14, {
      message: "CPF inválido",
    }),
  cel: z
    .string({
      required_error: "Celular é obrigatório",
      invalid_type_error: "Celular inválido",
    })
    .optional()
    .refine((val) => !val || (val && (val.length === 0 || val.length === 14)), {
      message: "Celular inválido",
    }),
  address: z.string({
    required_error: "Endereço é obrigatório",
    invalid_type_error: "Endereço inválido",
  }),
  email: z
    .string({
      required_error: "E-mail é obrigatório",
      invalid_type_error: "E-mail inválido",
    })
    .email({ message: "E-mail inválido" })
    .min(1, { message: "E-mail é obrigatório" }),
  password: z
    .string({
      required_error: "Senha é obrigatório",
      invalid_type_error: "Senha inválida",
    })
    .min(1, { message: "Senha é obrigatória" })
    .min(6, { message: "Senha precisa ter no mínimo 6 caracteres" }),
  passwordConfirm: z
    .string({
      required_error: "Confirmação da senha é obrigatório",
      invalid_type_error: "Confirmação da senha inválida",
    })
    .min(1, { message: "Confirmação da senha é obrigatório" })
    .min(6, {
      message: "Confirmação da senha precisa ter no mínimo 6 caracteres",
    }),
  budget: z
    .string({
      required_error: "Valor é obrigatório",
      invalid_type_error: "Valor inválido",
    })
    .refine((val) => Number(val) >= 0, {
      message: "Valor precisa ser maior que zero",
    }),
  budgetPaid: z.enum(["", "Pago", "Pendente"], {
    message: "Status do pagamento é obrigatório",
  }),
  scheduleAccount: z.enum(["Ativado", "Inativo", ""], {
    message: "Conta de Agendamento é obrigatório",
  }),
});

export function ClientDetailsEditAccount({ handleClose }: Props) {
  const { unsetToEditAccount, setToResume, role } = useClientDetailsModalStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      cpf: "",
      address: "",
      email: "",
      password: "",
      passwordConfirm: "",
      budget: "",
      budgetPaid: "",
      scheduleAccount: "",
    },
  });

  function handleBack() {
    unsetToEditAccount();
    setToResume();
  }

  function handleCPF(event: ChangeEvent<HTMLInputElement>) {
    let value = event.target.value.replace(/[^\d]/g, "");

    value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");

    return value;
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    //TODO: adicionar função para editar conta
  }

  return (
    <motion.div initial="initial" animate="animate" exit="exit" variants={FormAnimation}>
      <div className="w-full grid grid-cols-2 grid-rows-2 gap-4 mb-9 sm:flex sm:flex-row sm:items-center sm:justify-between">
        <Button onClick={handleBack} variant="link" size="icon" className="row-start-1 row-end-2">
          <Image src="/assets/icons/arrow-left-dark.svg" alt="Voltar" width={24} height={24} />
        </Button>

        <h1 className="text-2xl font-semibold text-foreground text-center sm:text-3xl row-end-3 row-start-2 col-span-2">
          Editar Conta
        </h1>

        <Button onClick={handleClose} variant="link" size="icon" className="row-start-1 row-end-2 justify-self-end">
          <Image src="/assets/icons/cross-blue.svg" alt="Fechar" width={24} height={24} />
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-9">
          <div className="w-full flex flex-col gap-6">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome*</FormLabel>

                    <FormControl>
                      <Input placeholder="Insira o nome do cliente" {...field} />
                    </FormControl>

                    <FormMessage className="font-normal text-destructive" />
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
                      <Input
                        placeholder="Insira o CPF do cliente"
                        maxLength={14}
                        onChange={(event) => {
                          const newValue = handleCPF(event);

                          form.setValue("cpf", newValue);
                        }}
                        name={field.name}
                        ref={field.ref}
                        onBlur={field.onBlur}
                        value={field.value}
                        disabled={field.disabled}
                      />
                    </FormControl>

                    <FormMessage className="font-normal text-destructive" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endereço</FormLabel>

                  <FormControl>
                    <Input placeholder="Insira o endereço do cliente" {...field} />
                  </FormControl>

                  <FormMessage className="font-normal text-destructive" />
                </FormItem>
              )}
            />

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail*</FormLabel>

                    <FormControl>
                      <Input placeholder="Insira o e-mail do cliente" {...field} />
                    </FormControl>

                    <FormMessage className="font-normal text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nova senha*</FormLabel>

                    <FormControl>
                      <Input placeholder="Insira a nova senha do cliente" {...field} />
                    </FormControl>

                    <FormMessage className="font-normal text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="passwordConfirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar Nova Senha*</FormLabel>

                    <FormControl>
                      <Input placeholder="Confirme a nova senha do cliente" {...field} />
                    </FormControl>

                    <FormMessage className="font-normal text-destructive" />
                  </FormItem>
                )}
              />
            </div>

            <div
              className={cn("w-full grid grid-cols-1 sm:grid-cols-3 gap-6", {
                "sm:grid-cols-2": role !== "ADMIN",
              })}
            >
              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem className={cn({ hidden: role !== "ADMIN" })}>
                    <FormLabel>Valor do Serviço</FormLabel>

                    <FormControl>
                      <div className="h-12 flex items-center gap-2 border border-muted transition duration-300 bg-background px-3 py-2 text-sm group focus-within:border-primary hover:border-border">
                        <CircleDollarSign className="w-5 h-5 text-border flex-shrink-0" strokeWidth={1.5} />

                        <div className="w-[2px] flex-shrink-0 h-full bg-muted rounded-full" />

                        <CurrencyInput
                          placeholder="Insira o valor do serviço"
                          onValueChange={(value, name) => form.setValue(name as "budget", value ?? "0")}
                          decimalsLimit={2}
                          ref={field.ref}
                          onBlur={field.onBlur}
                          name={field.name}
                          value={field.value}
                          disabled={field.disabled}
                          className="flex h-full w-full transition duration-300 bg-background text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0  disabled:cursor-not-allowed disabled:opacity-50"
                        />
                      </div>
                    </FormControl>

                    <FormMessage className="font-normal text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="budgetPaid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status do pagamento*</FormLabel>

                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                      <FormControl>
                        <SelectTrigger
                          className={cn(field.value === "" && "[&>span]:text-muted-foreground [&>span]:text-left")}
                        >
                          <SelectValue placeholder="Selecione o status do pagamento" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent className="z-[99999]">
                        <SelectItem value="Pago">Pago</SelectItem>
                        <SelectItem value="Pendente">Pendente</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage className="font-normal text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="scheduleAccount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Conta de Agendamento*</FormLabel>

                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                      <FormControl>
                        <SelectTrigger
                          className={cn(field.value === "" && "[&>span]:text-muted-foreground [&>span]:text-left")}
                        >
                          <SelectValue placeholder="Selecione o status da conta de agendamento" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent className="z-[99999]">
                        <SelectItem value="Ativado">Ativado</SelectItem>
                        <SelectItem value="Inativo">Inativo</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage className="font-normal text-destructive" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="w-full flex flex-col-reverse gap-6 sm:flex-row">
            <Button type="button" variant="outline" size="xl" className="w-full sm:w-fit" onClick={handleBack}>
              Cancelar
            </Button>

            <Button type="submit" size="xl" className="w-full sm:w-fit">
              Salvar
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}
