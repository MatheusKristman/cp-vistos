"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Copy, Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import useClientsStore from "@/constants/stores/useClientsStore";
import { cn } from "@/lib/utils";

const formSchema = z
  .object({
    email: z.string().min(1, { message: "E-mail obrigatório" }).email({ message: "E-mail inválido" }),
    newPassword: z.string().min(6, { message: "Nova Senha precisa ter no mínimo 6 caracteres" }),
    confirmNewPassword: z.string().min(6, { message: "Confirmar Nova Senha precisa ter no mínimo 6 caracteres" }),
  })
  .superRefine(({ newPassword, confirmNewPassword }, ctx) => {
    if (confirmNewPassword !== newPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        code: "custom",
        message: "As senhas não coincidem, verifique e tente novamente",
      });
    }
  });

export function EditClientForm() {
  const [isEmailCopied, setIsEmailCopied] = useState<boolean>(false);
  const [isPasswordCopied, setIsPasswordCopied] = useState<boolean>(false);
  const [passwordType, setPasswordType] = useState<"password" | "text">("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState<"password" | "text">("password");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [emailRegistered, setEmailRegistered] = useState<string>("");
  const [passwordRegistered, setPasswordRegistered] = useState<string>("");

  let emailTimeout: ReturnType<typeof setTimeout>;
  let passwordTimeout: ReturnType<typeof setTimeout>;

  const { setClients } = useClientsStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    axios
      .put("/api/edit-account-password", values)
      .then((res) => {
        setClients(res.data.users);
        setEmailRegistered(res.data.email);
        setPasswordRegistered(res.data.password);
        toast.success("Usuário editado com sucesso!");
        form.reset();
      })
      .catch((error) => {
        console.error(error);

        toast.error(error.response.data);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  function handleEmailCopy() {
    if ("clipboard" in navigator) {
      navigator.clipboard.writeText(emailRegistered);
    } else {
      document.execCommand("copy", true, emailRegistered);
    }

    clearTimeout(emailTimeout);
    setIsEmailCopied(true);

    emailTimeout = setTimeout(() => {
      setIsEmailCopied(false);
    }, 3000);
  }

  function handlePasswordCopy() {
    if ("clipboard" in navigator) {
      navigator.clipboard.writeText(passwordRegistered);
    } else {
      document.execCommand("copy", true, passwordRegistered);
    }

    clearTimeout(passwordTimeout);
    setIsPasswordCopied(true);

    passwordTimeout = setTimeout(() => {
      setIsPasswordCopied(false);
    }, 3000);
  }

  function handlePasswordTypeToggle() {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }

    if (passwordType === "text") {
      setPasswordType("password");
      return;
    }
  }

  function handleConfirmPasswordTypeToggle() {
    if (confirmPasswordType === "password") {
      setConfirmPasswordType("text");
      return;
    }

    if (confirmPasswordType === "text") {
      setConfirmPasswordType("password");
      return;
    }
  }

  return (
    <div className="w-full flex flex-col gap-12 lg:flex-row-reverse lg:justify-between">
      <div
        className={cn("w-full lg:w-fit h-fit bg-secondary px-6 py-4 flex flex-col items-center opacity-100", {
          "opacity-0": emailRegistered.length === 0 && passwordRegistered.length === 0,
        })}
      >
        <h2 className="text-xl text-primary font-medium mb-6">Novos dados do usuário editado</h2>

        <div className="flex items-center gap-2 mb-4">
          <TooltipProvider>
            <Tooltip defaultOpen={isEmailCopied} open={isEmailCopied}>
              <TooltipTrigger>
                <Copy onClick={handleEmailCopy} />
              </TooltipTrigger>

              <TooltipContent className="bg-green-500 border-green-500">
                <p className="text-white">Copiado!</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <span>{emailRegistered}</span>
        </div>

        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip defaultOpen={isPasswordCopied} open={isPasswordCopied}>
              <TooltipTrigger>
                <Copy onClick={handlePasswordCopy} />
              </TooltipTrigger>

              <TooltipContent className="bg-green-500 border-green-500">
                <p className="text-white">Copiado!</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <span>{passwordRegistered}</span>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 lg:w-1/2">
          <div className="w-full flex flex-col space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base text-primary text-left w-full block">E-mail</FormLabel>

                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Insira o e-mail"
                      className="placeholder:text-primary/50"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage className="text-sm text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base text-primary text-left w-full block">Nova Senha</FormLabel>

                  <FormControl>
                    <div className="w-full relative">
                      <Input
                        disabled={isSubmitting}
                        type={passwordType}
                        placeholder="Insira a senha"
                        className="placeholder:text-primary/50"
                        {...field}
                      />

                      <Button
                        asChild
                        disabled={isSubmitting}
                        onClick={handlePasswordTypeToggle}
                        variant="link"
                        size="icon"
                        className="absolute top-1/2 right-2 transform -translate-y-1/2"
                      >
                        <span>{passwordType === "text" ? <Eye color="#9CABCB" /> : <EyeOff color="#9CABCB" />}</span>
                      </Button>
                    </div>
                  </FormControl>

                  <FormMessage className="text-sm text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmNewPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base text-primary text-left w-full block">Confirmar Nova Senha</FormLabel>

                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        disabled={isSubmitting}
                        type={confirmPasswordType}
                        placeholder="Confirme a sua senha"
                        className="placeholder:text-primary/50"
                        {...field}
                      />

                      <Button
                        asChild
                        disabled={isSubmitting}
                        onClick={handleConfirmPasswordTypeToggle}
                        variant="link"
                        size="icon"
                        className="absolute top-1/2 right-2 transform -translate-y-1/2"
                      >
                        <span>
                          {confirmPasswordType === "text" ? <Eye color="#9CABCB" /> : <EyeOff color="#9CABCB" />}
                        </span>
                      </Button>
                    </div>
                  </FormControl>

                  <FormMessage className="text-sm text-red-500" />
                </FormItem>
              )}
            />
          </div>

          <Button disabled={isSubmitting} className="w-full lg:w-24 flex items-center gap-2">
            Editar
            {isSubmitting && <Loader2 className="animate-spin" />}
          </Button>
        </form>
      </Form>
    </div>
  );
}
