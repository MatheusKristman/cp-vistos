"use client";

import { ArrowRight, Loader2 } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form as FormType } from "@prisma/client";
import axios from "axios";
import { toast } from "sonner";
import { useParams, usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useEffect } from "react";
import Link from "next/link";

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
import useFormStore from "@/constants/stores/useFormStore";

import "react-phone-number-input/style.css";
import { FullForm } from "@/types";

interface Props {
  currentForm: FullForm | null;
}

const formSchema = z
  .object({
    firstName: z.string().min(1, "Campo obrigatório"),
    lastName: z.string().min(1, "Campo obrigatório"),
    cpf: z.string().min(1, "Campo obrigatório").min(14, "CPF Inválido"),
    warNameConfirmation: z.enum(["Sim", "Não"]),
    warName: z.string().optional(),
    otherNamesConfirmation: z.enum(["Sim", "Não"]),
    sex: z
      .string({ message: "Selecione uma opção" })
      .min(1, { message: "Selecione uma opção" }),
    maritalStatus: z
      .string({ message: "Selecione uma opção" })
      .min(1, { message: "Selecione uma opção" }),
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
    USAPreviewArriveDate: z.date({ message: "Campo obrigatório" }).optional(),
    arriveFlyNumber: z.string(),
    arriveCity: z.string(),
    USAPreviewReturnDate: z.date({ message: "Campo obrigatório" }).optional(),
    returnFlyNumber: z.string(),
    returnCity: z.string(),
    estimatedTimeOnUSA: z.string().min(1, { message: "Campo obrigatório" }),
    USACompleteAddress: z.string(),
    USAZipCode: z.string(),
    USACity: z.string(),
    USAState: z.string(),
    payerNameOrCompany: z.string().min(1, { message: "Campo obrigatório" }),
    payerTel: z.string().min(1, { message: "Campo obrigatório" }),
    payerAddress: z.string().min(1, { message: "Campo obrigatório" }),
    payerRelation: z.string().min(1, { message: "Campo obrigatório" }),
    payerEmail: z
      .string()
      .email({ message: "E-mail inválido" })
      .min(1, { message: "Campo obrigatório" }),
    otherPeopleTravelingConfirmation: z.enum(["Sim", "Não"]),
    groupMemberConfirmation: z.enum(["Sim", "Não"]),
    groupName: z.string(),
    hasBeenOnUSAConfirmation: z.enum(["Sim", "Não"]),
    americanLicenseToDriveConfirmation: z.enum(["Sim", "Não"]),
    USAVisaConfirmation: z.enum(["Sim", "Não"]),
    visaIssuingDate: z.date({ message: "Campo obrigatório" }).optional(),
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
    fatherCompleteName: z.string().min(1, { message: "Campo obrigatório" }),
    fatherBirthdate: z.date({ message: "Campo obrigatório" }),
    fatherLiveInTheUSAConfirmation: z.enum(["Sim", "Não"]),
    fatherUSASituation: z.string(),
    motherCompleteName: z.string().min(1, { message: "Campo obrigatório" }),
    motherBirthdate: z.date({ message: "Campo obrigatório" }),
    motherLiveInTheUSAConfirmation: z.enum(["Sim", "Não"]),
    motherUSASituation: z.string(),
    familyLivingInTheUSAConfirmation: z.enum(["Sim", "Não"]),
    partnerCompleteName: z.string(),
    partnerBirthdate: z.date({ message: "Campo obrigatório" }).optional(),
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
    admissionDate: z.date({ message: "Campo obrigatório" }).optional(),
    monthlySalary: z.string(),
    retireeDate: z.date({ message: "Campo obrigatório" }).optional(),
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
      ctx,
    ) => {
      if (warNameConfirmation && warName && warName.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Campo vazio, preencha para prosseguir",
          path: ["warName"],
        });
      }

      if (
        otherNationalityConfirmation &&
        otherNationalityPassport &&
        otherNationalityPassport.length === 0
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Campo vazio, preencha para prosseguir",
          path: ["otherNationalityPassport"],
        });
      }

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

      if (
        lostVisaConfirmation &&
        lostVisaDetails &&
        lostVisaDetails.length === 0
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Campo vazio, preencha para prosseguir",
          path: ["lostVisaDetails"],
        });
      }

      if (
        canceledVisaConfirmation &&
        canceledVisaDetails &&
        canceledVisaDetails.length === 0
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Campo vazio, preencha para prosseguir",
          path: ["canceledVisaDetails"],
        });
      }

      if (
        deniedVisaConfirmation &&
        deniedVisaDetails &&
        deniedVisaDetails.length === 0
      ) {
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
    },
  );

