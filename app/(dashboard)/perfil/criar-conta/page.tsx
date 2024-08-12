"use client";

//TODO: adicionar datas futuras para CASV e Data de Entrevista
//TODO: adicionar campo de valor e status do pagamento somente no modo admin, não aparecer para colaborador

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CurrencyInput from "react-currency-input-field";
import { useState, useEffect, ChangeEvent } from "react";
import { CalendarIcon, CircleDollarSign, Edit, Trash2 } from "lucide-react";
import PhoneInput from "react-phone-number-input";

import { useSubmitConfirmationStore } from "@/constants/stores/useSubmitConfirmationStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format, getYear } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { SubmitConfirmationModal } from "@/app/(dashboard)/perfil/criar-conta/components/submit-confirmation-modal";

import "react-phone-number-input/style.css";
import { trpc } from "@/lib/trpc-client";

const profileFormSchema = z.object({
  profileName: z
    .string({
      required_error: "Nome do perfil é obrigatório",
      invalid_type_error: "Nome do perfil inválido",
    })
    .min(1, { message: "Nome do perfil é obrigatório" })
    .min(6, { message: "Nome do perfil precisa ter no mínimo 6 caracteres" }),
  profileCpf: z
    .string({
      required_error: "CPF do perfil é obrigatório",
      invalid_type_error: "CPF do perfil inválido",
    })
    .refine((val) => val.length > 0 && val.length === 14, {
      message: "CPF inválido",
    }),
  profileAddress: z.string({
    required_error: "Endereço do perfil é obrigatório",
    invalid_type_error: "Endereço do perfil inválido",
  }),
  birthDate: z
    .date({
      required_error: "Data de nascimento é obrigatório",
      invalid_type_error: "Data de nascimento inválida",
    })
    .optional(),
  passport: z.string({
    required_error: "Passaporte é obrigatório",
    invalid_type_error: "Passaporte inválido",
  }),
  visaType: z
    .enum(["Renovação", "Primeiro Visto", ""], {
      message: "Tipo de visto inválido",
    })
    .refine((val) => val.length !== 0, {
      message: "Tipo de visto é obrigatório",
    }),
  visaClass: z
    .enum(
      [
        "B1 Babá",
        "B1/B2 Turismo",
        "O1 Capacidade Extraordinária",
        "O2 Estrangeiro Acompanhante/Assistente",
        "O3 Cônjuge ou Filho de um O1 ou O2",
        "",
      ],
      { message: "Classe de visto inválida" },
    )
    .refine((val) => val.length !== 0, {
      message: "Classe de visto é obrigatória",
    }),
  issuanceDate: z
    .date({
      required_error: "Data de Emissão é obrigatória",
      invalid_type_error: "Data de Emissão inválida",
    })
    .optional(),
  expireDate: z
    .date({
      required_error: "Data de Expiração é obrigatória",
      invalid_type_error: "Data de Expiração inválida",
    })
    .optional(),
  DSNumber: z.string({
    required_error: "Barcode é obrigatório",
    invalid_type_error: "Barcode inválido",
  }),
  CASVDate: z
    .date({
      required_error: "Data do CASV é obrigatória",
      invalid_type_error: "Data do CASV inválida",
    })
    .optional(),
  interviewDate: z
    .date({
      required_error: "Data da entrevista é obrigatória",
      invalid_type_error: "Data da entrevista inválida",
    })
    .optional(),
});

const accountFormSchema = z
  .object({
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
      .refine(
        (val) => !val || (val && (val.length === 0 || val.length === 14)),
        {
          message: "Celular inválido",
        },
      ),
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
    profiles: z.array(profileFormSchema).min(1, {
      message: "Precisa ter pelo menos um perfil vinculado a conta",
    }),
  })
  .superRefine(({ password, passwordConfirm }, ctx) => {
    if (passwordConfirm !== password) {
      ctx.addIssue({
        path: ["passwordConfirm"],
        code: "custom",
        message: "As senhas não coincidem, verifique e tente novamente",
      });
    }
  });

