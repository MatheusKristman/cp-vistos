"use client";

import { ChangeEvent } from "react";
import { Control } from "react-hook-form";
import { ArrowRight, Loader2, Plus, Save, Trash } from "lucide-react";
import { format, getYear } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { Element } from "react-scroll";
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
import { cn } from "@/lib/utils";
import { FullForm, PrimaryFormControl } from "@/types";
import useFormStore from "@/constants/stores/useFormStore";

const formSchema = z
  .object({
    firstName: z.string().min(1, "Campo obrigatório"),
    lastName: z.string().min(1, "Campo obrigatório"),
    cpf: z.string().min(1, "Campo obrigatório").min(14, "CPF Inválido"),
    otherNamesConfirmation: z.enum(["Sim", "Não"]),
    sex: z
      .string({ message: "Selecione uma opção" })
      .min(1, { message: "Selecione uma opção" }),
    maritalStatus: z
      .string({ message: "Selecione uma opção" })
      .min(1, { message: "Selecione uma opção" }),
    birthDate: z.date({ message: "Selecione uma data" }),
    birthCity: z.string().min(1, "Campo obrigatório"),
    birthState: z.string().min(1, "Campo obrigatório"),
    birthCountry: z.string().min(1, "Campo obrigatório"),
    originCountry: z.string().min(1, "Campo obrigatório"),
    otherNationalityConfirmation: z.enum(["Sim", "Não"]),
    otherNationalityPassport: z.string().optional(),
    otherCountryResidentConfirmation: z.enum(["Sim", "Não"]),
    USSocialSecurityNumber: z.string(),
    USTaxpayerIDNumber: z.string(),
  })
  .superRefine(
    ({ otherNationalityConfirmation, otherNationalityPassport }, ctx) => {
      if (
        otherNationalityConfirmation === "Sim" &&
        otherNationalityPassport &&
        otherNationalityPassport.length === 0
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Campo vazio, preencha para prosseguir",
          path: ["otherNationalityPassport"],
        });
      }
    },
  );

interface Props {
  currentForm: FullForm;
}

