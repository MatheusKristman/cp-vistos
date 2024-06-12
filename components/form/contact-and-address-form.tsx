//TODO: criar função para submit
//TODO: mandar para o proximo formulário

"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ArrowLeft, ArrowRight, Loader2, Save } from "lucide-react";
import { Form as FormType } from "@prisma/client";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-number-input";

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
import { cn } from "@/lib/utils";

import "react-phone-number-input/style.css";

interface Props {
  currentForm: FormType | null;
}

const formSchema = z
  .object({
    address: z.string().min(1, { message: "Campo obrigatório" }),
    city: z.string().min(1, { message: "Campo obrigatório" }),
    state: z.string().min(1, { message: "Campo obrigatório" }),
    cep: z.string().min(9, { message: "CEP inválido" }),
    country: z.string().min(1, { message: "Campo obrigatório" }),
    postalAddressConfirmation: z
      .string()
      .min(1, { message: "Campo obrigatório" }),
    otherPostalAddress: z.string(),
    cel: z.string().min(14, { message: "Celular inválido" }),
    tel: z.string().min(13, { message: "Telefone inválido" }),
    fiveYearsOtherTelConfirmation: z.string().min(1, {
      message: "Campo obrigatório",
    }),
    otherTel: z.string(),
    email: z
      .string()
      .min(1, { message: "Campo obrigatório" })
      .email({ message: "E-mail inválido" }),
    fiveYearsOtherEmailConfirmation: z
      .string()
      .min(1, { message: "Campo obrigatório" }),
    otherEmail: z.string(),
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
        postalAddressConfirmation &&
        otherPostalAddress &&
        otherPostalAddress.length === 0
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Campo vazio, preencha para prosseguir",
          path: ["otherPostalAddress"],
        });
      }

      if (fiveYearsOtherTelConfirmation && otherTel && otherTel.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Campo vazio, preencha para prosseguir",
          path: ["otherTel"],
        });
      }

      if (
        fiveYearsOtherEmailConfirmation &&
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

export function ContactAndAddressForm({ currentForm }: Props) {
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const [isSaving, setSaving] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: currentForm && currentForm.address ? currentForm.address : "",
      city: currentForm && currentForm.city ? currentForm.city : "",
      state: currentForm && currentForm.state ? currentForm.state : "",
      cep: currentForm && currentForm.cep ? currentForm.cep : "",
      country: currentForm && currentForm.country ? currentForm.country : "",
      postalAddressConfirmation:
        currentForm && currentForm.postalAddressConfirmation
          ? currentForm.postalAddressConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
      otherPostalAddress:
        currentForm && currentForm.otherPostalAddress
          ? currentForm.otherPostalAddress
          : "",
      cel: currentForm && currentForm.cel ? currentForm.cel : "",
      tel: currentForm && currentForm.tel ? currentForm.tel : "",
      fiveYearsOtherTelConfirmation:
        currentForm && currentForm.fiveYearsOtherTelConfirmation
          ? currentForm.fiveYearsOtherTelConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
      otherTel: currentForm && currentForm.otherTel ? currentForm.otherTel : "",
      email: currentForm && currentForm.email ? currentForm.email : "",
      fiveYearsOtherEmailConfirmation:
        currentForm && currentForm.fiveYearsOtherEmailConfirmation
          ? currentForm.fiveYearsOtherEmailConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
      otherEmail:
        currentForm && currentForm.otherEmail ? currentForm.otherEmail : "",
      facebook: currentForm && currentForm.facebook ? currentForm.facebook : "",
      linkedin: currentForm && currentForm.linkedin ? currentForm.linkedin : "",
      instagram:
        currentForm && currentForm.instagram ? currentForm.instagram : "",
      othersSocialMedia:
        currentForm && currentForm.othersSocialMedia
          ? currentForm.othersSocialMedia
          : "",
    },
  });
  const postalAddressConfirmation = form.watch("postalAddressConfirmation");
  const fiveYearsOtherTelConfirmation = form.watch(
    "fiveYearsOtherTelConfirmation",
  );
  const fiveYearsOtherEmailConfirmation = form.watch(
    "fiveYearsOtherEmailConfirmation",
  );
  const router = useRouter();

  function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmitting(true);

    axios
      .post("/api/form/1/submit", values)
      .then(() => {
        router.push("/formulario/2");
      })
      .catch((error) => {
        console.error(error);

        toast.error(error.response.data);
      })
      .finally(() => {
        setSubmitting(false);
      });
  }

  function handleSave() {
    const values = form.getValues();

    setSaving(true);

    axios
      .post("/api/form/1/save", values)
      .then((res) => {
        toast.success(res.data);
      })
      .catch((error) => {
        console.error(error);

        toast.error(error.response.data);
      })
      .finally(() => {
        setSaving(false);
      });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-12 mb-12"
      >
        <div className="w-full flex flex-col gap-6">
          <h2 className="w-full text-center text-2xl sm:text-3xl text-primary font-semibold mb-12">
            Endereço e Contatos
          </h2>

          <span className="text-primary text-base font-medium">
            Endereço de sua residencia
          </span>

          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-between">
                  <FormLabel className="text-primary text-sm">
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
                  <FormLabel className="text-primary text-sm">
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
                  <FormLabel className="text-primary text-sm">
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
                  <FormLabel className="text-primary text-sm">CEP*</FormLabel>

                  <FormControl>
                    <Input {...field} />
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
                  <FormLabel className="text-primary text-sm">País*</FormLabel>

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
                  <FormLabel className="text-primary">
                    Seu endereço de correio é o mesmo endereço de sua
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

            {postalAddressConfirmation === "Sim" && (
              <FormField
                control={form.control}
                name="otherPostalAddress"
                render={({ field }) => (
                  <FormItem className="w-full bg-secondary p-4">
                    <FormLabel className="text-primary text-sm">
                      Informe seu outro endereço
                    </FormLabel>

                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />
            )}
          </div>

          <span className="text-primary text-base font-medium mt-6">
            Telefone
          </span>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="cel"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-between">
                  <FormLabel className="text-primary text-sm">
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
                  <FormLabel className="text-primary text-sm">Fixo*</FormLabel>

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
                    <FormLabel className="text-primary">
                      Nos últimos 5 anos você usou outros números de telefone?*
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

              {fiveYearsOtherTelConfirmation === "Sim" && (
                <FormField
                  control={form.control}
                  name="otherTel"
                  render={({ field }) => (
                    <FormItem className="w-full bg-secondary p-4">
                      <FormLabel className="text-primary text-sm">
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
              )}
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-between">
                  <FormLabel className="text-primary text-sm">
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
                  <FormLabel className="text-primary">
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

            {fiveYearsOtherEmailConfirmation === "Sim" && (
              <FormField
                control={form.control}
                name="otherEmail"
                render={({ field }) => (
                  <FormItem className="w-full bg-secondary p-4">
                    <FormLabel className="text-primary text-sm">
                      Informe seu outro e-mail
                    </FormLabel>

                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />
            )}
          </div>

          <span className="text-primary text-base font-medium mt-6">
            Redes sociais (Somente @ ou nome)
          </span>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="facebook"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary text-sm">
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
                  <FormLabel className="text-primary text-sm">
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
                  <FormLabel className="text-primary text-sm">
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
                  <FormLabel className="text-primary text-sm">
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

        <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
          <Button
            type="button"
            disabled={isSubmitting || isSaving}
            className="w-full flex items-center gap-2 order-3 sm:w-fit sm:order-1"
          >
            <ArrowLeft className="hidden" /> Voltar
          </Button>

          <Button
            disabled={isSubmitting || isSaving}
            onClick={handleSave}
            type="button"
            variant="link"
            className="w-full flex items-center gap-2 order-1 sm:order-2 sm:w-fit"
          >
            {isSaving ? (
              <>
                <Loader2 className="animate-spin" />
                Salvando progresso
              </>
            ) : (
              <>
                <Save />
                Salvar progresso
              </>
            )}
          </Button>

          <Button
            disabled={isSubmitting || isSaving}
            type="submit"
            className="w-full flex items-center gap-2 order-2 sm:order-3 sm:w-fit"
          >
            Próximo{" "}
            {isSubmitting ? (
              <Loader2 className="animate-spin" />
            ) : (
              <ArrowRight className="hidden" />
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
