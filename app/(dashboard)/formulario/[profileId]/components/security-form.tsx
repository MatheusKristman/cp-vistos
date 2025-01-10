"use client";

import { z } from "zod";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Loader2, Save } from "lucide-react";
import { Form as FormType } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FinishFormConfirmation } from "./security-form/finish-form-confirmation";

import { cn } from "@/lib/utils";
import { trpc } from "@/lib/trpc-client";
import useFormStore from "@/constants/stores/useFormStore";

const formSchema = z
  .object({
    contagiousDiseaseConfirmation: z.enum(["", "Sim", "Não"]),
    contagiousDiseaseConfirmationDetails: z.string(),
    phisicalMentalProblemConfirmation: z.enum(["", "Sim", "Não"]),
    phisicalMentalProblemConfirmationDetails: z.string(),
    crimeConfirmation: z.enum(["", "Sim", "Não"]),
    crimeConfirmationDetails: z.string(),
    drugsProblemConfirmation: z.enum(["", "Sim", "Não"]),
    drugsProblemConfirmationDetails: z.string(),
    lawViolateConfirmation: z.enum(["", "Sim", "Não"]),
    lawViolateConfirmationDetails: z.string(),
    prostitutionConfirmation: z.enum(["", "Sim", "Não"]),
    prostitutionConfirmationDetails: z.string(),
    moneyLaundryConfirmation: z.enum(["", "Sim", "Não"]),
    moneyLaundryConfirmationDetails: z.string(),
    peopleTrafficConfirmation: z.enum(["", "Sim", "Não"]),
    peopleTrafficConfirmationDetails: z.string(),
    helpPeopleTrafficConfirmation: z.enum(["", "Sim", "Não"]),
    helpPeopleTrafficConfirmationDetails: z.string(),
    parentPeopleTrafficConfirmation: z.enum(["", "Sim", "Não"]),
    parentPeopleTrafficConfirmationDetails: z.string(),
    spyConfirmation: z.enum(["", "Sim", "Não"]),
    spyConfirmationDetails: z.string(),
    terrorismConfirmation: z.enum(["", "Sim", "Não"]),
    terrorismConfirmationDetails: z.string(),
    financialAssistanceConfirmation: z.enum(["", "Sim", "Não"]),
    financialAssistanceConfirmationDetails: z.string(),
    terrorismMemberConfirmation: z.enum(["", "Sim", "Não"]),
    terrorismMemberConfirmationDetails: z.string(),
    parentTerrorismConfirmation: z.enum(["", "Sim", "Não"]),
    parentTerrorismConfirmationDetails: z.string(),
    genocideConfirmation: z.enum(["", "Sim", "Não"]),
    genocideConfirmationDetails: z.string(),
    tortureConfirmation: z.enum(["", "Sim", "Não"]),
    tortureConfirmationDetails: z.string(),
    assassinConfirmation: z.enum(["", "Sim", "Não"]),
    assassinConfirmationDetails: z.string(),
    childSoldierConfirmation: z.enum(["", "Sim", "Não"]),
    childSoldierConfirmationDetails: z.string(),
    religionLibertyConfirmation: z.enum(["", "Sim", "Não"]),
    religionLibertyConfirmationDetails: z.string(),
    abortConfirmation: z.enum(["", "Sim", "Não"]),
    abortConfirmationDetails: z.string(),
    coerciveTransplantConfirmation: z.enum(["", "Sim", "Não"]),
    coerciveTransplantConfirmationDetails: z.string(),
    visaFraudConfirmation: z.enum(["", "Sim", "Não"]),
    visaFraudConfirmationDetails: z.string(),
    deportedConfirmation: z.enum(["", "Sim", "Não"]),
    deportedConfirmationDetails: z.string(),
    childCustodyConfirmation: z.enum(["", "Sim", "Não"]),
    childCustodyConfirmationDetails: z.string(),
    lawViolationConfirmation: z.enum(["", "Sim", "Não"]),
    lawViolationConfirmationDetails: z.string(),
    avoidTaxConfirmation: z.enum(["", "Sim", "Não"]),
    avoidTaxConfirmationDetails: z.string(),
  })
  .superRefine(
    (
      {
        contagiousDiseaseConfirmation,
        contagiousDiseaseConfirmationDetails,
        phisicalMentalProblemConfirmation,
        phisicalMentalProblemConfirmationDetails,
        crimeConfirmation,
        crimeConfirmationDetails,
        drugsProblemConfirmation,
        drugsProblemConfirmationDetails,
        lawViolateConfirmation,
        lawViolateConfirmationDetails,
        prostitutionConfirmation,
        prostitutionConfirmationDetails,
        moneyLaundryConfirmation,
        moneyLaundryConfirmationDetails,
        peopleTrafficConfirmation,
        peopleTrafficConfirmationDetails,
        helpPeopleTrafficConfirmation,
        helpPeopleTrafficConfirmationDetails,
        parentPeopleTrafficConfirmation,
        parentPeopleTrafficConfirmationDetails,
        spyConfirmation,
        spyConfirmationDetails,
        terrorismConfirmation,
        terrorismConfirmationDetails,
        financialAssistanceConfirmation,
        financialAssistanceConfirmationDetails,
        terrorismMemberConfirmation,
        terrorismMemberConfirmationDetails,
        parentTerrorismConfirmation,
        parentTerrorismConfirmationDetails,
        genocideConfirmation,
        genocideConfirmationDetails,
        tortureConfirmation,
        tortureConfirmationDetails,
        assassinConfirmation,
        assassinConfirmationDetails,
        childSoldierConfirmation,
        childSoldierConfirmationDetails,
        religionLibertyConfirmation,
        religionLibertyConfirmationDetails,
        abortConfirmation,
        abortConfirmationDetails,
        coerciveTransplantConfirmation,
        coerciveTransplantConfirmationDetails,
        visaFraudConfirmation,
        visaFraudConfirmationDetails,
        deportedConfirmation,
        deportedConfirmationDetails,
        childCustodyConfirmation,
        childCustodyConfirmationDetails,
        lawViolationConfirmation,
        lawViolationConfirmationDetails,
        avoidTaxConfirmation,
        avoidTaxConfirmationDetails,
      },
      ctx
    ) => {
      if (contagiousDiseaseConfirmation === "") {
        ctx.addIssue({
          code: "custom",
          message: "Selecione sim ou não",
          path: ["contagiousDiseaseConfirmation"],
        });
      }

      if (phisicalMentalProblemConfirmation === "") {
        ctx.addIssue({
          code: "custom",
          message: "Selecione sim ou não",
          path: ["phisicalMentalProblemConfirmation"],
        });
      }

      if (crimeConfirmation === "") {
        ctx.addIssue({
          code: "custom",
          message: "Selecione sim ou não",
          path: ["crimeConfirmation"],
        });
      }

      if (drugsProblemConfirmation === "") {
        ctx.addIssue({
          code: "custom",
          message: "Selecione sim ou não",
          path: ["drugsProblemConfirmation"],
        });
      }

      if (lawViolateConfirmation === "") {
        ctx.addIssue({
          code: "custom",
          message: "Selecione sim ou não",
          path: ["lawViolateConfirmation"],
        });
      }

      if (prostitutionConfirmation === "") {
        ctx.addIssue({
          code: "custom",
          message: "Selecione sim ou não",
          path: ["prostitutionConfirmation"],
        });
      }

      if (moneyLaundryConfirmation === "") {
        ctx.addIssue({
          code: "custom",
          message: "Selecione sim ou não",
          path: ["moneyLaundryConfirmation"],
        });
      }

      if (peopleTrafficConfirmation === "") {
        ctx.addIssue({
          code: "custom",
          message: "Selecione sim ou não",
          path: ["peopleTrafficConfirmation"],
        });
      }

      if (helpPeopleTrafficConfirmation === "") {
        ctx.addIssue({
          code: "custom",
          message: "Selecione sim ou não",
          path: ["helpPeopleTrafficConfirmation"],
        });
      }

      if (parentPeopleTrafficConfirmation === "") {
        ctx.addIssue({
          code: "custom",
          message: "Selecione sim ou não",
          path: ["parentPeopleTrafficConfirmation"],
        });
      }

      if (spyConfirmation === "") {
        ctx.addIssue({
          code: "custom",
          message: "Selecione sim ou não",
          path: ["spyConfirmation"],
        });
      }

      if (terrorismConfirmation === "") {
        ctx.addIssue({
          code: "custom",
          message: "Selecione sim ou não",
          path: ["terrorismConfirmation"],
        });
      }

      if (financialAssistanceConfirmation === "") {
        ctx.addIssue({
          code: "custom",
          message: "Selecione sim ou não",
          path: ["financialAssistanceConfirmation"],
        });
      }

      if (terrorismMemberConfirmation === "") {
        ctx.addIssue({
          code: "custom",
          message: "Selecione sim ou não",
          path: ["terrorismMemberConfirmation"],
        });
      }

      if (parentTerrorismConfirmation === "") {
        ctx.addIssue({
          code: "custom",
          message: "Selecione sim ou não",
          path: ["parentTerrorismConfirmation"],
        });
      }

      if (genocideConfirmation === "") {
        ctx.addIssue({
          code: "custom",
          message: "Selecione sim ou não",
          path: ["genocideConfirmation"],
        });
      }

      if (tortureConfirmation === "") {
        ctx.addIssue({
          code: "custom",
          message: "Selecione sim ou não",
          path: ["tortureConfirmation"],
        });
      }

      if (assassinConfirmation === "") {
        ctx.addIssue({
          code: "custom",
          message: "Selecione sim ou não",
          path: ["assassinConfirmation"],
        });
      }

      if (childSoldierConfirmation === "") {
        ctx.addIssue({
          code: "custom",
          message: "Selecione sim ou não",
          path: ["childSoldierConfirmation"],
        });
      }

      if (religionLibertyConfirmation === "") {
        ctx.addIssue({
          code: "custom",
          message: "Selecione sim ou não",
          path: ["religionLibertyConfirmation"],
        });
      }

      if (abortConfirmation === "") {
        ctx.addIssue({
          code: "custom",
          message: "Selecione sim ou não",
          path: ["abortConfirmation"],
        });
      }

      if (coerciveTransplantConfirmation === "") {
        ctx.addIssue({
          code: "custom",
          message: "Selecione sim ou não",
          path: ["coerciveTransplantConfirmation"],
        });
      }

      if (visaFraudConfirmation === "") {
        ctx.addIssue({
          code: "custom",
          message: "Selecione sim ou não",
          path: ["visaFraudConfirmation"],
        });
      }

      if (deportedConfirmation === "") {
        ctx.addIssue({
          code: "custom",
          message: "Selecione sim ou não",
          path: ["deportedConfirmation"],
        });
      }

      if (childCustodyConfirmation === "") {
        ctx.addIssue({
          code: "custom",
          message: "Selecione sim ou não",
          path: ["childCustodyConfirmation"],
        });
      }

      if (lawViolationConfirmation === "") {
        ctx.addIssue({
          code: "custom",
          message: "Selecione sim ou não",
          path: ["lawViolationConfirmation"],
        });
      }

      if (avoidTaxConfirmation === "") {
        ctx.addIssue({
          code: "custom",
          message: "Selecione sim ou não",
          path: ["avoidTaxConfirmation"],
        });
      }

      if (contagiousDiseaseConfirmation === "Sim" && contagiousDiseaseConfirmationDetails.length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "Campo obrigatório caso a opção seja sim",
          path: ["contagiousDiseaseConfirmationDetails"],
        });
      }

      if (phisicalMentalProblemConfirmation === "Sim" && phisicalMentalProblemConfirmationDetails.length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "Campo obrigatório caso a opção seja sim",
          path: ["phisicalMentalProblemConfirmationDetails"],
        });
      }

      if (crimeConfirmation === "Sim" && crimeConfirmationDetails.length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "Campo obrigatório caso a opção seja sim",
          path: ["crimeConfirmationDetails"],
        });
      }

      if (drugsProblemConfirmation === "Sim" && drugsProblemConfirmationDetails.length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "Campo obrigatório caso a opção seja sim",
          path: ["drugsProblemConfirmationDetails"],
        });
      }

      if (lawViolateConfirmation === "Sim" && lawViolateConfirmationDetails.length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "Campo obrigatório caso a opção seja sim",
          path: ["lawViolateConfirmationDetails"],
        });
      }

      if (prostitutionConfirmation === "Sim" && prostitutionConfirmationDetails.length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "Campo obrigatório caso a opção seja sim",
          path: ["prostitutionConfirmationDetails"],
        });
      }

      if (moneyLaundryConfirmation === "Sim" && moneyLaundryConfirmationDetails.length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "Campo obrigatório caso a opção seja sim",
          path: ["moneyLaundryConfirmationDetails"],
        });
      }

      if (peopleTrafficConfirmation === "Sim" && peopleTrafficConfirmationDetails.length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "Campo obrigatório caso a opção seja sim",
          path: ["peopleTrafficConfirmationDetails"],
        });
      }

      if (helpPeopleTrafficConfirmation === "Sim" && helpPeopleTrafficConfirmationDetails.length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "Campo obrigatório caso a opção seja sim",
          path: ["helpPeopleTrafficConfirmationDetails"],
        });
      }

      if (parentPeopleTrafficConfirmation === "Sim" && parentPeopleTrafficConfirmationDetails.length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "Campo obrigatório caso a opção seja sim",
          path: ["parentPeopleTrafficConfirmationDetails"],
        });
      }

      if (spyConfirmation === "Sim" && spyConfirmationDetails.length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "Campo obrigatório caso a opção seja sim",
          path: ["spyConfirmationDetails"],
        });
      }

      if (terrorismConfirmation === "Sim" && terrorismConfirmationDetails.length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "Campo obrigatório caso a opção seja sim",
          path: ["terrorismConfirmationDetails"],
        });
      }

      if (financialAssistanceConfirmation === "Sim" && financialAssistanceConfirmationDetails.length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "Campo obrigatório caso a opção seja sim",
          path: ["financialAssistanceConfirmationDetails"],
        });
      }

      if (terrorismMemberConfirmation === "Sim" && terrorismMemberConfirmationDetails.length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "Campo obrigatório caso a opção seja sim",
          path: ["terrorismMemberConfirmationDetails"],
        });
      }

      if (parentTerrorismConfirmation === "Sim" && parentTerrorismConfirmationDetails.length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "Campo obrigatório caso a opção seja sim",
          path: ["parentTerrorismConfirmationDetails"],
        });
      }

      if (genocideConfirmation === "Sim" && genocideConfirmationDetails.length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "Campo obrigatório caso a opção seja sim",
          path: ["genocideConfirmationDetails"],
        });
      }

      if (tortureConfirmation === "Sim" && tortureConfirmationDetails.length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "Campo obrigatório caso a opção seja sim",
          path: ["tortureConfirmationDetails"],
        });
      }

      if (assassinConfirmation === "Sim" && assassinConfirmationDetails.length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "Campo obrigatório caso a opção seja sim",
          path: ["assassinConfirmationDetails"],
        });
      }

      if (childSoldierConfirmation === "Sim" && childSoldierConfirmationDetails.length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "Campo obrigatório caso a opção seja sim",
          path: ["childSoldierConfirmationDetails"],
        });
      }

      if (religionLibertyConfirmation === "Sim" && religionLibertyConfirmationDetails.length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "Campo obrigatório caso a opção seja sim",
          path: ["religionLibertyConfirmationDetails"],
        });
      }

      if (abortConfirmation === "Sim" && abortConfirmationDetails.length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "Campo obrigatório caso a opção seja sim",
          path: ["abortConfirmationDetails"],
        });
      }

      if (coerciveTransplantConfirmation === "Sim" && coerciveTransplantConfirmationDetails.length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "Campo obrigatório caso a opção seja sim",
          path: ["coerciveTransplantConfirmationDetails"],
        });
      }

      if (visaFraudConfirmation === "Sim" && visaFraudConfirmationDetails.length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "Campo obrigatório caso a opção seja sim",
          path: ["visaFraudConfirmationDetails"],
        });
      }

      if (deportedConfirmation === "Sim" && deportedConfirmationDetails.length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "Campo obrigatório caso a opção seja sim",
          path: ["deportedConfirmationDetails"],
        });
      }

      if (childCustodyConfirmation === "Sim" && childCustodyConfirmationDetails.length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "Campo obrigatório caso a opção seja sim",
          path: ["childCustodyConfirmationDetails"],
        });
      }

      if (lawViolationConfirmation === "Sim" && lawViolationConfirmationDetails.length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "Campo obrigatório caso a opção seja sim",
          path: ["lawViolationConfirmationDetails"],
        });
      }

      if (avoidTaxConfirmation === "Sim" && avoidTaxConfirmationDetails.length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "Campo obrigatório caso a opção seja sim",
          path: ["avoidTaxConfirmationDetails"],
        });
      }
    }
  );

