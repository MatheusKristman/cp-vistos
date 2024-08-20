// TODO: ajustar data de nascimento, pois se for menor de 14 anos, tem alguns campos que serão desativados
"use client";

import { ArrowRight, Loader2 } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";
import { useParams, usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useEffect } from "react";
import Link from "next/link";

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

export function PrimaryForm({ currentForm }: Props) {
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
  const pathname = usePathname();
  const params = useParams();

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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-12 mb-12"
      >
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

          {pathname === "/formulario/editar" ? (
            <Button
              size="xl"
              variant="outline"
              disabled={isSubmitting || isSaving}
              type="button"
              className="w-full sm:w-fit"
              asChild
            >
              <Link href="/area-do-cliente">Cancelar</Link>
            </Button>
          ) : null}
        </div>
      </form>
    </Form>
  );
}
