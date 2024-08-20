"use client";

import PhoneInput from "react-phone-number-input";
import { ChangeEvent } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { FullForm } from "@/types";
import { Button } from "../ui/button";
import { ArrowRight, Loader2, Save } from "lucide-react";

const formSchema = z
  .object({
    address: z.string().min(1, { message: "Campo obrigatório" }),
    city: z.string().min(1, { message: "Campo obrigatório" }),
    state: z.string().min(1, { message: "Campo obrigatório" }),
    cep: z.string().min(9, { message: "CEP inválido" }),
    country: z.string().min(1, { message: "Campo obrigatório" }),
    postalAddressConfirmation: z.enum(["Sim", "Não"]),
    otherPostalAddress: z.string(),
    cel: z.string().min(14, { message: "Celular inválido" }),
    tel: z.string().min(13, { message: "Telefone inválido" }),
    fiveYearsOtherTelConfirmation: z.enum(["Sim", "Não"]),
    otherTel: z.string(),
    email: z
      .string()
      .min(1, { message: "Campo obrigatório" })
      .email({ message: "E-mail inválido" }),
    fiveYearsOtherEmailConfirmation: z.enum(["Sim", "Não"]),
    otherEmail: z.string().email({ message: "E-mail inválido" }).optional(),
    facebook: z.string(),
    linkedin: z.string(),
    instagram: z.string(),
    othersSocialMedia: z.string(),
  })
  .superRefine(
    (
      {
        postalAddressConfirmation,
        otherPostalAddress,
        fiveYearsOtherTelConfirmation,
        otherTel,
        fiveYearsOtherEmailConfirmation,
        otherEmail,
      },
      ctx,
    ) => {
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
        otherTel &&
        otherTel.length === 0
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Campo vazio, preencha para prosseguir",
          path: ["otherTel"],
        });
      }

      if (
        fiveYearsOtherEmailConfirmation === "Sim" &&
        otherEmail &&
        otherEmail.length === 0
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
  currentForm: FullForm;
}

