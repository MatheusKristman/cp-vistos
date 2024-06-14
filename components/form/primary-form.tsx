// se empresário/autonomo, a descrição ira ficar (Descreva quais são suas funções dentro da sua empresa, se possui funcionários registrados e outras informações relacionadas ao seu negócio)
// se outro, a descrição ira ficar (Descreva quais funções são você exerce no seu trabalho)
//
// itens
// aposentado
// dona de casa
// empresario/autonomo
// funcionário

//TODO: testar a seção sobre a viagem

"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AmericanLicense, Form as FormType, OtherPeopleTraveling, USALastTravel } from "@prisma/client";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

import { AboutTravelForm } from "@/components/form/about-travel-form";
import { ContactAndAddressForm } from "@/components/form/contact-and-address-form";
import { PassportForm } from "@/components/form/passport-form";
import { PersonalDataForm } from "@/components/form/personal-data-form";
import { PreviousTravelForm } from "@/components/form/previous-travel-form";
import { TravelCompanyForm } from "@/components/form/travel-company-form";
import { USAContactForm } from "@/components/form/usa-contact-form";
import { WorkEducationForm } from "@/components/form/work-education-form";
import { FamilyForm } from "@/components/form/family-form";
import { SecurityForm } from "@/components/form/security-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { CheckedState } from "@radix-ui/react-checkbox";
import { ArrowRight, Loader2 } from "lucide-react";
import useFormStore from "@/constants/stores/useFormStore";

import "react-phone-number-input/style.css";

interface Props {
  currentForm: FormType | null;
}

