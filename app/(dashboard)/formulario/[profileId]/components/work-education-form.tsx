"use client";

import {
  ArrowRight,
  CircleDollarSign,
  Loader2,
  Plus,
  Save,
  X,
  Calendar as CalendarIcon,
} from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { ptBR } from "date-fns/locale";
import { useForm } from "react-hook-form";
import { format, getYear } from "date-fns";
import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-number-input";
import { Form as FormType } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import CurrencyInput from "react-currency-input-field";
import { ChangeEvent, useEffect, useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { cn } from "@/lib/utils";
import { trpc } from "@/lib/trpc-client";
import useFormStore from "@/constants/stores/useFormStore";

const formSchema = z
  .object({
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
    previousJobs: z.array(
      z.object({
        companyName: z.string(),
        companyAddress: z.string(),
        companyCity: z.string(),
        companyState: z.string(),
        companyCountry: z.string(),
        companyCep: z.string(),
        companyTel: z.string(),
        office: z.string(),
        supervisorName: z.string(),
        admissionDate: z.date({ message: "Data inválida" }).optional(),
        resignationDate: z.date({ message: "Data inválida" }).optional(),
        jobDescription: z.string(),
      }),
    ),
    courses: z.array(
      z.object({
        institutionName: z.string(),
        address: z.string(),
        city: z.string(),
        state: z.string(),
        country: z.string(),
        cep: z.string(),
        courseName: z.string(),
        initialDate: z.date({ message: "Data inválida" }).optional(),
        finishDate: z.date({ message: "Data inválida" }).optional(),
      }),
    ),
  })
  .superRefine(({ previousJobConfirmation, previousJobs }, ctx) => {
    if (
      previousJobConfirmation === "Sim" &&
      previousJobs.length === 1 &&
      previousJobs.filter((item) => item.companyCep === "").length === 1
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Campo vazio, preencha para prosseguir",
        path: [`previousJobs.${previousJobs.length - 1}.companyCep`],
      });
    }

    if (
      previousJobConfirmation === "Sim" &&
      previousJobs.length === 1 &&
      previousJobs.filter((item) => item.companyCity === "").length === 1
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Campo vazio, preencha para prosseguir",
        path: [`previousJobs.${previousJobs.length - 1}.companyCity`],
      });
    }

    if (
      previousJobConfirmation === "Sim" &&
      previousJobs.length === 1 &&
      previousJobs.filter((item) => item.companyAddress === "").length === 1
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Campo vazio, preencha para prosseguir",
        path: [`previousJobs.${previousJobs.length - 1}.companyAddress`],
      });
    }

    if (
      previousJobConfirmation === "Sim" &&
      previousJobs.length === 1 &&
      previousJobs.filter((item) => item.companyName === "").length === 1
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Campo vazio, preencha para prosseguir",
        path: [`previousJobs.${previousJobs.length - 1}.companyName`],
      });
    }

    if (
      previousJobConfirmation === "Sim" &&
      previousJobs.length === 1 &&
      previousJobs.filter((item) => item.companyState === "").length === 1
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Campo vazio, preencha para prosseguir",
        path: [`previousJobs.${previousJobs.length - 1}.companyState`],
      });
    }

    if (
      previousJobConfirmation === "Sim" &&
      previousJobs.length === 1 &&
      previousJobs.filter((item) => item.jobDescription === "").length === 1
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Campo vazio, preencha para prosseguir",
        path: [`previousJobs.${previousJobs.length - 1}.jobDescription`],
      });
    }

    if (
      previousJobConfirmation === "Sim" &&
      previousJobs.length === 1 &&
      previousJobs.filter((item) => item.companyTel === "").length === 1
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Campo vazio, preencha para prosseguir",
        path: [`previousJobs.${previousJobs.length - 1}.companyTel`],
      });
    }

    if (
      previousJobConfirmation === "Sim" &&
      previousJobs.length === 1 &&
      previousJobs.filter((item) => item.companyCountry === "").length === 1
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Campo vazio, preencha para prosseguir",
        path: [`previousJobs.${previousJobs.length - 1}.companyCountry`],
      });
    }

    if (
      previousJobConfirmation === "Sim" &&
      previousJobs.length === 1 &&
      previousJobs.filter((item) => item.office === "").length === 1
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Campo vazio, preencha para prosseguir",
        path: [`previousJobs.${previousJobs.length - 1}.office`],
      });
    }

    if (
      previousJobConfirmation === "Sim" &&
      previousJobs.length === 1 &&
      previousJobs.filter((item) => item.admissionDate === undefined).length ===
        1
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Campo vazio, preencha para prosseguir",
        path: [`previousJobs.${previousJobs.length - 1}.admissionDate`],
      });
    }

    if (
      previousJobConfirmation === "Sim" &&
      previousJobs.length === 1 &&
      previousJobs.filter((item) => item.resignationDate === undefined)
        .length === 1
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Campo vazio, preencha para prosseguir",
        path: [`previousJobs.${previousJobs.length - 1}.resignationDate`],
      });
    }
  });

interface Props {
  currentForm: FormType;
  profileId: string;
  isEditing: boolean;
}