export function ContactAndAddressForm({ currentForm }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: currentForm.address ? currentForm.address : "",
      city: currentForm.city ? currentForm.city : "",
      state: currentForm.state ? currentForm.state : "",
      cep: currentForm.cep ? currentForm.cep : "",
      country: currentForm.country ? currentForm.country : "",
      postalAddressConfirmation: currentForm.postalAddressConfirmation
        ? currentForm.postalAddressConfirmation === true
          ? "Sim"
          : "Não"
        : "Não",
      otherPostalAddress: currentForm.otherPostalAddress
        ? currentForm.otherPostalAddress
        : "",
      cel: currentForm.cel ? currentForm.cel : "",
      tel: currentForm.tel ? currentForm.tel : "",
      fiveYearsOtherTelConfirmation: currentForm.fiveYearsOtherTelConfirmation
        ? currentForm.fiveYearsOtherTelConfirmation === true
          ? "Sim"
          : "Não"
        : "Não",
      otherTel: currentForm.otherTel ? currentForm.otherTel : "",
      email: currentForm.email ? currentForm.email : "",
      fiveYearsOtherEmailConfirmation:
        currentForm.fiveYearsOtherEmailConfirmation
          ? currentForm.fiveYearsOtherEmailConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
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

  function handleCEPContactAndAddressChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    let value = event.target.value.replace(/[^\d]/g, "");

    value = value.replace(/(\d{5})(\d{3})/, "$1-$2");

    form.setValue("cep", value);
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-6"
      >
        <h2 className="w-full text-center text-2xl sm:text-3xl text-foreground font-semibold mb-6">
          Endereço e Contatos
        </h2>

        <span className="text-foreground text-base font-medium">
          Endereço de sua residencia
        </span>

        <div className="w-full flex flex-col gap-12">
          <div className="w-full flex flex-col gap-4">
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-between">
                    <FormLabel className="text-foreground text-sm">
                      Endereço*
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
                name="city"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-between">
                    <FormLabel className="text-foreground text-sm">
                      Cidade*
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
                name="state"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-between">
                    <FormLabel className="text-foreground text-sm">
                      Estado*
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
                name="cep"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-between">
                    <FormLabel className="text-foreground text-sm">
                      CEP*
                    </FormLabel>

                    <FormControl>
                      <Input
                        maxLength={9}
                        value={field.value}
                        ref={field.ref}
                        name={field.name}
                        onBlur={field.onBlur}
                        onChange={handleCEPContactAndAddressChange}
                      />
                    </FormControl>

                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-between">
                    <FormLabel className="text-foreground text-sm">
                      País*
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
                name="postalAddressConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Seu endereço de correio é diferente do endereço de sua
                      residência?*
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
                name="otherPostalAddress"
                render={({ field }) => (
                  <FormItem
                    className={cn("w-full bg-secondary p-4", {
                      hidden: postalAddressConfirmation === "Não",
                    })}
                  >
                    <FormLabel className="text-foreground text-sm">
                      Informe seu outro endereço
                    </FormLabel>

                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            <span className="text-foreground text-base font-medium mt-6">
              Telefone
            </span>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="cel"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-between">
                    <FormLabel className="text-foreground text-sm">
                      Celular*
                    </FormLabel>

                    <FormControl>
                      <PhoneInput
                        limitMaxLength
                        smartCaret={false}
                        placeholder="Insira seu celular..."
                        defaultCountry="BR"
                        className={cn(
                          "flex h-12 w-full border border-secondary transition duration-300 bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-0 focus-within:ring-offset-0 focus-within:border-primary disabled:cursor-not-allowed disabled:opacity-50",
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

                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tel"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-between">
                    <FormLabel className="text-foreground text-sm">
                      Fixo*
                    </FormLabel>

                    <FormControl>
                      <PhoneInput
                        limitMaxLength
                        smartCaret={false}
                        placeholder="Insira seu telefone fixo..."
                        defaultCountry="BR"
                        className={cn(
                          "flex h-12 w-full border border-secondary transition duration-300 bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-0 focus-within:ring-offset-0 focus-within:border-primary disabled:cursor-not-allowed disabled:opacity-50",
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

                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="w-full flex flex-col justify-between gap-4">
                <FormField
                  control={form.control}
                  name="fiveYearsOtherTelConfirmation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">
                        Nos últimos 5 anos você usou outros números de
                        telefone?*
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
                  name="otherTel"
                  render={({ field }) => (
                    <FormItem
                      className={cn("w-full bg-secondary p-4", {
                        hidden: fiveYearsOtherTelConfirmation === "Não",
                      })}
                    >
                      <FormLabel className="text-foreground text-sm">
                        Informe seu outro telefone
                      </FormLabel>

                      <FormControl>
                        <PhoneInput
                          limitMaxLength
                          smartCaret={false}
                          placeholder="Insira seu outro telefone..."
                          defaultCountry="BR"
                          className={cn(
                            "flex h-12 w-full border border-secondary transition duration-300 bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-0 focus-within:ring-offset-0 focus-within:border-primary disabled:cursor-not-allowed disabled:opacity-50",
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

                      <FormMessage className="text-sm text-red-500" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-foreground text-sm">
                      E-mail*
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
                name="fiveYearsOtherEmailConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Nos últimos 5 anos você teve outros e-mails?*
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
                name="otherEmail"
                render={({ field }) => (
                  <FormItem
                    className={cn("w-full bg-secondary p-4", {
                      hidden: fiveYearsOtherEmailConfirmation === "Não",
                    })}
                  >
                    <FormLabel className="text-foreground text-sm">
                      Informe seu outro e-mail
                    </FormLabel>

                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            <span className="text-foreground text-base font-medium mt-6">
              Redes sociais (Somente @ ou nome)
            </span>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="facebook"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground text-sm">
                      Facebook
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
                name="linkedin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground text-sm">
                      Linkedin
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
                name="instagram"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground text-sm">
                      Instagram
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
                name="othersSocialMedia"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground text-sm">
                      Outras Redes
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