export type formValue = z.infer<typeof accountFormSchema>;

export default function CreateAccountPage() {
  const [isProfileValidating, setIsProfileValidating] =
    useState<boolean>(false);
  const [isProfileSameAsAccount, setIsProfileSameAsAccount] =
    useState<string>("true");
  const [currentProfile, setCurrentProfile] = useState<number>(0);

  const { openModal, setFormValues } = useSubmitConfirmationStore();

  const form = useForm<z.infer<typeof accountFormSchema>>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      name: "",
      cpf: "",
      cel: "",
      address: "",
      email: "",
      password: "",
      passwordConfirm: "",
      budget: "0",
      budgetPaid: "",
      scheduleAccount: "",
      profiles: [
        {
          birthDate: undefined,
          CASVDate: undefined,
          DSNumber: "",
          interviewDate: undefined,
          passport: "",
          profileAddress: "",
          profileCpf: "",
          profileName: "",
          visaClass: "",
          visaType: "",
        },
      ],
    },
  });

  const name = form.watch("name");
  const cpf = form.watch("cpf");
  const address = form.watch("address");
  const profiles = form.watch("profiles");
  const cel = form.watch("cel");
  const visaType = form.watch(`profiles.${currentProfile}.visaType`);
  const currentYear = getYear(new Date());
  // const { fields } = useFieldArray({ name: "profiles", control: form.control }); TODO: exemplos para os formulário, adiciona fields dinamicamente

  useEffect(() => {
    setCurrentProfile(profiles.length - 1);
    console.log(profiles);
  }, [profiles]);

  useEffect(() => {
    console.log(cel);
  }, [cel]);

  useEffect(() => {
    if (JSON.parse(isProfileSameAsAccount)) {
      form.setValue(`profiles.${currentProfile}.profileName`, name);
      form.setValue(`profiles.${currentProfile}.profileCpf`, cpf);
      form.setValue(`profiles.${currentProfile}.profileAddress`, address);
    }
  }, [isProfileSameAsAccount, name, cpf, address]);

  useEffect(() => {
    form.setValue(`profiles.${currentProfile}.profileName`, "");
    form.setValue(`profiles.${currentProfile}.profileCpf`, "");
    form.setValue(`profiles.${currentProfile}.birthDate`, undefined);
    form.setValue(`profiles.${currentProfile}.profileAddress`, "");
    form.setValue(`profiles.${currentProfile}.passport`, "");
    form.setValue(`profiles.${currentProfile}.visaType`, "");
    form.setValue(`profiles.${currentProfile}.visaClass`, "");
    form.setValue(`profiles.${currentProfile}.issuanceDate`, undefined);
    form.setValue(`profiles.${currentProfile}.expireDate`, undefined);
    form.setValue(`profiles.${currentProfile}.DSNumber`, "");
    form.setValue(`profiles.${currentProfile}.CASVDate`, undefined);
    form.setValue(`profiles.${currentProfile}.interviewDate`, undefined);

    form.clearErrors(`profiles.${currentProfile}.profileName`);
    form.clearErrors(`profiles.${currentProfile}.profileCpf`);
    form.clearErrors(`profiles.${currentProfile}.birthDate`);
    form.clearErrors(`profiles.${currentProfile}.profileAddress`);
    form.clearErrors(`profiles.${currentProfile}.passport`);
    form.clearErrors(`profiles.${currentProfile}.visaType`);
    form.clearErrors(`profiles.${currentProfile}.visaClass`);
    form.clearErrors(`profiles.${currentProfile}.DSNumber`);
    form.clearErrors(`profiles.${currentProfile}.CASVDate`);
    form.clearErrors(`profiles.${currentProfile}.interviewDate`);
  }, [currentProfile]);

  function handleCPF(event: ChangeEvent<HTMLInputElement>) {
    let value = event.target.value.replace(/[^\d]/g, "");

    value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");

    return value;
  }

  function addProfile() {
    form
      .trigger([
        `profiles.${currentProfile}.profileName`,
        `profiles.${currentProfile}.profileCpf`,
        `profiles.${currentProfile}.birthDate`,
        `profiles.${currentProfile}.profileAddress`,
        `profiles.${currentProfile}.passport`,
        `profiles.${currentProfile}.visaType`,
        `profiles.${currentProfile}.visaClass`,
        `profiles.${currentProfile}.issuanceDate`,
        `profiles.${currentProfile}.expireDate`,
        `profiles.${currentProfile}.DSNumber`,
        `profiles.${currentProfile}.CASVDate`,
        `profiles.${currentProfile}.interviewDate`,
      ])
      .then(() => {
        if (Object.keys(form.formState.errors).length === 0) {
          form.setValue("profiles", [
            ...profiles,
            {
              profileName: "",
              profileCpf: "",
              birthDate: undefined,
              profileAddress: "",
              visaType: "",
              visaClass: "",
              issuanceDate: undefined,
              expireDate: undefined,
              DSNumber: "",
              CASVDate: undefined,
              interviewDate: undefined,
              passport: "",
            },
          ]);

          setCurrentProfile((prev: number) => prev + 1);
        }
      });

    setIsProfileValidating(true);
  }

  function handleDeleteProfile(index: number) {
    const profileUpdated = profiles.filter((_, idx) => idx !== index);

    form.setValue("profiles", profileUpdated);

    setCurrentProfile((prev) => prev - 1);
  }

  function onSubmit() {
    if (profiles.length > 0) {
      form
        .trigger(
          [
            "name",
            "cpf",
            "cel",
            "address",
            "email",
            "password",
            "passwordConfirm",
            "budget",
            "budgetPaid",
            "scheduleAccount",
          ],
          {
            shouldFocus: true,
          },
        )
        .then(() => {
          if (Object.keys(form.formState.errors).length === 0) {
            const values = form.getValues();

            values.profiles = values.profiles.filter(
              (profile, index) => index !== values.profiles.length - 1,
            );

            console.log(values);

            setFormValues(values);

            setTimeout(() => {
              openModal();
            }, 300);
          }
        });
    }
  }

  return (
    <div className="w-[calc(100%-250px)] px-6 sm:px-16 lg:ml-[250px] lg:px-40">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-6 mt-6 lg:mt-12">
        Cadastro da Conta
      </h1>

      <Form {...form}>
        <form className="flex flex-col gap-y-12">
          <div className="w-full flex flex-col gap-6">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome*</FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Insira o nome do cliente"
                        {...field}
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
                  <FormItem>
                    <FormLabel>CPF</FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Insira o CPF do cliente"
                        maxLength={14}
                        ref={field.ref}
                        name={field.name}
                        value={field.value}
                        onBlur={field.onBlur}
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
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-[1fr_250px] gap-6">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Endereço</FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Insira o endereço completo do cliente"
                        {...field}
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
                  <FormItem>
                    <FormLabel>Celular</FormLabel>

                    <FormControl>
                      <PhoneInput
                        limitMaxLength
                        smartCaret={false}
                        placeholder="Insira o celular do cliente"
                        defaultCountry="BR"
                        className={cn(
                          "flex h-12 w-full border border-muted transition duration-300 bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary hover:border-border disabled:hover:border-muted disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted",
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
                  <FormItem>
                    <FormLabel>E-mail*</FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Insira o e-mail do cliente"
                        {...field}
                      />
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
                    <FormLabel>Senha*</FormLabel>

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
                  <FormItem>
                    <FormLabel>Confirmar Senha*</FormLabel>

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
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor do Serviço*</FormLabel>

                    <FormControl>
                      <div className="h-12 flex items-center gap-2 border border-muted transition duration-300 bg-background px-3 py-2 text-sm group focus-within:border-primary hover:border-border">
                        <CircleDollarSign
                          className="w-5 h-5 text-border flex-shrink-0"
                          strokeWidth={1.5}
                        />

                        <div className="w-[2px] flex-shrink-0 h-full bg-muted rounded-full" />

                        <CurrencyInput
                          placeholder="Insira o valor do serviço"
                          onValueChange={(value, name) =>
                            form.setValue(name as "budget", value ?? "0")
                          }
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

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          className={cn(
                            field.value === "" &&
                              "[&>span]:text-muted-foreground",
                          )}
                        >
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
                  <FormItem>
                    <FormLabel>Conta de Agendamento*</FormLabel>

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          className={cn(
                            field.value === "" &&
                              "[&>span]:text-muted-foreground",
                          )}
                        >
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

          <div className="w-full h-px bg-muted" />

          <div className="w-full flex flex-col gap-9">
            <h2 className="text-xl font-semibold sm:text-2xl">
              Cadastro do Perfil
            </h2>

            {profiles.length > 1 ? (
              <div className="w-full grid grid-cols-1 gap-12 lg:grid-cols-2">
                {profiles.slice(0, currentProfile).map((profile, index) => (
                  <div
                    key={index}
                    className="w-full bg-card p-8 flex items-center justify-between"
                  >
                    <span className="text-xl font-semibold text-card-foreground text-left">
                      {profile.profileName}
                    </span>

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteProfile(index)}
                    >
                      <Trash2 className="text-card-foreground w-6 h-6" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <RadioGroup
                defaultValue={isProfileSameAsAccount}
                onValueChange={setIsProfileSameAsAccount}
                className="flex flex-col gap-4"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="true" id="true" />
                  <Label htmlFor="true">Usar mesmos dados da conta</Label>
                </div>

                <div className="flex items-center gap-2">
                  <RadioGroupItem value="false" id="false" />
                  <Label htmlFor="false">Inserir novos dados</Label>
                </div>
              </RadioGroup>
            )}

            <div className="w-full flex flex-col gap-6">
              <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name={`profiles.${currentProfile}.profileName`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome*</FormLabel>

                      <FormControl>
                        <Input
                          placeholder="Insira o nome do perfil"
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          ref={field.ref}
                          name={field.name}
                          value={field.value}
                          disabled={
                            JSON.parse(isProfileSameAsAccount) &&
                            profiles.length === 1
                          }
                        />
                      </FormControl>

                      <FormMessage className="font-normal text-destructive" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`profiles.${currentProfile}.profileCpf`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CPF*</FormLabel>

                      <FormControl>
                        <Input
                          placeholder="Insira o CPF do perfil"
                          maxLength={14}
                          ref={field.ref}
                          name={field.name}
                          value={field.value}
                          onBlur={field.onBlur}
                          onChange={(event) => {
                            const newValue = handleCPF(event);

                            form.setValue(
                              `profiles.${currentProfile}.profileCpf`,
                              newValue,
                            );
                          }}
                          disabled={
                            JSON.parse(isProfileSameAsAccount) &&
                            profiles.length === 1
                          }
                        />
                      </FormControl>

                      <FormMessage className="font-normal text-destructive" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`profiles.${currentProfile}.birthDate`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data de Nascimento</FormLabel>

                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="date"
                              className={cn(
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              <CalendarIcon
                                strokeWidth={1.5}
                                className="h-5 w-5 text-muted-foreground flex-shrink-0"
                              />

                              <div className="w-[2px] h-full bg-muted rounded-full flex-shrink-0" />

                              {field.value ? (
                                format(field.value, "PPP", {
                                  locale: ptBR,
                                })
                              ) : (
                                <span className="text-muted-foreground">
                                  Selecione a data
                                </span>
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>

                        <PopoverContent
                          className="w-auto p-0 bg-background"
                          align="start"
                        >
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
                                "px-2 py-1.5 bg-muted text-primary text-sm focus-visible:outline-none",
                              caption_dropdowns: "flex gap-3",
                              vhidden: "hidden",
                              caption_label: "hidden",
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>

                      <FormMessage className="font-normal text-destructive" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-full grid grid-cols-1 sm:grid-cols-[calc(70%-12px)_calc(30%-12px)] gap-6">
                <FormField
                  control={form.control}
                  name={`profiles.${currentProfile}.profileAddress`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Endereço</FormLabel>

                      <FormControl>
                        <Input
                          placeholder="Insira o endereço do perfil"
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          ref={field.ref}
                          name={field.name}
                          value={field.value}
                          disabled={
                            JSON.parse(isProfileSameAsAccount) &&
                            profiles.length === 1
                          }
                        />
                      </FormControl>

                      <FormMessage className="font-normal text-destructive" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`profiles.${currentProfile}.passport`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Passaporte</FormLabel>

                      <FormControl>
                        <Input placeholder="Insira o passaporte" {...field} />
                      </FormControl>

                      <FormMessage className="font-normal text-destructive" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name={`profiles.${currentProfile}.visaType`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Visto*</FormLabel>

                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger
                            className={cn(
                              field.value === "" &&
                                "[&>span]:text-muted-foreground",
                            )}
                          >
                            <SelectValue placeholder="Selecione o tipo de visto" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          <SelectItem value="Renovação">Renovação</SelectItem>
                          <SelectItem value="Primeiro Visto">
                            Primeiro Visto
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage className="font-normal text-destructive" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`profiles.${currentProfile}.visaClass`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Classe do Visto*</FormLabel>

                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger
                            className={cn(
                              field.value === "" &&
                                "[&>span]:text-muted-foreground",
                            )}
                          >
                            <SelectValue placeholder="Selecione a classe do visto" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          <SelectItem value="B1 Babá">B1 Babá</SelectItem>

                          <SelectItem value="B1/B2 Turismo">
                            B1/B2 Turismo
                          </SelectItem>

                          <SelectItem value="O1 Capacidade Extraordinária">
                            O1 Capacidade Extraordinária
                          </SelectItem>

                          <SelectItem value="O2 Estrangeiro Acompanhante/Assistente">
                            O2 Estrangeiro Acompanhante/Assistente
                          </SelectItem>

                          <SelectItem value="O3 Cônjuge ou Filho de um O1 ou O2">
                            O3 Cônjuge ou Filho de um O1 ou O2
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage className="font-normal text-destructive" />
                    </FormItem>
                  )}
                />
              </div>

              <div
                className={cn("w-full grid grid-cols-1 sm:grid-cols-2 gap-6", {
                  hidden: visaType !== "Renovação",
                })}
              >
                <FormField
                  control={form.control}
                  name={`profiles.${currentProfile}.issuanceDate`}
                  render={({ field }) => (
                    <FormItem className="sm:order-1 xl:order-2">
                      <FormLabel>Data de Emissão</FormLabel>

                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="date"
                              className={cn(
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              <CalendarIcon
                                strokeWidth={1.5}
                                className="h-5 w-5 text-muted-foreground flex-shrink-0"
                              />

                              <div className="w-[2px] h-full bg-muted rounded-full flex-shrink-0" />

                              {field.value ? (
                                format(field.value, "PPP", {
                                  locale: ptBR,
                                })
                              ) : (
                                <span className="text-muted-foreground">
                                  Selecione a data de emissão
                                </span>
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>

                        <PopoverContent
                          className="w-auto p-0 bg-background"
                          align="start"
                        >
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
                                "px-2 py-1.5 bg-muted text-primary text-sm focus-visible:outline-none",
                              caption_dropdowns: "flex gap-3",
                              vhidden: "hidden",
                              caption_label: "hidden",
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>

                      <FormMessage className="font-normal text-destructive" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`profiles.${currentProfile}.expireDate`}
                  render={({ field }) => (
                    <FormItem className="sm:order-2 xl:order-3">
                      <FormLabel>Data de Expiração</FormLabel>

                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="date"
                              className={cn(
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              <CalendarIcon
                                strokeWidth={1.5}
                                className="h-5 w-5 text-muted-foreground flex-shrink-0"
                              />

                              <div className="w-[2px] h-full bg-muted rounded-full flex-shrink-0" />

                              {field.value ? (
                                format(field.value, "PPP", {
                                  locale: ptBR,
                                })
                              ) : (
                                <span className="text-muted-foreground">
                                  Selecione a data de expiração
                                </span>
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>

                        <PopoverContent
                          className="w-auto p-0 bg-background"
                          align="start"
                        >
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
                                "px-2 py-1.5 bg-muted text-primary text-sm focus-visible:outline-none",
                              caption_dropdowns: "flex gap-3",
                              vhidden: "hidden",
                              caption_label: "hidden",
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>

                      <FormMessage className="font-normal text-destructive" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name={`profiles.${currentProfile}.DSNumber`}
                  render={({ field }) => (
                    <FormItem className="sm:order-3 xl:order-1">
                      <FormLabel>Barcode</FormLabel>

                      <FormControl>
                        <Input placeholder="Insira o número da DS" {...field} />
                      </FormControl>

                      <FormMessage className="font-normal text-destructive" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`profiles.${currentProfile}.CASVDate`}
                  render={({ field }) => (
                    <FormItem className="sm:order-1 xl:order-2">
                      <FormLabel>CASV</FormLabel>

                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="date"
                              className={cn(
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              <CalendarIcon
                                strokeWidth={1.5}
                                className="h-5 w-5 text-muted-foreground flex-shrink-0"
                              />

                              <div className="w-[2px] h-full bg-muted rounded-full flex-shrink-0" />

                              {field.value ? (
                                format(field.value, "PPP", {
                                  locale: ptBR,
                                })
                              ) : (
                                <span className="text-muted-foreground">
                                  Selecione a data do CASV
                                </span>
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>

                        <PopoverContent
                          className="w-auto p-0 bg-background"
                          align="start"
                        >
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
                                "px-2 py-1.5 bg-muted text-primary text-sm focus-visible:outline-none",
                              caption_dropdowns: "flex gap-3",
                              vhidden: "hidden",
                              caption_label: "hidden",
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>

                      <FormMessage className="font-normal text-destructive" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`profiles.${currentProfile}.interviewDate`}
                  render={({ field }) => (
                    <FormItem className="sm:order-2 xl:order-3">
                      <FormLabel>Entrevista</FormLabel>

                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="date"
                              className={cn(
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              <CalendarIcon
                                strokeWidth={1.5}
                                className="h-5 w-5 text-muted-foreground flex-shrink-0"
                              />

                              <div className="w-[2px] h-full bg-muted rounded-full flex-shrink-0" />

                              {field.value ? (
                                format(field.value, "PPP", {
                                  locale: ptBR,
                                })
                              ) : (
                                <span className="text-muted-foreground">
                                  Selecione a data da entrevista
                                </span>
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>

                        <PopoverContent
                          className="w-auto p-0 bg-background"
                          align="start"
                        >
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
                                "px-2 py-1.5 bg-muted text-primary text-sm focus-visible:outline-none",
                              caption_dropdowns: "flex gap-3",
                              vhidden: "hidden",
                              caption_label: "hidden",
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>

                      <FormMessage className="font-normal text-destructive" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 mb-12">
            <Button
              onClick={addProfile}
              type="button"
              variant="outline"
              size="xl"
              className="w-full order-2 sm:order-1 sm:w-fit"
            >
              Adicionar Perfil
            </Button>

            <Button
              onClick={onSubmit}
              disabled={profiles.length === 1}
              type="button"
              variant="confirm"
              size="xl"
              className="w-full order-1 sm:order-2 sm:w-fit"
            >
              Enviar
            </Button>
          </div>
        </form>
      </Form>

      <SubmitConfirmationModal />
    </div>
  );
}
