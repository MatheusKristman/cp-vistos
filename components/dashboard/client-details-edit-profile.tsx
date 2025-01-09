"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { FormAnimation } from "@/constants/animations/modal";
import useClientDetailsModalStore from "@/constants/stores/useClientDetailsModalStore";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format, getYear } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";

import "react-phone-number-input/style.css";
import { ChangeEvent } from "react";
import { CalendarIcon, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc-client";
import { toast } from "sonner";

interface Props {
  handleClose: () => void;
}

const formSchema = z
  .object({
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
        invalid_type_error: "Data de nascimento inválida",
      })
      .optional(),
    CASVDate: z
      .date({
        invalid_type_error: "Data do CASV inválida",
      })
      .optional(),
    taxDate: z
      .date({
        invalid_type_error: "Data da taxa inválida",
      })
      .optional(),
    shipping: z
      .enum(["A Verificar", "Retirada", "SEDEX", "C-Retirada", "C-SEDEX", ""], {
        message: "Opção de envio inválida",
      })
      .optional(),
    interviewDate: z
      .date({
        invalid_type_error: "Data da entrevista inválida",
      })
      .optional(),
    interviewTime: z
      .string({
        invalid_type_error: "Horário da entrevista inválido",
      })
      .optional(),
    passport: z
      .string({
        invalid_type_error: "Passaporte inválido",
      })
      .optional(),
    visaType: z
      .enum(["Renovação", "Primeiro Visto", ""], {
        message: "Tipo de Visto inválido",
      })
      .optional(),
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
      .optional(),
    category: z
      .enum(["Visto Americano", "Passaporte", "E-TA", ""])
      .refine((val) => val.length !== 0, {
        message: "Categoria é obrigatória",
      }),
    issuanceDate: z
      .date({
        invalid_type_error: "Data de Emissão inválida",
      })
      .optional(),
    expireDate: z
      .date({
        invalid_type_error: "Data de Expiração inválida",
      })
      .optional(),
    DSNumber: z
      .string({
        invalid_type_error: "Barcode inválido",
      })
      .optional(),
    responsibleCpf: z
      .string({ invalid_type_error: "CPF do responsável inválido" })
      .optional(),
    protocol: z
      .string({
        invalid_type_error: "Barcode inválido",
      })
      .optional(),
    paymentStatus: z
      .enum(["Pendente", "Pago", ""], {
        message: "Status de pagamento inválido",
      })
      .optional(),
    scheduleDate: z
      .date({
        invalid_type_error: "Data de Agendamento inválida",
      })
      .optional(),
    scheduleLocation: z
      .string({
        invalid_type_error: "Local do agendamento inválido",
      })
      .optional(),
    entryDate: z
      .date({
        invalid_type_error: "Data de entrada inválida",
      })
      .optional(),
    process: z
      .string({
        invalid_type_error: "Processo inválido",
      })
      .optional(),
    ETAStatus: z
      .enum(["Em Análise", "Aprovado", "Reprovado", ""], {
        message: "Status inválido",
      })
      .optional(),
  })
  .superRefine(
    ({ category, visaType, visaClass, interviewDate, interviewTime }, ctx) => {
      if (
        category === "Visto Americano" &&
        (visaType === "" || visaType === undefined)
      ) {
        ctx.addIssue({
          path: ["visaType"],
          code: "custom",
          message: "Tipo do visto é obrigatório",
        });
      }

      if (
        category === "Visto Americano" &&
        (visaClass === "" || visaClass === undefined)
      ) {
        ctx.addIssue({
          path: ["visaClass"],
          code: "custom",
          message: "Classe do visto é obrigatória",
        });
      }

      if (
        category === "Visto Americano" &&
        interviewDate &&
        (interviewTime === "" ||
          interviewTime === undefined ||
          /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])(:[0-5][0-9])?$/.test(
            interviewTime,
          ) === false)
      ) {
        ctx.addIssue({
          path: ["interviewTime"],
          code: "custom",
          message: "Horário da entrevista é obrigatório",
        });
      }
    },
  );

