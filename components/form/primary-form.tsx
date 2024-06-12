"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  AmericanLicense,
  Form as FormType,
  OtherPeopleTraveling,
  USALastTravel,
} from "@prisma/client";
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
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CheckedState } from "@radix-ui/react-checkbox";
import { getYear } from "date-fns";
import { ArrowLeft, ArrowRight, Loader2, Save } from "lucide-react";
import useFormStore from "@/constants/stores/useFormStore";

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
    maritalStatus: z.string().min(1, { message: "Selecione uma opção" }),
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
    travelItneraryConfirmation: z.enum(["Sim", "Não"]),
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

export function PrimaryForm({ currentForm }: Props) {
  const [otherNamesIndex, setOtherNamesIndex] = useState<number>(1);
  const [otherNames, setOtherNames] = useState<string[]>([]);
  const [otherNamesError, setOtherNamesError] = useState<string>("");
  const [myselfValue, setMyselfValue] = useState<CheckedState>(false);
  const [otherPeopleTraveling, setOtherPeopleTraveling] = useState<
    OtherPeopleTraveling[]
  >([{ name: "", relation: "", id: "", formId: "" }]);
  const [otherPeopleTravelingIndex, setOtherPeopleTravelingIndex] =
    useState<number>(1);
  const [otherPeopleTravelingError, setOtherPeopleTravelingError] =
    useState<string>("");
  const [USALastTravel, setUSALastTravel] = useState<USALastTravel[]>([
    { arriveDate: null, estimatedTime: "", id: "", formId: "" },
  ]);
  const [USALastTravelIndex, setUSALastTravelIndex] = useState<number>(1);
  const [USALastTravelError, setUSALastTravelError] = useState<string>("");
  const [americanLicense, setAmericanLicense] = useState<AmericanLicense>({
    licenseNumber: "",
    state: "",
    id: "",
    formId: "",
  });
  const [americanLicenseIndex, setAmericanLicenseIndex] = useState<number>(1);
  const [americanLicenseError, setAmericanLicenseError] = useState<string>("");
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const [isSaving, setSaving] = useState<boolean>(false);

  const {
    setVisitLocationsError,
    setVisitLocationsIndex,
    setVisitLocations,
    visitLocations,
    visitLocationsIndex,
  } = useFormStore();
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
      travelItneraryConfirmation:
        currentForm && currentForm.travelItneraryConfirmation
          ? currentForm.travelItneraryConfirmation === true
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

  useEffect(() => {
    if (currentForm) {
      setOtherNames(currentForm.otherNames);
      setOtherNamesIndex(currentForm.otherNames.length);
    }
  }, [currentForm]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  function handleCPFChange(event: ChangeEvent<HTMLInputElement>) {
    let value = event.target.value.replace(/[^\d]/g, "");

    value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");

    form.setValue("cpf", value);
  }

  function handleVisitLocationsChange(
    event: ChangeEvent<HTMLInputElement>,
    index: number,
  ) {
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

    const values = [...visitLocations].filter(
      (value: string, i: number) => i !== index,
    );
    setVisitLocations(values);
  }

  function handleOtherPeopleTravelingChange(
    event: ChangeEvent<HTMLInputElement>,
    property: "name" | "relation",
    index: number,
  ) {
    const values = [...otherPeopleTraveling];
    values[index][property] = event.target.value;
    setOtherPeopleTraveling(values);
  }

  function handleAddOtherPeopleTravelingInput() {
    setOtherPeopleTravelingIndex((prev: number) => prev + 1);

    const values = [...otherPeopleTraveling];
    values[values.length] = { name: "", relation: "", id: "", formId: "" };

    console.log(values);

    setOtherPeopleTraveling(values);
  }

  function handleRemoveOtherPeopleTravelingInput(index: number) {
    setOtherPeopleTravelingIndex((prev: number) => prev - 1);

    const values = [...otherPeopleTraveling].filter(
      (value: OtherPeopleTraveling, i: number) => i !== index,
    );
    setOtherPeopleTraveling(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-12 mb-12"
      >
        <PersonalDataForm
          formControl={form.control}
          handleCPFChange={handleCPFChange}
          warNameConfirmationValue={warNameConfirmationValue}
          otherNamesConfirmationValue={otherNamesConfirmationValue}
          otherNationalityConfirmation={otherNationalityConfirmation}
        />

        <ContactAndAddressForm
          formControl={form.control}
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
          handleAddOtherPeopleTravelingInput={
            handleAddOtherPeopleTravelingInput
          }
          handleRemoveOtherPeopleTravelingInput={
            handleRemoveOtherPeopleTravelingInput
          }
          otherPeopleTravelingConfirmation={otherPeopleTravelingConfirmation}
          groupMemberConfirmation={groupMemberConfirmation}
        />
        <PreviousTravelForm formControl={form.control} />

        <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
          <Button
            type="button"
            disabled
            className="w-full flex items-center gap-2 order-3 sm:w-fit sm:order-1"
          >
            <ArrowLeft className="hidden" /> Voltar
          </Button>

          <Button
            disabled={isSubmitting || isSaving}
            // onClick={handleSave}
            onClick={() => {}}
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