const formSchema = z
  .object({
    firstName: z.string().min(1, "Campo obrigatório"),
    lastName: z.string().min(1, "Campo obrigatório"),
    cpf: z.string().min(1, "Campo obrigatório").min(14, "CPF Inválido"),
    warNameConfirmation: z.enum(["Sim", "Não"]),
    warName: z.string().optional(),
    otherNamesConfirmation: z.enum(["Sim", "Não"]),
    sex: z.enum(["Masculino", "Feminino"], { message: "Selecione uma opção" }),
    maritalStatus: z.string({ message: "Selecione uma opção" }).min(1, { message: "Selecione uma opção" }),
    birthDate: z.date({ message: "Selecione uma data" }),
    birthCity: z.string().min(1, "Campo obrigatório"),
    birthState: z.string().min(1, "Campo obrigatório"),
    birthCountry: z.string().min(1, "Campo obrigatório"),
    originCountry: z.string().min(1, "Campo obrigatório"),
    otherNationalityConfirmation: z.enum(["Sim", "Não"]),
    otherNationalityPassport: z.string().optional(),
    otherCountryResidentConfirmation: z.enum(["Sim", "Não"]),
    USSocialSecurityNumber: z.string(),
    USTaxpayerIDNumber: z.string(),
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
    email: z.string().min(1, { message: "Campo obrigatório" }).email({ message: "E-mail inválido" }),
    fiveYearsOtherEmailConfirmation: z.enum(["Sim", "Não"]),
    otherEmail: z.string(),
    facebook: z.string(),
    linkedin: z.string(),
    instagram: z.string(),
    othersSocialMedia: z.string(),
    passportNumber: z.string().min(1, { message: "Campo obrigatório" }),
    passportCity: z.string().min(1, { message: "Campo obrigatório" }),
    passportState: z.string().min(1, { message: "Campo obrigatório" }),
    passportIssuingCountry: z.string().min(1, { message: "Campo obrigatório" }),
    passportIssuingDate: z.date({ message: "Selecione uma data" }),
    passportExpireDate: z.date({ message: "Selecione uma data" }).optional(),
    passportNoExpireDate: z.boolean(),
    passportLostConfirmation: z.enum(["Sim", "Não"]),
    lostPassportNumber: z.string(),
    lostPassportCountry: z.string(),
    lostPassportDetails: z.string(),
    travelItineraryConfirmation: z.enum(["Sim", "Não"]),
    USAPreviewArriveDate: z.date({ message: "Campo obrigatório" }),
    arriveFlyNumber: z.string(),
    arriveCity: z.string(),
    USAPreviewReturnDate: z.date({ message: "Campo obrigatório" }),
    returnFlyNumber: z.string(),
    returnCity: z.string(),
    estimatedTimeOnUSA: z.string().min(1, { message: "Campo obrigatório" }),
    USACompleteAddress: z.string(),
    USAZipCode: z.string(),
    USACity: z.string(),
    USAState: z.string(),
    payerNameOrCompany: z.string(),
    payerTel: z.string(),
    payerAddress: z.string(),
    payerRelation: z.string(),
    payerEmail: z.string(),
    otherPeopleTravelingConfirmation: z.enum(["Sim", "Não"]),
    groupMemberConfirmation: z.enum(["Sim", "Não"]),
    groupName: z.string(),
    hasBeenOnUSAConfirmation: z.enum(["Sim", "Não"]),
    americanLicenseToDriveConfirmation: z.enum(["Sim", "Não"]),
    USAVisaConfirmation: z.enum(["Sim", "Não"]),
    visaIssuingDate: z.date({ message: "Campo obrigatório" }),
    visaNumber: z.string(),
    newVisaConfirmation: z.enum(["Sim", "Não"]),
    sameCountryResidenceConfirmation: z.enum(["Sim", "Não"]),
    sameVisaTypeConfirmation: z.enum(["Sim", "Não"]),
    fingerprintsProvidedConfirmation: z.enum(["Sim", "Não"]),
    lostVisaConfirmation: z.enum(["Sim", "Não"]),
    lostVisaDetails: z.string(),
    canceledVisaConfirmation: z.enum(["Sim", "Não"]),
    canceledVisaDetails: z.string(),
    deniedVisaConfirmation: z.enum(["Sim", "Não"]),
    deniedVisaDetails: z.string(),
    consularPost: z.string(),
    deniedVisaType: z.string(),
    immigrationRequestByAnotherPersonConfirmation: z.enum(["Sim", "Não"]),
    immigrationRequestByAnotherPersonDetails: z.string(),
    organizationOrUSAResidentName: z.string(),
    organizationOrUSAResidentRelation: z.string(),
    organizationOrUSAResidentAddress: z.string(),
    organizationOrUSAResidentZipCode: z.string(),
    organizationOrUSAResidentCity: z.string(),
    organizationOrUSAResidentState: z.string(),
    organizationOrUSAResidentCountry: z.string(),
    organizationOrUSAResidentTel: z.string(),
    organizationOrUSAResidentEmail: z.string(),
    fatherCompleteName: z.string(),
    fatherBirthdate: z.date({ message: "Campo obrigatório" }),
    fatherLiveInTheUSAConfirmation: z.enum(["Sim", "Não"]),
    fatherUSASituation: z.string(),
    motherCompleteName: z.string(),
    motherBirthdate: z.date({ message: "Campo obrigatório" }),
    motherLiveInTheUSAConfirmation: z.enum(["Sim", "Não"]),
    motherUSASituation: z.string(),
    familyLivingInTheUSAConfirmation: z.enum(["Sim", "Não"]),
    partnerCompleteName: z.string(),
    partnerBirthdate: z.date({ message: "Campo obrigatório" }),
    partnerNationality: z.string(),
    partnerCity: z.string(),
    partnerState: z.string(),
    partnerCountry: z.string(),
    unionDate: z.date({ message: "Campo obrigatório" }).optional(),
    divorceDate: z.date({ message: "Campo obrigatório" }).optional(),
    occupation: z.string(),
    office: z.string(),
    companyOrBossName: z.string(),
    companyAddress: z.string(),
    companyCity: z.string(),
    companyState: z.string(),
    companyCountry: z.string(),
    companyCep: z.string(),
    companyTel: z.string(),
    admissionDate: z.date({ message: "Campo obrigatório" }),
    monthlySalary: z.string(),
    retireeDate: z.date({ message: "Campo obrigatório" }),
    jobDetails: z.string(),
    previousJobConfirmation: z.enum(["Sim", "Não"]),
    contagiousDiseaseConfirmation: z.enum(["Sim", "Não"]),
    phisicalMentalProblemConfirmation: z.enum(["Sim", "Não"]),
    crimeConfirmation: z.enum(["Sim", "Não"]),
    drugsProblemConfirmation: z.enum(["Sim", "Não"]),
    lawViolateConfirmation: z.enum(["Sim", "Não"]),
    prostitutionConfirmation: z.enum(["Sim", "Não"]),
    moneyLaundryConfirmation: z.enum(["Sim", "Não"]),
    peopleTrafficConfirmation: z.enum(["Sim", "Não"]),
    helpPeopleTrafficConfirmation: z.enum(["Sim", "Não"]),
    parentPeopleTrafficConfirmation: z.enum(["Sim", "Não"]),
    spyConfirmation: z.enum(["Sim", "Não"]),
    terrorismConfirmation: z.enum(["Sim", "Não"]),
    financialAssistanceConfirmation: z.enum(["Sim", "Não"]),
    terrorismMemberConfirmation: z.enum(["Sim", "Não"]),
    parentTerrorismConfirmation: z.enum(["Sim", "Não"]),
    genocideConfirmation: z.enum(["Sim", "Não"]),
    tortureConfirmation: z.enum(["Sim", "Não"]),
    assassinConfirmation: z.enum(["Sim", "Não"]),
    childSoldierConfirmation: z.enum(["Sim", "Não"]),
    religionLibertyConfirmation: z.enum(["Sim", "Não"]),
    abortConfirmation: z.enum(["Sim", "Não"]),
    coerciveTransplantConfirmation: z.enum(["Sim", "Não"]),
    visaFraudConfirmation: z.enum(["Sim", "Não"]),
    deportedConfirmation: z.enum(["Sim", "Não"]),
    childCustodyConfirmation: z.enum(["Sim", "Não"]),
    lawViolationConfirmation: z.enum(["Sim", "Não"]),
    avoidTaxConfirmation: z.enum(["Sim", "Não"]),
  })
  .superRefine(
    (
      {
        warNameConfirmation,
        warName,
        otherNationalityConfirmation,
        otherNationalityPassport,
        postalAddressConfirmation,
        otherPostalAddress,
        fiveYearsOtherTelConfirmation,
        otherTel,
        fiveYearsOtherEmailConfirmation,
        otherEmail,
        passportLostConfirmation,
        lostPassportNumber,
        lostPassportCountry,
        lostPassportDetails,
        passportExpireDate,
        passportNoExpireDate,
        groupMemberConfirmation,
        groupName,
        USAVisaConfirmation,
        visaIssuingDate,
        visaNumber,
        lostVisaConfirmation,
        lostVisaDetails,
        canceledVisaConfirmation,
        canceledVisaDetails,
        deniedVisaConfirmation,
        deniedVisaDetails,
        immigrationRequestByAnotherPersonConfirmation,
        immigrationRequestByAnotherPersonDetails,
      },
      ctx
    ) => {
      if (warNameConfirmation && warName && warName.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Campo vazio, preencha para prosseguir",
          path: ["warName"],
        });
      }

      if (otherNationalityConfirmation && otherNationalityPassport && otherNationalityPassport.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Campo vazio, preencha para prosseguir",
          path: ["otherNationalityPassport"],
        });
      }

      if (postalAddressConfirmation === "Sim" && otherPostalAddress.length === 0) {
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

      if (fiveYearsOtherEmailConfirmation && otherEmail && otherEmail.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Campo vazio, preencha para prosseguir",
          path: ["otherEmail"],
        });
      }

      if (passportLostConfirmation && lostPassportNumber && lostPassportNumber.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Campo vazio, preencha para prosseguir",
          path: ["lostPassportNumber"],
        });
      }

      if (passportLostConfirmation && lostPassportCountry && lostPassportCountry.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Campo vazio, preencha para prosseguir",
          path: ["lostPassportCountry"],
        });
      }

      if (passportLostConfirmation && lostPassportDetails && lostPassportDetails.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Campo vazio, preencha para prosseguir",
          path: ["lostPassportDetails"],
        });
      }

      if (!passportNoExpireDate && passportExpireDate === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Campo obrigatório",
          path: ["passportExpireDate"],
        });
      }

      if (groupMemberConfirmation && groupName && groupName.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Campo vazio, preencha para prosseguir",
          path: ["groupName"],
        });
      }

      if (USAVisaConfirmation && !visaIssuingDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Campo vazio, preencha para prosseguir",
          path: ["visaIssuingDate"],
        });
      }

      if (USAVisaConfirmation && visaNumber && visaNumber.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Campo vazio, preencha para prosseguir",
          path: ["visaNumber"],
        });
      }

      if (lostVisaConfirmation && lostVisaDetails && lostVisaDetails.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Campo vazio, preencha para prosseguir",
          path: ["lostVisaDetails"],
        });
      }

      if (canceledVisaConfirmation && canceledVisaDetails && canceledVisaDetails.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Campo vazio, preencha para prosseguir",
          path: ["canceledVisaDetails"],
        });
      }

      if (deniedVisaConfirmation && deniedVisaDetails && deniedVisaDetails.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Campo vazio, preencha para prosseguir",
          path: ["deniedVisaDetails"],
        });
      }

      if (
        immigrationRequestByAnotherPersonConfirmation &&
        immigrationRequestByAnotherPersonDetails &&
        immigrationRequestByAnotherPersonDetails.length === 0
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Campo vazio, preencha para prosseguir",
          path: ["immigrationRequestByAnotherPersonDetails"],
        });
      }
    }
  );

