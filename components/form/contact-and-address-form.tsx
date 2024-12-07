"use client";

import PhoneInput from "react-phone-number-input";
import { ChangeEvent, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form as FormType } from "@prisma/client";

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
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ArrowRight, Loader2, Save } from "lucide-react";
import { trpc } from "@/lib/trpc-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useFormStore from "@/constants/stores/useFormStore";

const formSchema = z
  .object({
    address: z.string().min(1, { message: "Campo obrigatório" }),
    addressNumber: z.string().min(1, { message: "Campo obrigatório" }),
    complement: z.string(),
    district: z.string().min(1, { message: "Campo obrigatório" }),
    city: z.string().min(1, { message: "Campo obrigatório" }),
    state: z.string().min(1, { message: "Campo obrigatório" }),
    cep: z
      .string()
      .min(1, { message: "Campo obrigatório" })
      .min(9, { message: "CEP inválido" }),
    country: z.string().min(1, { message: "Campo obrigatório" }),
    postalAddressConfirmation: z.enum(["Sim", "Não"]),
    otherPostalAddress: z.string(),
    cel: z
      .string()
      .min(1, { message: "Campo obrigatório" })
      .min(14, { message: "Celular inválido" }),
    tel: z.string(),
    fiveYearsOtherTelConfirmation: z.enum(["Sim", "Não"]),
    otherTel: z.string(),
    email: z
      .string()
      .min(1, { message: "Campo obrigatório" })
      .email({ message: "E-mail inválido" }),
    fiveYearsOtherEmailConfirmation: z.enum(["Sim", "Não"]),
    otherEmail: z.union([
      z.literal(""),
      z.string().email({ message: "E-mail inválido" }),
    ]),
    facebook: z.string(),
    linkedin: z.string(),
    instagram: z.string(),
    othersSocialMedia: z.string(),
  })
  .superRefine(
    (
      {
        tel,
        postalAddressConfirmation,
        otherPostalAddress,
        fiveYearsOtherTelConfirmation,
        otherTel,
        fiveYearsOtherEmailConfirmation,
        otherEmail,
      },
      ctx,
    ) => {
      if (tel.length > 0 && tel.length !== 13) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Campo vazio, preencha para prosseguir",
          path: ["tel"],
        });
      }

      if (
        postalAddressConfirmation === "Sim" &&
        otherPostalAddress.length === 0
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Campo vazio, preencha para prosseguir",
          path: ["otherPostalAddress"],
        });
      }

      if (
        fiveYearsOtherTelConfirmation === "Sim" &&
        (otherTel === undefined || otherTel.length === 0)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Campo vazio, preencha para prosseguir",
          path: ["otherTel"],
        });
      }

      if (
        fiveYearsOtherEmailConfirmation === "Sim" &&
        (otherEmail === undefined || otherEmail.length === 0)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Campo vazio, preencha para prosseguir",
          path: ["otherEmail"],
        });
      }
    },
  );

interface Props {
  profileId: string;
  currentForm: FormType;
  isEditing: boolean;
}

