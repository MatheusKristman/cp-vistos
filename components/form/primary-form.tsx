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
import { ChangeEvent, useState } from "react";

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
    // address: z.string().min(1, { message: "Campo obrigatório" }),
    // city: z.string().min(1, { message: "Campo obrigatório" }),
    // state: z.string().min(1, { message: "Campo obrigatório" }),
    // cep: z.string().min(9, { message: "CEP inválido" }),
    // country: z.string().min(1, { message: "Campo obrigatório" }),
    // postalAddressConfirmation: z
    //   .string()
    //   .min(1, { message: "Campo obrigatório" }),
    // otherPostalAddress: z.string(),
    // cel: z.string().min(14, { message: "Celular inválido" }),
    // tel: z.string().min(13, { message: "Telefone inválido" }),
    // fiveYearsOtherTelConfirmation: z.string().min(1, {
    //   message: "Campo obrigatório",
    // }),
    // otherTel: z.string(),
    // email: z
    //   .string()
    //   .min(1, { message: "Campo obrigatório" })
    //   .email({ message: "E-mail inválido" }),
    // fiveYearsOtherEmailConfirmation: z
    //   .string()
    //   .min(1, { message: "Campo obrigatório" }),
    // otherEmail: z.string(),
    // facebook: z.string(),
    // linkedin: z.string(),
    // instagram: z.string(),
    // othersSocialMedia: z.string(),
    // passportNumber: z.string().min(1, { message: "Campo obrigatório" }),
    // passportCity: z.string().min(1, { message: "Campo obrigatório" }),
    // passportState: z.string().min(1, { message: "Campo obrigatório" }),
    // passportIssuingCountry: z.string().min(1, { message: "Campo obrigatório" }),
    // passportIssuingDate: z.date({ message: "Selecione uma data" }),
    // passportExpireDate: z.date({ message: "Selecione uma data" }).optional(),
    // passportNoExpireDate: z.boolean(),
    // passportLostConfirmation: z
    //   .string()
    //   .min(1, { message: "Campo obrigatório" }),
    // lostPassportNumber: z.string(),
    // lostPassportCountry: z.string(),
    // lostPassportDetails: z.string(),
    // travelItneraryConfirmation: z.enum(["Sim", "Não"]),
    // USAPreviewArriveDate: z.date({ message: "Campo obrigatório" }),
    // arriveFlyNumber: z.string(),
    // arriveCity: z.string(),
    // USAPreviewReturnDate: z.date({ message: "Campo obrigatório" }),
    // returnFlyNumber: z.string(),
    // returnCity: z.string(),
    // estimatedTimeOnUSA: z.string().min(1, { message: "Campo obrigatório" }),
    // USACompleteAddress: z.string(),
    // USAZipCode: z.string(),
    // USACity: z.string(),
    // USAState: z.string(),
    // payerNameOrCompany: z.string(),
    // payerTel: z.string(),
    // payerAddress: z.string(),
    // payerRelation: z.string(),
    // payerEmail: z.string(),
    // otherPeopleTravelingConfirmation: z.enum(["Sim", "Não"]),
    // groupMemberConfirmation: z.enum(["Sim", "Não"]),
    // groupName: z.string(),
    // hasBeenOnUSAConfirmation: z.enum(["Sim", "Não"]),
    // americanLicenseToDriveConfirmation: z.enum(["Sim", "Não"]),
    // USAVisaConfirmation: z.enum(["Sim", "Não"]),
    // visaIssuingDate: z.date({ message: "Campo obrigatório" }),
    // visaNumber: z.string(),
  })
  .superRefine(
    (
      {
        warNameConfirmation,
        warName,
        otherNationalityConfirmation,
        otherNationalityPassport,
        // postalAddressConfirmation,
        // otherPostalAddress,
        // fiveYearsOtherTelConfirmation,
        // otherTel,
        // fiveYearsOtherEmailConfirmation,
        // otherEmail,
        // passportLostConfirmation,
        // lostPassportNumber,
        // lostPassportCountry,
        // lostPassportDetails,
        // passportExpireDate,
        // passportNoExpireDate,
        // groupMemberConfirmation,
        // groupName,
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

      // if (
      //   postalAddressConfirmation &&
      //   otherPostalAddress &&
      //   otherPostalAddress.length === 0
      // ) {
      //   ctx.addIssue({
      //     code: z.ZodIssueCode.custom,
      //     message: "Campo vazio, preencha para prosseguir",
      //     path: ["otherPostalAddress"],
      //   });
      // }
      //
      // if (fiveYearsOtherTelConfirmation && otherTel && otherTel.length === 0) {
      //   ctx.addIssue({
      //     code: z.ZodIssueCode.custom,
      //     message: "Campo vazio, preencha para prosseguir",
      //     path: ["otherTel"],
      //   });
      // }
      //
      // if (
      //   fiveYearsOtherEmailConfirmation &&
      //   otherEmail &&
      //   otherEmail.length === 0
      // ) {
      //   ctx.addIssue({
      //     code: z.ZodIssueCode.custom,
      //     message: "Campo vazio, preencha para prosseguir",
      //     path: ["otherEmail"],
      //   });
      // }
      //
      // if (
      //   passportLostConfirmation &&
      //   lostPassportNumber &&
      //   lostPassportNumber.length === 0
      // ) {
      //   ctx.addIssue({
      //     code: z.ZodIssueCode.custom,
      //     message: "Campo vazio, preencha para prosseguir",
      //     path: ["lostPassportNumber"],
      //   });
      // }
      //
      // if (
      //   passportLostConfirmation &&
      //   lostPassportCountry &&
      //   lostPassportCountry.length === 0
      // ) {
      //   ctx.addIssue({
      //     code: z.ZodIssueCode.custom,
      //     message: "Campo vazio, preencha para prosseguir",
      //     path: ["lostPassportCountry"],
      //   });
      // }
      //
      // if (
      //   passportLostConfirmation &&
      //   lostPassportDetails &&
      //   lostPassportDetails.length === 0
      // ) {
      //   ctx.addIssue({
      //     code: z.ZodIssueCode.custom,
      //     message: "Campo vazio, preencha para prosseguir",
      //     path: ["lostPassportDetails"],
      //   });
      // }
      //
      // if (!passportNoExpireDate && passportExpireDate === undefined) {
      //   ctx.addIssue({
      //     code: z.ZodIssueCode.custom,
      //     message: "Campo obrigatório",
      //     path: ["passportExpireDate"],
      //   });
      // }
      //
      // if (groupMemberConfirmation && groupName && groupName.length === 0) {
      //   ctx.addIssue({
      //     code: z.ZodIssueCode.custom,
      //     message: "Campo vazio, preencha para prosseguir",
      //     path: ["groupName"],
      //   });
      // }
    },
  );

export function PrimaryForm({ currentForm }: Props) {
  const [otherNamesIndex, setOtherNamesIndex] = useState<number>(1);
  const [otherNames, setOtherNames] = useState<string[]>([]);
  const [otherNamesError, setOtherNamesError] = useState<string>("");
  const [visitLocations, setVisitLocations] = useState<string[]>([]);
  const [visitLocationsIndex, setVisitLocationsIndex] = useState<number>(1);
  const [visitLocationsError, setVisitLocationsError] = useState<string>("");
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
  const [americanLicense, setAmericanLicense] = useState<AmericanLicense>([
    {
      licenseNumber: "",
      state: "",
      id: "",
      formId: "",
    },
  ]);
  const [americanLicenseIndex, setAmericanLicenseIndex] = useState<number>(1);
  const [americanLicenseError, setAmericanLicenseError] = useState<string>("");
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const [isSaving, setSaving] = useState<boolean>(false);

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
  const currentYear = getYear(new Date());

  function handleCPFChange(event: ChangeEvent<HTMLInputElement>) {
    let value = event.target.value.replace(/[^\d]/g, "");

    value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");

    form.setValue("cpf", value);
  }

  function handleOtherNamesChange(
    event: ChangeEvent<HTMLInputElement>,
    index: number,
  ) {
    const values = [...otherNames];
    values[index] = event.target.value;
    setOtherNames(values);
  }

  function handleAddOtherNamesInput() {
    setOtherNamesIndex((prev: number) => prev + 1);

    const values = [...otherNames];
    values[values.length] = "";
    console.log(values);
    setOtherNames(values);
  }

  function handleRemoveOtherNamesInput(index: number) {
    setOtherNamesIndex((prev: number) => prev - 1);

    const values = [...otherNames].filter(
      (value: string, i: number) => i !== index,
    );
    setOtherNames(values);

    console.log(values);
  }

  function handleOtherNamesChange(
    event: ChangeEvent<HTMLInputElement>,
    index: number,
  ) {
    const values = [...visitLocations];
    values[index] = event.target.value;
    setVisitLocations(values);
  }

  function handleAddOtherNamesInput() {
    setVisitLocationsIndex((prev: number) => prev + 1);

    const values = [...visitLocations];
    values[values.length] = "";
    console.log(values);
    setVisitLocations(values);
  }

  function handleRemoveOtherNamesInput(index: number) {
    setVisitLocationsIndex((prev: number) => prev - 1);

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
    <div>
      {/* <PersonalDataForm /> */}
      {/* <ContactAndAddressForm /> */}
      {/* <PassportForm /> */}
      {/* <AboutTravelForm /> */}
      {/* <TravelCompanyForm /> */}
      {/* <PreviousTravelForm /> */}
    </div>
  );
}