export function WorkEducationForm({
  currentForm,
  profileId,
  isEditing,
}: Props) {
  const [currentPreviousJobsIndex, setCurrentPreviousJobsIndex] =
    useState<number>(currentForm.previousJobs.length ?? 0);
  const [resetPreviousJobsFields, setResetPreviousJobsFields] =
    useState<boolean>(false);
  const [previousJobsItems, setPreviousJobsItems] = useState<
    {
      companyName: string;
      companyAddress: string;
      companyCity: string;
      companyState: string;
      companyCountry: string;
      companyCep: string;
      companyTel: string;
      office: string;
      supervisorName: string;
      admissionDate: Date;
      resignationDate: Date;
      jobDescription: string;
    }[]
  >([]);
  const [currentCoursesIndex, setCurrentCoursesIndex] = useState<number>(
    currentForm.courses.length ?? 0,
  );
  const [resetCoursesFields, setResetCoursesFields] = useState<boolean>(false);
  const [coursesItems, setCoursesItems] = useState<
    {
      institutionName: string;
      address: string;
      city: string;
      state: string;
      country: string;
      cep: string;
      courseName: string;
      initialDate: Date;
      finishDate: Date;
    }[]
  >([]);

  const currentYear = getYear(new Date());
  const { redirectStep, setRedirectStep } = useFormStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      occupation: currentForm.occupation
        ? currentForm.occupation
        : "Aposentado",
      office: currentForm.office ? currentForm.office : "",
      companyOrBossName: currentForm.companyOrBossName
        ? currentForm.companyOrBossName
        : "",
      companyAddress: currentForm.companyAddress
        ? currentForm.companyAddress
        : "",
      companyCity: currentForm.companyCity ? currentForm.companyCity : "",
      companyState: currentForm.companyState ? currentForm.companyState : "",
      companyCountry: currentForm.companyCountry
        ? currentForm.companyCountry
        : "",
      companyCep: currentForm.companyCep ? currentForm.companyCep : "",
      companyTel: currentForm.companyTel ? currentForm.companyTel : "",
      admissionDate: currentForm.admissionDate
        ? currentForm.admissionDate
        : undefined,
      monthlySalary: currentForm.monthlySalary ? currentForm.monthlySalary : "",
      retireeDate: currentForm.retireeDate
        ? currentForm.retireeDate
        : undefined,
      jobDetails: currentForm.jobDetails ? currentForm.jobDetails : "",
      previousJobConfirmation: currentForm.previousJobConfirmation
        ? "Sim"
        : "Não",
      previousJobs:
        currentForm.previousJobs.length > 0
          ? [
              ...currentForm.previousJobs.map((item) => ({
                ...item,
                admissionDate: new Date(item.admissionDate),
                resignationDate: new Date(item.resignationDate),
              })),
              {
                companyName: "",
                companyAddress: "",
                companyCity: "",
                companyState: "",
                companyCountry: "",
                companyCep: "",
                companyTel: "",
                office: "",
                supervisorName: "",
                admissionDate: undefined,
                resignationDate: undefined,
                jobDescription: "",
              },
            ]
          : [
              {
                companyName: "",
                companyAddress: "",
                companyCity: "",
                companyState: "",
                companyCountry: "",
                companyCep: "",
                companyTel: "",
                office: "",
                supervisorName: "",
                admissionDate: undefined,
                resignationDate: undefined,
                jobDescription: "",
              },
            ],
      courses:
        currentForm.courses.length > 0
          ? [
              ...currentForm.courses.map((item) => ({
                ...item,
                initialDate: new Date(item.initialDate),
                finishDate: new Date(item.finishDate),
              })),
              {
                institutionName: "",
                address: "",
                city: "",
                state: "",
                country: "",
                cep: "",
                courseName: "",
                initialDate: undefined,
                finishDate: undefined,
              },
            ]
          : [
              {
                institutionName: "",
                address: "",
                city: "",
                state: "",
                country: "",
                cep: "",
                courseName: "",
                initialDate: undefined,
                finishDate: undefined,
              },
            ],
    },
  });

  const occupation = form.watch("occupation");
  const previousJobConfirmation = form.watch("previousJobConfirmation");
  const previousJobs = form.watch("previousJobs");
  const courses = form.watch("courses");
  const utils = trpc.useUtils();
  const router = useRouter();

  const { mutate: submitWorkEducation, isPending } =
    trpc.formsRouter.submitWorkEducation.useMutation({
      onSuccess: (data) => {
        toast.success(data.message);
        utils.formsRouter.getForm.invalidate();

        if (data.isEditing) {
          router.push(`/resumo-formulario/${profileId}`);
        } else {
          router.push(`/formulario/${profileId}?formStep=9`);
        }
      },
      onError: (error) => {
        console.error(error.data);

        if (error.data && error.data.code === "NOT_FOUND") {
          toast.error(error.message);
        } else {
          toast.error(
            "Erro ao enviar as informações do formulário, tente novamente mais tarde",
          );
        }
      },
    });
  const { mutate: saveWorkEducation, isPending: isSavePending } =
    trpc.formsRouter.saveWorkEducation.useMutation({
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
    if (currentForm.previousJobs.length > 0) {
      setCurrentPreviousJobsIndex(currentForm.previousJobs.length);

      const previousJobsFiltered = currentForm.previousJobs.filter(
        (item) =>
          item.companyName !== "" ||
          item.companyAddress !== "" ||
          item.companyCity !== "" ||
          item.companyState !== "" ||
          item.companyCountry !== "" ||
          item.companyCep !== "" ||
          item.companyTel !== "" ||
          item.office !== "" ||
          item.supervisorName !== "" ||
          item.admissionDate !== undefined ||
          item.resignationDate !== undefined ||
          item.jobDescription !== "",
      );

      setPreviousJobsItems(previousJobsFiltered);
    }

    if (currentForm.courses.length > 0) {
      setCurrentCoursesIndex(currentForm.courses.length);

      const coursesFiltered = currentForm.courses.filter(
        (item) =>
          item.institutionName !== "" ||
          item.address !== "" ||
          item.city !== "" ||
          item.state !== "" ||
          item.country !== "" ||
          item.cep !== "" ||
          item.courseName !== "" ||
          item.initialDate !== undefined ||
          item.finishDate !== undefined,
      );

      setCoursesItems(coursesFiltered);
    }
  }, [currentForm]);

  useEffect(() => {
    if (resetPreviousJobsFields) {
      form.setValue(`previousJobs.${currentPreviousJobsIndex}.companyName`, "");
      form.setValue(
        `previousJobs.${currentPreviousJobsIndex}.companyAddress`,
        "",
      );
      form.setValue(`previousJobs.${currentPreviousJobsIndex}.companyCity`, "");
      form.setValue(
        `previousJobs.${currentPreviousJobsIndex}.companyState`,
        "",
      );
      form.setValue(
        `previousJobs.${currentPreviousJobsIndex}.companyCountry`,
        "",
      );
      form.setValue(`previousJobs.${currentPreviousJobsIndex}.companyCep`, "");
      form.setValue(`previousJobs.${currentPreviousJobsIndex}.companyTel`, "");
      form.setValue(`previousJobs.${currentPreviousJobsIndex}.office`, "");
      form.setValue(
        `previousJobs.${currentPreviousJobsIndex}.supervisorName`,
        "",
      );
      form.setValue(
        `previousJobs.${currentPreviousJobsIndex}.admissionDate`,
        undefined,
      );
      form.setValue(
        `previousJobs.${currentPreviousJobsIndex}.resignationDate`,
        undefined,
      );
      form.setValue(
        `previousJobs.${currentPreviousJobsIndex}.jobDescription`,
        "",
      );

      setResetPreviousJobsFields(false);
    }

    if (resetCoursesFields) {
      form.setValue(`courses.${currentCoursesIndex}.institutionName`, "");
      form.setValue(`courses.${currentCoursesIndex}.address`, "");
      form.setValue(`courses.${currentCoursesIndex}.city`, "");
      form.setValue(`courses.${currentCoursesIndex}.state`, "");
      form.setValue(`courses.${currentCoursesIndex}.country`, "");
      form.setValue(`courses.${currentCoursesIndex}.cep`, "");
      form.setValue(`courses.${currentCoursesIndex}.courseName`, "");
      form.setValue(`courses.${currentCoursesIndex}.initialDate`, undefined);
      form.setValue(`courses.${currentCoursesIndex}.finishDate`, undefined);

      setResetCoursesFields(false);
    }
  }, [resetPreviousJobsFields, resetCoursesFields]);

  useEffect(() => {
    if (redirectStep !== null) {
      const values = form.getValues();

      saveWorkEducation({
        profileId,
        redirectStep,
        occupation:
          values.occupation !== ""
            ? values.occupation
            : !currentForm.occupation
              ? ""
              : currentForm.occupation,
        office:
          values.office !== ""
            ? values.office
            : !currentForm.office
              ? ""
              : currentForm.office,
        companyOrBossName:
          values.companyOrBossName !== ""
            ? values.companyOrBossName
            : !currentForm.companyOrBossName
              ? ""
              : currentForm.companyOrBossName,
        companyAddress:
          values.companyAddress !== ""
            ? values.companyAddress
            : !currentForm.companyAddress
              ? ""
              : currentForm.companyAddress,
        companyCity:
          values.companyCity !== ""
            ? values.companyCity
            : !currentForm.companyCity
              ? ""
              : currentForm.companyCity,
        companyState:
          values.companyState !== ""
            ? values.companyState
            : !currentForm.companyState
              ? ""
              : currentForm.companyState,
        companyCountry:
          values.companyCountry !== ""
            ? values.companyCountry
            : !currentForm.companyCountry
              ? ""
              : currentForm.companyCountry,
        companyCep:
          values.companyCep !== ""
            ? values.companyCep
            : !currentForm.companyCep
              ? ""
              : currentForm.companyCep,
        companyTel:
          values.companyTel !== ""
            ? values.companyTel
            : !currentForm.companyTel
              ? ""
              : currentForm.companyTel,
        admissionDate:
          values.admissionDate !== undefined
            ? values.admissionDate
            : !currentForm.admissionDate
              ? undefined
              : currentForm.admissionDate,
        monthlySalary:
          values.monthlySalary !== ""
            ? values.monthlySalary
            : !currentForm.monthlySalary
              ? ""
              : currentForm.monthlySalary,
        retireeDate:
          values.retireeDate !== undefined
            ? values.retireeDate
            : !currentForm.retireeDate
              ? undefined
              : currentForm.retireeDate,
        jobDetails:
          values.jobDetails !== ""
            ? values.jobDetails
            : !currentForm.jobDetails
              ? ""
              : currentForm.jobDetails,
        previousJobConfirmation:
          values.previousJobConfirmation ??
          (currentForm.previousJobConfirmation ? "Sim" : "Não"),
        previousJobs:
          previousJobsItems.length > 0
            ? previousJobsItems
            : currentForm.previousJobs,
        courses: coursesItems.length > 0 ? coursesItems : currentForm.courses,
      });
      setRedirectStep(null);
    }
  }, [redirectStep, setRedirectStep, saveWorkEducation, profileId]);

  function handleCEPWorkEducationChange(event: ChangeEvent<HTMLInputElement>) {
    let value = event.target.value.replace(/[^\d]/g, "");

    value = value.replace(/(\d{5})(\d{3})/, "$1-$2");

    form.setValue("companyCep", value);
  }

  function handleCEPPreviousJobsChange(event: ChangeEvent<HTMLInputElement>) {
    let value = event.target.value.replace(/[^\d]/g, "");

    value = value.replace(/(\d{5})(\d{3})/, "$1-$2");

    form.setValue(`previousJobs.${currentPreviousJobsIndex}.companyCep`, value);
  }

  function handleCEPCoursesChange(event: ChangeEvent<HTMLInputElement>) {
    let value = event.target.value.replace(/[^\d]/g, "");

    value = value.replace(/(\d{5})(\d{3})/, "$1-$2");

    form.setValue(`courses.${currentCoursesIndex}.cep`, value);
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    submitWorkEducation({
      ...values,
      previousJobs: previousJobsItems,
      courses: coursesItems,
      profileId,
      step: 9,
      isEditing,
    });
  }

  function onSave() {
    const values = form.getValues();

    saveWorkEducation({
      profileId,
      occupation:
        values.occupation !== ""
          ? values.occupation
          : !currentForm.occupation
            ? ""
            : currentForm.occupation,
      office:
        values.office !== ""
          ? values.office
          : !currentForm.office
            ? ""
            : currentForm.office,
      companyOrBossName:
        values.companyOrBossName !== ""
          ? values.companyOrBossName
          : !currentForm.companyOrBossName
            ? ""
            : currentForm.companyOrBossName,
      companyAddress:
        values.companyAddress !== ""
          ? values.companyAddress
          : !currentForm.companyAddress
            ? ""
            : currentForm.companyAddress,
      companyCity:
        values.companyCity !== ""
          ? values.companyCity
          : !currentForm.companyCity
            ? ""
            : currentForm.companyCity,
      companyState:
        values.companyState !== ""
          ? values.companyState
          : !currentForm.companyState
            ? ""
            : currentForm.companyState,
      companyCountry:
        values.companyCountry !== ""
          ? values.companyCountry
          : !currentForm.companyCountry
            ? ""
            : currentForm.companyCountry,
      companyCep:
        values.companyCep !== ""
          ? values.companyCep
          : !currentForm.companyCep
            ? ""
            : currentForm.companyCep,
      companyTel:
        values.companyTel !== ""
          ? values.companyTel
          : !currentForm.companyTel
            ? ""
            : currentForm.companyTel,
      admissionDate:
        values.admissionDate !== undefined
          ? values.admissionDate
          : !currentForm.admissionDate
            ? undefined
            : currentForm.admissionDate,
      monthlySalary:
        values.monthlySalary !== ""
          ? values.monthlySalary
          : !currentForm.monthlySalary
            ? ""
            : currentForm.monthlySalary,
      retireeDate:
        values.retireeDate !== undefined
          ? values.retireeDate
          : !currentForm.retireeDate
            ? undefined
            : currentForm.retireeDate,
      jobDetails:
        values.jobDetails !== ""
          ? values.jobDetails
          : !currentForm.jobDetails
            ? ""
            : currentForm.jobDetails,
      previousJobConfirmation:
        values.previousJobConfirmation ??
        (currentForm.previousJobConfirmation ? "Sim" : "Não"),
      previousJobs:
        previousJobsItems.length > 0
          ? previousJobsItems
          : currentForm.previousJobs,
      courses: coursesItems.length > 0 ? coursesItems : currentForm.courses,
    });
  }

  function addPreviousJobs() {
    if (
      previousJobs.filter(
        (item) =>
          item.companyName === "" ||
          item.companyAddress === "" ||
          item.companyCity === "" ||
          item.companyState === "" ||
          item.companyCountry === "" ||
          item.companyCep === "" ||
          item.companyTel === "" ||
          item.office === "" ||
          item.supervisorName === "" ||
          item.admissionDate === undefined ||
          item.resignationDate === undefined ||
          item.jobDescription === "",
      ).length > 0
    ) {
      toast.error("Preencha todos os campos para adicionar");
      return;
    }
    form
      .trigger([
        `previousJobs.${currentPreviousJobsIndex}.companyName`,
        `previousJobs.${currentPreviousJobsIndex}.companyAddress`,
        `previousJobs.${currentPreviousJobsIndex}.companyCity`,
        `previousJobs.${currentPreviousJobsIndex}.companyState`,
        `previousJobs.${currentPreviousJobsIndex}.companyCountry`,
        `previousJobs.${currentPreviousJobsIndex}.companyCep`,
        `previousJobs.${currentPreviousJobsIndex}.companyTel`,
        `previousJobs.${currentPreviousJobsIndex}.office`,
        `previousJobs.${currentPreviousJobsIndex}.supervisorName`,
        `previousJobs.${currentPreviousJobsIndex}.admissionDate`,
        `previousJobs.${currentPreviousJobsIndex}.resignationDate`,
        `previousJobs.${currentPreviousJobsIndex}.jobDescription`,
      ])
      .then(() => {
        if (Object.keys(form.formState.errors).length === 0) {
          form.setValue("previousJobs", [
            ...previousJobs,
            {
              companyName: "",
              companyAddress: "",
              companyCity: "",
              companyState: "",
              companyCountry: "",
              companyCep: "",
              companyTel: "",
              office: "",
              supervisorName: "",
              admissionDate: undefined,
              resignationDate: undefined,
              jobDescription: "",
            },
          ]);

          const previousJobsFiltered: {
            companyName: string;
            companyAddress: string;
            companyCity: string;
            companyState: string;
            companyCountry: string;
            companyCep: string;
            companyTel: string;
            office: string;
            supervisorName: string;
            admissionDate: Date;
            resignationDate: Date;
            jobDescription: string;
          }[] = previousJobs.filter(
            (
              item,
            ): item is {
              companyName: string;
              companyAddress: string;
              companyCity: string;
              companyState: string;
              companyCountry: string;
              companyCep: string;
              companyTel: string;
              office: string;
              supervisorName: string;
              admissionDate: Date;
              resignationDate: Date;
              jobDescription: string;
            } =>
              (item.companyName !== "" ||
                item.companyAddress !== "" ||
                item.companyCity !== "" ||
                item.companyState !== "" ||
                item.companyCountry !== "" ||
                item.companyCep !== "" ||
                item.companyTel !== "" ||
                item.office !== "" ||
                item.supervisorName !== "" ||
                item.admissionDate !== undefined ||
                item.resignationDate !== undefined ||
                item.jobDescription !== "") &&
              item.admissionDate instanceof Date &&
              item.resignationDate instanceof Date,
          );

          setCurrentPreviousJobsIndex((prev) => prev + 1);
          setPreviousJobsItems(previousJobsFiltered);
          setResetPreviousJobsFields(true);
        }
      });
  }

  function removePreviousJobs(index: number) {
    const newArr = previousJobs.filter((_, i) => i !== index);

    form.setValue("previousJobs", newArr);

    const previousJobsFiltered: {
      companyName: string;
      companyAddress: string;
      companyCity: string;
      companyState: string;
      companyCountry: string;
      companyCep: string;
      companyTel: string;
      office: string;
      supervisorName: string;
      admissionDate: Date;
      resignationDate: Date;
      jobDescription: string;
    }[] = newArr.filter(
      (
        item,
      ): item is {
        companyName: string;
        companyAddress: string;
        companyCity: string;
        companyState: string;
        companyCountry: string;
        companyCep: string;
        companyTel: string;
        office: string;
        supervisorName: string;
        admissionDate: Date;
        resignationDate: Date;
        jobDescription: string;
      } =>
        (item.companyName !== "" ||
          item.companyAddress !== "" ||
          item.companyCity !== "" ||
          item.companyState !== "" ||
          item.companyCountry !== "" ||
          item.companyCep !== "" ||
          item.companyTel !== "" ||
          item.office !== "" ||
          item.supervisorName !== "" ||
          item.admissionDate !== undefined ||
          item.resignationDate !== undefined ||
          item.jobDescription !== "") &&
        item.admissionDate instanceof Date &&
        item.resignationDate instanceof Date,
    );

    setCurrentPreviousJobsIndex((prev) => prev - 1);
    setPreviousJobsItems(previousJobsFiltered);
  }

  function addCourses() {
    if (
      courses.filter(
        (item) =>
          item.institutionName === "" ||
          item.address === "" ||
          item.city === "" ||
          item.state === "" ||
          item.country === "" ||
          item.cep === "" ||
          item.courseName === "" ||
          item.initialDate === undefined ||
          item.finishDate === undefined,
      ).length > 0
    ) {
      toast.error("Preencha todos os campos para adicionar");
      return;
    }

    form
      .trigger([
        `courses.${currentCoursesIndex}.institutionName`,
        `courses.${currentCoursesIndex}.address`,
        `courses.${currentCoursesIndex}.city`,
        `courses.${currentCoursesIndex}.state`,
        `courses.${currentCoursesIndex}.country`,
        `courses.${currentCoursesIndex}.cep`,
        `courses.${currentCoursesIndex}.courseName`,
        `courses.${currentCoursesIndex}.initialDate`,
        `courses.${currentCoursesIndex}.finishDate`,
      ])
      .then(() => {
        if (Object.keys(form.formState.errors).length === 0) {
          form.setValue("courses", [
            ...courses,
            {
              institutionName: "",
              address: "",
              city: "",
              state: "",
              country: "",
              cep: "",
              courseName: "",
              initialDate: undefined,
              finishDate: undefined,
            },
          ]);

          const coursesFiltered: {
            institutionName: string;
            address: string;
            city: string;
            state: string;
            country: string;
            cep: string;
            courseName: string;
            initialDate: Date;
            finishDate: Date;
          }[] = courses.filter(
            (
              item,
            ): item is {
              institutionName: string;
              address: string;
              city: string;
              state: string;
              country: string;
              cep: string;
              courseName: string;
              initialDate: Date;
              finishDate: Date;
            } =>
              (item.institutionName !== "" ||
                item.address !== "" ||
                item.city !== "" ||
                item.state !== "" ||
                item.country !== "" ||
                item.cep !== "" ||
                item.courseName !== "" ||
                item.initialDate !== undefined ||
                item.finishDate !== undefined) &&
              item.initialDate instanceof Date &&
              item.finishDate instanceof Date,
          );

          setCurrentCoursesIndex((prev) => prev + 1);
          setCoursesItems(coursesFiltered);
          setResetCoursesFields(true);
        }
      });
  }

  function removeCourses(index: number) {
    const newArr = courses.filter((_, i) => i !== index);

    form.setValue("courses", newArr);

    const coursesFiltered: {
      institutionName: string;
      address: string;
      city: string;
      state: string;
      country: string;
      cep: string;
      courseName: string;
      initialDate: Date;
      finishDate: Date;
    }[] = newArr.filter(
      (
        item,
      ): item is {
        institutionName: string;
        address: string;
        city: string;
        state: string;
        country: string;
        cep: string;
        courseName: string;
        initialDate: Date;
        finishDate: Date;
      } =>
        (item.institutionName !== "" ||
          item.address !== "" ||
          item.city !== "" ||
          item.state !== "" ||
          item.country !== "" ||
          item.cep !== "" ||
          item.courseName !== "" ||
          item.initialDate !== undefined ||
          item.finishDate !== undefined) &&
        item.initialDate instanceof Date &&
        item.finishDate instanceof Date,
    );

    setCurrentCoursesIndex((prev) => prev - 1);
    setCoursesItems(coursesFiltered);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col flex-grow gap-6"
      >
        <h2 className="w-full text-center text-2xl sm:text-3xl text-foreground font-semibold mb-6">
          Trabalho e Educação
        </h2>

        <div className="w-full flex flex-col gap-12 justify-between flex-grow">
          <div className="w-full flex flex-col">
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-6 mb-6">
              <FormField
                control={form.control}
                name="occupation"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">
                      Selecione a sua ocupação atual?*
                    </FormLabel>

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          className="!mt-auto"
                          disabled={isPending}
                        >
                          <SelectValue placeholder="Selecione a opção" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        <SelectItem value="Empresário/Proprietário">
                          Empresário/Proprietário
                        </SelectItem>

                        <SelectItem value="Registrado (CLT/PJ)">
                          Registrado (CLT/PJ)
                        </SelectItem>

                        <SelectItem value="Autônomo">Autônomo</SelectItem>

                        <SelectItem value="Não Trabalho">
                          Não Trabalho
                        </SelectItem>

                        <SelectItem value="Aposentado">Aposentado</SelectItem>

                        <SelectItem value="Outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />
            </div>

            <div
              className={cn(
                "w-full grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-6 mb-6",
                {
                  hidden: occupation === "Não Trabalho",
                },
              )}
            >
              <FormField
                control={form.control}
                name="office"
                render={({ field }) => (
                  <FormItem
                    className={cn("flex flex-col gap-2", {
                      hidden:
                        occupation === "Empresário/Proprietário" ||
                        occupation === "Não Trabalho" ||
                        occupation === "Aposentado",
                    })}
                  >
                    <FormLabel className="text-foreground">
                      {occupation === "Outro" ? (
                        <>Área de atuação</>
                      ) : occupation === "Autônomo" ? (
                        <>Ramo de Atuação</>
                      ) : (
                        <>Cargo</>
                      )}
                    </FormLabel>

                    <FormControl>
                      <Input
                        tabIndex={
                          occupation === "Empresário/Proprietário" ||
                          occupation === "Não Trabalho" ||
                          occupation === "Aposentado"
                            ? -1
                            : occupation === "Registrado (CLT/PJ)" ||
                                occupation === "Autônomo" ||
                                occupation === "Outro"
                              ? 1
                              : 0
                        }
                        disabled={
                          occupation === "Não Trabalho" ||
                          occupation === "Aposentado" ||
                          occupation === "Empresário/Proprietário" ||
                          isPending
                        }
                        className="!mt-auto"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="companyOrBossName"
                render={({ field }) => (
                  <FormItem
                    className={cn("flex flex-col gap-2", {
                      "md:col-span-1": occupation === "Empresário/Proprietário",
                      hidden:
                        occupation === "Não Trabalho" ||
                        occupation === "Aposentado",
                    })}
                  >
                    <FormLabel className="text-foreground">
                      {occupation === "Empresário/Proprietário"
                        ? "Nome fantasia ou razão social"
                        : occupation === "Autônomo"
                          ? "Nome da MEI (se houver)"
                          : "Nome do empregador atual ou empresa"}
                    </FormLabel>

                    <FormControl>
                      <Input
                        tabIndex={
                          occupation === "Empresário/Proprietário"
                            ? 1
                            : occupation === "Registrado (CLT/PJ)" ||
                                occupation === "Autônomo" ||
                                occupation === "Outro"
                              ? 2
                              : occupation === "Não Trabalho" ||
                                  occupation === "Aposentado"
                                ? -1
                                : 0
                        }
                        disabled={
                          occupation === "Aposentado" ||
                          occupation === "Não Trabalho" ||
                          isPending
                        }
                        className="!mt-auto"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />

              {/* TODO: jogar campo para cima */}
              <FormField
                control={form.control}
                name="companyAddress"
                render={({ field }) => (
                  <FormItem
                    className={cn("flex flex-col gap-2", {
                      "md:col-span-2": occupation === "Empresário/Proprietário",
                      "md:row-start-3 md:col-start-1":
                        occupation === "Registrado (CLT/PJ)" ||
                        occupation === "Autônomo" ||
                        occupation === "Outro",
                      hidden:
                        occupation === "Não Trabalho" ||
                        occupation === "Aposentado",
                    })}
                  >
                    <FormLabel className="text-foreground">
                      Logradouro
                    </FormLabel>

                    <FormControl>
                      <Input
                        className="!mt-auto"
                        tabIndex={
                          occupation === "Empresário/Proprietário" ||
                          occupation === "Não Trabalho"
                            ? 2
                            : occupation === "Registrado (CLT/PJ)" ||
                                occupation === "Autônomo" ||
                                occupation === "Outro"
                              ? 6
                              : occupation === "Não Trabalho" ||
                                  occupation === "Aposentado"
                                ? -1
                                : 0
                        }
                        disabled={
                          occupation === "Não Trabalho" ||
                          occupation === "Aposentado" ||
                          isPending
                        }
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="companyCity"
                render={({ field }) => (
                  <FormItem
                    className={cn("flex flex-col gap-2", {
                      "md:row-start-2 md:col-start-1":
                        occupation === "Registrado (CLT/PJ)" ||
                        occupation === "Autônomo" ||
                        occupation === "Outro",
                      hidden:
                        occupation === "Não Trabalho" ||
                        occupation === "Aposentado",
                    })}
                  >
                    <FormLabel className="text-foreground">Cidade</FormLabel>

                    <FormControl>
                      <Input
                        className="!mt-auto"
                        tabIndex={
                          occupation === "Empresário/Proprietário" ||
                          occupation === "Não Trabalho"
                            ? 3
                            : occupation === "Registrado (CLT/PJ)" ||
                                occupation === "Autônomo" ||
                                occupation === "Outro"
                              ? 3
                              : occupation === "Não Trabalho" ||
                                  occupation === "Aposentado"
                                ? -1
                                : 0
                        }
                        disabled={
                          occupation === "Não Trabalho" ||
                          occupation === "Aposentado" ||
                          isPending
                        }
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="companyState"
                render={({ field }) => (
                  <FormItem
                    className={cn("flex flex-col gap-2", {
                      "md:row-start-2 md:col-start-2":
                        occupation === "Registrado (CLT/PJ)" ||
                        occupation === "Autônomo" ||
                        occupation === "Outro",
                      hidden:
                        occupation === "Não Trabalho" ||
                        occupation === "Aposentado",
                    })}
                  >
                    <FormLabel className="text-foreground">Estado</FormLabel>

                    <FormControl>
                      <Input
                        className="!mt-auto"
                        tabIndex={
                          occupation === "Empresário/Proprietário"
                            ? 4
                            : occupation === "Registrado (CLT/PJ)" ||
                                occupation === "Autônomo" ||
                                occupation === "Outro"
                              ? 4
                              : occupation === "Não Trabalho" ||
                                  occupation === "Aposentado"
                                ? -1
                                : 0
                        }
                        disabled={
                          occupation === "Não Trabalho" ||
                          occupation === "Aposentado" ||
                          isPending
                        }
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="companyCountry"
                render={({ field }) => (
                  <FormItem
                    className={cn("flex flex-col gap-2", {
                      "md:row-start-2 md:col-start-3":
                        occupation === "Registrado (CLT/PJ)" ||
                        occupation === "Autônomo" ||
                        occupation === "Outro",
                      hidden:
                        occupation === "Não Trabalho" ||
                        occupation === "Aposentado",
                    })}
                  >
                    <FormLabel className="text-foreground">País</FormLabel>

                    <FormControl>
                      <Input
                        className="!mt-auto"
                        tabIndex={
                          occupation === "Empresário/Proprietário"
                            ? 5
                            : occupation === "Registrado (CLT/PJ)" ||
                                occupation === "Autônomo" ||
                                occupation === "Outro"
                              ? 5
                              : occupation === "Não Trabalho" ||
                                  occupation === "Aposentado"
                                ? -1
                                : 0
                        }
                        disabled={
                          occupation === "Não Trabalho" ||
                          occupation === "Aposentado" ||
                          isPending
                        }
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="companyCep"
                render={({ field }) => (
                  <FormItem
                    className={cn("flex flex-col gap-2", {
                      "md:row-start-3 md:col-start-2":
                        occupation === "Registrado (CLT/PJ)" ||
                        occupation === "Outro" ||
                        occupation === "Autônomo",
                      hidden:
                        occupation === "Não Trabalho" ||
                        occupation === "Aposentado",
                    })}
                  >
                    <FormLabel className="text-foreground">CEP</FormLabel>

                    <FormControl>
                      <Input
                        className="!mt-auto"
                        tabIndex={
                          occupation === "Empresário/Proprietário"
                            ? 6
                            : occupation === "Registrado (CLT/PJ)" ||
                                occupation === "Autônomo" ||
                                occupation === "Outro"
                              ? 7
                              : occupation === "Não Trabalho" ||
                                  occupation === "Aposentado"
                                ? -1
                                : 0
                        }
                        disabled={
                          occupation === "Não Trabalho" ||
                          occupation === "Aposentado" ||
                          isPending
                        }
                        maxLength={9}
                        name={field.name}
                        ref={field.ref}
                        onBlur={field.onBlur}
                        value={field.value}
                        onChange={handleCEPWorkEducationChange}
                      />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="companyTel"
                render={({ field }) => (
                  <FormItem
                    className={cn("flex flex-col gap-2", {
                      "md:row-start-3 md:col-start-3":
                        occupation === "Registrado (CLT/PJ)" ||
                        occupation === "Outro" ||
                        occupation === "Autônomo",
                      hidden:
                        occupation === "Não Trabalho" ||
                        occupation === "Aposentado",
                    })}
                  >
                    <FormLabel className="text-foreground">Telefone</FormLabel>

                    <FormControl>
                      <PhoneInput
                        tabIndex={
                          occupation === "Empresário/Proprietário"
                            ? 7
                            : occupation === "Registrado (CLT/PJ)" ||
                                occupation === "Autônomo" ||
                                occupation === "Outro"
                              ? 8
                              : occupation === "Não Trabalho" ||
                                  occupation === "Aposentado"
                                ? -1
                                : 0
                        }
                        disabled={
                          occupation === "Não Trabalho" ||
                          occupation === "Aposentado" ||
                          isPending
                        }
                        limitMaxLength
                        smartCaret={false}
                        placeholder="Insira o telefone da empresa..."
                        defaultCountry="BR"
                        className={cn(
                          "!mt-auto flex h-12 w-full border border-muted/70 rounded-xl transition duration-300 bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-0 focus-within:ring-offset-0 focus-within:border-primary disabled:cursor-not-allowed disabled:opacity-50",
                          {
                            "input-error": false,
                          },
                        )}
                        name={field.name}
                        ref={field.ref}
                        onBlur={field.onBlur}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="admissionDate"
                render={({ field }) => (
                  <FormItem
                    className={cn("flex flex-col gap-2", {
                      "md:row-start-4 md:col-start-1":
                        occupation === "Empresário/Proprietário" ||
                        occupation === "Registrado (CLT/PJ)" ||
                        occupation === "Autônomo" ||
                        occupation === "Outro",
                      hidden:
                        occupation === "Não Trabalho" ||
                        occupation === "Aposentado",
                    })}
                  >
                    <FormLabel className="text-foreground">
                      {occupation === "Empresário/Proprietário"
                        ? "Data de abertura"
                        : "Data de admissão"}
                    </FormLabel>

                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            tabIndex={
                              occupation === "Empresário/Proprietário"
                                ? 8
                                : occupation === "Registrado (CLT/PJ)" ||
                                    occupation === "Autônomo" ||
                                    occupation === "Outro"
                                  ? 9
                                  : occupation === "Não Trabalho" ||
                                      occupation === "Aposentado"
                                    ? -1
                                    : 0
                            }
                            disabled={
                              occupation === "Não Trabalho" ||
                              occupation === "Aposentado" ||
                              isPending
                            }
                            variant={"outline"}
                            className={cn(
                              "!mt-auto w-full h-12 pl-3 text-left border-secondary font-normal group",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP", { locale: ptBR })
                            ) : (
                              <span className="text-foreground opacity-80 group-hover:text-white group-hover:opacity-100">
                                Selecione a data
                              </span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>

                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          locale={ptBR}
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          captionLayout="dropdown"
                          fromYear={1900}
                          toYear={currentYear}
                          classNames={{
                            day_hidden: "invisible",
                            dropdown:
                              "px-2 py-1.5 bg-[#2E3675]/80 text-white text-sm focus-visible:outline-none",
                            caption_dropdowns: "flex gap-3",
                            vhidden: "hidden",
                            caption_label: "hidden",
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="retireeDate"
                render={({ field }) => (
                  <FormItem
                    className={cn("flex flex-col gap-2", {
                      hidden:
                        occupation === "Empresário/Proprietário" ||
                        occupation === "Registrado (CLT/PJ)" ||
                        occupation === "Autônomo" ||
                        occupation === "Não Trabalho" ||
                        occupation === "Outro",
                    })}
                  >
                    <FormLabel className="text-foreground">
                      Data de aposentadoria
                    </FormLabel>

                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            tabIndex={
                              occupation === "Empresário/Proprietário" ||
                              occupation === "Registrado (CLT/PJ)" ||
                              occupation === "Autônomo" ||
                              occupation === "Outro" ||
                              occupation === "Não Trabalho"
                                ? -1
                                : occupation === "Aposentado"
                                  ? 1
                                  : 0
                            }
                            disabled={
                              occupation === "Não Trabalho" ||
                              occupation === "Empresário/Proprietário" ||
                              occupation === "Registrado (CLT/PJ)" ||
                              occupation === "Autônomo" ||
                              occupation === "Outro" ||
                              isPending
                            }
                            variant={"outline"}
                            className={cn(
                              "!mt-auto w-full h-12 pl-3 text-left border-secondary font-normal group",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value !== undefined ? (
                              format(field.value, "PPP", { locale: ptBR })
                            ) : (
                              <span className="text-foreground opacity-80 group-hover:text-white group-hover:opacity-100">
                                Selecione a data
                              </span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>

                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          locale={ptBR}
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          captionLayout="dropdown"
                          fromYear={1900}
                          toYear={currentYear}
                          classNames={{
                            day_hidden: "invisible",
                            dropdown:
                              "px-2 py-1.5 bg-[#2E3675]/80 text-white text-sm focus-visible:outline-none",
                            caption_dropdowns: "flex gap-3",
                            vhidden: "hidden",
                            caption_label: "hidden",
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="monthlySalary"
                render={({ field }) => (
                  <FormItem
                    className={cn("flex flex-col gap-2", {
                      "md:row-start-4 md:col-start-2":
                        occupation === "Empresário/Proprietário" ||
                        occupation === "Registrado (CLT/PJ)" ||
                        occupation === "Autônomo" ||
                        occupation === "Outro",
                      hidden:
                        occupation === "Não Trabalho" ||
                        occupation === "Aposentado",
                    })}
                  >
                    <FormLabel className="text-foreground">
                      Renda mensal (R$)
                    </FormLabel>

                    <FormControl>
                      <div className="h-12 flex items-center gap-2 border border-muted/70 rounded-xl transition duration-300 bg-background px-3 py-2 text-sm group focus-within:border-primary hover:border-border">
                        <CircleDollarSign
                          className="size-5 text-border flex-shrink-0"
                          strokeWidth={1.5}
                        />

                        <div className="w-[2px] flex-shrink-0 h-full bg-muted rounded-full" />

                        <CurrencyInput
                          tabIndex={
                            occupation === "Empresário/Proprietário"
                              ? 9
                              : occupation === "Registrado (CLT/PJ)" ||
                                  occupation === "Autônomo" ||
                                  occupation === "Outro"
                                ? 10
                                : occupation === "Não Trabalho" ||
                                    occupation === "Aposentado"
                                  ? -1
                                  : 0
                          }
                          disabled={
                            occupation === "Não Trabalho" ||
                            occupation === "Aposentado" ||
                            isPending
                          }
                          placeholder="Insira o valor do serviço"
                          onValueChange={(value, name) =>
                            form.setValue(name as "monthlySalary", value ?? "0")
                          }
                          decimalsLimit={2}
                          ref={field.ref}
                          onBlur={field.onBlur}
                          name={field.name}
                          value={field.value}
                          className="flex h-full w-full transition duration-300 bg-background text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0  disabled:cursor-not-allowed disabled:opacity-50"
                        />
                      </div>
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="jobDetails"
                render={({ field }) => (
                  <FormItem
                    className={cn({
                      "md:row-start-5 md:col-span-3":
                        occupation === "Empresário/Proprietário" ||
                        occupation === "Registrado (CLT/PJ)" ||
                        occupation === "Autônomo" ||
                        occupation === "Outro",
                      hidden:
                        occupation === "Não Trabalho" ||
                        occupation === "Aposentado",
                    })}
                  >
                    <FormLabel className="text-foreground">
                      {occupation == "Registrado (CLT/PJ)" ? (
                        <>Descreva quais as suas funções dentro da empresa</>
                      ) : occupation === "Autônomo" ? (
                        <>Descreva as suas atividades</>
                      ) : occupation === "Outro" ? (
                        <>Descreva sobre a sua atual ocupação</>
                      ) : occupation === "Empresário/Proprietário" ? (
                        <>
                          Descreva quais são as suas funções dentro da sua
                          empresa, se possui funcionários registrados e outras
                          informações relacionadas ao seu negócio
                        </>
                      ) : null}
                    </FormLabel>

                    <FormControl>
                      <Textarea
                        tabIndex={
                          occupation === "Empresário/Proprietário"
                            ? 10
                            : occupation === "Registrado (CLT/PJ)" ||
                                occupation === "Autônomo" ||
                                occupation === "Outro"
                              ? 11
                              : occupation === "Não Trabalho" ||
                                  occupation === "Aposentado"
                                ? -1
                                : 0
                        }
                        disabled={
                          occupation === "Não Trabalho" ||
                          occupation === "Aposentado" ||
                          isPending
                        }
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-6">
              <FormField
                control={form.control}
                name="previousJobConfirmation"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">
                      Já trabalhou anteriormente? Se sim, forneça um histórico
                      dos últimos cinco anos
                    </FormLabel>

                    <FormControl>
                      <RadioGroup
                        disabled={isPending}
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
                "w-full bg-secondary rounded-xl p-4 space-y-6 mb-10",
                {
                  hidden: previousJobConfirmation === "Não",
                },
              )}
            >
              <div className="w-full flex flex-col gap-y-4">
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
                  <FormField
                    control={form.control}
                    name={`previousJobs.${currentPreviousJobsIndex}.companyName`}
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-2">
                        <FormLabel className="text-foreground">
                          Nome do empregador ou empresa anterior
                        </FormLabel>

                        <FormControl>
                          <Input
                            className="!mt-auto"
                            disabled={isPending}
                            {...field}
                          />
                        </FormControl>

                        <FormMessage className="text-sm text-destructive" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`previousJobs.${currentPreviousJobsIndex}.companyAddress`}
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-2">
                        <FormLabel className="text-foreground">
                          Logradouro
                        </FormLabel>

                        <FormControl>
                          <Input
                            className="!mt-auto"
                            disabled={isPending}
                            {...field}
                          />
                        </FormControl>

                        <FormMessage className="text-sm text-destructive" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-6">
                  <FormField
                    control={form.control}
                    name={`previousJobs.${currentPreviousJobsIndex}.companyCity`}
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-2">
                        <FormLabel className="text-foreground">
                          Cidade
                        </FormLabel>

                        <FormControl>
                          <Input
                            className="!mt-auto"
                            disabled={isPending}
                            {...field}
                          />
                        </FormControl>

                        <FormMessage className="text-sm text-destructive" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`previousJobs.${currentPreviousJobsIndex}.companyState`}
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-2">
                        <FormLabel className="text-foreground">
                          Estado
                        </FormLabel>

                        <FormControl>
                          <Input
                            className="!mt-auto"
                            disabled={isPending}
                            {...field}
                          />
                        </FormControl>

                        <FormMessage className="text-sm text-destructive" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`previousJobs.${currentPreviousJobsIndex}.companyCountry`}
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-2">
                        <FormLabel className="text-foreground">País</FormLabel>

                        <FormControl>
                          <Input
                            className="!mt-auto"
                            disabled={isPending}
                            {...field}
                          />
                        </FormControl>

                        <FormMessage className="text-sm text-destructive" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-6">
                  <FormField
                    control={form.control}
                    name={`previousJobs.${currentPreviousJobsIndex}.companyCep`}
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-2">
                        <FormLabel className="text-foreground">CEP</FormLabel>

                        <FormControl>
                          <Input
                            disabled={isPending}
                            maxLength={9}
                            name={field.name}
                            ref={field.ref}
                            onBlur={field.onBlur}
                            value={field.value}
                            onChange={handleCEPPreviousJobsChange}
                            className="!mt-auto"
                          />
                        </FormControl>

                        <FormMessage className="text-sm text-destructive" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`previousJobs.${currentPreviousJobsIndex}.companyTel`}
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-2">
                        <FormLabel className="text-foreground">
                          Telefone
                        </FormLabel>

                        <FormControl>
                          <PhoneInput
                            disabled={isPending}
                            limitMaxLength
                            smartCaret={false}
                            placeholder="Insira seu telefone..."
                            defaultCountry="BR"
                            className={cn(
                              "!mt-auto flex h-12 w-full border border-muted/70 rounded-xl transition duration-300 bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-0 focus-within:ring-offset-0 focus-within:border-primary disabled:cursor-not-allowed disabled:opacity-50",
                              {
                                "input-error": false,
                              },
                            )}
                            name={field.name}
                            ref={field.ref}
                            onBlur={field.onBlur}
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>

                        <FormMessage className="text-sm text-destructive" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
                  <FormField
                    control={form.control}
                    name={`previousJobs.${currentPreviousJobsIndex}.office`}
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-2">
                        <FormLabel className="text-foreground">
                          Cargo / Função
                        </FormLabel>

                        <FormControl>
                          <Input
                            className="!mt-auto"
                            disabled={isPending}
                            {...field}
                          />
                        </FormControl>

                        <FormMessage className="text-sm text-destructive" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`previousJobs.${currentPreviousJobsIndex}.supervisorName`}
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-2">
                        <FormLabel className="text-foreground">
                          Nome completo do supervisor
                        </FormLabel>

                        <FormControl>
                          <Input
                            className="!mt-auto"
                            disabled={isPending}
                            {...field}
                          />
                        </FormControl>

                        <FormMessage className="text-sm text-destructive" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
                  <FormField
                    control={form.control}
                    name={`previousJobs.${currentPreviousJobsIndex}.admissionDate`}
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-2">
                        <FormLabel className="text-foreground">
                          Data de admissão
                        </FormLabel>

                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                disabled={isPending}
                                variant="date"
                                className={cn(
                                  "!mt-auto",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                <CalendarIcon
                                  strokeWidth={1.5}
                                  className="h-5 w-5 text-muted-foreground flex-shrink-0"
                                />

                                <div className="w-[2px] h-full bg-muted rounded-full flex-shrink-0" />

                                {field.value ? (
                                  format(field.value, "PPP", {
                                    locale: ptBR,
                                  })
                                ) : (
                                  <span className="text-muted-foreground">
                                    Selecione a data
                                  </span>
                                )}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>

                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              locale={ptBR}
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              captionLayout="dropdown"
                              fromYear={1900}
                              toYear={currentYear}
                              classNames={{
                                day_hidden: "invisible",
                                dropdown:
                                  "px-2 py-1.5 bg-[#2E3675]/80 text-white text-sm focus-visible:outline-none",
                                caption_dropdowns: "flex gap-3",
                                vhidden: "hidden",
                                caption_label: "hidden",
                              }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>

                        <FormMessage className="text-sm text-destructive" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`previousJobs.${currentPreviousJobsIndex}.resignationDate`}
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-2">
                        <FormLabel className="text-foreground">
                          Data de demissão
                        </FormLabel>

                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                disabled={isPending}
                                variant="date"
                                className={cn(
                                  "!mt-auto",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                <CalendarIcon
                                  strokeWidth={1.5}
                                  className="h-5 w-5 text-muted-foreground flex-shrink-0"
                                />

                                <div className="w-[2px] h-full bg-muted rounded-full flex-shrink-0" />

                                {field.value ? (
                                  format(field.value, "PPP", {
                                    locale: ptBR,
                                  })
                                ) : (
                                  <span className="text-muted-foreground">
                                    Selecione a data
                                  </span>
                                )}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>

                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              locale={ptBR}
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              captionLayout="dropdown"
                              fromYear={1900}
                              toYear={currentYear}
                              classNames={{
                                day_hidden: "invisible",
                                dropdown:
                                  "px-2 py-1.5 bg-[#2E3675]/80 text-white text-sm focus-visible:outline-none",
                                caption_dropdowns: "flex gap-3",
                                vhidden: "hidden",
                                caption_label: "hidden",
                              }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>

                        <FormMessage className="text-sm text-destructive" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name={`previousJobs.${currentPreviousJobsIndex}.jobDescription`}
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel className="text-foreground">
                        Descreva brevemente as tarefas exercidas do seu cargo
                      </FormLabel>

                      <FormControl>
                        <Textarea
                          disabled={isPending}
                          className="resize-none !mt-auto"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage className="text-sm text-destructive" />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="button"
                size="xl"
                className="w-full flex items-center gap-2 md:w-fit"
                disabled={isPending}
                onClick={addPreviousJobs}
              >
                Adicionar
                <Plus />
              </Button>

              {previousJobsItems.length > 0 && (
                <div className="w-full flex flex-col sm:flex-row sm:flex-wrap gap-2">
                  {previousJobsItems.map((item, index) => (
                    <div
                      key={`otherName-${index}`}
                      className="w-full py-2 px-4 bg-primary/50 rounded-xl flex items-center gap-2 group sm:w-fit"
                    >
                      <div className="w-full flex flex-col items-center gap-2">
                        <span className="text-sm font-medium text-white">
                          Cargo: {item.office}
                        </span>
                      </div>

                      <Button
                        type="button"
                        variant="link"
                        size="icon"
                        className="size-5 hidden opacity-0 transition-all group-hover:block group-hover:opacity-100"
                        disabled={isPending}
                        onClick={() => removePreviousJobs(index)}
                      >
                        <X strokeWidth={1} size={20} color="#FFF" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <span className="text-foreground text-base font-medium mb-6">
              Informe a sua escolaridade (Preencha com o maximo de detalhes
              possíveis)
            </span>

            <div className="w-full bg-secondary rounded-xl p-4 space-y-6">
              <div className="w-full flex flex-col gap-x-4 gap-y-6">
                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-6">
                  <FormField
                    control={form.control}
                    name={`courses.${currentCoursesIndex}.institutionName`}
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-2">
                        <FormLabel>Nome completo da instituição</FormLabel>

                        <FormControl>
                          <Input
                            className="!mt-auto"
                            disabled={isPending}
                            {...field}
                          />
                        </FormControl>

                        <FormMessage className="text-sm text-destructive" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`courses.${currentCoursesIndex}.address`}
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-2">
                        <FormLabel>Endereço completo</FormLabel>

                        <FormControl>
                          <Input
                            className="!mt-auto"
                            disabled={isPending}
                            {...field}
                          />
                        </FormControl>

                        <FormMessage className="text-sm text-destructive" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`courses.${currentCoursesIndex}.cep`}
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-2">
                        <FormLabel>CEP</FormLabel>

                        <FormControl>
                          <Input
                            className="!mt-auto"
                            maxLength={9}
                            name={field.name}
                            ref={field.ref}
                            onBlur={field.onBlur}
                            value={field.value}
                            disabled={isPending}
                            onChange={handleCEPCoursesChange}
                          />
                        </FormControl>

                        <FormMessage className="text-sm text-destructive" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-6">
                  <FormField
                    control={form.control}
                    name={`courses.${currentCoursesIndex}.city`}
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-2">
                        <FormLabel>Cidade</FormLabel>

                        <FormControl>
                          <Input
                            className="!mt-auto"
                            disabled={isPending}
                            {...field}
                          />
                        </FormControl>

                        <FormMessage className="text-sm text-destructive" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`courses.${currentCoursesIndex}.state`}
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-2">
                        <FormLabel>Estado</FormLabel>

                        <FormControl>
                          <Input
                            className="!mt-auto"
                            disabled={isPending}
                            {...field}
                          />
                        </FormControl>

                        <FormMessage className="text-sm text-destructive" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`courses.${currentCoursesIndex}.country`}
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-2">
                        <FormLabel>País</FormLabel>

                        <FormControl>
                          <Input
                            className="!mt-auto"
                            disabled={isPending}
                            {...field}
                          />
                        </FormControl>

                        <FormMessage className="text-sm text-destructive" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-6">
                  <FormField
                    control={form.control}
                    name={`courses.${currentCoursesIndex}.courseName`}
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-2">
                        <FormLabel>Nome do curso</FormLabel>

                        <FormControl>
                          <Input
                            className="!mt-auto"
                            disabled={isPending}
                            {...field}
                          />
                        </FormControl>

                        <FormMessage className="text-sm text-destructive" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`courses.${currentCoursesIndex}.initialDate`}
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-2">
                        <FormLabel>Data de início</FormLabel>

                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                disabled={isPending}
                                variant="date"
                                className={cn(
                                  "!mt-auto",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                <CalendarIcon
                                  strokeWidth={1.5}
                                  className="h-5 w-5 text-muted-foreground flex-shrink-0"
                                />

                                <div className="w-[2px] h-full bg-muted rounded-full flex-shrink-0" />

                                {field.value ? (
                                  format(field.value, "PPP", {
                                    locale: ptBR,
                                  })
                                ) : (
                                  <span className="text-muted-foreground">
                                    Selecione a data
                                  </span>
                                )}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>

                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              locale={ptBR}
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              captionLayout="dropdown"
                              fromYear={1900}
                              toYear={currentYear}
                              classNames={{
                                day_hidden: "invisible",
                                dropdown:
                                  "px-2 py-1.5 bg-[#2E3675]/80 text-white text-sm focus-visible:outline-none",
                                caption_dropdowns: "flex gap-3",
                                vhidden: "hidden",
                                caption_label: "hidden",
                              }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>

                        <FormMessage className="text-sm text-destructive" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`courses.${currentCoursesIndex}.finishDate`}
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-2">
                        <FormLabel>Data de término</FormLabel>

                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                disabled={isPending}
                                variant="date"
                                className={cn(
                                  "!mt-auto",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                <CalendarIcon
                                  strokeWidth={1.5}
                                  className="h-5 w-5 text-muted-foreground flex-shrink-0"
                                />

                                <div className="w-[2px] h-full bg-muted rounded-full flex-shrink-0" />

                                {field.value ? (
                                  format(field.value, "PPP", {
                                    locale: ptBR,
                                  })
                                ) : (
                                  <span className="text-muted-foreground">
                                    Selecione a data
                                  </span>
                                )}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>

                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              locale={ptBR}
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              captionLayout="dropdown"
                              fromYear={1900}
                              toYear={currentYear}
                              classNames={{
                                day_hidden: "invisible",
                                dropdown:
                                  "px-2 py-1.5 bg-[#2E3675]/80 text-white text-sm focus-visible:outline-none",
                                caption_dropdowns: "flex gap-3",
                                vhidden: "hidden",
                                caption_label: "hidden",
                              }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>

                        <FormMessage className="text-sm text-destructive" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Button
                type="button"
                size="xl"
                className="w-full flex items-center gap-2 md:w-fit"
                onClick={addCourses}
                disabled={isPending}
              >
                Adicionar
                <Plus />
              </Button>

              {coursesItems.length > 0 && (
                <div className="w-full flex flex-col sm:flex-row sm:flex-wrap gap-2">
                  {coursesItems.map((item, index) => (
                    <div
                      key={`otherName-${index}`}
                      className="w-full py-2 px-4 bg-primary/70 rounded-xl flex items-center gap-2 group sm:w-fit"
                    >
                      <div className="w-full flex flex-col items-center gap-2">
                        <span className="text-sm font-medium text-white">
                          Curso: {item.courseName}
                        </span>
                      </div>

                      <Button
                        type="button"
                        variant="link"
                        size="icon"
                        className="size-5 hidden opacity-0 transition-all group-hover:block group-hover:opacity-100"
                        disabled={isPending}
                        onClick={() => removeCourses(index)}
                      >
                        <X strokeWidth={1} size={20} color="#FFF" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
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
                      <Loader2
                        className="size-5 animate-spin"
                        strokeWidth={1.5}
                      />
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
                      <Loader2
                        className="size-5 animate-spin"
                        strokeWidth={1.5}
                      />
                    </>
                  ) : (
                    <>
                      Salvar
                      <Save className="size-5" strokeWidth={1.5} />
                    </>
                  )}
                </Button>

                <Button
                  size="xl"
                  type="submit"
                  className="w-full flex items-center gap-2 sm:w-fit"
                  disabled={isPending || isSavePending}
                >
                  {isPending ? (
                    <>
                      Enviando
                      <Loader2
                        className="size-5 animate-spin"
                        strokeWidth={1.5}
                      />
                    </>
                  ) : (
                    <>
                      Proximo
                      <ArrowRight className="size-5" strokeWidth={1.5} />
                    </>
                  )}
                </Button>
              </>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
}