export function PrimaryForm({ currentForm }: Props) {
  const {
    setVisitLocationsError,
    setVisitLocationsIndex,
    setVisitLocations,
    visitLocations,
    visitLocationsIndex,
    setOtherNames,
    setOtherNamesIndex,
    isSaving,
    isSubmitting,
  } = useFormStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: currentForm && currentForm.firstName ? currentForm.firstName : "",
      lastName: currentForm && currentForm.lastName ? currentForm.lastName : "",
      cpf: currentForm && currentForm.cpf ? currentForm.cpf : "",
      warNameConfirmation:
        currentForm && currentForm.warNameConfirmation
          ? currentForm.warNameConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
      warName: currentForm && currentForm.warName ? currentForm.warName : undefined,
      otherNamesConfirmation:
        currentForm && currentForm.otherNamesConfirmation
          ? currentForm.otherNamesConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
      sex: currentForm && currentForm.sex ? currentForm.sex : undefined,
      maritalStatus: currentForm && currentForm.maritalStatus ? currentForm.maritalStatus : undefined,
      birthDate: currentForm && currentForm.birthDate ? currentForm.birthDate : undefined,
      birthCity: currentForm && currentForm.birthCity ? currentForm.birthCity : "",
      birthState: currentForm && currentForm.birthState ? currentForm.birthState : "",
      birthCountry: currentForm && currentForm.birthCountry ? currentForm.birthCountry : "",
      originCountry: currentForm && currentForm.originCountry ? currentForm.originCountry : "",
      otherNationalityConfirmation:
        currentForm && currentForm.otherNationalityConfirmation
          ? currentForm.otherNationalityConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
      otherNationalityPassport:
        currentForm && currentForm.otherNationalityPassport ? currentForm.otherNationalityPassport : "",
      otherCountryResidentConfirmation:
        currentForm && currentForm.otherCountryResidentConfirmation
          ? currentForm.otherCountryResidentConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
      USSocialSecurityNumber:
        currentForm && currentForm.USSocialSecurityNumber ? currentForm.USSocialSecurityNumber : "",
      USTaxpayerIDNumber: currentForm && currentForm.USTaxpayerIDNumber ? currentForm.USTaxpayerIDNumber : "",
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
      otherPostalAddress: currentForm && currentForm.otherPostalAddress ? currentForm.otherPostalAddress : "",
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
      otherEmail: currentForm && currentForm.otherEmail ? currentForm.otherEmail : "",
      facebook: currentForm && currentForm.facebook ? currentForm.facebook : "",
      linkedin: currentForm && currentForm.linkedin ? currentForm.linkedin : "",
      instagram: currentForm && currentForm.instagram ? currentForm.instagram : "",
      othersSocialMedia: currentForm && currentForm.othersSocialMedia ? currentForm.othersSocialMedia : "",
      passportNumber: currentForm && currentForm.passportNumber ? currentForm.passportNumber : "",
      passportCity: currentForm && currentForm.passportCity ? currentForm.passportCity : "",
      passportState: currentForm && currentForm.passportState ? currentForm.passportState : "",
      passportIssuingCountry:
        currentForm && currentForm.passportIssuingCountry ? currentForm.passportIssuingCountry : "",
      passportIssuingDate: currentForm && currentForm.passportIssuingDate ? currentForm.passportIssuingDate : undefined,
      passportExpireDate: currentForm && currentForm.passportExpireDate ? currentForm.passportExpireDate : undefined,
      passportLostConfirmation:
        currentForm && currentForm.passportLostConfirmation
          ? currentForm.passportLostConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
      lostPassportNumber: currentForm && currentForm.lostPassportNumber ? currentForm.lostPassportNumber : "",
      lostPassportCountry: currentForm && currentForm.lostPassportCountry ? currentForm.lostPassportCountry : "",
      lostPassportDetails: currentForm && currentForm.lostPassportDetails ? currentForm.lostPassportDetails : "",
      travelItineraryConfirmation:
        currentForm && currentForm.travelItineraryConfirmation
          ? currentForm.travelItineraryConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
      USAPreviewArriveDate:
        currentForm && currentForm.USAPreviewArriveDate ? currentForm.USAPreviewArriveDate : undefined,
      arriveFlyNumber: currentForm && currentForm.arriveFlyNumber ? currentForm.arriveFlyNumber : "",
      arriveCity: currentForm && currentForm.arriveCity ? currentForm.arriveCity : "",
      USAPreviewReturnDate:
        currentForm && currentForm.USAPreviewReturnDate ? currentForm.USAPreviewReturnDate : undefined,
      returnFlyNumber: currentForm && currentForm.returnFlyNumber ? currentForm.returnFlyNumber : "",
      returnCity: currentForm && currentForm.returnCity ? currentForm.returnCity : "",
      estimatedTimeOnUSA: currentForm && currentForm.estimatedTimeOnUSA ? currentForm.estimatedTimeOnUSA : "",
      USACompleteAddress: currentForm && currentForm.USACompleteAddress ? currentForm.USACompleteAddress : "",
      USAZipCode: currentForm && currentForm.USAZipCode ? currentForm.USAZipCode : "",
      USACity: currentForm && currentForm.USACity ? currentForm.USACity : "",
      USAState: currentForm && currentForm.USAState ? currentForm.USAState : "",
      payerNameOrCompany: currentForm && currentForm.payerNameOrCompany ? currentForm.payerNameOrCompany : "",
      payerTel: currentForm && currentForm.payerTel ? currentForm.payerTel : "",
      payerAddress: currentForm && currentForm.payerAddress ? currentForm.payerAddress : "",
      payerRelation: currentForm && currentForm.payerRelation ? currentForm.payerRelation : "",
      payerEmail: currentForm && currentForm.payerEmail ? currentForm.payerEmail : "",
      otherPeopleTravelingConfirmation:
        currentForm && currentForm.otherPeopleTravelingConfirmation
          ? currentForm.otherPeopleTravelingConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
      groupMemberConfirmation:
        currentForm && currentForm.groupMemberConfirmation
          ? currentForm.groupMemberConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
      groupName: currentForm && currentForm.groupName ? currentForm.groupName : "",
      hasBeenOnUSAConfirmation:
        currentForm && currentForm.hasBeenOnUSAConfirmation
          ? currentForm.hasBeenOnUSAConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
      americanLicenseToDriveConfirmation:
        currentForm && currentForm.americanLicenseToDriveConfirmation
          ? currentForm.americanLicenseToDriveConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
      USAVisaConfirmation:
        currentForm && currentForm.USAVisaConfirmation
          ? currentForm.USAVisaConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
      visaIssuingDate: currentForm && currentForm.visaIssuingDate ? currentForm.visaIssuingDate : undefined,
      visaNumber: currentForm && currentForm.visaNumber ? currentForm.visaNumber : "",
      newVisaConfirmation:
        currentForm && currentForm.newVisaConfirmation
          ? currentForm.newVisaConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
      sameCountryResidenceConfirmation:
        currentForm && currentForm.sameCountryResidenceConfirmation
          ? currentForm.sameCountryResidenceConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
      sameVisaTypeConfirmation:
        currentForm && currentForm.sameVisaTypeConfirmation
          ? currentForm.sameVisaTypeConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
      fingerprintsProvidedConfirmation:
        currentForm && currentForm.fingerprintsProvidedConfirmation
          ? currentForm.fingerprintsProvidedConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
      lostVisaConfirmation:
        currentForm && currentForm.lostVisaConfirmation
          ? currentForm.lostVisaConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
      lostVisaDetails: currentForm && currentForm.lostVisaDetails ? currentForm.lostVisaDetails : "",
      canceledVisaConfirmation:
        currentForm && currentForm.canceledVisaConfirmation
          ? currentForm.canceledVisaConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
      canceledVisaDetails: currentForm && currentForm.canceledVisaDetails ? currentForm.canceledVisaDetails : "",
      deniedVisaConfirmation:
        currentForm && currentForm.deniedVisaConfirmation
          ? currentForm.deniedVisaConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
      deniedVisaDetails: currentForm && currentForm.deniedVisaDetails ? currentForm.deniedVisaDetails : "",
      consularPost: currentForm && currentForm.consularPost ? currentForm.consularPost : "",
      deniedVisaType: currentForm && currentForm.deniedVisaType ? currentForm.deniedVisaType : "",
      immigrationRequestByAnotherPersonConfirmation:
        currentForm && currentForm.immigrationRequestByAnotherPersonConfirmation
          ? currentForm.immigrationRequestByAnotherPersonConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
      immigrationRequestByAnotherPersonDetails:
        currentForm && currentForm.immigrationRequestByAnotherPersonDetails
          ? currentForm.immigrationRequestByAnotherPersonDetails
          : "",
      fatherCompleteName: currentForm && currentForm.fatherCompleteName ? currentForm.fatherCompleteName : "",
      fatherBirthdate: currentForm && currentForm.fatherBirthdate ? currentForm.fatherBirthdate : undefined,
      fatherLiveInTheUSAConfirmation:
        currentForm && currentForm.fatherLiveInTheUSAConfirmation
          ? currentForm.fatherLiveInTheUSAConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
      fatherUSASituation: currentForm && currentForm.fatherUSASituation ? currentForm.fatherUSASituation : "",
      motherCompleteName: currentForm && currentForm.motherCompleteName ? currentForm.motherCompleteName : "",
      motherBirthdate: currentForm && currentForm.motherBirthdate ? currentForm.motherBirthdate : undefined,
      motherLiveInTheUSAConfirmation:
        currentForm && currentForm.motherLiveInTheUSAConfirmation
          ? currentForm.motherLiveInTheUSAConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
      motherUSASituation: currentForm && currentForm.motherUSASituation ? currentForm.motherUSASituation : "",
      familyLivingInTheUSAConfirmation:
        currentForm && currentForm.familyLivingInTheUSAConfirmation
          ? currentForm.familyLivingInTheUSAConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
      partnerCompleteName: currentForm && currentForm.partnerCompleteName ? currentForm.partnerCompleteName : "",
      partnerBirthdate: currentForm && currentForm.partnerBirthdate ? currentForm.partnerBirthdate : undefined,
      partnerNationality: currentForm && currentForm.partnerNationality ? currentForm.partnerNationality : "",
      partnerCity: currentForm && currentForm.partnerCity ? currentForm.partnerCity : "",
      partnerState: currentForm && currentForm.partnerState ? currentForm.partnerState : "",
      partnerCountry: currentForm && currentForm.partnerCountry ? currentForm.partnerCountry : "",
      unionDate: currentForm && currentForm.unionDate ? currentForm.unionDate : undefined,
      divorceDate: currentForm && currentForm.divorceDate ? currentForm.divorceDate : undefined,
      occupation: currentForm && currentForm.occupation ? currentForm.occupation : "Aposentado",
      office: currentForm && currentForm.office ? currentForm.office : "",
      companyOrBossName: currentForm && currentForm.companyOrBossName ? currentForm.companyOrBossName : "",
      companyAddress: currentForm && currentForm.companyAddress ? currentForm.companyAddress : "",
      companyCity: currentForm && currentForm.companyCity ? currentForm.companyCity : "",
      companyState: currentForm && currentForm.companyState ? currentForm.companyState : "",
      companyCountry: currentForm && currentForm.companyCountry ? currentForm.companyCountry : "",
      companyCep: currentForm && currentForm.companyCep ? currentForm.companyCep : "",
      companyTel: currentForm && currentForm.companyTel ? currentForm.companyTel : "",
      admissionDate: currentForm && currentForm.admissionDate ? currentForm.admissionDate : undefined,
      monthlySalary: currentForm && currentForm.monthlySalary ? currentForm.monthlySalary : "",
      retireeDate: currentForm && currentForm.retireeDate ? currentForm.retireeDate : undefined,
      jobDetails: currentForm && currentForm.jobDetails ? currentForm.jobDetails : "",
      previousJobConfirmation:
        currentForm && currentForm.previousJobConfirmation
          ? currentForm.previousJobConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
      contagiousDiseaseConfirmation:
        currentForm && currentForm.contagiousDiseaseConfirmation
          ? currentForm.contagiousDiseaseConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
      phisicalMentalProblemConfirmation:
        currentForm && currentForm.phisicalMentalProblemConfirmation
          ? currentForm.phisicalMentalProblemConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
      crimeConfirmation:
        currentForm && currentForm.crimeConfirmation ? (currentForm.crimeConfirmation === true ? "Sim" : "Não") : "Não",
      drugsProblemConfirmation:
        currentForm && currentForm.drugsProblemConfirmation
          ? currentForm.drugsProblemConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
      lawViolateConfirmation:
        currentForm && currentForm.lawViolateConfirmation
          ? currentForm.lawViolateConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
      prostitutionConfirmation:
        currentForm && currentForm.prostitutionConfirmation
          ? currentForm.prostitutionConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
      moneyLaundryConfirmation:
        currentForm && currentForm.moneyLaundryConfirmation
          ? currentForm.moneyLaundryConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
      peopleTrafficConfirmation:
        currentForm && currentForm.peopleTrafficConfirmation
          ? currentForm.peopleTrafficConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
      helpPeopleTrafficConfirmation:
        currentForm && currentForm.helpPeopleTrafficConfirmation
          ? currentForm.helpPeopleTrafficConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
      parentPeopleTrafficConfirmation:
        currentForm && currentForm.parentPeopleTrafficConfirmation
          ? currentForm.parentPeopleTrafficConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
      spyConfirmation:
        currentForm && currentForm.spyConfirmation ? (currentForm.spyConfirmation === true ? "Sim" : "Não") : "Não",
      terrorismConfirmation:
        currentForm && currentForm.terrorismConfirmation
          ? currentForm.terrorismConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
      financialAssistanceConfirmation:
        currentForm && currentForm.financialAssistanceConfirmation
          ? currentForm.financialAssistanceConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
      terrorismMemberConfirmation:
        currentForm && currentForm.terrorismMemberConfirmation
          ? currentForm.terrorismMemberConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
      parentTerrorismConfirmation:
        currentForm && currentForm.parentTerrorismConfirmation
          ? currentForm.parentTerrorismConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
      genocideConfirmation:
        currentForm && currentForm.genocideConfirmation
          ? currentForm.genocideConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
      tortureConfirmation:
        currentForm && currentForm.tortureConfirmation
          ? currentForm.tortureConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
      assassinConfirmation:
        currentForm && currentForm.assassinConfirmation
          ? currentForm.assassinConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
      childSoldierConfirmation:
        currentForm && currentForm.childSoldierConfirmation
          ? currentForm.childSoldierConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
      religionLibertyConfirmation:
        currentForm && currentForm.religionLibertyConfirmation
          ? currentForm.religionLibertyConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
      abortConfirmation:
        currentForm && currentForm.abortConfirmation ? (currentForm.abortConfirmation === true ? "Sim" : "Não") : "Não",
      coerciveTransplantConfirmation:
        currentForm && currentForm.coerciveTransplantConfirmation
          ? currentForm.coerciveTransplantConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
      visaFraudConfirmation:
        currentForm && currentForm.visaFraudConfirmation
          ? currentForm.visaFraudConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
      deportedConfirmation:
        currentForm && currentForm.deportedConfirmation
          ? currentForm.deportedConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
      childCustodyConfirmation:
        currentForm && currentForm.childCustodyConfirmation
          ? currentForm.childCustodyConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
      lawViolationConfirmation:
        currentForm && currentForm.lawViolationConfirmation
          ? currentForm.lawViolationConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
      avoidTaxConfirmation:
        currentForm && currentForm.avoidTaxConfirmation
          ? currentForm.avoidTaxConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
    },
  });
  const warNameConfirmationValue: "Sim" | "Não" = form.watch("warNameConfirmation");
  const otherNamesConfirmationValue: "Sim" | "Não" = form.watch("otherNamesConfirmation");
  const otherNationalityConfirmation: "Sim" | "Não" = form.watch("otherNationalityConfirmation");
  const postalAddressConfirmation: "Sim" | "Não" = form.watch("postalAddressConfirmation");
  const fiveYearsOtherTelConfirmation: "Sim" | "Não" = form.watch("fiveYearsOtherTelConfirmation");
  const fiveYearsOtherEmailConfirmation: "Sim" | "Não" = form.watch("fiveYearsOtherEmailConfirmation");
  const passportNoExpireDate: boolean = form.watch("passportNoExpireDate");
  const passportLostConfirmation: "Sim" | "Não" = form.watch("passportLostConfirmation");
  const otherPeopleTravelingConfirmation: "Sim" | "Não" = form.watch("otherPeopleTravelingConfirmation");
  const groupMemberConfirmation: "Sim" | "Não" = form.watch("groupMemberConfirmation");
  const hasBeenOnUSAConfirmation = form.watch("hasBeenOnUSAConfirmation");
  const americanLicenseToDriveConfirmation = form.watch("americanLicenseToDriveConfirmation");
  const lostVisaConfirmation = form.watch("lostVisaConfirmation");
  const canceledVisaConfirmation = form.watch("canceledVisaConfirmation");
  const deniedVisaConfirmation = form.watch("deniedVisaConfirmation");
  const immigrationRequestByAnotherPersonConfirmation = form.watch("immigrationRequestByAnotherPersonConfirmation");
  const fatherLiveInTheUSAConfirmation = form.watch("fatherLiveInTheUSAConfirmation");
  const motherLiveInTheUSAConfirmation = form.watch("motherLiveInTheUSAConfirmation");
  const familyLivingInTheUSAConfirmation = form.watch("familyLivingInTheUSAConfirmation");
  const occupation = form.watch("occupation");
  const previousJobConfirmation = form.watch("previousJobConfirmation");

  useEffect(() => {
    if (currentForm) {
      setOtherNames(currentForm.otherNames);
      setOtherNamesIndex(currentForm.otherNames.length);
    }
  }, [currentForm]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  function handleCPFPersonalDataChange(event: ChangeEvent<HTMLInputElement>) {
    let value = event.target.value.replace(/[^\d]/g, "");

    value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");

    form.setValue("cpf", value);
  }

  function handleCEPContactAndAddressChange(event: ChangeEvent<HTMLInputElement>) {
    let value = event.target.value.replace(/[^\d]/g, "");

    value = value.replace(/(\d{5})(\d{3})/, "$1-$2");

    form.setValue("cep", value);
  }

  function handleVisitLocationsChange(event: ChangeEvent<HTMLInputElement>, index: number) {
    const values = [...visitLocations];
    values[index] = event.target.value;
    setVisitLocations(values);
  }

  function handleAddVisitLocationsInput() {
    setVisitLocationsIndex(visitLocationsIndex + 1);

    const values = [...visitLocations];
    values[values.length] = "";
    console.log(values);
    setVisitLocations(values);
  }

  function handleRemoveVisitLocationsInput(index: number) {
    setVisitLocationsIndex(visitLocationsIndex - 1);

    const values = [...visitLocations].filter((value: string, i: number) => i !== index);
    setVisitLocations(values);
  }

  function handleOtherPeopleTravelingChange(
    event: ChangeEvent<HTMLInputElement>,
    property: "name" | "relation",
    index: number
  ) {
    // const values = [...otherPeopleTraveling];
    // values[index][property] = event.target.value;
    // setOtherPeopleTraveling(values);
  }

  function handleAddOtherPeopleTravelingInput() {
    // setOtherPeopleTravelingIndex((prev: number) => prev + 1);
    // const values = [...otherPeopleTraveling];
    // values[values.length] = { name: "", relation: "", id: "", formId: "" };
    // console.log(values);
    // setOtherPeopleTraveling(values);
  }

  function handleRemoveOtherPeopleTravelingInput(index: number) {
    // setOtherPeopleTravelingIndex((prev: number) => prev - 1);
    // const values = [...otherPeopleTraveling].filter((value: OtherPeopleTraveling, i: number) => i !== index);
    // setOtherPeopleTraveling(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-12 mb-12">
        <PersonalDataForm
          formControl={form.control}
          handleCPFPersonalDataChange={handleCPFPersonalDataChange}
          warNameConfirmationValue={warNameConfirmationValue}
          otherNamesConfirmationValue={otherNamesConfirmationValue}
          otherNationalityConfirmation={otherNationalityConfirmation}
        />

        <ContactAndAddressForm
          formControl={form.control}
          handleCEPContactAndAddressChange={handleCEPContactAndAddressChange}
          postalAddressConfirmation={postalAddressConfirmation}
          fiveYearsOtherTelConfirmation={fiveYearsOtherTelConfirmation}
          fiveYearsOtherEmailConfirmation={fiveYearsOtherEmailConfirmation}
        />

        <PassportForm
          formControl={form.control}
          passportNoExpireDate={passportNoExpireDate}
          passportLostConfirmation={passportLostConfirmation}
        />

        <AboutTravelForm
          formControl={form.control}
          handleVisitLocationsChange={handleVisitLocationsChange}
          handleAddVisitLocationsInput={handleAddVisitLocationsInput}
          handleRemoveVisitLocationsInput={handleRemoveVisitLocationsInput}
        />

        <TravelCompanyForm
          formControl={form.control}
          handleOtherPeopleTravelingChange={handleOtherPeopleTravelingChange}
          handleAddOtherPeopleTravelingInput={handleAddOtherPeopleTravelingInput}
          handleRemoveOtherPeopleTravelingInput={handleRemoveOtherPeopleTravelingInput}
          otherPeopleTravelingConfirmation={otherPeopleTravelingConfirmation}
          groupMemberConfirmation={groupMemberConfirmation}
        />

        <PreviousTravelForm
          formControl={form.control}
          hasBeenOnUSAConfirmation={hasBeenOnUSAConfirmation}
          americanLicenseToDriveConfirmation={americanLicenseToDriveConfirmation}
          lostVisaConfirmation={lostVisaConfirmation}
          canceledVisaConfirmation={canceledVisaConfirmation}
          deniedVisaConfirmation={deniedVisaConfirmation}
          immigrationRequestByAnotherPersonConfirmation={immigrationRequestByAnotherPersonConfirmation}
        />

        <USAContactForm formControl={form.control} />

        <FamilyForm
          formControl={form.control}
          fatherLiveInTheUSAConfirmation={fatherLiveInTheUSAConfirmation}
          motherLiveInTheUSAConfirmation={motherLiveInTheUSAConfirmation}
          familyLivingInTheUSAConfirmation={familyLivingInTheUSAConfirmation}
        />

        <WorkEducationForm
          formControl={form.control}
          occupation={occupation}
          previousJobConfirmation={previousJobConfirmation}
        />

        <SecurityForm formControl={form.control} />

        <Button
          disabled={isSubmitting || isSaving}
          type="submit"
          className="w-full flex items-center gap-2 order-2 sm:order-3 sm:w-fit"
        >
          Enviar {isSubmitting ? <Loader2 className="animate-spin" /> : <ArrowRight className="hidden" />}
        </Button>
      </form>
    </Form>
  );
}
