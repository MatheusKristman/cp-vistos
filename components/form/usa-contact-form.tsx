"use client";

import PhoneInput from "react-phone-number-input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2, Save } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FullForm } from "@/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect } from "react";
import useFormStore from "@/constants/stores/useFormStore";

const formSchema = z.object({
  organizationOrUSAResidentName: z.string(),
  organizationOrUSAResidentRelation: z.string(),
  organizationOrUSAResidentAddress: z.string(),
  organizationOrUSAResidentZipCode: z.string(),
  organizationOrUSAResidentCity: z.string(),
  organizationOrUSAResidentState: z.string(),
  organizationOrUSAResidentCountry: z.string(),
  organizationOrUSAResidentTel: z.string(),
  organizationOrUSAResidentEmail: z.string(),
});

interface Props {
  profileId: string;
  currentForm: FullForm;
}

export function USAContactForm({ currentForm, profileId }: Props) {
  const { redirectStep, setRedirectStep } = useFormStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      organizationOrUSAResidentName: currentForm.organizationOrUSAResidentName
        ? currentForm.organizationOrUSAResidentName
        : "",
      organizationOrUSAResidentRelation:
        currentForm.organizationOrUSAResidentRelation
          ? currentForm.organizationOrUSAResidentRelation
          : "",
      organizationOrUSAResidentAddress:
        currentForm.organizationOrUSAResidentAddress
          ? currentForm.organizationOrUSAResidentAddress
          : "",
      organizationOrUSAResidentZipCode:
        currentForm.organizationOrUSAResidentZipCode
          ? currentForm.organizationOrUSAResidentZipCode
          : "",
      organizationOrUSAResidentCity: currentForm.organizationOrUSAResidentCity
        ? currentForm.organizationOrUSAResidentCity
        : "",
      organizationOrUSAResidentState: currentForm.organizationOrUSAResidentState
        ? currentForm.organizationOrUSAResidentState
        : "",
      organizationOrUSAResidentCountry:
        currentForm.organizationOrUSAResidentCountry
          ? currentForm.organizationOrUSAResidentCountry
          : "",
      organizationOrUSAResidentTel: currentForm.organizationOrUSAResidentTel
        ? currentForm.organizationOrUSAResidentTel
        : "",
      organizationOrUSAResidentEmail: currentForm.organizationOrUSAResidentEmail
        ? currentForm.organizationOrUSAResidentEmail
        : "",
    },
  });

  const utils = trpc.useUtils();
  const router = useRouter();

  const { mutate: submitUsaContact, isPending } =
    trpc.formsRouter.submitUsaContact.useMutation({
      onSuccess: (data) => {
        toast.success(data.message);
        utils.formsRouter.getForm.invalidate();
        router.push(`/formulario/${profileId}?formStep=7`);
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
  const { mutate: saveUsaContact, isPending: isSavePending } =
    trpc.formsRouter.saveUsaContact.useMutation({
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

      saveUsaContact({
        profileId,
        redirectStep,
        organizationOrUSAResidentName:
          values.organizationOrUSAResidentName !== ""
            ? values.organizationOrUSAResidentName
            : !currentForm.organizationOrUSAResidentName
              ? ""
              : currentForm.organizationOrUSAResidentName,
        organizationOrUSAResidentRelation:
          values.organizationOrUSAResidentRelation !== ""
            ? values.organizationOrUSAResidentRelation
            : !currentForm.organizationOrUSAResidentRelation
              ? ""
              : currentForm.organizationOrUSAResidentRelation,
        organizationOrUSAResidentAddress:
          values.organizationOrUSAResidentAddress !== ""
            ? values.organizationOrUSAResidentAddress
            : !currentForm.organizationOrUSAResidentAddress
              ? ""
              : currentForm.organizationOrUSAResidentAddress,
        organizationOrUSAResidentZipCode:
          values.organizationOrUSAResidentZipCode !== ""
            ? values.organizationOrUSAResidentZipCode
            : !currentForm.organizationOrUSAResidentZipCode
              ? ""
              : currentForm.organizationOrUSAResidentZipCode,
        organizationOrUSAResidentCity:
          values.organizationOrUSAResidentCity !== ""
            ? values.organizationOrUSAResidentCity
            : !currentForm.organizationOrUSAResidentCity
              ? ""
              : currentForm.organizationOrUSAResidentCity,
        organizationOrUSAResidentState:
          values.organizationOrUSAResidentState !== ""
            ? values.organizationOrUSAResidentState
            : !currentForm.organizationOrUSAResidentState
              ? ""
              : currentForm.organizationOrUSAResidentState,
        organizationOrUSAResidentCountry:
          values.organizationOrUSAResidentCountry !== ""
            ? values.organizationOrUSAResidentCountry
            : !currentForm.organizationOrUSAResidentCountry
              ? ""
              : currentForm.organizationOrUSAResidentCountry,
        organizationOrUSAResidentTel:
          values.organizationOrUSAResidentTel !== ""
            ? values.organizationOrUSAResidentTel
            : !currentForm.organizationOrUSAResidentTel
              ? ""
              : currentForm.organizationOrUSAResidentTel,
        organizationOrUSAResidentEmail:
          values.organizationOrUSAResidentEmail !== ""
            ? values.organizationOrUSAResidentEmail
            : !currentForm.organizationOrUSAResidentEmail
              ? ""
              : currentForm.organizationOrUSAResidentEmail,
      });
      setRedirectStep(null);
    }
  }, [redirectStep, setRedirectStep, saveUsaContact, profileId]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    submitUsaContact({ ...values, profileId, step: 7 });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col flex-grow gap-6"
      >
        <h2 className="w-full text-center text-2xl sm:text-3xl text-foreground font-semibold mb-6">
          Contato nos estados unidades
        </h2>

        <div className="w-full flex flex-col gap-12 justify-between flex-grow">
          <div className="w-full flex flex-col">
            <span className="text-foreground text-base font-medium mb-6">
              Preencher apenas se houver contato frequente com alguém dos EUA{" "}
            </span>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              <FormField
                control={form.control}
                name="organizationOrUSAResidentName"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-between">
                    <FormLabel className="text-foreground text-sm">
                      Nome completo da pessoa ou Organização
                    </FormLabel>

                    <FormControl>
                      <Input disabled={isPending || isSavePending} {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="organizationOrUSAResidentRelation"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-between">
                    <FormLabel className="text-foreground text-sm">
                      Qual é a relação do contato com você?
                    </FormLabel>

                    <FormControl>
                      <Input disabled={isPending || isSavePending} {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              <FormField
                control={form.control}
                name="organizationOrUSAResidentAddress"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-between">
                    <FormLabel className="text-foreground text-sm">
                      Endereço do contato nos EUA
                    </FormLabel>

                    <FormControl>
                      <Input disabled={isPending || isSavePending} {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="organizationOrUSAResidentZipCode"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-between">
                    <FormLabel className="text-foreground text-sm">
                      Zip code
                    </FormLabel>

                    <FormControl>
                      <Input
                        disabled={isPending || isSavePending}
                        maxLength={5}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              <FormField
                control={form.control}
                name="organizationOrUSAResidentCity"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-between">
                    <FormLabel className="text-foreground text-sm">
                      Cidade
                    </FormLabel>

                    <FormControl>
                      <Input disabled={isPending || isSavePending} {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="organizationOrUSAResidentState"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-between">
                    <FormLabel className="text-foreground text-sm">
                      Estado
                    </FormLabel>

                    <FormControl>
                      <Input disabled={isPending || isSavePending} {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="organizationOrUSAResidentCountry"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-between">
                    <FormLabel className="text-foreground text-sm">
                      País
                    </FormLabel>

                    <FormControl>
                      <Input disabled={isPending || isSavePending} {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="organizationOrUSAResidentTel"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-between">
                    <FormLabel className="text-foreground text-sm">
                      Telefone
                    </FormLabel>

                    <FormControl>
                      <PhoneInput
                        limitMaxLength
                        smartCaret={false}
                        placeholder="Insira seu telefone..."
                        defaultCountry="BR"
                        className={cn(
                          "flex h-12 w-full border border-secondary transition duration-300 bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-0 focus-within:ring-offset-0 focus-within:border-primary disabled:cursor-not-allowed disabled:opacity-50",
                          {
                            "input-error": false,
                          },
                        )}
                        disabled={isPending || isSavePending}
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
                name="organizationOrUSAResidentEmail"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-between">
                    <FormLabel className="text-foreground text-sm">
                      E-mail
                    </FormLabel>

                    <FormControl>
                      <Input disabled={isPending || isSavePending} {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
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
              disabled={isPending || isSavePending}
            >
              Salvar
              <Save className="size-5" strokeWidth={1.5} />
            </Button>

            <Button
              size="xl"
              disabled={isPending || isSavePending}
              type="submit"
              className="w-full flex items-center gap-2 sm:w-fit"
            >
              {isPending ? (
                <>
                  Enviando
                  <Loader2 className="size-5 animate-spin" strokeWidth={1.5} />
                </>
              ) : (
                <>
                  Enviar
                  <ArrowRight className="size-5" strokeWidth={1.5} />
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