interface Props {
  currentForm: FormType;
  profileId: string;
  isEditing: boolean;
}

export function SecurityForm({ currentForm, profileId, isEditing }: Props) {
  const { redirectStep, setRedirectStep } = useFormStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contagiousDiseaseConfirmation:
        currentForm.contagiousDiseaseConfirmation !== null
          ? currentForm.contagiousDiseaseConfirmation
            ? "Sim"
            : "Não"
          : "",
      contagiousDiseaseConfirmationDetails:
        currentForm.contagiousDiseaseConfirmationDetails !== null
          ? currentForm.contagiousDiseaseConfirmationDetails
          : "",
      phisicalMentalProblemConfirmation:
        currentForm.phisicalMentalProblemConfirmation !== null
          ? currentForm.phisicalMentalProblemConfirmation
            ? "Sim"
            : "Não"
          : "",
      phisicalMentalProblemConfirmationDetails:
        currentForm.phisicalMentalProblemConfirmationDetails !== null
          ? currentForm.phisicalMentalProblemConfirmationDetails
          : "",
      crimeConfirmation: currentForm.crimeConfirmation !== null ? (currentForm.crimeConfirmation ? "Sim" : "Não") : "",
      crimeConfirmationDetails:
        currentForm.crimeConfirmationDetails !== null ? currentForm.crimeConfirmationDetails : "",
      drugsProblemConfirmation:
        currentForm.drugsProblemConfirmation !== null ? (currentForm.drugsProblemConfirmation ? "Sim" : "Não") : "",
      drugsProblemConfirmationDetails:
        currentForm.drugsProblemConfirmationDetails !== null ? currentForm.drugsProblemConfirmationDetails : "",
      lawViolateConfirmation:
        currentForm.lawViolateConfirmation !== null ? (currentForm.lawViolateConfirmation ? "Sim" : "Não") : "",
      lawViolateConfirmationDetails:
        currentForm.lawViolateConfirmationDetails !== null ? currentForm.lawViolateConfirmationDetails : "",
      prostitutionConfirmation:
        currentForm.prostitutionConfirmation !== null ? (currentForm.prostitutionConfirmation ? "Sim" : "Não") : "",
      prostitutionConfirmationDetails:
        currentForm.prostitutionConfirmationDetails !== null ? currentForm.prostitutionConfirmationDetails : "",
      moneyLaundryConfirmation:
        currentForm.moneyLaundryConfirmation !== null ? (currentForm.moneyLaundryConfirmation ? "Sim" : "Não") : "",
      moneyLaundryConfirmationDetails:
        currentForm.moneyLaundryConfirmationDetails !== null ? currentForm.moneyLaundryConfirmationDetails : "",
      peopleTrafficConfirmation:
        currentForm.peopleTrafficConfirmation !== null ? (currentForm.peopleTrafficConfirmation ? "Sim" : "Não") : "",
      peopleTrafficConfirmationDetails:
        currentForm.peopleTrafficConfirmationDetails !== null ? currentForm.peopleTrafficConfirmationDetails : "",
      helpPeopleTrafficConfirmation:
        currentForm.helpPeopleTrafficConfirmation !== null
          ? currentForm.helpPeopleTrafficConfirmation
            ? "Sim"
            : "Não"
          : "",
      helpPeopleTrafficConfirmationDetails:
        currentForm.helpPeopleTrafficConfirmationDetails !== null
          ? currentForm.helpPeopleTrafficConfirmationDetails
          : "",
      parentPeopleTrafficConfirmation:
        currentForm.parentPeopleTrafficConfirmation !== null
          ? currentForm.parentPeopleTrafficConfirmation
            ? "Sim"
            : "Não"
          : "",
      parentPeopleTrafficConfirmationDetails:
        currentForm.parentPeopleTrafficConfirmationDetails !== null
          ? currentForm.parentPeopleTrafficConfirmationDetails
          : "",
      spyConfirmation: currentForm.spyConfirmation !== null ? (currentForm.spyConfirmation ? "Sim" : "Não") : "",
      spyConfirmationDetails: currentForm.spyConfirmationDetails !== null ? currentForm.spyConfirmationDetails : "",
      terrorismConfirmation:
        currentForm.terrorismConfirmation !== null ? (currentForm.terrorismConfirmation ? "Sim" : "Não") : "",
      terrorismConfirmationDetails:
        currentForm.terrorismConfirmationDetails !== null ? currentForm.terrorismConfirmationDetails : "",
      financialAssistanceConfirmation:
        currentForm.financialAssistanceConfirmation !== null
          ? currentForm.financialAssistanceConfirmation
            ? "Sim"
            : "Não"
          : "",
      financialAssistanceConfirmationDetails:
        currentForm.financialAssistanceConfirmationDetails !== null
          ? currentForm.financialAssistanceConfirmationDetails
          : "",
      terrorismMemberConfirmation:
        currentForm.terrorismMemberConfirmation !== null
          ? currentForm.terrorismMemberConfirmation
            ? "Sim"
            : "Não"
          : "",
      terrorismMemberConfirmationDetails:
        currentForm.terrorismMemberConfirmationDetails !== null ? currentForm.terrorismMemberConfirmationDetails : "",
      parentTerrorismConfirmation:
        currentForm.parentTerrorismConfirmation !== null
          ? currentForm.parentTerrorismConfirmation
            ? "Sim"
            : "Não"
          : "",
      parentTerrorismConfirmationDetails:
        currentForm.parentTerrorismConfirmationDetails !== null ? currentForm.parentTerrorismConfirmationDetails : "",
      genocideConfirmation:
        currentForm.genocideConfirmation !== null ? (currentForm.genocideConfirmation ? "Sim" : "Não") : "",
      genocideConfirmationDetails:
        currentForm.genocideConfirmationDetails !== null ? currentForm.genocideConfirmationDetails : "",
      tortureConfirmation:
        currentForm.tortureConfirmation !== null ? (currentForm.tortureConfirmation ? "Sim" : "Não") : "",
      tortureConfirmationDetails:
        currentForm.tortureConfirmationDetails !== null ? currentForm.tortureConfirmationDetails : "",
      assassinConfirmation:
        currentForm.assassinConfirmation !== null ? (currentForm.assassinConfirmation ? "Sim" : "Não") : "",
      assassinConfirmationDetails:
        currentForm.assassinConfirmationDetails !== null ? currentForm.assassinConfirmationDetails : "",
      childSoldierConfirmation:
        currentForm.childSoldierConfirmation !== null ? (currentForm.childSoldierConfirmation ? "Sim" : "Não") : "",
      childSoldierConfirmationDetails:
        currentForm.childSoldierConfirmationDetails !== null ? currentForm.childSoldierConfirmationDetails : "",
      religionLibertyConfirmation:
        currentForm.religionLibertyConfirmation !== null
          ? currentForm.religionLibertyConfirmation
            ? "Sim"
            : "Não"
          : "",
      religionLibertyConfirmationDetails:
        currentForm.religionLibertyConfirmationDetails !== null ? currentForm.religionLibertyConfirmationDetails : "",
      abortConfirmation: currentForm.abortConfirmation !== null ? (currentForm.abortConfirmation ? "Sim" : "Não") : "",
      abortConfirmationDetails:
        currentForm.abortConfirmationDetails !== null ? currentForm.abortConfirmationDetails : "",
      coerciveTransplantConfirmation:
        currentForm.coerciveTransplantConfirmation !== null
          ? currentForm.coerciveTransplantConfirmation
            ? "Sim"
            : "Não"
          : "",
      coerciveTransplantConfirmationDetails:
        currentForm.coerciveTransplantConfirmationDetails !== null
          ? currentForm.coerciveTransplantConfirmationDetails
          : "",
      visaFraudConfirmation:
        currentForm.visaFraudConfirmation !== null ? (currentForm.visaFraudConfirmation ? "Sim" : "Não") : "",
      visaFraudConfirmationDetails:
        currentForm.visaFraudConfirmationDetails !== null ? currentForm.visaFraudConfirmationDetails : "",
      deportedConfirmation:
        currentForm.deportedConfirmation !== null ? (currentForm.deportedConfirmation ? "Sim" : "Não") : "",
      deportedConfirmationDetails:
        currentForm.deportedConfirmationDetails !== null ? currentForm.deportedConfirmationDetails : "",
      childCustodyConfirmation:
        currentForm.childCustodyConfirmation !== null ? (currentForm.childCustodyConfirmation ? "Sim" : "Não") : "",
      childCustodyConfirmationDetails:
        currentForm.childCustodyConfirmationDetails !== null ? currentForm.childCustodyConfirmationDetails : "",
      lawViolationConfirmation:
        currentForm.lawViolationConfirmation !== null ? (currentForm.lawViolationConfirmation ? "Sim" : "Não") : "",
      lawViolationConfirmationDetails:
        currentForm.lawViolationConfirmationDetails !== null ? currentForm.lawViolationConfirmationDetails : "",
      avoidTaxConfirmation:
        currentForm.avoidTaxConfirmation !== null ? (currentForm.avoidTaxConfirmation ? "Sim" : "Não") : "",
      avoidTaxConfirmationDetails:
        currentForm.avoidTaxConfirmationDetails !== null ? currentForm.avoidTaxConfirmationDetails : "",
    },
  });

  const utils = trpc.useUtils();
  const router = useRouter();

  const contagiousDiseaseConfirmation = form.watch("contagiousDiseaseConfirmation");
  const phisicalMentalProblemConfirmation = form.watch("phisicalMentalProblemConfirmation");
  const crimeConfirmation = form.watch("crimeConfirmation");
  const drugsProblemConfirmation = form.watch("drugsProblemConfirmation");
  const lawViolateConfirmation = form.watch("lawViolateConfirmation");
  const prostitutionConfirmation = form.watch("prostitutionConfirmation");
  const moneyLaundryConfirmation = form.watch("moneyLaundryConfirmation");
  const peopleTrafficConfirmation = form.watch("peopleTrafficConfirmation");
  const helpPeopleTrafficConfirmation = form.watch("helpPeopleTrafficConfirmation");
  const parentPeopleTrafficConfirmation = form.watch("parentPeopleTrafficConfirmation");
  const spyConfirmation = form.watch("spyConfirmation");
  const terrorismConfirmation = form.watch("terrorismConfirmation");
  const financialAssistanceConfirmation = form.watch("financialAssistanceConfirmation");
  const terrorismMemberConfirmation = form.watch("terrorismMemberConfirmation");
  const parentTerrorismConfirmation = form.watch("parentTerrorismConfirmation");
  const genocideConfirmation = form.watch("genocideConfirmation");
  const tortureConfirmation = form.watch("tortureConfirmation");
  const assassinConfirmation = form.watch("assassinConfirmation");
  const childSoldierConfirmation = form.watch("childSoldierConfirmation");
  const religionLibertyConfirmation = form.watch("religionLibertyConfirmation");
  const abortConfirmation = form.watch("abortConfirmation");
  const coerciveTransplantConfirmation = form.watch("coerciveTransplantConfirmation");
  const visaFraudConfirmation = form.watch("visaFraudConfirmation");
  const deportedConfirmation = form.watch("deportedConfirmation");
  const childCustodyConfirmation = form.watch("childCustodyConfirmation");
  const lawViolationConfirmation = form.watch("lawViolationConfirmation");
  const avoidTaxConfirmation = form.watch("avoidTaxConfirmation");

  const { mutate: submitSecurity, isPending } = trpc.formsRouter.submitSecurity.useMutation({
    onSuccess: (data) => {
      toast.success(data.message);
      utils.formsRouter.getForm.invalidate();

      router.push(`/resumo-formulario/${profileId}`);
    },
    onError: (error) => {
      console.error(error.data);

      if (error.data && error.data.code === "NOT_FOUND") {
        toast.error(error.message);
      } else {
        toast.error("Erro ao enviar as informações do formulário, tente novamente mais tarde");
      }
    },
  });
  const { mutate: saveSecurity, isPending: isSavePending } = trpc.formsRouter.saveSecurity.useMutation({
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

      saveSecurity({
        profileId,
        redirectStep,
        contagiousDiseaseConfirmation:
          values.contagiousDiseaseConfirmation ??
          (currentForm.contagiousDiseaseConfirmation !== null
            ? currentForm.contagiousDiseaseConfirmation
              ? "Sim"
              : "Não"
            : null),
        contagiousDiseaseConfirmationDetails: values.contagiousDiseaseConfirmationDetails
          ? values.contagiousDiseaseConfirmationDetails
          : !currentForm.contagiousDiseaseConfirmationDetails
          ? ""
          : currentForm.contagiousDiseaseConfirmationDetails,
        phisicalMentalProblemConfirmation:
          values.phisicalMentalProblemConfirmation ??
          (currentForm.phisicalMentalProblemConfirmation !== null
            ? currentForm.phisicalMentalProblemConfirmation
              ? "Sim"
              : "Não"
            : null),
        phisicalMentalProblemConfirmationDetails: values.phisicalMentalProblemConfirmationDetails
          ? values.phisicalMentalProblemConfirmationDetails
          : !currentForm.phisicalMentalProblemConfirmationDetails
          ? ""
          : currentForm.phisicalMentalProblemConfirmationDetails,
        crimeConfirmation:
          values.crimeConfirmation ??
          (currentForm.crimeConfirmation !== null ? (currentForm.crimeConfirmation ? "Sim" : "Não") : null),
        crimeConfirmationDetails: values.crimeConfirmationDetails
          ? values.crimeConfirmationDetails
          : !currentForm.crimeConfirmationDetails
          ? ""
          : currentForm.crimeConfirmationDetails,
        drugsProblemConfirmation:
          values.drugsProblemConfirmation ??
          (currentForm.drugsProblemConfirmation !== null
            ? currentForm.drugsProblemConfirmation
              ? "Sim"
              : "Não"
            : null),
        drugsProblemConfirmationDetails: values.drugsProblemConfirmationDetails
          ? values.drugsProblemConfirmationDetails
          : !currentForm.drugsProblemConfirmationDetails
          ? ""
          : currentForm.drugsProblemConfirmationDetails,
        lawViolateConfirmation:
          values.lawViolateConfirmation ??
          (currentForm.lawViolateConfirmation !== null ? (currentForm.lawViolateConfirmation ? "Sim" : "Não") : null),
        lawViolateConfirmationDetails: values.lawViolateConfirmationDetails
          ? values.lawViolateConfirmationDetails
          : !currentForm.lawViolateConfirmationDetails
          ? ""
          : currentForm.lawViolateConfirmationDetails,
        prostitutionConfirmation:
          values.prostitutionConfirmation ??
          (currentForm.prostitutionConfirmation !== null
            ? currentForm.prostitutionConfirmation
              ? "Sim"
              : "Não"
            : null),
        prostitutionConfirmationDetails: values.prostitutionConfirmationDetails
          ? values.prostitutionConfirmationDetails
          : !currentForm.prostitutionConfirmationDetails
          ? ""
          : currentForm.prostitutionConfirmationDetails,
        moneyLaundryConfirmation:
          values.moneyLaundryConfirmation ??
          (currentForm.moneyLaundryConfirmation !== null
            ? currentForm.moneyLaundryConfirmation
              ? "Sim"
              : "Não"
            : null),
        moneyLaundryConfirmationDetails: values.moneyLaundryConfirmationDetails
          ? values.moneyLaundryConfirmationDetails
          : !currentForm.moneyLaundryConfirmationDetails
          ? ""
          : currentForm.moneyLaundryConfirmationDetails,
        peopleTrafficConfirmation:
          values.peopleTrafficConfirmation ??
          (currentForm.peopleTrafficConfirmation !== null
            ? currentForm.peopleTrafficConfirmation
              ? "Sim"
              : "Não"
            : null),
        peopleTrafficConfirmationDetails: values.peopleTrafficConfirmationDetails
          ? values.peopleTrafficConfirmationDetails
          : !currentForm.peopleTrafficConfirmationDetails
          ? ""
          : currentForm.peopleTrafficConfirmationDetails,
        helpPeopleTrafficConfirmation:
          values.helpPeopleTrafficConfirmation ??
          (currentForm.helpPeopleTrafficConfirmation !== null
            ? currentForm.helpPeopleTrafficConfirmation
              ? "Sim"
              : "Não"
            : null),
        helpPeopleTrafficConfirmationDetails: values.helpPeopleTrafficConfirmationDetails
          ? values.helpPeopleTrafficConfirmationDetails
          : !currentForm.helpPeopleTrafficConfirmationDetails
          ? ""
          : currentForm.helpPeopleTrafficConfirmationDetails,
        parentPeopleTrafficConfirmation:
          values.parentPeopleTrafficConfirmation ??
          (currentForm.parentPeopleTrafficConfirmation !== null
            ? currentForm.parentPeopleTrafficConfirmation
              ? "Sim"
              : "Não"
            : null),
        parentPeopleTrafficConfirmationDetails: values.parentPeopleTrafficConfirmationDetails
          ? values.parentPeopleTrafficConfirmationDetails
          : !currentForm.parentPeopleTrafficConfirmationDetails
          ? ""
          : currentForm.parentPeopleTrafficConfirmationDetails,
        spyConfirmation:
          values.spyConfirmation ??
          (currentForm.spyConfirmation !== null ? (currentForm.spyConfirmation ? "Sim" : "Não") : null),
        spyConfirmationDetails: values.spyConfirmationDetails
          ? values.spyConfirmationDetails
          : !currentForm.spyConfirmationDetails
          ? ""
          : currentForm.spyConfirmationDetails,
        terrorismConfirmation:
          values.terrorismConfirmation ??
          (currentForm.terrorismConfirmation !== null ? (currentForm.terrorismConfirmation ? "Sim" : "Não") : null),
        terrorismConfirmationDetails: values.terrorismConfirmationDetails
          ? values.terrorismConfirmationDetails
          : !currentForm.terrorismConfirmationDetails
          ? ""
          : currentForm.terrorismConfirmationDetails,
        financialAssistanceConfirmation:
          values.financialAssistanceConfirmation ??
          (currentForm.financialAssistanceConfirmation !== null
            ? currentForm.financialAssistanceConfirmation
              ? "Sim"
              : "Não"
            : null),
        financialAssistanceConfirmationDetails: values.financialAssistanceConfirmationDetails
          ? values.financialAssistanceConfirmationDetails
          : !currentForm.financialAssistanceConfirmationDetails
          ? ""
          : currentForm.financialAssistanceConfirmationDetails,
        terrorismMemberConfirmation:
          values.terrorismMemberConfirmation ??
          (currentForm.terrorismMemberConfirmation !== null
            ? currentForm.terrorismMemberConfirmation
              ? "Sim"
              : "Não"
            : null),
        terrorismMemberConfirmationDetails: values.terrorismMemberConfirmationDetails
          ? values.terrorismMemberConfirmationDetails
          : !currentForm.terrorismMemberConfirmationDetails
          ? ""
          : currentForm.terrorismMemberConfirmationDetails,
        parentTerrorismConfirmation:
          values.parentTerrorismConfirmation ??
          (currentForm.parentTerrorismConfirmation !== null
            ? currentForm.parentTerrorismConfirmation
              ? "Sim"
              : "Não"
            : null),
        parentTerrorismConfirmationDetails: values.parentTerrorismConfirmationDetails
          ? values.parentTerrorismConfirmationDetails
          : !currentForm.parentTerrorismConfirmationDetails
          ? ""
          : currentForm.parentTerrorismConfirmationDetails,
        genocideConfirmation:
          values.genocideConfirmation ??
          (currentForm.genocideConfirmation !== null ? (currentForm.genocideConfirmation ? "Sim" : "Não") : null),
        genocideConfirmationDetails: values.genocideConfirmationDetails
          ? values.genocideConfirmationDetails
          : !currentForm.genocideConfirmationDetails
          ? ""
          : currentForm.genocideConfirmationDetails,
        tortureConfirmation:
          values.tortureConfirmation ??
          (currentForm.tortureConfirmation !== null ? (currentForm.tortureConfirmation ? "Sim" : "Não") : null),
        tortureConfirmationDetails: values.tortureConfirmationDetails
          ? values.tortureConfirmationDetails
          : !currentForm.tortureConfirmationDetails
          ? ""
          : currentForm.tortureConfirmationDetails,
        assassinConfirmation:
          values.assassinConfirmation ??
          (currentForm.assassinConfirmation !== null ? (currentForm.assassinConfirmation ? "Sim" : "Não") : null),
        assassinConfirmationDetails: values.assassinConfirmationDetails
          ? values.assassinConfirmationDetails
          : !currentForm.assassinConfirmationDetails
          ? ""
          : currentForm.assassinConfirmationDetails,
        childSoldierConfirmation:
          values.childSoldierConfirmation ??
          (currentForm.childSoldierConfirmation !== null
            ? currentForm.childSoldierConfirmation
              ? "Sim"
              : "Não"
            : null),
        childSoldierConfirmationDetails: values.childSoldierConfirmationDetails
          ? values.childSoldierConfirmationDetails
          : !currentForm.childSoldierConfirmationDetails
          ? ""
          : currentForm.childSoldierConfirmationDetails,
        religionLibertyConfirmation:
          values.religionLibertyConfirmation ??
          (currentForm.religionLibertyConfirmation !== null
            ? currentForm.religionLibertyConfirmation
              ? "Sim"
              : "Não"
            : null),
        religionLibertyConfirmationDetails: values.religionLibertyConfirmationDetails
          ? values.religionLibertyConfirmationDetails
          : !currentForm.religionLibertyConfirmationDetails
          ? ""
          : currentForm.religionLibertyConfirmationDetails,
        abortConfirmation:
          values.abortConfirmation ??
          (currentForm.abortConfirmation !== null ? (currentForm.abortConfirmation ? "Sim" : "Não") : null),
        abortConfirmationDetails: values.abortConfirmationDetails
          ? values.abortConfirmationDetails
          : !currentForm.abortConfirmationDetails
          ? ""
          : currentForm.abortConfirmationDetails,
        coerciveTransplantConfirmation:
          values.coerciveTransplantConfirmation ??
          (currentForm.coerciveTransplantConfirmation !== null
            ? currentForm.coerciveTransplantConfirmation
              ? "Sim"
              : "Não"
            : null),
        coerciveTransplantConfirmationDetails: values.coerciveTransplantConfirmationDetails
          ? values.coerciveTransplantConfirmationDetails
          : !currentForm.coerciveTransplantConfirmationDetails
          ? ""
          : currentForm.coerciveTransplantConfirmationDetails,
        visaFraudConfirmation:
          values.visaFraudConfirmation ??
          (currentForm.visaFraudConfirmation !== null ? (currentForm.visaFraudConfirmation ? "Sim" : "Não") : null),
        visaFraudConfirmationDetails: values.visaFraudConfirmationDetails
          ? values.visaFraudConfirmationDetails
          : !currentForm.visaFraudConfirmationDetails
          ? ""
          : currentForm.visaFraudConfirmationDetails,
        deportedConfirmation:
          values.deportedConfirmation ??
          (currentForm.deportedConfirmation !== null ? (currentForm.deportedConfirmation ? "Sim" : "Não") : null),
        deportedConfirmationDetails: values.deportedConfirmationDetails
          ? values.deportedConfirmationDetails
          : !currentForm.deportedConfirmationDetails
          ? ""
          : currentForm.deportedConfirmationDetails,
        childCustodyConfirmation:
          values.childCustodyConfirmation ??
          (currentForm.childCustodyConfirmation !== null
            ? currentForm.childCustodyConfirmation
              ? "Sim"
              : "Não"
            : null),
        childCustodyConfirmationDetails: values.childCustodyConfirmationDetails
          ? values.childCustodyConfirmationDetails
          : !currentForm.childCustodyConfirmationDetails
          ? ""
          : currentForm.childCustodyConfirmationDetails,
        lawViolationConfirmation:
          values.lawViolationConfirmation ??
          (currentForm.lawViolationConfirmation !== null
            ? currentForm.lawViolationConfirmation
              ? "Sim"
              : "Não"
            : null),
        lawViolationConfirmationDetails: values.lawViolationConfirmationDetails
          ? values.lawViolationConfirmationDetails
          : !currentForm.lawViolationConfirmationDetails
          ? ""
          : currentForm.lawViolationConfirmationDetails,
        avoidTaxConfirmation:
          values.avoidTaxConfirmation ??
          (currentForm.avoidTaxConfirmation !== null ? (currentForm.avoidTaxConfirmation ? "Sim" : "Não") : null),
        avoidTaxConfirmationDetails: values.avoidTaxConfirmationDetails
          ? values.avoidTaxConfirmationDetails
          : !currentForm.avoidTaxConfirmationDetails
          ? ""
          : currentForm.avoidTaxConfirmationDetails,
      });
      setRedirectStep(null);
    }
  }, [redirectStep, setRedirectStep, saveSecurity, profileId]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (isEditing) {
      submitSecurity({ ...values, profileId, isEditing, step: 11 });
    }
  }

  function handleSubmitOnModal() {
    form
      .trigger(
        [
          "contagiousDiseaseConfirmation",
          "contagiousDiseaseConfirmationDetails",
          "phisicalMentalProblemConfirmation",
          "phisicalMentalProblemConfirmationDetails",
          "crimeConfirmation",
          "crimeConfirmationDetails",
          "drugsProblemConfirmation",
          "drugsProblemConfirmationDetails",
          "lawViolateConfirmation",
          "lawViolateConfirmationDetails",
          "prostitutionConfirmation",
          "prostitutionConfirmationDetails",
          "moneyLaundryConfirmation",
          "moneyLaundryConfirmationDetails",
          "peopleTrafficConfirmation",
          "peopleTrafficConfirmationDetails",
          "helpPeopleTrafficConfirmation",
          "helpPeopleTrafficConfirmationDetails",
          "parentPeopleTrafficConfirmation",
          "parentPeopleTrafficConfirmationDetails",
          "spyConfirmation",
          "spyConfirmationDetails",
          "terrorismConfirmation",
          "terrorismConfirmationDetails",
          "financialAssistanceConfirmation",
          "financialAssistanceConfirmationDetails",
          "terrorismMemberConfirmation",
          "terrorismMemberConfirmationDetails",
          "parentTerrorismConfirmation",
          "parentTerrorismConfirmationDetails",
          "genocideConfirmation",
          "genocideConfirmationDetails",
          "tortureConfirmation",
          "tortureConfirmationDetails",
          "assassinConfirmation",
          "assassinConfirmationDetails",
          "childSoldierConfirmation",
          "childSoldierConfirmationDetails",
          "religionLibertyConfirmation",
          "religionLibertyConfirmationDetails",
          "abortConfirmation",
          "abortConfirmationDetails",
          "coerciveTransplantConfirmation",
          "coerciveTransplantConfirmationDetails",
          "visaFraudConfirmation",
          "visaFraudConfirmationDetails",
          "deportedConfirmation",
          "deportedConfirmationDetails",
          "childCustodyConfirmation",
          "childCustodyConfirmationDetails",
          "lawViolationConfirmation",
          "lawViolationConfirmationDetails",
          "avoidTaxConfirmation",
          "avoidTaxConfirmationDetails",
        ],
        {
          shouldFocus: true,
        }
      )
      .then(() => {
        if (Object.keys(form.formState.errors).length === 0) {
          const values = form.getValues();

          submitSecurity({ ...values, profileId, isEditing, step: 11 });
        } else {
          router.push(`/formulario/${profileId}?formStep=10`);
        }
      });
  }

  function onSave() {
    const values = form.getValues();

    saveSecurity({
      profileId,
      contagiousDiseaseConfirmation:
        values.contagiousDiseaseConfirmation ??
        (currentForm.contagiousDiseaseConfirmation !== null
          ? currentForm.contagiousDiseaseConfirmation
            ? "Sim"
            : "Não"
          : null),
      contagiousDiseaseConfirmationDetails: values.contagiousDiseaseConfirmationDetails
        ? values.contagiousDiseaseConfirmationDetails
        : !currentForm.contagiousDiseaseConfirmationDetails
        ? ""
        : currentForm.contagiousDiseaseConfirmationDetails,
      phisicalMentalProblemConfirmation:
        values.phisicalMentalProblemConfirmation ??
        (currentForm.phisicalMentalProblemConfirmation !== null
          ? currentForm.phisicalMentalProblemConfirmation
            ? "Sim"
            : "Não"
          : null),
      phisicalMentalProblemConfirmationDetails: values.phisicalMentalProblemConfirmationDetails
        ? values.phisicalMentalProblemConfirmationDetails
        : !currentForm.phisicalMentalProblemConfirmationDetails
        ? ""
        : currentForm.phisicalMentalProblemConfirmationDetails,
      crimeConfirmation:
        values.crimeConfirmation ??
        (currentForm.crimeConfirmation !== null ? (currentForm.crimeConfirmation ? "Sim" : "Não") : null),
      crimeConfirmationDetails: values.crimeConfirmationDetails
        ? values.crimeConfirmationDetails
        : !currentForm.crimeConfirmationDetails
        ? ""
        : currentForm.crimeConfirmationDetails,
      drugsProblemConfirmation:
        values.drugsProblemConfirmation ??
        (currentForm.drugsProblemConfirmation !== null ? (currentForm.drugsProblemConfirmation ? "Sim" : "Não") : null),
      drugsProblemConfirmationDetails: values.drugsProblemConfirmationDetails
        ? values.drugsProblemConfirmationDetails
        : !currentForm.drugsProblemConfirmationDetails
        ? ""
        : currentForm.drugsProblemConfirmationDetails,
      lawViolateConfirmation:
        values.lawViolateConfirmation ??
        (currentForm.lawViolateConfirmation !== null ? (currentForm.lawViolateConfirmation ? "Sim" : "Não") : null),
      lawViolateConfirmationDetails: values.lawViolateConfirmationDetails
        ? values.lawViolateConfirmationDetails
        : !currentForm.lawViolateConfirmationDetails
        ? ""
        : currentForm.lawViolateConfirmationDetails,
      prostitutionConfirmation:
        values.prostitutionConfirmation ??
        (currentForm.prostitutionConfirmation !== null ? (currentForm.prostitutionConfirmation ? "Sim" : "Não") : null),
      prostitutionConfirmationDetails: values.prostitutionConfirmationDetails
        ? values.prostitutionConfirmationDetails
        : !currentForm.prostitutionConfirmationDetails
        ? ""
        : currentForm.prostitutionConfirmationDetails,
      moneyLaundryConfirmation:
        values.moneyLaundryConfirmation ??
        (currentForm.moneyLaundryConfirmation !== null ? (currentForm.moneyLaundryConfirmation ? "Sim" : "Não") : null),
      moneyLaundryConfirmationDetails: values.moneyLaundryConfirmationDetails
        ? values.moneyLaundryConfirmationDetails
        : !currentForm.moneyLaundryConfirmationDetails
        ? ""
        : currentForm.moneyLaundryConfirmationDetails,
      peopleTrafficConfirmation:
        values.peopleTrafficConfirmation ??
        (currentForm.peopleTrafficConfirmation !== null
          ? currentForm.peopleTrafficConfirmation
            ? "Sim"
            : "Não"
          : null),
      peopleTrafficConfirmationDetails: values.peopleTrafficConfirmationDetails
        ? values.peopleTrafficConfirmationDetails
        : !currentForm.peopleTrafficConfirmationDetails
        ? ""
        : currentForm.peopleTrafficConfirmationDetails,
      helpPeopleTrafficConfirmation:
        values.helpPeopleTrafficConfirmation ??
        (currentForm.helpPeopleTrafficConfirmation !== null
          ? currentForm.helpPeopleTrafficConfirmation
            ? "Sim"
            : "Não"
          : null),
      helpPeopleTrafficConfirmationDetails: values.helpPeopleTrafficConfirmationDetails
        ? values.helpPeopleTrafficConfirmationDetails
        : !currentForm.helpPeopleTrafficConfirmationDetails
        ? ""
        : currentForm.helpPeopleTrafficConfirmationDetails,
      parentPeopleTrafficConfirmation:
        values.parentPeopleTrafficConfirmation ??
        (currentForm.parentPeopleTrafficConfirmation !== null
          ? currentForm.parentPeopleTrafficConfirmation
            ? "Sim"
            : "Não"
          : null),
      parentPeopleTrafficConfirmationDetails: values.parentPeopleTrafficConfirmationDetails
        ? values.parentPeopleTrafficConfirmationDetails
        : !currentForm.parentPeopleTrafficConfirmationDetails
        ? ""
        : currentForm.parentPeopleTrafficConfirmationDetails,
      spyConfirmation:
        values.spyConfirmation ??
        (currentForm.spyConfirmation !== null ? (currentForm.spyConfirmation ? "Sim" : "Não") : null),
      spyConfirmationDetails: values.spyConfirmationDetails
        ? values.spyConfirmationDetails
        : !currentForm.spyConfirmationDetails
        ? ""
        : currentForm.spyConfirmationDetails,
      terrorismConfirmation:
        values.terrorismConfirmation ??
        (currentForm.terrorismConfirmation !== null ? (currentForm.terrorismConfirmation ? "Sim" : "Não") : null),
      terrorismConfirmationDetails: values.terrorismConfirmationDetails
        ? values.terrorismConfirmationDetails
        : !currentForm.terrorismConfirmationDetails
        ? ""
        : currentForm.terrorismConfirmationDetails,
      financialAssistanceConfirmation:
        values.financialAssistanceConfirmation ??
        (currentForm.financialAssistanceConfirmation !== null
          ? currentForm.financialAssistanceConfirmation
            ? "Sim"
            : "Não"
          : null),
      financialAssistanceConfirmationDetails: values.financialAssistanceConfirmationDetails
        ? values.financialAssistanceConfirmationDetails
        : !currentForm.financialAssistanceConfirmationDetails
        ? ""
        : currentForm.financialAssistanceConfirmationDetails,
      terrorismMemberConfirmation:
        values.terrorismMemberConfirmation ??
        (currentForm.terrorismMemberConfirmation !== null
          ? currentForm.terrorismMemberConfirmation
            ? "Sim"
            : "Não"
          : null),
      terrorismMemberConfirmationDetails: values.terrorismMemberConfirmationDetails
        ? values.terrorismMemberConfirmationDetails
        : !currentForm.terrorismMemberConfirmationDetails
        ? ""
        : currentForm.terrorismMemberConfirmationDetails,
      parentTerrorismConfirmation:
        values.parentTerrorismConfirmation ??
        (currentForm.parentTerrorismConfirmation !== null
          ? currentForm.parentTerrorismConfirmation
            ? "Sim"
            : "Não"
          : null),
      parentTerrorismConfirmationDetails: values.parentTerrorismConfirmationDetails
        ? values.parentTerrorismConfirmationDetails
        : !currentForm.parentTerrorismConfirmationDetails
        ? ""
        : currentForm.parentTerrorismConfirmationDetails,
      genocideConfirmation:
        values.genocideConfirmation ??
        (currentForm.genocideConfirmation !== null ? (currentForm.genocideConfirmation ? "Sim" : "Não") : null),
      genocideConfirmationDetails: values.genocideConfirmationDetails
        ? values.genocideConfirmationDetails
        : !currentForm.genocideConfirmationDetails
        ? ""
        : currentForm.genocideConfirmationDetails,
      tortureConfirmation:
        values.tortureConfirmation ??
        (currentForm.tortureConfirmation !== null ? (currentForm.tortureConfirmation ? "Sim" : "Não") : null),
      tortureConfirmationDetails: values.tortureConfirmationDetails
        ? values.tortureConfirmationDetails
        : !currentForm.tortureConfirmationDetails
        ? ""
        : currentForm.tortureConfirmationDetails,
      assassinConfirmation:
        values.assassinConfirmation ??
        (currentForm.assassinConfirmation !== null ? (currentForm.assassinConfirmation ? "Sim" : "Não") : null),
      assassinConfirmationDetails: values.assassinConfirmationDetails
        ? values.assassinConfirmationDetails
        : !currentForm.assassinConfirmationDetails
        ? ""
        : currentForm.assassinConfirmationDetails,
      childSoldierConfirmation:
        values.childSoldierConfirmation ??
        (currentForm.childSoldierConfirmation !== null ? (currentForm.childSoldierConfirmation ? "Sim" : "Não") : null),
      childSoldierConfirmationDetails: values.childSoldierConfirmationDetails
        ? values.childSoldierConfirmationDetails
        : !currentForm.childSoldierConfirmationDetails
        ? ""
        : currentForm.childSoldierConfirmationDetails,
      religionLibertyConfirmation:
        values.religionLibertyConfirmation ??
        (currentForm.religionLibertyConfirmation !== null
          ? currentForm.religionLibertyConfirmation
            ? "Sim"
            : "Não"
          : null),
      religionLibertyConfirmationDetails: values.religionLibertyConfirmationDetails
        ? values.religionLibertyConfirmationDetails
        : !currentForm.religionLibertyConfirmationDetails
        ? ""
        : currentForm.religionLibertyConfirmationDetails,
      abortConfirmation:
        values.abortConfirmation ??
        (currentForm.abortConfirmation !== null ? (currentForm.abortConfirmation ? "Sim" : "Não") : null),
      abortConfirmationDetails: values.abortConfirmationDetails
        ? values.abortConfirmationDetails
        : !currentForm.abortConfirmationDetails
        ? ""
        : currentForm.abortConfirmationDetails,
      coerciveTransplantConfirmation:
        values.coerciveTransplantConfirmation ??
        (currentForm.coerciveTransplantConfirmation !== null
          ? currentForm.coerciveTransplantConfirmation
            ? "Sim"
            : "Não"
          : null),
      coerciveTransplantConfirmationDetails: values.coerciveTransplantConfirmationDetails
        ? values.coerciveTransplantConfirmationDetails
        : !currentForm.coerciveTransplantConfirmationDetails
        ? ""
        : currentForm.coerciveTransplantConfirmationDetails,
      visaFraudConfirmation:
        values.visaFraudConfirmation ??
        (currentForm.visaFraudConfirmation !== null ? (currentForm.visaFraudConfirmation ? "Sim" : "Não") : null),
      visaFraudConfirmationDetails: values.visaFraudConfirmationDetails
        ? values.visaFraudConfirmationDetails
        : !currentForm.visaFraudConfirmationDetails
        ? ""
        : currentForm.visaFraudConfirmationDetails,
      deportedConfirmation:
        values.deportedConfirmation ??
        (currentForm.deportedConfirmation !== null ? (currentForm.deportedConfirmation ? "Sim" : "Não") : null),
      deportedConfirmationDetails: values.deportedConfirmationDetails
        ? values.deportedConfirmationDetails
        : !currentForm.deportedConfirmationDetails
        ? ""
        : currentForm.deportedConfirmationDetails,
      childCustodyConfirmation:
        values.childCustodyConfirmation ??
        (currentForm.childCustodyConfirmation !== null ? (currentForm.childCustodyConfirmation ? "Sim" : "Não") : null),
      childCustodyConfirmationDetails: values.childCustodyConfirmationDetails
        ? values.childCustodyConfirmationDetails
        : !currentForm.childCustodyConfirmationDetails
        ? ""
        : currentForm.childCustodyConfirmationDetails,
      lawViolationConfirmation:
        values.lawViolationConfirmation ??
        (currentForm.lawViolationConfirmation !== null ? (currentForm.lawViolationConfirmation ? "Sim" : "Não") : null),
      lawViolationConfirmationDetails: values.lawViolationConfirmationDetails
        ? values.lawViolationConfirmationDetails
        : !currentForm.lawViolationConfirmationDetails
        ? ""
        : currentForm.lawViolationConfirmationDetails,
      avoidTaxConfirmation:
        values.avoidTaxConfirmation ??
        (currentForm.avoidTaxConfirmation !== null ? (currentForm.avoidTaxConfirmation ? "Sim" : "Não") : null),
      avoidTaxConfirmationDetails: values.avoidTaxConfirmationDetails
        ? values.avoidTaxConfirmationDetails
        : !currentForm.avoidTaxConfirmationDetails
        ? ""
        : currentForm.avoidTaxConfirmationDetails,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col flex-grow gap-6">
        <h2 className="w-full text-center text-2xl sm:text-3xl text-foreground font-semibold mb-6">Segurança</h2>

        <div className="w-full flex flex-col gap-12 justify-between flex-grow">
          <div className="w-full flex flex-col">
            <div className="w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6">
              <FormField
                control={form.control}
                name="contagiousDiseaseConfirmation"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">
                      Possui alguma doença contagiosa (cancroide, gonorreia, granuloma inguinal, hanseníase infecciosa,
                      linfogranuloma venéreo, sífilis em estágio infeccioso, tuberculose ativa e outras doenças)
                      conforme determinado pelo Departamento de Saúde e Serviços Humanos?
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
            </div>

            <div
              className={cn(
                "w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6",
                contagiousDiseaseConfirmation !== "Sim" && "hidden"
              )}
            >
              <FormField
                control={form.control}
                name="contagiousDiseaseConfirmationDetails"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">Explique</FormLabel>

                    <FormControl>
                      <Textarea disabled={isPending || isSavePending} className="!mt-auto resize-none" {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6">
              <FormField
                control={form.control}
                name="phisicalMentalProblemConfirmation"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">
                      Possui algum problema físico ou mental que possa interferir em sua segurança ou de outras pessoas?
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
            </div>

            <div
              className={cn(
                "w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6",
                phisicalMentalProblemConfirmation !== "Sim" && "hidden"
              )}
            >
              <FormField
                control={form.control}
                name="phisicalMentalProblemConfirmationDetails"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">Explique</FormLabel>

                    <FormControl>
                      <Textarea disabled={isPending || isSavePending} className="!mt-auto resize-none" {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6">
              <FormField
                control={form.control}
                name="crimeConfirmation"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">
                      Você já foi preso ou condenado por algum delito ou crime, mesmo que tenha sido objeto de perdão,
                      anistia ou outra ação semelhante?
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
            </div>

            <div
              className={cn("w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6", crimeConfirmation !== "Sim" && "hidden")}
            >
              <FormField
                control={form.control}
                name="crimeConfirmationDetails"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">Explique</FormLabel>

                    <FormControl>
                      <Textarea disabled={isPending || isSavePending} className="!mt-auto resize-none" {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6">
              <FormField
                control={form.control}
                name="drugsProblemConfirmation"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">Já teve problemas com drogas?</FormLabel>

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
            </div>

            <div
              className={cn(
                "w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6",
                drugsProblemConfirmation !== "Sim" && "hidden"
              )}
            >
              <FormField
                control={form.control}
                name="drugsProblemConfirmationDetails"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">Explique</FormLabel>

                    <FormControl>
                      <Textarea disabled={isPending || isSavePending} className="!mt-auto resize-none" {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6">
              <FormField
                control={form.control}
                name="lawViolateConfirmation"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">
                      Você já violou ou esteve envolvido em alguma conspiração para violar qualquer lei relacionada ao
                      controle de substâncias?
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
            </div>

            <div
              className={cn(
                "w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6",
                lawViolateConfirmation !== "Sim" && "hidden"
              )}
            >
              <FormField
                control={form.control}
                name="lawViolateConfirmationDetails"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">Explique</FormLabel>

                    <FormControl>
                      <Textarea disabled={isPending || isSavePending} className="!mt-auto resize-none" {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6">
              <FormField
                control={form.control}
                name="prostitutionConfirmation"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">
                      Você está vindo para os Estados Unidos para se envolver em prostituição ou vício comercializado
                      ilegalmente ou esteve envolvido em prostituição ou procura de prostitutas nos últimos 10 anos?
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
            </div>

            <div
              className={cn(
                "w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6",
                prostitutionConfirmation !== "Sim" && "hidden"
              )}
            >
              <FormField
                control={form.control}
                name="prostitutionConfirmationDetails"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">Explique</FormLabel>

                    <FormControl>
                      <Textarea disabled={isPending || isSavePending} className="!mt-auto resize-none" {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6">
              <FormField
                control={form.control}
                name="moneyLaundryConfirmation"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">
                      Você já esteve envolvido ou pretende se envolver em lavagem de dinheiro?
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
            </div>

            <div
              className={cn(
                "w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6",
                moneyLaundryConfirmation !== "Sim" && "hidden"
              )}
            >
              <FormField
                control={form.control}
                name="moneyLaundryConfirmationDetails"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">Explique</FormLabel>

                    <FormControl>
                      <Textarea disabled={isPending || isSavePending} className="!mt-auto resize-none" {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6">
              <FormField
                control={form.control}
                name="peopleTrafficConfirmation"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">
                      Você já cometeu ou conspirou para cometer um crime de tráfico de pessoas nos Estados Unidos ou
                      fora dos Estados Unidos?
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
            </div>

            <div
              className={cn(
                "w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6",
                peopleTrafficConfirmation !== "Sim" && "hidden"
              )}
            >
              <FormField
                control={form.control}
                name="peopleTrafficConfirmationDetails"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">Explique</FormLabel>

                    <FormControl>
                      <Textarea disabled={isPending || isSavePending} className="!mt-auto resize-none" {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6">
              <FormField
                control={form.control}
                name="helpPeopleTrafficConfirmation"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">
                      Você já ajudou, encorajou, ajudou ou conspirou conscientemente com um indivíduo que cometeu ou
                      conspirou para cometer um crime grave de tráfico de pessoas nos Estados Unidos ou fora?
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
            </div>

            <div
              className={cn(
                "w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6",
                helpPeopleTrafficConfirmation !== "Sim" && "hidden"
              )}
            >
              <FormField
                control={form.control}
                name="helpPeopleTrafficConfirmationDetails"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">Explique</FormLabel>

                    <FormControl>
                      <Textarea disabled={isPending || isSavePending} className="!mt-auto resize-none" {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6">
              <FormField
                control={form.control}
                name="parentPeopleTrafficConfirmation"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">
                      Você é cônjuge, filho ou filha de um indivíduo que cometeu ou conspirou para cometer um crime de
                      tráfico de pessoas nos Estados Unidos ou fora e, nos últimos cinco anos, beneficiou-se
                      conscientemente das atividades de tráfico?
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
            </div>

            <div
              className={cn(
                "w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6",
                parentPeopleTrafficConfirmation !== "Sim" && "hidden"
              )}
            >
              <FormField
                control={form.control}
                name="parentPeopleTrafficConfirmationDetails"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">Explique</FormLabel>

                    <FormControl>
                      <Textarea disabled={isPending || isSavePending} className="!mt-auto resize-none" {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6">
              <FormField
                control={form.control}
                name="spyConfirmation"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">
                      Você procura se envolver em espionagem, sabotagem, violações de controle de exportação ou qualquer
                      outra atividade ilegal enquanto estiver nos Estados Unidos?
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
            </div>

            <div className={cn("w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6", spyConfirmation !== "Sim" && "hidden")}>
              <FormField
                control={form.control}
                name="spyConfirmationDetails"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">Explique</FormLabel>

                    <FormControl>
                      <Textarea disabled={isPending || isSavePending} className="!mt-auto resize-none" {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6">
              <FormField
                control={form.control}
                name="terrorismConfirmation"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">
                      Você procura se envolver em atividades terroristas enquanto estiver nos Estados Unidos ou já se
                      envolveu em atividades terroristas?
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
            </div>

            <div
              className={cn(
                "w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6",
                terrorismConfirmation !== "Sim" && "hidden"
              )}
            >
              <FormField
                control={form.control}
                name="terrorismConfirmationDetails"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">Explique</FormLabel>

                    <FormControl>
                      <Textarea disabled={isPending || isSavePending} className="!mt-auto resize-none" {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6">
              <FormField
                control={form.control}
                name="financialAssistanceConfirmation"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">
                      Você já prestou ou pretende fornecer assistência financeira ou outro tipo de apoio a terroristas
                      ou organizações terroristas?
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
            </div>

            <div
              className={cn(
                "w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6",
                financialAssistanceConfirmation !== "Sim" && "hidden"
              )}
            >
              <FormField
                control={form.control}
                name="financialAssistanceConfirmationDetails"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">Explique</FormLabel>

                    <FormControl>
                      <Textarea disabled={isPending || isSavePending} className="!mt-auto resize-none" {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6">
              <FormField
                control={form.control}
                name="terrorismMemberConfirmation"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">
                      Você é membro ou representante de uma organização terrorista?
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
            </div>

            <div
              className={cn(
                "w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6",
                terrorismMemberConfirmation !== "Sim" && "hidden"
              )}
            >
              <FormField
                control={form.control}
                name="terrorismMemberConfirmationDetails"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">Explique</FormLabel>

                    <FormControl>
                      <Textarea disabled={isPending || isSavePending} className="!mt-auto resize-none" {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6">
              <FormField
                control={form.control}
                name="parentTerrorismConfirmation"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">
                      Você é cônjuge, filho ou filha de um indivíduo que se envolveu em atividades terroristas,
                      inclusive fornecendo assistência financeira ou outro apoio a terroristas ou organizações
                      terroristas, nos últimos cinco anos?
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
            </div>

            <div
              className={cn(
                "w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6",
                parentTerrorismConfirmation !== "Sim" && "hidden"
              )}
            >
              <FormField
                control={form.control}
                name="parentTerrorismConfirmationDetails"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">Explique</FormLabel>

                    <FormControl>
                      <Textarea disabled={isPending || isSavePending} className="!mt-auto resize-none" {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6">
              <FormField
                control={form.control}
                name="genocideConfirmation"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">
                      Você já ordenou, incitou, cometeu, ajudou ou de alguma forma participou de genocídio?
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
            </div>

            <div
              className={cn("w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6", genocideConfirmation !== "Sim" && "hidden")}
            >
              <FormField
                control={form.control}
                name="genocideConfirmationDetails"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">Explique</FormLabel>

                    <FormControl>
                      <Textarea disabled={isPending || isSavePending} className="!mt-auto resize-none" {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6">
              <FormField
                control={form.control}
                name="tortureConfirmation"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">
                      Você já cometeu, ordenou, incitou, ajudou ou participou de alguma forma em tortura?
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
            </div>

            <div
              className={cn("w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6", tortureConfirmation !== "Sim" && "hidden")}
            >
              <FormField
                control={form.control}
                name="tortureConfirmationDetails"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">Explique</FormLabel>

                    <FormControl>
                      <Textarea disabled={isPending || isSavePending} className="!mt-auto resize-none" {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6">
              <FormField
                control={form.control}
                name="assassinConfirmation"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">
                      Você cometeu, ordenou, incitou, ajudou ou de alguma forma participou em assassinatos
                      extrajudiciais, assassinatos políticos ou outros atos de violência?
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
            </div>

            <div
              className={cn("w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6", assassinConfirmation !== "Sim" && "hidden")}
            >
              <FormField
                control={form.control}
                name="assassinConfirmationDetails"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">Explique</FormLabel>

                    <FormControl>
                      <Textarea disabled={isPending || isSavePending} className="!mt-auto resize-none" {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6">
              <FormField
                control={form.control}
                name="childSoldierConfirmation"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">
                      Você já se envolveu no recrutamento ou na utilização de crianças-soldados?
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
            </div>

            <div
              className={cn(
                "w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6",
                childSoldierConfirmation !== "Sim" && "hidden"
              )}
            >
              <FormField
                control={form.control}
                name="childSoldierConfirmationDetails"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">Explique</FormLabel>

                    <FormControl>
                      <Textarea disabled={isPending || isSavePending} className="!mt-auto resize-none" {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6">
              <FormField
                control={form.control}
                name="religionLibertyConfirmation"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">
                      Você, enquanto servia como funcionário do governo, foi responsável ou executou diretamente, em
                      qualquer momento, violações particularmente graves da liberdade religiosa?
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
            </div>

            <div
              className={cn(
                "w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6",
                religionLibertyConfirmation !== "Sim" && "hidden"
              )}
            >
              <FormField
                control={form.control}
                name="religionLibertyConfirmationDetails"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">Explique</FormLabel>

                    <FormControl>
                      <Textarea disabled={isPending || isSavePending} className="!mt-auto resize-none" {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6">
              <FormField
                control={form.control}
                name="abortConfirmation"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">
                      Você já esteve diretamente envolvido no estabelecimento ou na aplicação de controles populacionais
                      que forçaram uma mulher a se submeter a um aborto contra a sua livre escolha ou um homem ou uma
                      mulher a se submeter à esterilização contra a sua livre vontade?
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
            </div>

            <div
              className={cn("w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6", abortConfirmation !== "Sim" && "hidden")}
            >
              <FormField
                control={form.control}
                name="abortConfirmationDetails"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">Explique</FormLabel>

                    <FormControl>
                      <Textarea disabled={isPending || isSavePending} className="!mt-auto resize-none" {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6">
              <FormField
                control={form.control}
                name="coerciveTransplantConfirmation"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">
                      Você já esteve diretamente envolvido no transplante coercitivo de órgãos humanos ou tecidos
                      corporais?
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
            </div>

            <div
              className={cn(
                "w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6",
                coerciveTransplantConfirmation !== "Sim" && "hidden"
              )}
            >
              <FormField
                control={form.control}
                name="coerciveTransplantConfirmationDetails"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">Explique</FormLabel>

                    <FormControl>
                      <Textarea disabled={isPending || isSavePending} className="!mt-auto resize-none" {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6">
              <FormField
                control={form.control}
                name="visaFraudConfirmation"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">
                      Você já tentou obter ou ajudar outras pessoas a obter um visto, entrada nos Estados Unidos ou
                      qualquer outro benefício de imigração dos Estados Unidos por meio de fraude, deturpação
                      intencional ou outros meios ilegais?
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
            </div>

            <div
              className={cn(
                "w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6",
                visaFraudConfirmation !== "Sim" && "hidden"
              )}
            >
              <FormField
                control={form.control}
                name="visaFraudConfirmationDetails"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">Explique</FormLabel>

                    <FormControl>
                      <Textarea disabled={isPending || isSavePending} className="!mt-auto resize-none" {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6">
              <FormField
                control={form.control}
                name="deportedConfirmation"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">Você já foi removido ou deportado de algum país?</FormLabel>

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
            </div>

            <div
              className={cn("w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6", deportedConfirmation !== "Sim" && "hidden")}
            >
              <FormField
                control={form.control}
                name="deportedConfirmationDetails"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">Explique</FormLabel>

                    <FormControl>
                      <Textarea disabled={isPending || isSavePending} className="!mt-auto resize-none" {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6">
              <FormField
                control={form.control}
                name="childCustodyConfirmation"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">
                      Você já recebeu a custódia de uma criança cidadã dos EUA fora dos Estados Unidos de uma pessoa que
                      recebeu a custódia legal de um tribunal dos EUA?
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
            </div>

            <div
              className={cn(
                "w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6",
                childCustodyConfirmation !== "Sim" && "hidden"
              )}
            >
              <FormField
                control={form.control}
                name="childCustodyConfirmationDetails"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">Explique</FormLabel>

                    <FormControl>
                      <Textarea disabled={isPending || isSavePending} className="!mt-auto resize-none" {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6">
              <FormField
                control={form.control}
                name="lawViolationConfirmation"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">
                      Você votou nos Estados Unidos violando alguma lei ou regulamento?
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
            </div>

            <div
              className={cn(
                "w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6",
                lawViolationConfirmation !== "Sim" && "hidden"
              )}
            >
              <FormField
                control={form.control}
                name="lawViolationConfirmationDetails"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">Explique</FormLabel>

                    <FormControl>
                      <Textarea disabled={isPending || isSavePending} className="!mt-auto resize-none" {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full grid grid-cols-1 gap-x-4 gap-y-6">
              <FormField
                control={form.control}
                name="avoidTaxConfirmation"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">
                      Você já renunciou à cidadania dos Estados Unidos para evitar impostos?
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
            </div>
          </div>

          <div
            className={cn("w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6", avoidTaxConfirmation !== "Sim" && "hidden")}
          >
            <FormField
              control={form.control}
              name="avoidTaxConfirmationDetails"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel className="text-foreground">Explique</FormLabel>

                  <FormControl>
                    <Textarea disabled={isPending || isSavePending} className="!mt-auto resize-none" {...field} />
                  </FormControl>

                  <FormMessage className="text-sm text-destructive" />
                </FormItem>
              )}
            />
          </div>

          <div className="w-full flex flex-col-reverse items-center gap-x-4 gap-y-6 sm:flex-row sm:justify-end">
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
                      <Loader2 className="size-5 animate-spin" strokeWidth={1.5} />
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
                      <Loader2 className="size-5 animate-spin" strokeWidth={1.5} />
                    </>
                  ) : (
                    <>
                      Salvar
                      <Save className="size-5" strokeWidth={1.5} />
                    </>
                  )}
                </Button>

                <FinishFormConfirmation profileId={profileId} submit={handleSubmitOnModal} isPending={isPending} />
              </>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
}
