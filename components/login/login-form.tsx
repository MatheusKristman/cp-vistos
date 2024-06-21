"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  email: z.string().min(1, "E-mail obrigatório").email("E-mail inválido"),
  password: z.string().min(1, "Senha inválida"),
});

export function LoginForm() {
  const [passwordType, setPasswordType] = useState<"text" | "password">("password");

  const router = useRouter();
  const session = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (session && session.status === "authenticated") {
      router.push("/perfil/clientes");
    }
  }, []);

  function togglePasswordType() {
    if (passwordType === "text") {
      setPasswordType("password");
    } else {
      setPasswordType("text");
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await signIn("credentials", {
        ...values,
        redirect: false,
      });

      if (!response?.error) {
        toast.success("Logado com sucesso!");
        console.log(session);

        // TODO: verificar o tipo do usuário, se for admin, redirecionar para o perfil, senão, verificar primeiro se já tem formulário, se não tiver redirecionar para o cadastro do formulário, senão redireciona para o perfil
        router.push("/verificando-usuario");
      } else {
        toast.error("Ocorreu um erro na autenticação");
      }
    } catch (error) {
      console.error(error);

      toast.error("Ocorreu um erro na autenticação");
    }
  }

  return (
    <section className="min-h-[calc(100vh-80px)] lg:min-h-[calc(100vh-96px)] w-full grid grid-cols-2">
      <div className="w-full h-full relative col-span-2 sm:col-span-1 flex flex-col items-center justify-between sm:justify-center gap-12 p-6">
        <div className="w-full flex flex-col items-center justify-center pt-36 sm:pt-0">
          <h1 className="text-3xl sm:text-4xl font-medium text-center mb-9">Entre na sua conta.</h1>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-xs flex flex-col gap-6">
              <div className="w-full flex flex-col space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium text-foreground">E-mail</FormLabel>

                      <FormControl>
                        <Input
                          className={cn({
                            "border-red-500": form.formState.errors.email,
                          })}
                          {...field}
                        />
                      </FormControl>

                      <FormMessage className="text-sm text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium text-foreground">Senha</FormLabel>

                      <FormControl>
                        <div className="relative">
                          <Input
                            type={passwordType}
                            className={cn({
                              "border-red-500": form.formState.errors.password,
                            })}
                            {...field}
                          />

                          <Button
                            onClick={togglePasswordType}
                            variant="link"
                            size="icon"
                            type="button"
                            className="absolute top-1/2 -translate-y-1/2 right-1"
                            asChild
                          >
                            <span className="cursor-pointer">
                              {passwordType === "password" ? <EyeOff color="#9CABCB" /> : <Eye color="#9CABCB" />}
                            </span>
                          </Button>
                        </div>
                      </FormControl>

                      <FormMessage className="text-sm text-red-500" />
                    </FormItem>
                  )}
                />
              </div>

              <Button size="xl">Entrar</Button>
            </form>
          </Form>
        </div>

        <span className="w-full text-sm text-[#8396BE] text-center sm:absolute sm:bottom-6 sm:left-1/2 sm:-translate-x-1/2">
          Esqueceu seu acesso? Não se preocupe! Entre em contato conosco para recuperar sua conta.
        </span>
      </div>

      <div className="hidden sm:block relative w-full h-full">
        <Image src="/assets/images/login.jpeg" alt="Login" fill className="object-cover object-center" />
      </div>
    </section>
  );
}