export function PersonalDataForm({ currentForm }: Props) {
  const {
    otherNames,
    setOtherNames,
    otherNamesIndex,
    setOtherNamesIndex,
    otherNamesError,
  } = useFormStore();
  const currentYear = getYear(new Date());

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: currentForm.firstName ? currentForm.firstName : "",
      lastName: currentForm.lastName ? currentForm.lastName : "",
      cpf: currentForm.cpf ? currentForm.cpf : "",
      otherNamesConfirmation: currentForm.otherNamesConfirmation
        ? currentForm.otherNamesConfirmation === true
          ? "Sim"
          : "Não"
        : "Não",
      sex: currentForm.sex ? currentForm.sex : undefined,
      maritalStatus: currentForm.maritalStatus
        ? currentForm.maritalStatus
        : undefined,
      birthDate: currentForm.birthDate ? currentForm.birthDate : undefined,
      birthCity: currentForm.birthCity ? currentForm.birthCity : "",
      birthState: currentForm.birthState ? currentForm.birthState : "",
      birthCountry: currentForm.birthCountry ? currentForm.birthCountry : "",
      originCountry: currentForm.originCountry ? currentForm.originCountry : "",
      otherNationalityConfirmation: currentForm.otherNationalityConfirmation
        ? currentForm.otherNationalityConfirmation === true
          ? "Sim"
          : "Não"
        : "Não",
      otherNationalityPassport: currentForm.otherNationalityPassport
        ? currentForm.otherNationalityPassport
        : "",
      otherCountryResidentConfirmation:
        currentForm.otherCountryResidentConfirmation
          ? currentForm.otherCountryResidentConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
      USSocialSecurityNumber: currentForm.USSocialSecurityNumber
        ? currentForm.USSocialSecurityNumber
        : "",
      USTaxpayerIDNumber: currentForm.USTaxpayerIDNumber
        ? currentForm.USTaxpayerIDNumber
        : "",
    },
  });

  const otherNamesConfirmationValue: "Sim" | "Não" = form.watch(
    "otherNamesConfirmation",
  );
  const otherNationalityConfirmation: "Sim" | "Não" = form.watch(
    "otherNationalityConfirmation",
  );

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  function handleOtherNamesChange(
    event: ChangeEvent<HTMLInputElement>,
    index: number,
  ) {
    const values = [...otherNames];
    values[index] = event.target.value;
    setOtherNames(values);
  }

  function handleAddOtherNamesInput() {
    setOtherNamesIndex(otherNamesIndex + 1);

    const values = [...otherNames];
    values[values.length] = "";
    setOtherNames(values);
  }

  function handleRemoveOtherNamesInput(index: number) {
    setOtherNamesIndex(otherNamesIndex - 1);

    const values = [...otherNames].filter(
      (value: string, i: number) => i !== index,
    );
    setOtherNames(values);
  }

  function handleCPFPersonalDataChange(event: ChangeEvent<HTMLInputElement>) {
    let value = event.target.value.replace(/[^\d]/g, "");

    value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");

    form.setValue("cpf", value);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-6"
      >
        <h2 className="w-full text-center text-2xl sm:text-3xl text-foreground font-semibold mb-12">
          Dados Pessoais
        </h2>

        <div className="w-full flex flex-col gap-12">
          <div className="w-full flex flex-col gap-4">
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-between">
                    <FormLabel className="text-foreground text-sm">
                      Primeiro nome (Conforme passaporte)*
                    </FormLabel>

                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-between">
                    <FormLabel className="text-foreground text-sm">
                      Sobrenome (Conforme passaporte)*
                    </FormLabel>

                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-between">
                    <FormLabel className="text-foreground text-sm">
                      CPF*
                    </FormLabel>

                    <FormControl>
                      <Input
                        maxLength={14}
                        value={field.value}
                        ref={field.ref}
                        name={field.name}
                        onBlur={field.onBlur}
                        onChange={handleCPFPersonalDataChange}
                      />
                    </FormControl>

                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="otherNamesConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Possui outros nomes? (Solteira/Nome
                      Profissional/Religioso/etc...)
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

              <div
                className={cn(
                  "w-full bg-secondary p-4 flex flex-col space-y-3",
                  {
                    hidden: otherNamesConfirmationValue === "Não",
                  },
                )}
              >
                <label
                  htmlFor="otherNames"
                  className="text-sm font-medium text-foreground"
                >
                  Outro nome
                </label>

                <div className="flex flex-col gap-4 w-full">
                  {Array.from(Array(otherNamesIndex).keys()).map((i) => (
                    <div
                      key={i}
                      className="flex gap-2 justify-between items-end"
                    >
                      <Input
                        value={otherNames[i]}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleOtherNamesChange(e, i)
                        }
                      />

                      {i === otherNamesIndex - 1 ? (
                        <Button
                          type="button"
                          size="xl"
                          className="px-3"
                          disabled={otherNames[otherNames.length - 1] === ""}
                          onClick={handleAddOtherNamesInput}
                        >
                          <Plus />
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          size="xl"
                          className="px-3"
                          onClick={() => handleRemoveOtherNamesInput(i)}
                        >
                          <Trash />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                {otherNamesError.length > 0 && (
                  <span className="text-sm text-red-500">
                    {otherNamesError}
                  </span>
                )}
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="sex"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Sexo*</FormLabel>

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a opção" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        <SelectItem value="Masculino">Masculino</SelectItem>

                        <SelectItem value="Feminino">Feminino</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="maritalStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Estado civil*
                    </FormLabel>

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a opção" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        <SelectItem value="Casado(a)">Casado(a)</SelectItem>

                        <SelectItem value="União Estável">
                          União Estável
                        </SelectItem>

                        <SelectItem value="Parceiro(a) Doméstico(a)">
                          Parceiro(a) Doméstico(a)
                        </SelectItem>

                        <SelectItem value="Solteiro(a)">Solteiro(a)</SelectItem>

                        <SelectItem value="Viúvo(a)">Viúvo(a)</SelectItem>

                        <SelectItem value="Divorciado(a)">
                          Divorciado(a)
                        </SelectItem>

                        <SelectItem value="Separado(a)">Separado(a)</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Data de nascimento*
                    </FormLabel>

                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full h-12 pl-3 text-left border-secondary font-normal group",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP", { locale: ptBR })
                            ) : (
                              <span className="text-foreground opacity-80 group-hover:text-white group-hover:opacity-100">
                                Selecione a data
                              </span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>

                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          locale={ptBR}
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          captionLayout="dropdown"
                          fromYear={1900}
                          toYear={currentYear}
                          classNames={{
                            day_hidden: "invisible",
                            dropdown:
                              "px-2 py-1.5 bg-[#2E3675]/80 text-white text-sm focus-visible:outline-none",
                            caption_dropdowns: "flex gap-3",
                            vhidden: "hidden",
                            caption_label: "hidden",
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="birthCity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Cidade que nasceu*
                    </FormLabel>

                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="birthState"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Estado que nasceu*
                    </FormLabel>

                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="birthCountry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      País que nasceu*
                    </FormLabel>

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
                control={form.control}
                name="originCountry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      País de origem (nacionalidade)*
                    </FormLabel>

                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="otherNationalityConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Possui outra nacionalidade?
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
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="otherNationalityPassport"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Se respondeu sim anteriormente, digite o número do
                      passaporte dessa nacionalidade
                    </FormLabel>

                    <FormControl>
                      <Input
                        disabled={otherNationalityConfirmation === "Não"}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="otherCountryResidentConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      É residente de um país diferente da sua nacionalidade?
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
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="USSocialSecurityNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      U.S. Social Security Number (aplicável somente para quem
                      já trabalhou nos EUA)
                    </FormLabel>

                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="USTaxpayerIDNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      U.S. Taxpayer ID Number (aplicável somente para quem já
                      trabalhou nos EUA)
                    </FormLabel>

                    <FormControl>
                      <Input {...field} />
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
