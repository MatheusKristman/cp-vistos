"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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

const formSchema = z
    .object({
        name: z
            .string({ required_error: "Nome é obrigatório", invalid_type_error: "Nome inválido" })
            .min(1, { message: "Nome é obrigatório" })
            .min(4, { message: "Nome precisa ter no mínimo 4 caracteres" }),
        cpf: z
            .string({ required_error: "CPF é obrigatório", invalid_type_error: "CPF inválido" })
            .refine((val) => val.length === 0 || (val.length > 0 && val.length === 14), {
                message: "CPF inválido",
            }),
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
            .string({ required_error: "Senha é obrigatório", invalid_type_error: "Senha inválida" })
            .min(1, { message: "Senha é obrigatória" })
            .min(6, { message: "Senha precisa ter no mínimo 6 caracteres" }),
        passwordConfirm: z
            .string({
                required_error: "Confirmação da senha é obrigatório",
                invalid_type_error: "Confirmação da senha inválida",
            })
            .min(1, { message: "Confirmação da senha é obrigatório" })
            .min(6, { message: "Confirmação da senha precisa ter no mínimo 6 caracteres" }),
        budget: z
            .number({ required_error: "Valor é obrigatório", invalid_type_error: "Valor inválido" })
            .positive(),
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
            .refine((val) => val.length === 0 || (val.length > 0 && val.length === 14), {
                message: "CPF do perfil inválido",
            }),
        profileAddress: z.string({
            required_error: "Endereço do perfil é obrigatório",
            invalid_type_error: "Endereço do perfil inválido",
        }),
        birthDate: z.date({
            required_error: "Data de nascimento é obrigatório",
            invalid_type_error: "Data de nascimento inválida",
        }),
        passport: z.string({
            required_error: "Passaporte é obrigatório",
            invalid_type_error: "Passaporte inválido",
        }),
        visaType: z.enum(["Renovação", "Primeiro Visto"], { message: "Tipo de visto inválido" }),
        visaClass: z.enum(
            [
                "B1 Babá",
                "B1/B2 Turismo",
                "O1 Capacidade Extraordinária",
                "O2 Estrangeiro Acompanhante/Assistente",
                "O3 Cônjuge ou Filho de um O1 ou O2",
            ],
            { message: "Classe de visto inválida" },
        ),
        DSNumber: z.string({
            required_error: "Barcode é obrigatório",
            invalid_type_error: "Barcode inválido",
        }),
        CASVDate: z.date({
            required_error: "Data do CASV é obrigatória",
            invalid_type_error: "Data do CASV inválida",
        }),
        interviewDate: z.date({
            required_error: "Data da entrevista é obrigatória",
            invalid_type_error: "Data da entrevista inválida",
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

export default function CreateAccountPage() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            cpf: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <div className="w-full px-6 sm:px-16 mt-6 lg:mt-12 mb-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-6">
                Cadastro da Conta
            </h1>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome</FormLabel>

                                <FormControl>
                                    <Input placeholder="Insira o nome completo" {...field} />
                                </FormControl>

                                <FormMessage />
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
                                    <Input placeholder="Insira o CPF" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* TODO: adicionar forms baseado no formSchema */}

                    <Button type="submit">Enviar</Button>
                </form>
            </Form>
        </div>
    );
}