export function ClientDetailsEditProfile({ handleClose }: Props) {
  const { unsetToEditProfile, setToResume, client, setClient } =
    useClientDetailsModalStore();

  const utils = trpc.useUtils();

  const { mutate: editProfile, isPending } =
    trpc.userRouter.editProfile.useMutation({
      onSuccess: (data) => {
        toast.success(data.message);

        utils.userRouter.getActiveClients.invalidate();
        utils.userRouter.getProspectsClients.invalidate();
        utils.userRouter.getArchivedClients.invalidate();

        setClient(data.clientUpdated);
        handleBack();
      },
      onError: (error) => {
        console.log(error);

        toast.error("Ocorreu um erro ao editar o perfil");
      },
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profileAddress: client?.address ?? "",
      profileCpf: client?.cpf ?? "",
      profileName: client?.name ?? "",
      birthDate: client?.birthDate ?? undefined,
      CASVDate: client?.CASVDate ?? undefined,
      taxDate: client?.taxDate ?? undefined,
      shipping:
        client?.shipping === "pickup"
          ? "Retirada"
          : client?.shipping === "sedex"
            ? "SEDEX"
            : client?.shipping === "c_pickup"
              ? "C-Retirada"
              : client?.shipping === "c_sedex"
                ? "C-SEDEX"
                : client?.shipping === "verifying"
                  ? "A Verificar"
                  : "",
      interviewDate: client?.interviewDate ?? undefined,
      interviewTime: client?.interviewTime ?? "",
      passport: client?.passport ?? "",
      visaType:
        client?.visaType === "primeiro_visto"
          ? "Primeiro Visto"
          : client?.visaType === "renovacao"
            ? "Renovação"
            : "",
      visaClass:
        client?.visaClass === "B1"
          ? "B1 Babá"
          : client?.visaClass === "B2_B1"
            ? "B1/B2 Turismo"
            : client?.visaClass === "O1"
              ? "O1 Capacidade Extraordinária"
              : client?.visaClass === "O2"
                ? "O2 Estrangeiro Acompanhante/Assistente"
                : client?.visaClass === "O3"
                  ? "O3 Cônjuge ou Filho de um O1 ou O2"
                  : "",
      category:
        client?.category === "american_visa"
          ? "Visto Americano"
          : client?.category === "passport"
            ? "Passaporte"
            : client?.category === "e_ta"
              ? "E-TA"
              : "",
      issuanceDate: client?.issuanceDate ?? undefined,
      expireDate: client?.expireDate ?? undefined,
      DSNumber: client?.DSNumber.toString() ?? "",
      responsibleCpf: client?.responsibleCpf ?? "",
      protocol: client?.protocol ?? "",
      paymentStatus:
        client?.paymentStatus === "pending"
          ? "Pendente"
          : client?.paymentStatus === "paid"
            ? "Pago"
            : "",
      scheduleDate: client?.scheduleDate ?? undefined,
      scheduleLocation: client?.scheduleLocation ?? "",
      entryDate: client?.entryDate ?? undefined,
      process: client?.process ?? "",
      ETAStatus:
        client?.ETAStatus === "analysis"
          ? "Em Análise"
          : client?.ETAStatus === "approved"
            ? "Aprovado"
            : client?.ETAStatus === "disapproved"
              ? "Reprovado"
              : "",
    },
  });

  const currentYear = getYear(new Date());
  const visaType = form.watch("visaType");
  const category = form.watch("category");

  function handleBack() {
    unsetToEditProfile();
    setToResume();
  }

  function handleCPF(event: ChangeEvent<HTMLInputElement>) {
    let value = event.target.value.replace(/[^\d]/g, "");

    value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");

    return value;
  }

  function handleTime(event: ChangeEvent<HTMLInputElement>) {
    let value = event.target.value.replace(/[^0-9:]/g, "");

    return value;
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!client) {
      return;
    }

    editProfile({ profileId: client.id, ...values });
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={FormAnimation}
    >
      <div className="w-full grid grid-cols-2 grid-rows-2 gap-4 mb-9 sm:flex sm:flex-row sm:items-center sm:justify-between">
        <Button
          onClick={handleBack}
          disabled={isPending}
          variant="link"
          size="icon"
          className="row-start-1 row-end-2"
        >
          <Image
            src="/assets/icons/arrow-left-dark.svg"
            alt="Voltar"
            width={24}
            height={24}
          />
        </Button>

        <h1 className="text-2xl font-semibold text-foreground text-center sm:text-3xl row-end-3 row-start-2 col-span-2">
          Editar Perfil
        </h1>

        <Button
          onClick={handleClose}
          disabled={isPending}
          variant="link"
          size="icon"
          className="row-start-1 row-end-2 justify-self-end"
        >
          <Image
            src="/assets/icons/cross-blue.svg"
            alt="Fechar"
            width={24}
            height={24}
          />
        </Button>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-9"
        >
          <div className="w-full flex flex-col gap-6">
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name={`profileName`}
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
                        disabled={isPending}
                      />
                    </FormControl>

                    <FormMessage className="font-normal text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`profileCpf`}
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

                          form.setValue("profileCpf", newValue);
                        }}
                        disabled={isPending}
                      />
                    </FormControl>

                    <FormMessage className="font-normal text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`birthDate`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data de Nascimento</FormLabel>

                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="date"
                            disabled={isPending}
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
                              format(field.value, "dd/MM/yyyy", {
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
                        className="w-auto p-0 bg-background z-[99999]"
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
                name={`profileAddress`}
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
                        disabled={isPending}
                      />
                    </FormControl>

                    <FormMessage className="font-normal text-destructive" />
                  </FormItem>
                )}
              />

              {/* NOTE: Visivel somente para Visto Americano e E-TA */}
              <FormField
                control={form.control}
                name={`passport`}
                render={({ field }) => (
                  <FormItem
                    className={cn(
                      category !== "Visto Americano" &&
                        category !== "E-TA" &&
                        "hidden",
                    )}
                  >
                    <FormLabel>Passaporte</FormLabel>

                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Insira o passaporte"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="font-normal text-destructive" />
                  </FormItem>
                )}
              />
            </div>

            {/* NOTE: Visivel somente para Visto Americano */}
            <div
              className={cn(
                "w-full grid grid-cols-1 sm:grid-cols-2 gap-6",
                category !== "Visto Americano" && "hidden",
              )}
            >
              <FormField
                control={form.control}
                name={`visaType`}
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
                          disabled={isPending}
                          className={cn(
                            field.value === "" &&
                              "[&>span]:text-muted-foreground",
                          )}
                        >
                          <SelectValue placeholder="Selecione o tipo de visto" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent className="z-[99999]">
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
                name={`visaClass`}
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
                          disabled={isPending}
                          className={cn(
                            field.value === "" &&
                              "[&>span]:text-muted-foreground",
                          )}
                        >
                          <SelectValue placeholder="Selecione a classe do visto" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent className="z-[99999]">
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

            {/* NOTE: Visivel somente para Visto Americano */}
            <div
              className={cn("w-full grid grid-cols-1 sm:grid-cols-2 gap-6", {
                hidden:
                  visaType !== "Renovação" && category !== "Visto Americano",
              })}
            >
              <FormField
                control={form.control}
                name={`issuanceDate`}
                render={({ field }) => (
                  <FormItem className="sm:order-1 xl:order-2">
                    <FormLabel>Data de Emissão</FormLabel>

                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            disabled={isPending}
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
                        className="w-auto p-0 bg-background z-[99999]"
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
                name={`expireDate`}
                render={({ field }) => (
                  <FormItem className="sm:order-2 xl:order-3">
                    <FormLabel>Data de Expiração</FormLabel>

                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            disabled={isPending}
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
                        className="w-auto p-0 bg-background z-[99999]"
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

            {/* NOTE: Visivel somente para Visto Americano */}
            <div
              className={cn(
                "w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
                category !== "Visto Americano" && "hidden",
              )}
            >
              <FormField
                control={form.control}
                name={`DSNumber`}
                render={({ field }) => (
                  <FormItem className="sm:order-3 xl:order-1">
                    <FormLabel>Barcode</FormLabel>

                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Insira o número da DS"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="font-normal text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`CASVDate`}
                render={({ field }) => (
                  <FormItem className="sm:order-1 xl:order-2">
                    <FormLabel>CASV</FormLabel>

                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            disabled={isPending}
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
                              format(field.value, "dd/MM/yyyy", {
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
                        className="w-auto p-0 bg-background z-[99999]"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          locale={ptBR}
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date("2200-01-01") ||
                            date < new Date("1900-01-01")
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
                name={`taxDate`}
                render={({ field }) => (
                  <FormItem className="sm:order-1 xl:order-2">
                    <FormLabel>Data da taxa</FormLabel>

                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            disabled={isPending}
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
                              format(field.value, "dd/MM/yyyy", {
                                locale: ptBR,
                              })
                            ) : (
                              <span className="text-muted-foreground">
                                Selecione a data da taxa
                              </span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>

                      <PopoverContent
                        className="w-auto p-0 bg-background z-[99999]"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          locale={ptBR}
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date("2200-01-01") ||
                            date < new Date("1900-01-01")
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

            {/* NOTE: Visivel somente para Visto Americano */}
            <div
              className={cn(
                "w-full grid grid-cols-1 sm:grid-cols-3 gap-6",
                category !== "Visto Americano" && "hidden",
              )}
            >
              <FormField
                control={form.control}
                name={`shipping`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Opção de envio*</FormLabel>

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          disabled={isPending}
                          className={cn(
                            field.value === "" &&
                              "[&>span]:text-muted-foreground",
                          )}
                        >
                          <SelectValue placeholder="Selecione uma opção de envio" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent className="z-[99999]">
                        <SelectItem value="A Verificar">A Verificar</SelectItem>

                        <SelectItem value="Retirada">Retirada</SelectItem>

                        <SelectItem value="SEDEX">SEDEX</SelectItem>

                        <SelectItem value="C-Retirada">C-Retirada</SelectItem>

                        <SelectItem value="C-SEDEX">C-SEDEX</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage className="font-normal text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`interviewDate`}
                render={({ field }) => (
                  <FormItem className="sm:order-2 xl:order-3">
                    <FormLabel>Entrevista</FormLabel>

                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            disabled={isPending}
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
                              format(field.value, "dd/MM/yyyy", {
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
                        className="w-auto p-0 bg-background z-[99999]"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          locale={ptBR}
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date("2200-01-01") ||
                            date < new Date("1900-01-01")
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
                name={`interviewTime`}
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2 sm:order-2 xl:order-3">
                    <FormLabel>Horário da Entrevista</FormLabel>

                    <FormControl>
                      <Input
                        className="!mt-auto"
                        placeholder="Insira o horário da entrevista"
                        maxLength={5}
                        ref={field.ref}
                        name={field.name}
                        value={field.value}
                        onBlur={field.onBlur}
                        disabled={isPending}
                        onChange={(event) => {
                          const newValue = handleTime(event);

                          form.setValue("interviewTime", newValue);
                        }}
                      />
                    </FormControl>

                    <FormMessage className="font-normal text-destructive" />
                  </FormItem>
                )}
              />
            </div>

            {/* NOTE: Apresenta somente em Passaporte */}
            <div
              className={cn(
                "w-full grid grid-cols-1 sm:grid-cols-3 gap-6",
                category !== "Passaporte" && "hidden",
              )}
            >
              <FormField
                control={form.control}
                name="responsibleCpf"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="truncate">
                      CPF do responsável
                    </FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Insira o CPF do responsável"
                        maxLength={14}
                        ref={field.ref}
                        name={field.name}
                        value={field.value}
                        onBlur={field.onBlur}
                        disabled={field.disabled}
                        onChange={(event) => {
                          const newValue = handleCPF(event);

                          form.setValue("responsibleCpf", newValue);
                        }}
                      />
                    </FormControl>

                    <FormMessage className="font-normal text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="protocol"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="truncate">Protocolo</FormLabel>

                    <FormControl>
                      <Input placeholder="Insira o protocolo" {...field} />
                    </FormControl>

                    <FormMessage className="font-normal text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="paymentStatus"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="truncate">
                      Status do pagamento
                    </FormLabel>

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
                        <SelectItem value="Pendente">Pendente</SelectItem>

                        <SelectItem value="Pago">Pago</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage className="font-normal text-destructive" />
                  </FormItem>
                )}
              />
            </div>

            {/* NOTE: Apresenta somente em Passaporte */}
            <div
              className={cn(
                "w-full grid grid-cols-1 sm:grid-cols-3 gap-6",
                category !== "Passaporte" && "hidden",
              )}
            >
              <FormField
                control={form.control}
                name="scheduleDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="truncate">
                      Data do agendamento
                    </FormLabel>

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
                              <span className="text-muted-foreground truncate">
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

              <FormField
                control={form.control}
                name="scheduleLocation"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="truncate">
                      Local do agendamento
                    </FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Insira o local do agendamento"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="font-normal text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="entryDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="truncate">Data de entrada</FormLabel>

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
                              <span className="text-muted-foreground truncate">
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

            {/* NOTE: Apresenta somente em E-TA */}
            <div
              className={cn(
                "w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
                category !== "E-TA" && "hidden",
              )}
            >
              <FormField
                control={form.control}
                name="ETAStatus"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="truncate">Status</FormLabel>

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
                          <SelectValue placeholder="Selecione o status" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        <SelectItem value="Em Análise">Em Análise</SelectItem>

                        <SelectItem value="Aprovado">Aprovado</SelectItem>

                        <SelectItem value="Reprovado">Reprovado</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage className="font-normal text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="process"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="truncate">Processo</FormLabel>

                    <FormControl>
                      <Input placeholder="Insira o processo" {...field} />
                    </FormControl>

                    <FormMessage className="font-normal text-destructive" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="w-full flex flex-col-reverse gap-6 sm:flex-row">
            <Button
              disabled={isPending}
              type="button"
              variant="outline"
              size="xl"
              className="w-full sm:w-fit"
            >
              Cancelar
            </Button>

            <Button
              disabled={isPending}
              type="submit"
              size="xl"
              className="w-full sm:w-fit flex items-center gap-2"
            >
              {isPending ? (
                <>
                  <Loader2 className="animate-spin" />
                  Enviando
                </>
              ) : (
                <>Enviar</>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}
