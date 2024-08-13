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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
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

const formSchema = z.object({
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
      { message: "Classe de visto inválida" }
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

export function ClientDetailsEditProfile({ handleClose }: Props) {
  const { unsetToEditProfile, setToResume, client, setClient } = useClientDetailsModalStore();

  const utils = trpc.useUtils();

  const { mutate: editProfile, isPending } = trpc.userRouter.editProfile.useMutation({
    onSuccess: (data) => {
      toast.success(data.message);

      utils.userRouter.getClients.invalidate();

      setClient(data.clientUpdated);
    },
    onError: (error) => {
      console.log(error);

      toast.error("Ocorreu um erro ao editar o perfil");
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      birthDate: client?.birthDate ?? undefined,
      CASVDate: client?.CASVDate ?? undefined,
      DSNumber: client?.DSNumber.toString() ?? "",
      interviewDate: client?.interviewDate ?? undefined,
      passport: client?.passport ?? "",
      profileAddress: client?.address ?? "",
      profileCpf: client?.cpf ?? "",
      profileName: client?.name ?? "",
      issuanceDate: client?.issuanceDate ?? undefined,
      expireDate: client?.expireDate ?? undefined,
      visaClass:
        (client?.visaClass === "B1"
          ? "B1 Babá"
          : client?.visaClass === "B2_B1"
          ? "B1/B2 Turismo"
          : client?.visaClass === "O1"
          ? "O1 Capacidade Extraordinária"
          : client?.visaClass === "O2"
          ? "O2 Estrangeiro Acompanhante/Assistente"
          : client?.visaClass === "O3"
          ? "O3 Cônjuge ou Filho de um O1 ou O2"
          : "") ?? "",
      visaType:
        (client?.visaType === "primeiro_visto"
          ? "Primeiro Visto"
          : client?.visaType === "renovacao"
          ? "Renovação"
          : "") ?? "",
    },
  });
  const currentYear = getYear(new Date());
  const visaType = form.watch(`visaType`);

  function handleBack() {
    unsetToEditProfile();
    setToResume();
  }

  function handleCPF(event: ChangeEvent<HTMLInputElement>) {
    let value = event.target.value.replace(/[^\d]/g, "");

    value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");

    return value;
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!client) {
      return;
    }

    editProfile({ profileId: client.id, ...values });
  }

  return (
    <motion.div initial="initial" animate="animate" exit="exit" variants={FormAnimation}>
      <div className="w-full grid grid-cols-2 grid-rows-2 gap-4 mb-9 sm:flex sm:flex-row sm:items-center sm:justify-between">
        <Button onClick={handleBack} disabled={isPending} variant="link" size="icon" className="row-start-1 row-end-2">
          <Image src="/assets/icons/arrow-left-dark.svg" alt="Voltar" width={24} height={24} />
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
          <Image src="/assets/icons/cross-blue.svg" alt="Fechar" width={24} height={24} />
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-9">
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
                            className={cn(!field.value && "text-muted-foreground")}
                          >
                            <CalendarIcon strokeWidth={1.5} className="h-5 w-5 text-muted-foreground flex-shrink-0" />

                            <div className="w-[2px] h-full bg-muted rounded-full flex-shrink-0" />

                            {field.value ? (
                              format(field.value, "PPP", {
                                locale: ptBR,
                              })
                            ) : (
                              <span className="text-muted-foreground">Selecione a data</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>

                      <PopoverContent className="w-auto p-0 bg-background z-[99999]" align="start">
                        <Calendar
                          mode="single"
                          locale={ptBR}
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                          captionLayout="dropdown"
                          fromYear={1900}
                          toYear={currentYear}
                          classNames={{
                            day_hidden: "invisible",
                            dropdown: "px-2 py-1.5 bg-muted text-primary text-sm focus-visible:outline-none",
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

              <FormField
                control={form.control}
                name={`passport`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Passaporte</FormLabel>

                    <FormControl>
                      <Input disabled={isPending} placeholder="Insira o passaporte" {...field} />
                    </FormControl>

                    <FormMessage className="font-normal text-destructive" />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name={`visaType`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Visto*</FormLabel>

                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                      <FormControl>
                        <SelectTrigger
                          disabled={isPending}
                          className={cn(field.value === "" && "[&>span]:text-muted-foreground")}
                        >
                          <SelectValue placeholder="Selecione o tipo de visto" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent className="z-[99999]">
                        <SelectItem value="Renovação">Renovação</SelectItem>
                        <SelectItem value="Primeiro Visto">Primeiro Visto</SelectItem>
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

                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                      <FormControl>
                        <SelectTrigger
                          disabled={isPending}
                          className={cn(field.value === "" && "[&>span]:text-muted-foreground")}
                        >
                          <SelectValue placeholder="Selecione a classe do visto" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent className="z-[99999]">
                        <SelectItem value="B1 Babá">B1 Babá</SelectItem>

                        <SelectItem value="B1/B2 Turismo">B1/B2 Turismo</SelectItem>

                        <SelectItem value="O1 Capacidade Extraordinária">O1 Capacidade Extraordinária</SelectItem>

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
                            className={cn(!field.value && "text-muted-foreground")}
                          >
                            <CalendarIcon strokeWidth={1.5} className="h-5 w-5 text-muted-foreground flex-shrink-0" />

                            <div className="w-[2px] h-full bg-muted rounded-full flex-shrink-0" />

                            {field.value ? (
                              format(field.value, "PPP", {
                                locale: ptBR,
                              })
                            ) : (
                              <span className="text-muted-foreground">Selecione a data de emissão</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>

                      <PopoverContent className="w-auto p-0 bg-background z-[99999]" align="start">
                        <Calendar
                          mode="single"
                          locale={ptBR}
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                          captionLayout="dropdown"
                          fromYear={1900}
                          toYear={currentYear}
                          classNames={{
                            day_hidden: "invisible",
                            dropdown: "px-2 py-1.5 bg-muted text-primary text-sm focus-visible:outline-none",
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
                            className={cn(!field.value && "text-muted-foreground")}
                          >
                            <CalendarIcon strokeWidth={1.5} className="h-5 w-5 text-muted-foreground flex-shrink-0" />

                            <div className="w-[2px] h-full bg-muted rounded-full flex-shrink-0" />

                            {field.value ? (
                              format(field.value, "PPP", {
                                locale: ptBR,
                              })
                            ) : (
                              <span className="text-muted-foreground">Selecione a data de expiração</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>

                      <PopoverContent className="w-auto p-0 bg-background z-[99999]" align="start">
                        <Calendar
                          mode="single"
                          locale={ptBR}
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                          captionLayout="dropdown"
                          fromYear={1900}
                          toYear={currentYear}
                          classNames={{
                            day_hidden: "invisible",
                            dropdown: "px-2 py-1.5 bg-muted text-primary text-sm focus-visible:outline-none",
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
                name={`DSNumber`}
                render={({ field }) => (
                  <FormItem className="sm:order-3 xl:order-1">
                    <FormLabel>Barcode</FormLabel>

                    <FormControl>
                      <Input disabled={isPending} placeholder="Insira o número da DS" {...field} />
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
                            className={cn(!field.value && "text-muted-foreground")}
                          >
                            <CalendarIcon strokeWidth={1.5} className="h-5 w-5 text-muted-foreground flex-shrink-0" />

                            <div className="w-[2px] h-full bg-muted rounded-full flex-shrink-0" />

                            {field.value ? (
                              format(field.value, "PPP", {
                                locale: ptBR,
                              })
                            ) : (
                              <span className="text-muted-foreground">Selecione a data</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>

                      <PopoverContent className="w-auto p-0 bg-background z-[99999]" align="start">
                        <Calendar
                          mode="single"
                          locale={ptBR}
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                          captionLayout="dropdown"
                          fromYear={1900}
                          toYear={currentYear}
                          classNames={{
                            day_hidden: "invisible",
                            dropdown: "px-2 py-1.5 bg-muted text-primary text-sm focus-visible:outline-none",
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
                            className={cn(!field.value && "text-muted-foreground")}
                          >
                            <CalendarIcon strokeWidth={1.5} className="h-5 w-5 text-muted-foreground flex-shrink-0" />

                            <div className="w-[2px] h-full bg-muted rounded-full flex-shrink-0" />

                            {field.value ? (
                              format(field.value, "PPP", {
                                locale: ptBR,
                              })
                            ) : (
                              <span className="text-muted-foreground">Selecione a data</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>

                      <PopoverContent className="w-auto p-0 bg-background z-[99999]" align="start">
                        <Calendar
                          mode="single"
                          locale={ptBR}
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                          captionLayout="dropdown"
                          fromYear={1900}
                          toYear={currentYear}
                          classNames={{
                            day_hidden: "invisible",
                            dropdown: "px-2 py-1.5 bg-muted text-primary text-sm focus-visible:outline-none",
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

          <div className="w-full flex flex-col-reverse gap-6 sm:flex-row">
            <Button disabled={isPending} type="button" variant="outline" size="xl" className="w-full sm:w-fit">
              Cancelar
            </Button>

            <Button disabled={isPending} type="submit" size="xl" className="w-full sm:w-fit flex items-center gap-2">
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
