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
    passportNumber: z.string().min(1, { message: "Campo obrigatório" }),
    passportCity: z.string().min(1, { message: "Campo obrigatório" }),
    passportState: z.string().min(1, { message: "Campo obrigatório" }),
    passportIssuingCountry: z.string().min(1, { message: "Campo obrigatório" }),
    passportIssuingDate: z.date({ message: "Selecione uma data" }),
    passportExpireDate: z.date({ message: "Selecione uma data" }),
    passportLostConfirmation: z
      .string()
      .min(1, { message: "Campo obrigatório" }),
    lostPassportNumber: z.string(),
    lostPassportCountry: z.string(),
    lostPassportDetails: z.string(),
  })
  .superRefine(
    (
      {
        passportLostConfirmation,
        lostPassportNumber,
        lostPassportCountry,
        lostPassportDetails,
      },
      ctx,
    ) => {
      if (
        passportLostConfirmation &&
        lostPassportNumber &&
        lostPassportNumber.length === 0
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Campo vazio, preencha para prosseguir",
          path: ["lostPassportNumber"],
        });
      }

      if (
        passportLostConfirmation &&
        lostPassportCountry &&
        lostPassportCountry.length === 0
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Campo vazio, preencha para prosseguir",
          path: ["lostPassportCountry"],
        });
      }

      if (
        passportLostConfirmation &&
        lostPassportDetails &&
        lostPassportDetails.length === 0
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Campo vazio, preencha para prosseguir",
          path: ["lostPassportDetails"],
        });
      }
    },
  );

export function PassportForm({ currentForm }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      passportNumber:
        currentForm && currentForm.passportNumber
          ? currentForm.passportNumber
          : "",
      passportCity:
        currentForm && currentForm.passportCity ? currentForm.passportCity : "",
      passportState:
        currentForm && currentForm.passportState
          ? currentForm.passportState
          : "",
      passportIssuingCountry:
        currentForm && currentForm.passportIssuingCountry
          ? currentForm.passportIssuingCountry
          : "",
      passportIssuingDate:
        currentForm && currentForm.passportIssuingDate
          ? currentForm.passportIssuingDate
          : undefined,
      passportExpireDate:
        currentForm && currentForm.passportExpireDate
          ? currentForm.passportExpireDate
          : undefined,
      passportLostConfirmation:
        currentForm && currentForm.passportLostConfirmation
          ? currentForm.passportLostConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
      lostPassportNumber:
        currentForm && currentForm.lostPassportNumber
          ? currentForm.lostPassportNumber
          : "",
      lostPassportCountry:
        currentForm && currentForm.lostPassportCountry
          ? currentForm.lostPassportCountry
          : "",
      lostPassportDetails:
        currentForm && currentForm.lostPassportDetails
          ? currentForm.lostPassportDetails
          : "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-12 mb-12"
      >
        PassportForm
      </form>
    </Form>
  );
}
