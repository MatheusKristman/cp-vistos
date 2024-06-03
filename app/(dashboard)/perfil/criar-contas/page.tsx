"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z
  .object({
    email: z.string().min(1, { message: "E-mail obrigatório" }).email({ message: "E-mail inválido" }),
    password: z.string().min(6, { message: "Senha precisa ter no mínimo 6 caracteres" }),
    confirmPassword: z.string().min(6, { message: "Confirmar Senha precisa ter no mínimo 6 caracteres" }),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        path: ["confirmPassword"],
        code: "custom",
        message: "As senhas não coincidem, verifique e tente novamente",
      });
    }
  });

export default function CreateAccountPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="w-full px-6 mt-6 mb-12">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium mb-6">Criar contas</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="w-full flex flex-col space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">E-mail</FormLabel>

                  <FormControl>
                    <Input placeholder="Insira o e-mail" className="placeholder:text-primary/50" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Senha</FormLabel>

                  <FormControl>
                    <Input placeholder="Insira a senha" className="placeholder:text-primary/50" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Confirmar Senha</FormLabel>

                  <FormControl>
                    <Input placeholder="Confirme a sua senha" className="placeholder:text-primary/50" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button className="w-full">Criar</Button>
        </form>
      </Form>
    </div>
  );
}