export function EditForm({ currentForm }: Props) {
  const {
    setOtherPeopleTraveling,
    setOtherPeopleTravelingIndex,
    setOtherPeopleTravelingError,
    otherPeopleTravelingError,
    setUSALastTravel,
    setUSALastTravelIndex,
    setUSALastTravelError,
    USALastTravelError,
    setAmericanLicense,
    setAmericanLicenseIndex,
    setAmericanLicenseError,
    americanLicenseError,
    setFamilyLivingInTheUSA,
    setFamilyLivingInTheUSAIndex,
    setFamilyLivingInTheUSAError,
    familyLivingInTheUSAError,
    setPreviousJobs,
    setPreviousJobsIndex,
    setCourses,
    setCoursesIndex,
    setCoursesError,
    coursesError,
    setVisitLocationsError,
    setVisitLocationsIndex,
    setVisitLocations,
    visitLocations,
    visitLocationsIndex,
    setOtherNames,
    setOtherNamesIndex,
    isSaving,
    setSaving,
    isSubmitting,
    setSubmitting,
    personalDataComplete,
    setPersonalDataComplete,
    contactAndAddressComplete,
    setContactAndAddressComplete,
    passportComplete,
    setPassportComplete,
    aboutTravelComplete,
    setAboutTravelComplete,
    myselfValue,
    travelCompanyComplete,
    setTravelCompanyComplete,
    previousTravelComplete,
    setPreviousTravelComplete,
    USAContactComplete,
    setUSAContactComplete,
    familyComplete,
    setFamilyComplete,
    workEducationComplete,
    setWorkEducationComplete,
    securityComplete,
    setSecurityComplete,
    setPersonalDataError,
    setContactAndAddressError,
    setPassportError,
    setAboutTravelError,
    setTravelCompanyError,
    setPreviousTravelError,
    setFamilyError,
    setWorkEducationError,
    otherNames,
    otherPeopleTraveling,
    USALastTravel,
    americanLicense,
    noVisaNumber,
    familyLivingInTheUSA,
    previousJobs,
    courses,
  } = useFormStore();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName:
        currentForm && currentForm.firstName ? currentForm.firstName : "",
      lastName: currentForm && currentForm.lastName ? currentForm.lastName : "",
      cpf: currentForm && currentForm.cpf ? currentForm.cpf : "",
      warNameConfirmation:
        currentForm && currentForm.warNameConfirmation
          ? currentForm.warNameConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
      warName:
        currentForm && currentForm.warName ? currentForm.warName : undefined,
      otherNamesConfirmation:
        currentForm && currentForm.otherNamesConfirmation
          ? currentForm.otherNamesConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
      sex: currentForm && currentForm.sex ? currentForm.sex : undefined,
      maritalStatus:
        currentForm && currentForm.maritalStatus
          ? currentForm.maritalStatus
          : undefined,
      birthDate:
        currentForm && currentForm.birthDate
          ? currentForm.birthDate
          : undefined,
      birthCity:
        currentForm && currentForm.birthCity ? currentForm.birthCity : "",
      birthState:
        currentForm && currentForm.birthState ? currentForm.birthState : "",
      birthCountry:
        currentForm && currentForm.birthCountry ? currentForm.birthCountry : "",
      originCountry:
        currentForm && currentForm.originCountry
          ? currentForm.originCountry
          : "",
      otherNationalityConfirmation:
        currentForm && currentForm.otherNationalityConfirmation
          ? currentForm.otherNationalityConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
      otherNationalityPassport:
        currentForm && currentForm.otherNationalityPassport
          ? currentForm.otherNationalityPassport
          : "",
      otherCountryResidentConfirmation:
        currentForm && currentForm.otherCountryResidentConfirmation
          ? currentForm.otherCountryResidentConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
      USSocialSecurityNumber:
        currentForm && currentForm.USSocialSecurityNumber
          ? currentForm.USSocialSecurityNumber
          : "",
      USTaxpayerIDNumber:
        currentForm && currentForm.USTaxpayerIDNumber
          ? currentForm.USTaxpayerIDNumber
          : "",
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
      passportNoExpireDate:
        currentForm && currentForm.passportExpireDate
          ? currentForm.passportExpireDate === null
            ? true
            : false
          : true,
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
      travelItineraryConfirmation:
        currentForm && currentForm.travelItineraryConfirmation
          ? currentForm.travelItineraryConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
      USAPreviewArriveDate:
        currentForm && currentForm.USAPreviewArriveDate
          ? currentForm.USAPreviewArriveDate
          : undefined,
      arriveFlyNumber:
        currentForm && currentForm.arriveFlyNumber
          ? currentForm.arriveFlyNumber
          : "",
      arriveCity:
        currentForm && currentForm.arriveCity ? currentForm.arriveCity : "",
      USAPreviewReturnDate:
        currentForm && currentForm.USAPreviewReturnDate
          ? currentForm.USAPreviewReturnDate
          : undefined,
      returnFlyNumber:
        currentForm && currentForm.returnFlyNumber
          ? currentForm.returnFlyNumber
          : "",
      returnCity:
        currentForm && currentForm.returnCity ? currentForm.returnCity : "",
      estimatedTimeOnUSA:
        currentForm && currentForm.estimatedTimeOnUSA
          ? currentForm.estimatedTimeOnUSA
          : "",
      USACompleteAddress:
        currentForm && currentForm.USACompleteAddress
          ? currentForm.USACompleteAddress
          : "",
      USAZipCode:
        currentForm && currentForm.USAZipCode ? currentForm.USAZipCode : "",
      USACity: currentForm && currentForm.USACity ? currentForm.USACity : "",
      USAState: currentForm && currentForm.USAState ? currentForm.USAState : "",
      payerNameOrCompany:
        currentForm && currentForm.payerNameOrCompany
          ? currentForm.payerNameOrCompany
          : "",
      payerTel: currentForm && currentForm.payerTel ? currentForm.payerTel : "",
      payerAddress:
        currentForm && currentForm.payerAddress ? currentForm.payerAddress : "",
      payerRelation:
        currentForm && currentForm.payerRelation
          ? currentForm.payerRelation
          : "",
      payerEmail:
        currentForm && currentForm.payerEmail ? currentForm.payerEmail : "",
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
      groupName:
        currentForm && currentForm.groupName ? currentForm.groupName : "",
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
      visaIssuingDate:
        currentForm && currentForm.visaIssuingDate
          ? currentForm.visaIssuingDate
          : undefined,
      visaNumber:
        currentForm && currentForm.visaNumber ? currentForm.visaNumber : "",
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
      lostVisaDetails:
        currentForm && currentForm.lostVisaDetails
          ? currentForm.lostVisaDetails
          : "",
      canceledVisaConfirmation:
        currentForm && currentForm.canceledVisaConfirmation
          ? currentForm.canceledVisaConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
      canceledVisaDetails:
        currentForm && currentForm.canceledVisaDetails
          ? currentForm.canceledVisaDetails
          : "",
      deniedVisaConfirmation:
        currentForm && currentForm.deniedVisaConfirmation
          ? currentForm.deniedVisaConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
      deniedVisaDetails:
        currentForm && currentForm.deniedVisaDetails
          ? currentForm.deniedVisaDetails
          : "",
      consularPost:
        currentForm && currentForm.consularPost ? currentForm.consularPost : "",
      deniedVisaType:
        currentForm && currentForm.deniedVisaType
          ? currentForm.deniedVisaType
          : "",
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
      organizationOrUSAResidentName:
        currentForm && currentForm.organizationOrUSAResidentName
          ? currentForm.organizationOrUSAResidentName
          : "",
      organizationOrUSAResidentRelation:
        currentForm && currentForm.organizationOrUSAResidentRelation
          ? currentForm.organizationOrUSAResidentRelation
          : "",
      organizationOrUSAResidentAddress:
        currentForm && currentForm.organizationOrUSAResidentAddress
          ? currentForm.organizationOrUSAResidentAddress
          : "",
      organizationOrUSAResidentZipCode:
        currentForm && currentForm.organizationOrUSAResidentZipCode
          ? currentForm.organizationOrUSAResidentZipCode
          : "",
      organizationOrUSAResidentCity:
        currentForm && currentForm.organizationOrUSAResidentCity
          ? currentForm.organizationOrUSAResidentCity
          : "",
      organizationOrUSAResidentState:
        currentForm && currentForm.organizationOrUSAResidentState
          ? currentForm.organizationOrUSAResidentState
          : "",
      organizationOrUSAResidentCountry:
        currentForm && currentForm.organizationOrUSAResidentCountry
          ? currentForm.organizationOrUSAResidentCountry
          : "",
      organizationOrUSAResidentTel:
        currentForm && currentForm.organizationOrUSAResidentTel
          ? currentForm.organizationOrUSAResidentTel
          : "",
      organizationOrUSAResidentEmail:
        currentForm && currentForm.organizationOrUSAResidentEmail
          ? currentForm.organizationOrUSAResidentEmail
          : "",
      fatherCompleteName:
        currentForm && currentForm.fatherCompleteName
          ? currentForm.fatherCompleteName
          : "",
      fatherBirthdate:
        currentForm && currentForm.fatherBirthdate
          ? currentForm.fatherBirthdate
          : undefined,
      fatherLiveInTheUSAConfirmation:
        currentForm && currentForm.fatherLiveInTheUSAConfirmation
          ? currentForm.fatherLiveInTheUSAConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
      fatherUSASituation:
        currentForm && currentForm.fatherUSASituation
          ? currentForm.fatherUSASituation
          : "",
      motherCompleteName:
        currentForm && currentForm.motherCompleteName
          ? currentForm.motherCompleteName
          : "",
      motherBirthdate:
        currentForm && currentForm.motherBirthdate
          ? currentForm.motherBirthdate
          : undefined,
      motherLiveInTheUSAConfirmation:
        currentForm && currentForm.motherLiveInTheUSAConfirmation
          ? currentForm.motherLiveInTheUSAConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
      motherUSASituation:
        currentForm && currentForm.motherUSASituation
          ? currentForm.motherUSASituation
          : "",
      familyLivingInTheUSAConfirmation:
        currentForm && currentForm.familyLivingInTheUSAConfirmation
          ? currentForm.familyLivingInTheUSAConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
      partnerCompleteName:
        currentForm && currentForm.partnerCompleteName
          ? currentForm.partnerCompleteName
          : "",
      partnerBirthdate:
        currentForm && currentForm.partnerBirthdate
          ? currentForm.partnerBirthdate
          : undefined,
      partnerNationality:
        currentForm && currentForm.partnerNationality
          ? currentForm.partnerNationality
          : "",
      partnerCity:
        currentForm && currentForm.partnerCity ? currentForm.partnerCity : "",
      partnerState:
        currentForm && currentForm.partnerState ? currentForm.partnerState : "",
      partnerCountry:
        currentForm && currentForm.partnerCountry
          ? currentForm.partnerCountry
          : "",
      unionDate:
        currentForm && currentForm.unionDate
          ? currentForm.unionDate
          : undefined,
      divorceDate:
        currentForm && currentForm.divorceDate
          ? currentForm.divorceDate
          : undefined,
      occupation:
        currentForm && currentForm.occupation
          ? currentForm.occupation
          : "Aposentado",
      office: currentForm && currentForm.office ? currentForm.office : "",
      companyOrBossName:
        currentForm && currentForm.companyOrBossName
          ? currentForm.companyOrBossName
          : "",
      companyAddress:
        currentForm && currentForm.companyAddress
          ? currentForm.companyAddress
          : "",
      companyCity:
        currentForm && currentForm.companyCity ? currentForm.companyCity : "",
      companyState:
        currentForm && currentForm.companyState ? currentForm.companyState : "",
      companyCountry:
        currentForm && currentForm.companyCountry
          ? currentForm.companyCountry
          : "",
      companyCep:
        currentForm && currentForm.companyCep ? currentForm.companyCep : "",
      companyTel:
        currentForm && currentForm.companyTel ? currentForm.companyTel : "",
      admissionDate:
        currentForm && currentForm.admissionDate
          ? currentForm.admissionDate
          : undefined,
      monthlySalary:
        currentForm && currentForm.monthlySalary
          ? currentForm.monthlySalary
          : "",
      retireeDate:
        currentForm && currentForm.retireeDate
          ? currentForm.retireeDate
          : undefined,
      jobDetails:
        currentForm && currentForm.jobDetails ? currentForm.jobDetails : "",
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
        currentForm && currentForm.crimeConfirmation
          ? currentForm.crimeConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
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
        currentForm && currentForm.spyConfirmation
          ? currentForm.spyConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
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
        currentForm && currentForm.abortConfirmation
          ? currentForm.abortConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
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
  const warNameConfirmationValue: "Sim" | "Não" = form.watch(
    "warNameConfirmation",
  );
  const otherNamesConfirmationValue: "Sim" | "Não" = form.watch(
    "otherNamesConfirmation",
  );
  const otherNationalityConfirmation: "Sim" | "Não" = form.watch(
    "otherNationalityConfirmation",
  );
  const postalAddressConfirmation: "Sim" | "Não" = form.watch(
    "postalAddressConfirmation",
  );
  const fiveYearsOtherTelConfirmation: "Sim" | "Não" = form.watch(
    "fiveYearsOtherTelConfirmation",
  );
  const fiveYearsOtherEmailConfirmation: "Sim" | "Não" = form.watch(
    "fiveYearsOtherEmailConfirmation",
  );
  const passportNoExpireDate: boolean = form.watch("passportNoExpireDate");
  const passportLostConfirmation: "Sim" | "Não" = form.watch(
    "passportLostConfirmation",
  );
  const otherPeopleTravelingConfirmation: "Sim" | "Não" = form.watch(
    "otherPeopleTravelingConfirmation",
  );
  const groupMemberConfirmation: "Sim" | "Não" = form.watch(
    "groupMemberConfirmation",
  );
  const hasBeenOnUSAConfirmation = form.watch("hasBeenOnUSAConfirmation");
  const americanLicenseToDriveConfirmation = form.watch(
    "americanLicenseToDriveConfirmation",
  );
  const USAVisaConfirmation = form.watch("USAVisaConfirmation");
  const lostVisaConfirmation = form.watch("lostVisaConfirmation");
  const canceledVisaConfirmation = form.watch("canceledVisaConfirmation");
  const deniedVisaConfirmation = form.watch("deniedVisaConfirmation");
  const immigrationRequestByAnotherPersonConfirmation = form.watch(
    "immigrationRequestByAnotherPersonConfirmation",
  );
  const fatherLiveInTheUSAConfirmation = form.watch(
    "fatherLiveInTheUSAConfirmation",
  );
  const motherLiveInTheUSAConfirmation = form.watch(
    "motherLiveInTheUSAConfirmation",
  );
  const familyLivingInTheUSAConfirmation = form.watch(
    "familyLivingInTheUSAConfirmation",
  );
  const occupation = form.watch("occupation");
  const previousJobConfirmation = form.watch("previousJobConfirmation");
  const travelItineraryConfirmation = form.watch("travelItineraryConfirmation");
  const pathname = usePathname();
  const params = useParams();

  useEffect(() => {
    if (currentForm && currentForm.otherPeopleTraveling) {
      setOtherPeopleTraveling(currentForm.otherPeopleTraveling);
      setOtherPeopleTravelingIndex(currentForm.otherPeopleTraveling.length);
    }

    if (currentForm && currentForm.otherNames.length > 0) {
      setOtherNames(currentForm.otherNames);
      setOtherNamesIndex(currentForm.otherNames.length);
    }

    if (currentForm && currentForm.USALastTravel.length > 0) {
      setUSALastTravel(currentForm.USALastTravel);
      setUSALastTravelIndex(currentForm.USALastTravel.length);
    }

    if (currentForm && currentForm.americanLicense.length > 0) {
      setAmericanLicense(currentForm.americanLicense);
      setAmericanLicenseIndex(currentForm.americanLicense.length);
    }

    if (currentForm && currentForm.familyLivingInTheUSA.length > 0) {
      setFamilyLivingInTheUSA(currentForm.familyLivingInTheUSA);
      setFamilyLivingInTheUSAIndex(currentForm.familyLivingInTheUSA.length);
    }

    if (currentForm && currentForm.previousJobs.length > 0) {
      setPreviousJobs(currentForm.previousJobs);
      setPreviousJobsIndex(currentForm.previousJobs.length);
    }

    if (currentForm && currentForm.courses.length > 0) {
      setCourses(currentForm.courses);
      setCoursesIndex(currentForm.courses.length);
    }
  }, [
    currentForm,
    setAmericanLicense,
    setAmericanLicenseIndex,
    setCourses,
    setCoursesIndex,
    setFamilyLivingInTheUSA,
    setFamilyLivingInTheUSAIndex,
    setOtherNames,
    setOtherNamesIndex,
    setOtherPeopleTraveling,
    setOtherPeopleTravelingIndex,
    setPreviousJobs,
    setPreviousJobsIndex,
    setUSALastTravel,
    setUSALastTravelIndex,
  ]);

  useEffect(() => {
    form.setValue("payerNameOrCompany", "Eu mesmo");
  }, [myselfValue]);

  useEffect(() => {
    form.setValue("visaNumber", "Não sei");
  }, [noVisaNumber]);

  useEffect(() => {
    if (isSaving) {
      axios
        .post("/api/form/save", {
          ...form.getValues(),
          otherNames,
          visitLocations,
          myselfValue,
          otherPeopleTraveling,
          USALastTravel,
          americanLicense,
          noVisaNumber,
          familyLivingInTheUSA,
          previousJobs,
          courses,
          formId: params.formId,
        })
        .then((res) => {
          toast.success("Progresso salvo!");
          router.refresh();
        })
        .catch((error) => {
          console.error(error);
          toast.error(error.response.data);
        })
        .finally(() => {
          setSaving(false);
        });
    }
  }, [isSaving]);

  const personalDataForm = form.watch([
    "firstName",
    "lastName",
    "cpf",
    "sex",
    "maritalStatus",
    "birthDate",
    "birthCity",
    "birthState",
    "birthCountry",
    "originCountry",
  ]);

  const errors = form.formState.errors;

  useEffect(() => {
    if (
      "firstName" in errors ||
      "lastName" in errors ||
      "cpf" in errors ||
      "warName" in errors ||
      "sex" in errors ||
      "maritalStatus" in errors ||
      "birthDate" in errors ||
      "birthCity" in errors ||
      "birthState" in errors ||
      "birthCountry" in errors ||
      "originCountry" in errors
    ) {
      setPersonalDataError(true);
    } else {
      setPersonalDataError(false);
    }

    if (
      "address" in errors ||
      "city" in errors ||
      "state" in errors ||
      "cep" in errors ||
      "country" in errors ||
      "otherPostalAddress" in errors ||
      "cel" in errors ||
      "tel" in errors ||
      "otherTel" in errors ||
      "email" in errors ||
      "otherEmail" in errors
    ) {
      setContactAndAddressError(true);
    } else {
      setContactAndAddressError(false);
    }

    if (
      "passportNumber" in errors ||
      "passportCity" in errors ||
      "passportState" in errors ||
      "passportIssuingCountry" in errors ||
      "passportIssuingDate" in errors ||
      "lostPassportNumber" in errors ||
      "lostPassportCountry" in errors ||
      "lostPassportDetails" in errors
    ) {
      setPassportError(true);
    } else {
      setPassportError(false);
    }

    if (
      "USAPreviewArriveDate" in errors ||
      "arriveFlyNumber" in errors ||
      "arriveCity" in errors ||
      "USAPreviewReturnDate" in errors ||
      "returnFlyNumber" in errors ||
      "returnCity" in errors ||
      "estimatedTimeOnUSA" in errors ||
      "payerNameOrCompany" in errors ||
      "payerTel" in errors ||
      "payerAddress" in errors ||
      "payerRelation" in errors ||
      "payerEmail" in errors ||
      otherPeopleTravelingError.length > 0
    ) {
      setAboutTravelError(true);
    } else {
      setAboutTravelError(false);
    }

    if ("groupName" in errors) {
      setTravelCompanyError(true);
    } else {
      setTravelCompanyError(false);
    }

    if (
      "visaIssuingDate" in errors ||
      "visaNumber" in errors ||
      "lostVisaDetails" in errors ||
      "canceledVisaDetails" in errors ||
      "deniedVisaDetails" in errors ||
      "consularPost" in errors ||
      "deniedVisaType" in errors ||
      "immigrationRequestByAnotherPersonDetails" in errors ||
      USALastTravelError.length > 0 ||
      americanLicenseError.length > 0
    ) {
      setPreviousTravelError(true);
    } else {
      setPreviousTravelError(false);
    }

    if (
      "fatherCompleteName" in errors ||
      "fatherBirthdate" in errors ||
      "fatherUSASituation" in errors ||
      "motherCompleteName" in errors ||
      "motherBirthdate" in errors ||
      "motherUSASituation" in errors ||
      "partnerCompleteName" in errors ||
      "partnerBirthdate" in errors ||
      "partnerNationality" in errors ||
      "partnerCity" in errors ||
      "partnerState" in errors ||
      "partnerCountry" in errors ||
      familyLivingInTheUSAError.length > 0
    ) {
      setFamilyError(true);
    } else {
      setFamilyError(false);
    }

    if (
      "office" in errors ||
      "companyOrBossName" in errors ||
      "companyAddress" in errors ||
      "companyCity" in errors ||
      "companyState" in errors ||
      "companyCountry" in errors ||
      "companyCep" in errors ||
      "companyTel" in errors ||
      "admissionDate" in errors ||
      "monthlySalary" in errors ||
      "retireeDate" in errors ||
      "jobDetails" in errors ||
      coursesError.length > 0
    ) {
      setWorkEducationError(true);
    } else {
      setWorkEducationError(false);
    }
  }, [
    errors,
    otherPeopleTravelingError,
    USALastTravelError,
    americanLicenseError,
    familyLivingInTheUSAError,
    coursesError,
    setAboutTravelError,
    setContactAndAddressError,
    setFamilyError,
    setPassportError,
    setPersonalDataError,
    setPreviousTravelError,
    setTravelCompanyError,
    setWorkEducationError,
  ]);

  useEffect(() => {
    if (personalDataForm.some((elem) => elem === "" || elem === null)) {
      if (personalDataComplete) {
        setPersonalDataComplete(false);
      }
    } else {
      if (!personalDataComplete) {
        setPersonalDataComplete(true);
      }
    }
  }, [personalDataForm]);

  const contactAndAddressForm = form.watch([
    "address",
    "city",
    "state",
    "cep",
    "country",
    "cel",
    "tel",
    "email",
  ]);

  useEffect(() => {
    if (contactAndAddressForm.some((elem) => elem === "" || elem === null)) {
      if (contactAndAddressComplete) {
        setContactAndAddressComplete(false);
      }
    } else {
      if (!contactAndAddressComplete) {
        setContactAndAddressComplete(true);
      }
    }
  }, [contactAndAddressForm]);

  const passportForm = form.watch([
    "passportNumber",
    "passportCity",
    "passportState",
    "passportIssuingCountry",
    "passportIssuingDate",
  ]);

  useEffect(() => {
    if (passportForm.some((elem) => elem === "" || elem === null)) {
      if (passportComplete) {
        setPassportComplete(false);
      }
    } else {
      if (!passportComplete) {
        setPassportComplete(true);
      }
    }
  }, [passportForm]);

  const aboutTravelForm = form.watch([
    "estimatedTimeOnUSA",
    "payerTel",
    "payerAddress",
    "payerRelation",
    "payerEmail",
  ]);

  useEffect(() => {
    if (aboutTravelForm.some((elem) => elem === "" || elem === null)) {
      if (aboutTravelComplete) {
        setAboutTravelComplete(false);
      }
    } else {
      if (!aboutTravelComplete) {
        setAboutTravelComplete(true);
      }
    }
  }, [aboutTravelForm]);

  useEffect(() => {
    if (!travelCompanyComplete) {
      setTravelCompanyComplete(true);
    }
  }, []);

  useEffect(() => {
    if (!previousTravelComplete) {
      setPreviousTravelComplete(true);
    }
  }, []);

  useEffect(() => {
    if (!USAContactComplete) {
      setUSAContactComplete(true);
    }
  }, []);

  const familyForm = form.watch([
    "fatherCompleteName",
    "fatherBirthdate",
    "motherCompleteName",
    "motherBirthdate",
  ]);

  useEffect(() => {
    if (familyForm.some((elem) => elem === "" || elem === null)) {
      if (familyComplete) {
        setFamilyComplete(false);
      }
    } else {
      if (!familyComplete) {
        setFamilyComplete(true);
      }
    }
  }, [familyForm]);

  const workEducationForm = form.watch(["occupation"]);

  useEffect(() => {
    if (workEducationForm.some((elem) => elem === "" || elem === null)) {
      if (workEducationComplete) {
        setWorkEducationComplete(false);
      }
    } else {
      if (!workEducationComplete) {
        setWorkEducationComplete(true);
      }
    }
  }, [workEducationForm]);

  useEffect(() => {
    if (!securityComplete) {
      setSecurityComplete(true);
    }
  }, []);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const otherPeopleTravelingInvalid = otherPeopleTraveling?.filter(
      (item) => item.name === "" || item.relation === "",
    );
    const USALastTravelInvalid = USALastTravel?.filter(
      (item) => item.arriveDate === null || item.estimatedTime === "",
    );
    const americanLicenseInvalid = americanLicense?.filter(
      (item) => item.licenseNumber === "" || item.state === "",
    );
    const familyLivingInTheUSAInvalid = familyLivingInTheUSA?.filter(
      (item) =>
        item.name === "" || item.relation === "" || item.situation === "",
    );
    const coursesInvalid = courses?.filter(
      (item) =>
        item.cep === "" ||
        item.city === "" ||
        item.state === "" ||
        item.address === "" ||
        item.country === "" ||
        item.courseName === "" ||
        !item.finishDate ||
        !item.initialDate ||
        item.institutionName === "",
    );
    const additionalInputsErrors: {
      otherPeopleTraveling: boolean;
      USALastTravel: boolean;
      americanLicense: boolean;
      familyLivingInTheUSA: boolean;
      courses: boolean;
    } = {
      otherPeopleTraveling: false,
      USALastTravel: false,
      americanLicense: false,
      familyLivingInTheUSA: false,
      courses: false,
    };

    if (
      otherPeopleTravelingConfirmation === "Sim" &&
      (!otherPeopleTravelingInvalid || otherPeopleTravelingInvalid.length > 0)
    ) {
      setOtherPeopleTravelingError("Preencha os campos vazios");
      additionalInputsErrors.otherPeopleTraveling = true;
    } else {
      setOtherPeopleTravelingError("");
      additionalInputsErrors.otherPeopleTraveling = false;
    }

    if (
      hasBeenOnUSAConfirmation === "Sim" &&
      (!USALastTravelInvalid || USALastTravelInvalid.length > 0)
    ) {
      setUSALastTravelError("Preencha os campos vazios");
      additionalInputsErrors.USALastTravel = true;
    } else {
      setUSALastTravelError("");
      additionalInputsErrors.USALastTravel = false;
    }

    if (
      americanLicenseToDriveConfirmation === "Sim" &&
      (!americanLicenseInvalid || americanLicenseInvalid.length > 0)
    ) {
      setAmericanLicenseError("Preencha os campos vazios");
      additionalInputsErrors.americanLicense = true;
    } else {
      setAmericanLicenseError("");
      additionalInputsErrors.americanLicense = false;
    }

    if (
      familyLivingInTheUSAConfirmation === "Sim" &&
      (!familyLivingInTheUSAInvalid || familyLivingInTheUSAInvalid.length > 0)
    ) {
      setFamilyLivingInTheUSAError("Preencha os campos vazios acima");
      additionalInputsErrors.familyLivingInTheUSA = true;
    } else {
      setFamilyLivingInTheUSAError("");
      additionalInputsErrors.familyLivingInTheUSA = false;
    }

    if (!coursesInvalid || coursesInvalid.length > 0) {
      setCoursesError("Preencha os campos vazios do ensino");
      additionalInputsErrors.courses = true;
    } else {
      setCoursesError("");
      additionalInputsErrors.courses = false;
    }

    if (
      additionalInputsErrors.courses ||
      additionalInputsErrors.familyLivingInTheUSA ||
      additionalInputsErrors.americanLicense ||
      additionalInputsErrors.USALastTravel ||
      additionalInputsErrors.otherPeopleTraveling
    ) {
      return;
    }

    setSubmitting(true);

    axios
      .post("/api/form/submit", {
        ...values,
        otherNames,
        visitLocations,
        myselfValue,
        otherPeopleTraveling,
        USALastTravel,
        americanLicense,
        noVisaNumber,
        familyLivingInTheUSA,
        previousJobs,
        courses,
        formId: params.formId,
      })
      .then((res) => {
        toast.success(res.data);
        router.push("/area-do-cliente");
        router.refresh();
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  }

  function handleCPFPersonalDataChange(event: ChangeEvent<HTMLInputElement>) {
    let value = event.target.value.replace(/[^\d]/g, "");

    value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");

    form.setValue("cpf", value);
  }

  function handleCEPContactAndAddressChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    let value = event.target.value.replace(/[^\d]/g, "");

    value = value.replace(/(\d{5})(\d{3})/, "$1-$2");

    form.setValue("cep", value);
  }

  function handleCEPWorkEducationChange(event: ChangeEvent<HTMLInputElement>) {
    let value = event.target.value.replace(/[^\d]/g, "");

    value = value.replace(/(\d{5})(\d{3})/, "$1-$2");

    form.setValue("companyCep", value);
  }

  function handleMyselfValue() {
    form.setValue("payerNameOrCompany", "Eu mesmo");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-12 mb-12"
      >
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
          travelItineraryConfirmation={travelItineraryConfirmation}
        />

        <TravelCompanyForm
          formControl={form.control}
          otherPeopleTravelingConfirmation={otherPeopleTravelingConfirmation}
          groupMemberConfirmation={groupMemberConfirmation}
        />

        <PreviousTravelForm
          formControl={form.control}
          hasBeenOnUSAConfirmation={hasBeenOnUSAConfirmation}
          americanLicenseToDriveConfirmation={
            americanLicenseToDriveConfirmation
          }
          USAVisaConfirmation={USAVisaConfirmation}
          lostVisaConfirmation={lostVisaConfirmation}
          canceledVisaConfirmation={canceledVisaConfirmation}
          deniedVisaConfirmation={deniedVisaConfirmation}
          immigrationRequestByAnotherPersonConfirmation={
            immigrationRequestByAnotherPersonConfirmation
          }
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
          handleCEPWorkEducationChange={handleCEPWorkEducationChange}
        />

        <SecurityForm formControl={form.control} />

        <div className="w-full flex flex-col gap-2 sm:flex-row-reverse sm:justify-end">
          <Button
            size="xl"
            disabled={isSubmitting || isSaving}
            type="submit"
            className="w-full flex items-center gap-2 sm:w-fit"
          >
            Enviar{" "}
            {isSubmitting ? (
              <Loader2 className="animate-spin" />
            ) : (
              <ArrowRight className="hidden" />
            )}
          </Button>

          <Button
            size="xl"
            variant="outline"
            disabled={isSubmitting || isSaving}
            type="button"
            className="w-full sm:w-fit"
            asChild
          >
            <Link href="/area-do-cliente">Voltar</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}