export function ContactAndAddressForm({
  currentForm,
  profileId,
  isEditing,
}: Props) {
  const { redirectStep, setRedirectStep } = useFormStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: currentForm.address ? currentForm.address : "",
      addressNumber: currentForm.addressNumber ? currentForm.addressNumber : "",
      complement: currentForm.complement ? currentForm.complement : "",
      district: currentForm.district ? currentForm.district : "",
      city: currentForm.city ? currentForm.city : "",
      state: currentForm.state ? currentForm.state : "",
      cep: currentForm.cep ? currentForm.cep : "",
      country: currentForm.country ? currentForm.country : "",
      postalAddressConfirmation: currentForm.postalAddressConfirmation
        ? "Sim"
        : "Não",
      otherPostalAddress: currentForm.otherPostalAddress
        ? currentForm.otherPostalAddress
        : "",
      cel: currentForm.cel ? currentForm.cel : "",
      tel: currentForm.tel ? currentForm.tel : "",
      fiveYearsOtherTelConfirmation: currentForm.fiveYearsOtherTelConfirmation
        ? "Sim"
        : "Não",
      otherTel: currentForm.otherTel ? currentForm.otherTel : "",
      email: currentForm.email ? currentForm.email : "",
      fiveYearsOtherEmailConfirmation:
        currentForm.fiveYearsOtherEmailConfirmation ? "Sim" : "Não",
      otherEmail: currentForm.otherEmail ? currentForm.otherEmail : "",
      facebook: currentForm.facebook ? currentForm.facebook : "",
      linkedin: currentForm.linkedin ? currentForm.linkedin : "",
      instagram: currentForm.instagram ? currentForm.instagram : "",
      othersSocialMedia: currentForm.othersSocialMedia
        ? currentForm.othersSocialMedia
        : "",
    },
  });

  const postalAddressConfirmation: "Sim" | "Não" = form.watch(
    "postalAddressConfirmation",
  );
  const fiveYearsOtherTelConfirmation: "Sim" | "Não" = form.watch(
    "fiveYearsOtherTelConfirmation",
  );
  const fiveYearsOtherEmailConfirmation: "Sim" | "Não" = form.watch(
    "fiveYearsOtherEmailConfirmation",
  );
  const utils = trpc.useUtils();
  const router = useRouter();

  const { mutate: submitContactAndAddress, isPending } =
    trpc.formsRouter.submitContactAndAddress.useMutation({
      onSuccess: (data) => {
        toast.success(data.message);
        utils.formsRouter.getForm.invalidate();

        if (data.isEditing) {
          router.push(`/resumo-formulario/${profileId}`);
        } else {
          router.push(`/formulario/${profileId}?formStep=2`);
        }
      },
      onError: (error) => {
        console.error(error.data);

        if (error.data && error.data.code === "NOT_FOUND") {
          toast.error(error.message);
        } else {
          toast.error(
            "Erro ao enviar as informações do formulário, tente novamente mais tarde",
          );
        }
      },
    });
  const { mutate: saveContactAndAddress, isPending: isSavePending } =
    trpc.formsRouter.saveContactAndAddress.useMutation({
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
    if (redirectStep !== null) {
      const values = form.getValues();

      saveContactAndAddress({
        profileId,
        redirectStep,
        address: values.address !== "" ? values.address : currentForm.address,
        addressNumber:
          values.addressNumber !== ""
            ? values.addressNumber
            : currentForm.addressNumber,
        complement:
          values.complement !== "" ? values.complement : currentForm.complement,
        district:
          values.district !== "" ? values.district : currentForm.district,
        city: values.city !== "" ? values.city : currentForm.city,
        state: values.state !== "" ? values.state : currentForm.state,
        cep: values.cep !== "" ? values.cep : currentForm.cep,
        country: values.country !== "" ? values.country : currentForm.country,
        postalAddressConfirmation:
          values.postalAddressConfirmation ??
          (currentForm.postalAddressConfirmation ? "Sim" : "Não"),
        otherPostalAddress:
          values.otherPostalAddress !== ""
            ? values.otherPostalAddress
            : currentForm.otherPostalAddress,
        cel: values.cel !== "" ? values.cel : currentForm.cel,
        tel: values.tel !== "" ? values.tel : currentForm.tel,
        fiveYearsOtherTelConfirmation:
          values.fiveYearsOtherTelConfirmation ??
          (currentForm.fiveYearsOtherTelConfirmation ? "Sim" : "Não"),
        otherTel:
          values.otherTel !== "" ? values.otherTel : currentForm.otherTel,
        email: values.email !== "" ? values.email : currentForm.email,
        fiveYearsOtherEmailConfirmation:
          values.fiveYearsOtherEmailConfirmation ??
          (currentForm.fiveYearsOtherEmailConfirmation ? "Sim" : "Não"),
        otherEmail:
          values.otherEmail !== "" ? values.otherEmail : currentForm.otherEmail,
        facebook:
          values.facebook !== "" ? values.facebook : currentForm.facebook,
        linkedin:
          values.linkedin !== "" ? values.linkedin : currentForm.linkedin,
        instagram:
          values.instagram !== "" ? values.instagram : currentForm.instagram,
        othersSocialMedia:
          values.othersSocialMedia !== ""
            ? values.othersSocialMedia
            : currentForm.othersSocialMedia,
      });
      setRedirectStep(null);
    }
  }, [redirectStep, setRedirectStep, saveContactAndAddress, profileId]);

  function handleCEPContactAndAddressChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    let value = event.target.value.replace(/[^\d]/g, "");

    value = value.replace(/(\d{5})(\d{3})/, "$1-$2");

    form.setValue("cep", value);
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    submitContactAndAddress({ ...values, profileId, step: 2, isEditing });
  }

  function onSave() {
    const values = form.getValues();

    saveContactAndAddress({
      profileId,
      address: values.address !== "" ? values.address : currentForm.address,
      addressNumber:
        values.addressNumber !== ""
          ? values.addressNumber
          : currentForm.addressNumber,
      complement:
        values.complement !== "" ? values.complement : currentForm.complement,
      district: values.district !== "" ? values.district : currentForm.district,
      city: values.city !== "" ? values.city : currentForm.city,
      state: values.state !== "" ? values.state : currentForm.state,
      cep: values.cep !== "" ? values.cep : currentForm.cep,
      country: values.country !== "" ? values.country : currentForm.country,
      postalAddressConfirmation:
        values.postalAddressConfirmation ??
        (currentForm.postalAddressConfirmation ? "Sim" : "Não"),
      otherPostalAddress:
        values.otherPostalAddress !== ""
          ? values.otherPostalAddress
          : currentForm.otherPostalAddress,
      cel: values.cel !== "" ? values.cel : currentForm.cel,
      tel: values.tel !== "" ? values.tel : currentForm.tel,
      fiveYearsOtherTelConfirmation:
        values.fiveYearsOtherTelConfirmation ??
        (currentForm.fiveYearsOtherTelConfirmation ? "Sim" : "Não"),
      otherTel: values.otherTel !== "" ? values.otherTel : currentForm.otherTel,
      email: values.email !== "" ? values.email : currentForm.email,
      fiveYearsOtherEmailConfirmation:
        values.fiveYearsOtherEmailConfirmation ??
        (currentForm.fiveYearsOtherEmailConfirmation ? "Sim" : "Não"),
      otherEmail:
        values.otherEmail !== "" ? values.otherEmail : currentForm.otherEmail,
      facebook: values.facebook !== "" ? values.facebook : currentForm.facebook,
      linkedin: values.linkedin !== "" ? values.linkedin : currentForm.linkedin,
      instagram:
        values.instagram !== "" ? values.instagram : currentForm.instagram,
      othersSocialMedia:
        values.othersSocialMedia !== ""
          ? values.othersSocialMedia
          : currentForm.othersSocialMedia,
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col flex-grow gap-6"
      >
        <h2 className="w-full text-center text-2xl sm:text-3xl text-foreground font-semibold mb-6">
          Endereço e Contatos
        </h2>

        <span className="text-foreground text-base font-medium">
          Endereço de sua residencia
        </span>

        <div className="w-full flex flex-col gap-12 justify-between flex-grow">
          <div className="w-full flex flex-col">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6 mb-6">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground text-sm">
                      Endereço Residencial*
                    </FormLabel>

                    <FormControl>
                      <Input
                        className="!mt-auto"
                        disabled={isPending || isSavePending}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="addressNumber"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground text-sm">
                      Número do Endereço*
                    </FormLabel>

                    <FormControl>
                      <Input
                        className="!mt-auto"
                        disabled={isPending || isSavePending}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="district"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground text-sm">
                      Bairro*
                    </FormLabel>

                    <FormControl>
                      <Input
                        className="!mt-auto"
                        disabled={isPending || isSavePending}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="complement"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground text-sm">
                      Complemento
                    </FormLabel>

                    <FormControl>
                      <Input
                        className="!mt-auto"
                        disabled={isPending || isSavePending}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-4 gap-x-4 gap-y-6 mb-6">
              <FormField
                control={form.control}
                name="cep"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground text-sm">
                      CEP*
                    </FormLabel>

                    <FormControl>
                      <Input
                        className="!mt-auto"
                        disabled={isPending || isSavePending}
                        maxLength={9}
                        value={field.value}
                        ref={field.ref}
                        name={field.name}
                        onBlur={field.onBlur}
                        onChange={handleCEPContactAndAddressChange}
                      />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground text-sm">
                      Cidade*
                    </FormLabel>

                    <FormControl>
                      <Input
                        className="!mt-auto"
                        disabled={isPending || isSavePending}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground text-sm">
                      Estado*
                    </FormLabel>

                    <FormControl>
                      <Input
                        className="!mt-auto"
                        disabled={isPending || isSavePending}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground text-sm">
                      País*
                    </FormLabel>

                    <FormControl>
                      <Input
                        className="!mt-auto"
                        disabled={isPending || isSavePending}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 mb-10">
              <FormField
                control={form.control}
                name="postalAddressConfirmation"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">
                      Seu endereço de correio é diferente do endereço de sua
                      residência?*
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
                name="otherPostalAddress"
                render={({ field }) => (
                  <FormItem
                    className={cn(
                      "w-full bg-secondary p-4 flex flex-col gap-2",
                      {
                        hidden: postalAddressConfirmation === "Não",
                      },
                    )}
                  >
                    <FormLabel className="text-foreground text-sm">
                      Informe seu outro endereço
                    </FormLabel>

                    <FormControl>
                      <Input
                        className="!mt-auto"
                        disabled={isPending || isSavePending}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />
            </div>

            <span className="text-foreground text-base font-medium mb-6">
              Telefone
            </span>

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-6 mb-6">
              <FormField
                control={form.control}
                name="cel"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground text-sm">
                      Celular*
                    </FormLabel>

                    <FormControl>
                      <PhoneInput
                        disabled={isPending || isSavePending}
                        limitMaxLength
                        smartCaret={false}
                        placeholder="Insira seu celular..."
                        defaultCountry="BR"
                        className={cn(
                          "!mt-auto flex h-12 w-full border border-muted/70 rounded-xl transition duration-300 bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-0 focus-within:ring-offset-0 focus-within:border-primary disabled:cursor-not-allowed disabled:opacity-50",
                          {
                            "input-error": false,
                          },
                        )}
                        name={field.name}
                        ref={field.ref}
                        onBlur={field.onBlur}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tel"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground text-sm">
                      Fixo
                    </FormLabel>

                    <FormControl>
                      <PhoneInput
                        disabled={isPending || isSavePending}
                        limitMaxLength
                        smartCaret={false}
                        placeholder="Insira seu telefone fixo..."
                        defaultCountry="BR"
                        className={cn(
                          "!mt-auto flex h-12 w-full border border-muted/70 rounded-xl transition duration-300 bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-0 focus-within:ring-offset-0 focus-within:border-primary disabled:cursor-not-allowed disabled:opacity-50",
                          {
                            "input-error": false,
                          },
                        )}
                        name={field.name}
                        ref={field.ref}
                        onBlur={field.onBlur}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground text-sm">
                      E-mail*
                    </FormLabel>

                    <FormControl>
                      <Input
                        className="!mt-auto"
                        disabled={isPending || isSavePending}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 mb-6">
              <FormField
                control={form.control}
                name="fiveYearsOtherTelConfirmation"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">
                      Nos últimos 5 anos você usou outros números de telefone?*
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
                name="otherTel"
                render={({ field }) => (
                  <FormItem
                    className={cn(
                      "w-full bg-secondary p-4 flex flex-col gap-2",
                      {
                        hidden: fiveYearsOtherTelConfirmation === "Não",
                      },
                    )}
                  >
                    <FormLabel className="text-foreground text-sm">
                      Informe seu outro telefone
                    </FormLabel>

                    <FormControl>
                      <PhoneInput
                        disabled={isPending || isSavePending}
                        limitMaxLength
                        smartCaret={false}
                        placeholder="Insira seu outro telefone..."
                        defaultCountry="BR"
                        className={cn(
                          "!mt-auto flex h-12 w-full border border-muted/70 rounded-xl transition duration-300 bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-0 focus-within:ring-offset-0 focus-within:border-primary disabled:cursor-not-allowed disabled:opacity-50",
                          {
                            "input-error": false,
                          },
                        )}
                        name={field.name}
                        ref={field.ref}
                        onBlur={field.onBlur}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 mb-10">
              <FormField
                control={form.control}
                name="fiveYearsOtherEmailConfirmation"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">
                      Nos últimos 5 anos você teve outros e-mails?*
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
                name="otherEmail"
                render={({ field }) => (
                  <FormItem
                    className={cn(
                      "w-full bg-secondary p-4 flex flex-col gap-2",
                      {
                        hidden: fiveYearsOtherEmailConfirmation === "Não",
                      },
                    )}
                  >
                    <FormLabel className="text-foreground text-sm">
                      Informe seu outro e-mail
                    </FormLabel>

                    <FormControl>
                      <Input
                        className="!mt-auto"
                        disabled={isPending || isSavePending}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />
            </div>

            <span className="text-foreground text-base font-medium mb-6">
              Redes sociais (Somente @ ou nome)
            </span>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
              <FormField
                control={form.control}
                name="facebook"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground text-sm">
                      Facebook
                    </FormLabel>

                    <FormControl>
                      <Input
                        className="!mt-auto"
                        disabled={isPending || isSavePending}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="linkedin"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground text-sm">
                      Linkedin
                    </FormLabel>

                    <FormControl>
                      <Input
                        className="!mt-auto"
                        disabled={isPending || isSavePending}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="instagram"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground text-sm">
                      Instagram
                    </FormLabel>

                    <FormControl>
                      <Input
                        className="!mt-auto"
                        disabled={isPending || isSavePending}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="othersSocialMedia"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground text-sm">
                      Outras Redes
                    </FormLabel>

                    <FormControl>
                      <Input
                        className="!mt-auto"
                        disabled={isPending || isSavePending}
                        {...field}
                      />
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
                  type="submit"
                  className="w-full flex items-center gap-2 sm:w-fit"
                  disabled={isPending || isSavePending}
                >
                  {isPending ? (
                    <>
                      Salvando
                      <Loader2
                        className="size-5 animate-spin"
                        strokeWidth={1.5}
                      />
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
                      <Loader2
                        className="size-5 animate-spin"
                        strokeWidth={1.5}
                      />
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
                      <Loader2
                        className="size-5 animate-spin"
                        strokeWidth={1.5}
                      />
                    </>
                  ) : (
                    <>
                      Enviar
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
