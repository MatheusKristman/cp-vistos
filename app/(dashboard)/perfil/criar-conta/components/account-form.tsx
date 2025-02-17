import { ChangeEvent } from "react";
import { CircleDollarSign } from "lucide-react";
import PhoneInput from "react-phone-number-input";
import CurrencyInput from "react-currency-input-field";

import { cn } from "@/lib/utils";

import type { Role } from "@prisma/client";
import type { formType } from "../page";

import { Input } from "@/components/ui/input";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import "react-phone-number-input/style.css";

interface AccountFormProps {
  isProfileSameAsAccount: string;
  currentProfile: number;
  nameFormValue: string;
  cpfFormValue: string;
  addressFormValue: string;
  role: Role | null;
  form: formType;
  handleCPF: (e: ChangeEvent<HTMLInputElement>) => string;
}

export function AccountForm({
  isProfileSameAsAccount,
  currentProfile,
  nameFormValue,
  cpfFormValue,
  addressFormValue,
  role,
  form,
  handleCPF,
}: AccountFormProps) {
  function handleBlur(value: string, input: "profileName" | "profileCpf" | "profileAddress") {
    if (JSON.parse(isProfileSameAsAccount)) {
      form.setValue(`profiles.${currentProfile}.${input}`, value);
    }
  }

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="truncate">Nome*</FormLabel>

              <FormControl>
                <Input
                  placeholder="Insira o nome do cliente"
                  onBlur={() => {
                    handleBlur(nameFormValue, "profileName");

                    field.onBlur();
                  }}
                  ref={field.ref}
                  name={field.name}
                  value={field.value}
                  disabled={field.disabled}
                  onChange={field.onChange}
                />
              </FormControl>

              <FormMessage className="font-normal text-destructive" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cpf"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="truncate">CPF</FormLabel>

              <FormControl>
                <Input
                  placeholder="Insira o CPF do cliente"
                  maxLength={14}
                  ref={field.ref}
                  name={field.name}
                  value={field.value}
                  onBlur={() => {
                    handleBlur(cpfFormValue, "profileCpf");

                    field.onBlur();
                  }}
                  disabled={field.disabled}
                  onChange={(event) => {
                    const newValue = handleCPF(event);

                    form.setValue("cpf", newValue);
                  }}
                />
              </FormControl>

              <FormMessage className="font-normal text-destructive" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="group"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="truncate">Grupo</FormLabel>

              <FormControl>
                <Input placeholder="Crie o nome do grupo" {...field} />
              </FormControl>

              <FormMessage className="font-normal text-destructive" />
            </FormItem>
          )}
        />
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-[1fr_250px] gap-6">
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="truncate">Endereço</FormLabel>

              <FormControl>
                <Input
                  placeholder="Insira o endereço completo do cliente"
                  onBlur={() => {
                    handleBlur(addressFormValue, "profileAddress");

                    field.onBlur();
                  }}
                  ref={field.ref}
                  name={field.name}
                  value={field.value}
                  disabled={field.disabled}
                  onChange={field.onChange}
                />
              </FormControl>

              <FormMessage className="font-normal text-destructive" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cel"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="truncate">Celular</FormLabel>

              <FormControl>
                <PhoneInput
                  limitMaxLength
                  smartCaret={false}
                  placeholder="Insira o celular do cliente"
                  defaultCountry="BR"
                  className={cn(
                    "flex h-12 w-full border border-muted/70 rounded-xl transition duration-300 bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary hover:border-border disabled:hover:border-muted disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted"
                  )}
                  {...field}
                />
              </FormControl>

              <FormMessage className="font-normal text-destructive" />
            </FormItem>
          )}
        />
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="truncate">E-mail*</FormLabel>

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
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="truncate">Senha*</FormLabel>

              <FormControl>
                <Input placeholder="Crie uma senha" {...field} />
              </FormControl>

              <FormMessage className="font-normal text-destructive" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="passwordConfirm"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="truncate">Confirmar Senha*</FormLabel>

              <FormControl>
                <Input placeholder="Confirme a senha criada" {...field} />
              </FormControl>

              <FormMessage className="font-normal text-destructive" />
            </FormItem>
          )}
        />
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
        <FormField
          control={form.control}
          name="emailScheduleAccount"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="truncate">E-mail (agendamento)*</FormLabel>

              <FormControl>
                <Input placeholder="Insira o e-mail da conta de agendamento" {...field} />
              </FormControl>

              <FormMessage className="font-normal text-destructive" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="passwordScheduleAccount"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="truncate">Senha (agendamento)*</FormLabel>

              <FormControl>
                <Input placeholder="Insira a senha da conta de agendamento" {...field} />
              </FormControl>

              <FormMessage className="font-normal text-destructive" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="passwordConfirmScheduleAccount"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="truncate">Confirmar Senha (agendamento)*</FormLabel>

              <FormControl>
                <Input placeholder="Confirme a senha da conta de agendamento" {...field} />
              </FormControl>

              <FormMessage className="font-normal text-destructive" />
            </FormItem>
          )}
        />
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
        <FormField
          control={form.control}
          name="budget"
          render={({ field }) => (
            <FormItem className={cn("flex flex-col gap-1", role === "COLLABORATOR" && "hidden")}>
              <FormLabel className="truncate">Valor do Serviço</FormLabel>

              <FormControl>
                <div className="h-12 flex items-center gap-1 border border-muted/70 rounded-xl transition duration-300 bg-background px-3 py-2 text-sm group focus-within:border-primary hover:border-border">
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
            <FormItem className={cn("flex flex-col gap-1", role === "COLLABORATOR" && "hidden")}>
              <FormLabel className="truncate">Status do pagamento</FormLabel>

              <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                <FormControl>
                  <SelectTrigger className={cn("text-left", field.value === "" && "[&>span]:text-muted-foreground")}>
                    <SelectValue placeholder="Selecione o status do pagamento" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  <SelectItem value="Pago">Pago</SelectItem>
                  <SelectItem value="Pendente">Pendente</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="scheduleAccount"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="truncate">Conta de Agendamento*</FormLabel>

              <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                <FormControl>
                  <SelectTrigger className={cn("text-left", field.value === "" && "[&>span]:text-muted-foreground")}>
                    <SelectValue placeholder="Selecione o status da conta de agendamento" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
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
  );
}
