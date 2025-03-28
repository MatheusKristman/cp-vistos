"use client";

import {
  ArrowRight,
  CircleDollarSign,
  Loader2,
  Plus,
  Save,
  X,
  Calendar as CalendarIcon,
  Edit,
  Trash,
} from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { ptBR } from "date-fns/locale";
import { useForm } from "react-hook-form";
import { format, getYear } from "date-fns";
import { useRouter } from "next/navigation";
import { Form as FormType } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import CurrencyInput from "react-currency-input-field";
import { ChangeEvent, useEffect, useRef, useState } from "react";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Accordion, AccordionContent, AccordionTrigger, AccordionItem } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

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
      })
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
      })
    ),
  })
  .superRefine(({ previousJobConfirmation, previousJobs, courses }, ctx) => {
    const hasPreviousJobsValue =
      previousJobs[previousJobs.length - 1].companyName !== "" ||
      previousJobs[previousJobs.length - 1].companyAddress !== "" ||
      previousJobs[previousJobs.length - 1].companyCity !== "" ||
      previousJobs[previousJobs.length - 1].companyState !== "" ||
      previousJobs[previousJobs.length - 1].companyCountry !== "" ||
      previousJobs[previousJobs.length - 1].companyCep !== "" ||
      previousJobs[previousJobs.length - 1].companyTel !== "" ||
      previousJobs[previousJobs.length - 1].office !== "" ||
      previousJobs[previousJobs.length - 1].supervisorName !== "" ||
      previousJobs[previousJobs.length - 1].admissionDate !== undefined ||
      previousJobs[previousJobs.length - 1].resignationDate !== undefined ||
      previousJobs[previousJobs.length - 1].jobDescription !== "";

    const hasCoursesValue =
      courses[courses.length - 1].institutionName !== "" ||
      courses[courses.length - 1].address !== "" ||
      courses[courses.length - 1].city !== "" ||
      courses[courses.length - 1].state !== "" ||
      courses[courses.length - 1].country !== "" ||
      courses[courses.length - 1].cep !== "" ||
      courses[courses.length - 1].courseName !== "" ||
      courses[courses.length - 1].initialDate !== undefined ||
      courses[courses.length - 1].finishDate !== undefined;

    for (let i = 0; i < previousJobs.length; i++) {
      console.log(previousJobs[i]);

      if (
        previousJobConfirmation === "Sim" &&
        // (previousJobs.length === 1 || (previousJobs.length > 1 && hasPreviousJobsValue)) &&
        previousJobs[i].companyCity === ""
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Campo obrigatório",
          path: [`previousJobs.${i}.companyCity`],
        });
      }

      if (
        previousJobConfirmation === "Sim" &&
        // (previousJobs.length === 1 || (previousJobs.length > 1 && hasPreviousJobsValue)) &&
        previousJobs[i].companyAddress === ""
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Campo obrigatório",
          path: [`previousJobs.${i}.companyAddress`],
        });
      }

      if (
        previousJobConfirmation === "Sim" &&
        // (previousJobs.length === 1 || (previousJobs.length > 1 && hasPreviousJobsValue)) &&
        previousJobs[i].companyName === ""
      ) {
        console.log("Company name is empty");

        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Campo obrigatório",
          path: [`previousJobs.${i}.companyName`],
        });
      }

      if (
        previousJobConfirmation === "Sim" &&
        // (previousJobs.length === 1 || (previousJobs.length > 1 && hasPreviousJobsValue)) &&
        previousJobs[i].companyState === ""
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Campo obrigatório",
          path: [`previousJobs.${i}.companyState`],
        });
      }

      if (
        previousJobConfirmation === "Sim" &&
        // (previousJobs.length === 1 || (previousJobs.length > 1 && hasPreviousJobsValue)) &&
        previousJobs[i].jobDescription === ""
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Campo obrigatório",
          path: [`previousJobs.${i}.jobDescription`],
        });
      }

      if (
        previousJobConfirmation === "Sim" &&
        // (previousJobs.length === 1 || (previousJobs.length > 1 && hasPreviousJobsValue)) &&
        previousJobs[i].companyCountry === ""
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Campo obrigatório",
          path: [`previousJobs.${i}.companyCountry`],
        });
      }

      if (
        previousJobConfirmation === "Sim" &&
        // (previousJobs.length === 1 || (previousJobs.length > 1 && hasPreviousJobsValue)) &&
        previousJobs[i].office === ""
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Campo obrigatório",
          path: [`previousJobs.${i}.office`],
        });
      }

      if (
        previousJobConfirmation === "Sim" &&
        // (previousJobs.length === 1 || (previousJobs.length > 1 && hasPreviousJobsValue)) &&
        previousJobs[i].admissionDate === undefined
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Campo obrigatório",
          path: [`previousJobs.${i}.admissionDate`],
        });
      }

      if (
        previousJobConfirmation === "Sim" &&
        // (previousJobs.length === 1 || (previousJobs.length > 1 && hasPreviousJobsValue)) &&
        previousJobs[i].resignationDate === undefined
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Campo obrigatório",
          path: [`previousJobs.${i}.resignationDate`],
        });
      }
    }

    if (
      (courses.length === 1 || (previousJobs.length > 1 && hasCoursesValue)) &&
      courses[courses.length - 1].institutionName === ""
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Campo obrigatório",
        path: [`courses.${courses.length - 1}.institutionName`],
      });
    }

    if (
      (courses.length === 1 || (previousJobs.length > 1 && hasCoursesValue)) &&
      courses[courses.length - 1].city === ""
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Campo obrigatório",
        path: [`courses.${courses.length - 1}.city`],
      });
    }

    if (
      (courses.length === 1 || (previousJobs.length > 1 && hasCoursesValue)) &&
      courses[courses.length - 1].state === ""
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Campo obrigatório",
        path: [`courses.${courses.length - 1}.state`],
      });
    }

    if (
      (courses.length === 1 || (previousJobs.length > 1 && hasCoursesValue)) &&
      courses[courses.length - 1].country === ""
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Campo obrigatório",
        path: [`courses.${courses.length - 1}.country`],
      });
    }

    if (
      (courses.length === 1 || (previousJobs.length > 1 && hasCoursesValue)) &&
      courses[courses.length - 1].courseName === ""
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Campo obrigatório",
        path: [`courses.${courses.length - 1}.courseName`],
      });
    }

    if (
      (courses.length === 1 || (previousJobs.length > 1 && hasCoursesValue)) &&
      courses[courses.length - 1].initialDate === undefined
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Campo obrigatório",
        path: [`courses.${courses.length - 1}.initialDate`],
      });
    }

    if (
      (courses.length === 1 || (previousJobs.length > 1 && hasCoursesValue)) &&
      courses[courses.length - 1].finishDate === undefined
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Campo obrigatório",
        path: [`courses.${courses.length - 1}.finishDate`],
      });
    }
  });

interface Props {
  currentForm: FormType;
  profileId: string;
  isEditing: boolean;
}

export function WorkEducationForm({ currentForm, profileId, isEditing }: Props) {
  const [currentCoursesIndex, setCurrentCoursesIndex] = useState<number>(currentForm.courses.length ?? 0);
  const [resetCoursesFields, setResetCoursesFields] = useState<boolean>(false);

  // TODO: Adicionar verificação para limitar os previousJobs para 2
  // TODO: Adicionar a mesma lógica no courses

  const currentYear = getYear(new Date());
  const { redirectStep, setRedirectStep } = useFormStore();

  const previousJobsRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      occupation: currentForm.occupation ? currentForm.occupation : "Aposentado",
      office: currentForm.office ? currentForm.office : "",
      companyOrBossName: currentForm.companyOrBossName ? currentForm.companyOrBossName : "",
      companyAddress: currentForm.companyAddress ? currentForm.companyAddress : "",
      companyCity: currentForm.companyCity ? currentForm.companyCity : "",
      companyState: currentForm.companyState ? currentForm.companyState : "",
      companyCountry: currentForm.companyCountry ? currentForm.companyCountry : "",
      companyCep: currentForm.companyCep ? currentForm.companyCep : "",
      companyTel: currentForm.companyTel ? currentForm.companyTel : "",
      admissionDate: currentForm.admissionDate ? currentForm.admissionDate : undefined,
      monthlySalary: currentForm.monthlySalary ? currentForm.monthlySalary : "",
      retireeDate: currentForm.retireeDate ? currentForm.retireeDate : undefined,
      jobDetails: currentForm.jobDetails ? currentForm.jobDetails : "",
      previousJobConfirmation: currentForm.previousJobConfirmation ? "Sim" : "Não",
      previousJobs:
        currentForm.previousJobs.length > 0
          ? [
              ...currentForm.previousJobs.map((item) => ({
                ...item,
                admissionDate: item.admissionDate ? new Date(item.admissionDate) : undefined,
                resignationDate: item.resignationDate ? new Date(item.resignationDate) : undefined,
              })),
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
                initialDate: item.initialDate ? new Date(item.initialDate) : undefined,
                finishDate: item.finishDate ? new Date(item.finishDate) : undefined,
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

  const { mutate: submitWorkEducation, isPending } = trpc.formsRouter.submitWorkEducation.useMutation({
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
        toast.error("Erro ao enviar as informações do formulário, tente novamente mais tarde");
      }
    },
  });
  const { mutate: saveWorkEducation, isPending: isSavePending } = trpc.formsRouter.saveWorkEducation.useMutation({
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
    console.log({ errors: form.formState.errors });
  }, [form.formState.errors]);

  useEffect(() => {
    if (currentForm.courses.length > 0) {
      setCurrentCoursesIndex(currentForm.courses.length);
    }
  }, [currentForm]);

  useEffect(() => {
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
  }, [resetCoursesFields]);

  useEffect(() => {
    if (redirectStep !== null) {
      const values = form.getValues();
      const previousJobsFormatted = previousJobs.map((prevJob) => ({
        ...prevJob,
        admissionDate: prevJob.admissionDate ?? null,
        resignationDate: prevJob.resignationDate ?? null,
      }));
      const coursesFormatted = courses.map((course) => ({
        ...course,
        initialDate: course.initialDate ?? null,
        finishDate: course.finishDate ?? null,
      }));

      saveWorkEducation({
        profileId,
        redirectStep,
        occupation:
          values.occupation !== "" ? values.occupation : !currentForm.occupation ? "" : currentForm.occupation,
        office: values.office !== "" ? values.office : !currentForm.office ? "" : currentForm.office,
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
          values.companyCity !== "" ? values.companyCity : !currentForm.companyCity ? "" : currentForm.companyCity,
        companyState:
          values.companyState !== "" ? values.companyState : !currentForm.companyState ? "" : currentForm.companyState,
        companyCountry:
          values.companyCountry !== ""
            ? values.companyCountry
            : !currentForm.companyCountry
            ? ""
            : currentForm.companyCountry,
        companyCep:
          values.companyCep !== "" ? values.companyCep : !currentForm.companyCep ? "" : currentForm.companyCep,
        companyTel:
          values.companyTel !== "" ? values.companyTel : !currentForm.companyTel ? "" : currentForm.companyTel,
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
          values.jobDetails !== "" ? values.jobDetails : !currentForm.jobDetails ? "" : currentForm.jobDetails,
        previousJobConfirmation:
          values.previousJobConfirmation ?? (currentForm.previousJobConfirmation ? "Sim" : "Não"),
        previousJobs: previousJobsFormatted,
        courses: coursesFormatted,
      });
      setRedirectStep(null);
    }
  }, [redirectStep, setRedirectStep, saveWorkEducation, profileId]);

  function handleCEPWorkEducationChange(event: ChangeEvent<HTMLInputElement>) {
    let value = event.target.value.replace(/[^\d]/g, "");

    value = value.replace(/(\d{5})(\d{3})/, "$1-$2");

    form.setValue("companyCep", value);
  }

  function handleCEPPreviousJobsChange(event: ChangeEvent<HTMLInputElement>, index: number) {
    let value = event.target.value.replace(/[^\d]/g, "");

    value = value.replace(/(\d{5})(\d{3})/, "$1-$2");

    form.setValue(`previousJobs.${index}.companyCep`, value);
  }

  function handleCEPCoursesChange(event: ChangeEvent<HTMLInputElement>) {
    let value = event.target.value.replace(/[^\d]/g, "");

    value = value.replace(/(\d{5})(\d{3})/, "$1-$2");

    form.setValue(`courses.${currentCoursesIndex}.cep`, value);
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    const previousJobsFormatted: {
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
    }[] = values.previousJobs.filter(
      (
        prev
      ): prev is {
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
        (prev.companyCity !== "" ||
          prev.companyAddress !== "" ||
          prev.companyName !== "" ||
          prev.companyCountry !== "" ||
          prev.companyState !== "" ||
          prev.jobDescription !== "" ||
          prev.office !== "" ||
          prev.admissionDate !== undefined ||
          prev.resignationDate !== undefined) &&
        prev.admissionDate instanceof Date &&
        prev.resignationDate instanceof Date
    );
    const coursesFormatted: {
      institutionName: string;
      address: string;
      city: string;
      state: string;
      country: string;
      cep: string;
      courseName: string;
      initialDate: Date;
      finishDate: Date;
    }[] = values.courses.filter(
      (
        course
      ): course is {
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
        (course.institutionName !== "" ||
          course.city !== "" ||
          course.state !== "" ||
          course.country !== "" ||
          course.courseName !== "" ||
          course.initialDate !== undefined ||
          course.finishDate !== undefined) &&
        course.initialDate instanceof Date &&
        course.finishDate instanceof Date
    );

    submitWorkEducation({
      ...values,
      previousJobs: previousJobsFormatted,
      courses: coursesFormatted,
      profileId,
      step: 9,
      isEditing,
    });
  }

  function onSave() {
    const values = form.getValues();
    const previousJobsFormatted = previousJobs.map((prevJob) => ({
      ...prevJob,
      admissionDate: prevJob.admissionDate ?? null,
      resignationDate: prevJob.resignationDate ?? null,
    }));
    const coursesFormatted = courses.map((course) => ({
      ...course,
      initialDate: course.initialDate ?? null,
      finishDate: course.finishDate ?? null,
    }));

    saveWorkEducation({
      profileId,
      occupation: values.occupation !== "" ? values.occupation : !currentForm.occupation ? "" : currentForm.occupation,
      office: values.office !== "" ? values.office : !currentForm.office ? "" : currentForm.office,
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
        values.companyCity !== "" ? values.companyCity : !currentForm.companyCity ? "" : currentForm.companyCity,
      companyState:
        values.companyState !== "" ? values.companyState : !currentForm.companyState ? "" : currentForm.companyState,
      companyCountry:
        values.companyCountry !== ""
          ? values.companyCountry
          : !currentForm.companyCountry
          ? ""
          : currentForm.companyCountry,
      companyCep: values.companyCep !== "" ? values.companyCep : !currentForm.companyCep ? "" : currentForm.companyCep,
      companyTel: values.companyTel !== "" ? values.companyTel : !currentForm.companyTel ? "" : currentForm.companyTel,
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
      jobDetails: values.jobDetails !== "" ? values.jobDetails : !currentForm.jobDetails ? "" : currentForm.jobDetails,
      previousJobConfirmation: values.previousJobConfirmation ?? (currentForm.previousJobConfirmation ? "Sim" : "Não"),
      previousJobs: previousJobsFormatted,
      courses: coursesFormatted,
    });
  }

  function addPreviousJobs() {
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
  }

  function handleRemovePreviousJobs(index: number) {
    const updatedPreviousJobs = previousJobs.filter((_, i) => i !== index);

    form.setValue("previousJobs", updatedPreviousJobs);
  }

  function addCourses() {
    form
      .trigger(
        [
          `courses.${currentCoursesIndex}.institutionName`,
          `courses.${currentCoursesIndex}.address`,
          `courses.${currentCoursesIndex}.city`,
          `courses.${currentCoursesIndex}.state`,
          `courses.${currentCoursesIndex}.country`,
          `courses.${currentCoursesIndex}.cep`,
          `courses.${currentCoursesIndex}.courseName`,
          `courses.${currentCoursesIndex}.initialDate`,
          `courses.${currentCoursesIndex}.finishDate`,
        ],
        { shouldFocus: true }
      )
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

          setCurrentCoursesIndex((prev) => prev + 1);
          setResetCoursesFields(true);
        }
      });
  }

  function removeCourses(index: number) {
    const newArr = courses.filter((_, i) => i !== index);

    form.setValue("courses", newArr);

    setCurrentCoursesIndex((prev) => prev - 1);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col flex-grow gap-6">
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
                    <FormLabel className="text-foreground">Selecione a sua ocupação atual?*</FormLabel>

                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="!mt-auto" disabled={isPending}>
                          <SelectValue placeholder="Selecione a opção" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        <SelectItem value="Empresário/Proprietário">Empresário/Proprietário</SelectItem>

                        <SelectItem value="Contratado (CLT/PJ)">Contratado (CLT/PJ)</SelectItem>

                        <SelectItem value="Autônomo">Autônomo</SelectItem>

                        <SelectItem value="Não Trabalho">Não Trabalho</SelectItem>

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
              className={cn("w-full grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-6 mb-6", {
                hidden: occupation === "Não Trabalho",
              })}
            >
              <FormField
                control={form.control}
                name="office"
                render={({ field }) => (
                  <FormItem
                    className={cn("flex flex-col gap-2 row-start-1 md:col-start-1", {
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
                            : occupation === "Contratado (CLT/PJ)" ||
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
                    className={cn("flex flex-col gap-2 row-start-2 md:row-start-1 md:col-start-2", {
                      "row-start-1 md:col-span-1 md:col-start-1": occupation === "Empresário/Proprietário",
                      hidden: occupation === "Não Trabalho" || occupation === "Aposentado",
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
                            : occupation === "Contratado (CLT/PJ)" ||
                              occupation === "Autônomo" ||
                              occupation === "Outro"
                            ? 2
                            : occupation === "Não Trabalho" || occupation === "Aposentado"
                            ? -1
                            : 0
                        }
                        disabled={occupation === "Aposentado" || occupation === "Não Trabalho" || isPending}
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
                name="companyAddress"
                render={({ field }) => (
                  <FormItem
                    className={cn("flex flex-col gap-2", {
                      "row-start-2 md:row-start-1 md:col-start-2 md:col-span-2":
                        occupation === "Empresário/Proprietário",
                      "row-start-3 md:col-span-2 md:row-start-2 md:col-start-1":
                        occupation === "Contratado (CLT/PJ)" || occupation === "Autônomo" || occupation === "Outro",
                      hidden: occupation === "Não Trabalho" || occupation === "Aposentado",
                    })}
                  >
                    <FormLabel className="text-foreground">Logradouro</FormLabel>

                    <FormControl>
                      <Input
                        className="!mt-auto"
                        tabIndex={
                          occupation === "Empresário/Proprietário" || occupation === "Não Trabalho"
                            ? 2
                            : occupation === "Contratado (CLT/PJ)" ||
                              occupation === "Autônomo" ||
                              occupation === "Outro"
                            ? 6
                            : occupation === "Não Trabalho" || occupation === "Aposentado"
                            ? -1
                            : 0
                        }
                        disabled={occupation === "Não Trabalho" || occupation === "Aposentado" || isPending}
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
                    className={cn("flex flex-col gap-2 row-start-4 md:row-start-2 md:col-start-2", {
                      "row-start-6 md:row-start-3 md:col-start-2":
                        occupation === "Contratado (CLT/PJ)" || occupation === "Autônomo" || occupation === "Outro",
                      hidden: occupation === "Não Trabalho" || occupation === "Aposentado",
                    })}
                  >
                    <FormLabel className="text-foreground">Cidade</FormLabel>

                    <FormControl>
                      <Input
                        className="!mt-auto"
                        tabIndex={
                          occupation === "Empresário/Proprietário" || occupation === "Não Trabalho"
                            ? 3
                            : occupation === "Contratado (CLT/PJ)" ||
                              occupation === "Autônomo" ||
                              occupation === "Outro"
                            ? 3
                            : occupation === "Não Trabalho" || occupation === "Aposentado"
                            ? -1
                            : 0
                        }
                        disabled={occupation === "Não Trabalho" || occupation === "Aposentado" || isPending}
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
                    className={cn("flex flex-col gap-2 row-start-5 md:row-start-2 md:col-start-3", {
                      "row-start-7 md:row-start-3 md:col-start-3":
                        occupation === "Contratado (CLT/PJ)" || occupation === "Autônomo" || occupation === "Outro",
                      hidden: occupation === "Não Trabalho" || occupation === "Aposentado",
                    })}
                  >
                    <FormLabel className="text-foreground">Estado</FormLabel>

                    <FormControl>
                      <Input
                        className="!mt-auto"
                        tabIndex={
                          occupation === "Empresário/Proprietário"
                            ? 4
                            : occupation === "Contratado (CLT/PJ)" ||
                              occupation === "Autônomo" ||
                              occupation === "Outro"
                            ? 4
                            : occupation === "Não Trabalho" || occupation === "Aposentado"
                            ? -1
                            : 0
                        }
                        disabled={occupation === "Não Trabalho" || occupation === "Aposentado" || isPending}
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
                    className={cn("flex flex-col gap-2 row-start-6 md:row-start-3 md:col-start-1", {
                      "row-start-8 md:row-start-4 md:col-start-1":
                        occupation === "Contratado (CLT/PJ)" || occupation === "Autônomo" || occupation === "Outro",
                      hidden: occupation === "Não Trabalho" || occupation === "Aposentado",
                    })}
                  >
                    <FormLabel className="text-foreground">País</FormLabel>

                    <FormControl>
                      <Input
                        className="!mt-auto"
                        tabIndex={
                          occupation === "Empresário/Proprietário"
                            ? 5
                            : occupation === "Contratado (CLT/PJ)" ||
                              occupation === "Autônomo" ||
                              occupation === "Outro"
                            ? 5
                            : occupation === "Não Trabalho" || occupation === "Aposentado"
                            ? -1
                            : 0
                        }
                        disabled={occupation === "Não Trabalho" || occupation === "Aposentado" || isPending}
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
                    className={cn("flex flex-col gap-2 row-start-3 md:row-start-2 md:col-start-1", {
                      "row-start-4 md:row-start-2 md:col-start-3":
                        occupation === "Contratado (CLT/PJ)" || occupation === "Outro" || occupation === "Autônomo",
                      hidden: occupation === "Não Trabalho" || occupation === "Aposentado",
                    })}
                  >
                    <FormLabel className="text-foreground">CEP</FormLabel>

                    <FormControl>
                      <Input
                        className="!mt-auto"
                        tabIndex={
                          occupation === "Empresário/Proprietário"
                            ? 6
                            : occupation === "Contratado (CLT/PJ)" ||
                              occupation === "Autônomo" ||
                              occupation === "Outro"
                            ? 7
                            : occupation === "Não Trabalho" || occupation === "Aposentado"
                            ? -1
                            : 0
                        }
                        disabled={occupation === "Não Trabalho" || occupation === "Aposentado" || isPending}
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
                    className={cn("flex flex-col gap-2 row-start-7 md:row-start-3 md:col-start-2", {
                      "row-start-5 md:row-start-3 md:col-start-1":
                        occupation === "Contratado (CLT/PJ)" || occupation === "Outro" || occupation === "Autônomo",
                      hidden: occupation === "Não Trabalho" || occupation === "Aposentado",
                    })}
                  >
                    <FormLabel className="text-foreground">Telefone</FormLabel>

                    <FormControl>
                      <Input
                        tabIndex={
                          occupation === "Empresário/Proprietário"
                            ? 7
                            : occupation === "Contratado (CLT/PJ)" ||
                              occupation === "Autônomo" ||
                              occupation === "Outro"
                            ? 8
                            : occupation === "Não Trabalho" || occupation === "Aposentado"
                            ? -1
                            : 0
                        }
                        disabled={occupation === "Não Trabalho" || occupation === "Aposentado" || isPending}
                        placeholder="Insira o telefone da empresa..."
                        {...field}
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
                      "row-start-8 md:row-start-3 md:col-start-3": occupation === "Empresário/Proprietário",
                      "row-start-9 md:row-start-4 md:col-start-2":
                        occupation === "Contratado (CLT/PJ)" || occupation === "Autônomo" || occupation === "Outro",
                      hidden: occupation === "Não Trabalho" || occupation === "Aposentado",
                    })}
                  >
                    <FormLabel className="text-foreground">
                      {occupation === "Empresário/Proprietário" ? "Data de abertura" : "Data de admissão"}
                    </FormLabel>

                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            tabIndex={
                              occupation === "Empresário/Proprietário"
                                ? 8
                                : occupation === "Contratado (CLT/PJ)" ||
                                  occupation === "Autônomo" ||
                                  occupation === "Outro"
                                ? 9
                                : occupation === "Não Trabalho" || occupation === "Aposentado"
                                ? -1
                                : 0
                            }
                            disabled={occupation === "Não Trabalho" || occupation === "Aposentado" || isPending}
                            variant={"outline"}
                            className={cn(
                              "!mt-auto w-full h-12 pl-3 text-left border-secondary font-normal group",
                              !field.value && "text-muted-foreground"
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
                          disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                          captionLayout="dropdown"
                          fromYear={1900}
                          toYear={currentYear}
                          classNames={{
                            day_hidden: "invisible",
                            dropdown: "px-2 py-1.5 bg-[#2E3675]/80 text-white text-sm focus-visible:outline-none",
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
                        occupation === "Contratado (CLT/PJ)" ||
                        occupation === "Autônomo" ||
                        occupation === "Não Trabalho" ||
                        occupation === "Outro",
                    })}
                  >
                    <FormLabel className="text-foreground">Data de aposentadoria</FormLabel>

                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            tabIndex={
                              occupation === "Empresário/Proprietário" ||
                              occupation === "Contratado (CLT/PJ)" ||
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
                              occupation === "Contratado (CLT/PJ)" ||
                              occupation === "Autônomo" ||
                              occupation === "Outro" ||
                              isPending
                            }
                            variant={"outline"}
                            className={cn(
                              "!mt-auto w-full h-12 pl-3 text-left border-secondary font-normal group",
                              !field.value && "text-muted-foreground"
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
                          disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                          captionLayout="dropdown"
                          fromYear={1900}
                          toYear={currentYear}
                          classNames={{
                            day_hidden: "invisible",
                            dropdown: "px-2 py-1.5 bg-[#2E3675]/80 text-white text-sm focus-visible:outline-none",
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
                      "row-start-9 md:row-start-4 md:col-start-1": occupation === "Empresário/Proprietário",
                      "row-start-10 md:row-start-4 md:col-start-3":
                        occupation === "Autônomo" || occupation === "Contratado (CLT/PJ)" || occupation === "Outro",
                      hidden: occupation === "Não Trabalho" || occupation === "Aposentado",
                    })}
                  >
                    <FormLabel className="text-foreground">Renda mensal (R$)</FormLabel>

                    <FormControl>
                      <div className="h-12 flex items-center gap-2 border border-muted/70 rounded-xl transition duration-300 bg-background px-3 py-2 text-sm group focus-within:border-primary hover:border-border">
                        <CircleDollarSign className="size-5 text-border flex-shrink-0" strokeWidth={1.5} />

                        <div className="w-[2px] flex-shrink-0 h-full bg-muted rounded-full" />

                        <CurrencyInput
                          tabIndex={
                            occupation === "Empresário/Proprietário"
                              ? 9
                              : occupation === "Contratado (CLT/PJ)" ||
                                occupation === "Autônomo" ||
                                occupation === "Outro"
                              ? 10
                              : occupation === "Não Trabalho" || occupation === "Aposentado"
                              ? -1
                              : 0
                          }
                          disabled={occupation === "Não Trabalho" || occupation === "Aposentado" || isPending}
                          placeholder="Insira o valor do serviço"
                          onValueChange={(value, name) => form.setValue(name as "monthlySalary", value ?? "0")}
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
                        occupation === "Contratado (CLT/PJ)" ||
                        occupation === "Autônomo" ||
                        occupation === "Outro",
                      hidden: occupation === "Não Trabalho" || occupation === "Aposentado",
                    })}
                  >
                    <FormLabel className="text-foreground">
                      {occupation == "Contratado (CLT/PJ)" ? (
                        <>Descreva quais as suas funções dentro da empresa</>
                      ) : occupation === "Autônomo" ? (
                        <>Descreva as suas atividades</>
                      ) : occupation === "Outro" ? (
                        <>Descreva sobre a sua atual ocupação</>
                      ) : occupation === "Empresário/Proprietário" ? (
                        <>
                          Descreva quais são as suas funções dentro da sua empresa, se possui funcionários registrados e
                          outras informações relacionadas ao seu negócio
                        </>
                      ) : null}
                    </FormLabel>

                    <FormControl>
                      <Textarea
                        tabIndex={
                          occupation === "Empresário/Proprietário"
                            ? 10
                            : occupation === "Contratado (CLT/PJ)" ||
                              occupation === "Autônomo" ||
                              occupation === "Outro"
                            ? 11
                            : occupation === "Não Trabalho" || occupation === "Aposentado"
                            ? -1
                            : 0
                        }
                        disabled={occupation === "Não Trabalho" || occupation === "Aposentado" || isPending}
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
                      Já trabalhou anteriormente? Se sim, forneça um histórico dos últimos cinco anos
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
              ref={previousJobsRef}
              className={cn("w-full bg-secondary rounded-xl p-4 space-y-6 mb-10", {
                hidden: previousJobConfirmation === "Não",
              })}
            >
              {previousJobs.map((prevJob, index) => (
                <div key={index} className="w-full flex flex-col gap-y-4">
                  <div className="w-full flex items-center justify-between gap-6">
                    <span className="w-fit bg-primary rounded-full px-3 py-1 text-white text-base font-medium mb-4">
                      Experiência de trabalho - {index + 1}
                    </span>

                    {index !== 0 && (
                      <Button type="button" onClick={() => handleRemovePreviousJobs(index)} variant="ghost" size="icon">
                        <X
                          strokeWidth={1.5}
                          className="size-8 text-foreground hover:text-foreground/70 transition-colors"
                        />
                      </Button>
                    )}
                  </div>

                  <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
                    <FormField
                      control={form.control}
                      name={`previousJobs.${index}.companyName`}
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-2">
                          <FormLabel className="text-foreground">Nome do empregador ou empresa anterior*</FormLabel>

                          <FormControl>
                            <Input className="!mt-auto" disabled={isPending} {...field} />
                          </FormControl>

                          <FormMessage className="text-sm text-destructive" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`previousJobs.${index}.companyAddress`}
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-2">
                          <FormLabel className="text-foreground">Logradouro*</FormLabel>

                          <FormControl>
                            <Input className="!mt-auto" disabled={isPending} {...field} />
                          </FormControl>

                          <FormMessage className="text-sm text-destructive" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-6">
                    <FormField
                      control={form.control}
                      name={`previousJobs.${index}.companyCity`}
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-2">
                          <FormLabel className="text-foreground">Cidade*</FormLabel>

                          <FormControl>
                            <Input className="!mt-auto" disabled={isPending} {...field} />
                          </FormControl>

                          <FormMessage className="text-sm text-destructive" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`previousJobs.${index}.companyState`}
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-2">
                          <FormLabel className="text-foreground">Estado*</FormLabel>

                          <FormControl>
                            <Input className="!mt-auto" disabled={isPending} {...field} />
                          </FormControl>

                          <FormMessage className="text-sm text-destructive" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`previousJobs.${index}.companyCountry`}
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-2">
                          <FormLabel className="text-foreground">País*</FormLabel>

                          <FormControl>
                            <Input className="!mt-auto" disabled={isPending} {...field} />
                          </FormControl>

                          <FormMessage className="text-sm text-destructive" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-6">
                    <FormField
                      control={form.control}
                      name={`previousJobs.${index}.companyCep`}
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
                              onChange={(e) => handleCEPPreviousJobsChange(e, index)}
                              className="!mt-auto"
                            />
                          </FormControl>

                          <FormMessage className="text-sm text-destructive" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`previousJobs.${index}.companyTel`}
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-2">
                          <FormLabel className="text-foreground">Telefone</FormLabel>

                          <FormControl>
                            <Input disabled={isPending} placeholder="Insira seu telefone..." {...field} />
                          </FormControl>

                          <FormMessage className="text-sm text-destructive" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
                    <FormField
                      control={form.control}
                      name={`previousJobs.${index}.office`}
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-2">
                          <FormLabel className="text-foreground">Cargo / Função*</FormLabel>

                          <FormControl>
                            <Input className="!mt-auto" disabled={isPending} {...field} />
                          </FormControl>

                          <FormMessage className="text-sm text-destructive" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`previousJobs.${index}.supervisorName`}
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-2">
                          <FormLabel className="text-foreground">Nome completo do supervisor</FormLabel>

                          <FormControl>
                            <Input className="!mt-auto" disabled={isPending} {...field} />
                          </FormControl>

                          <FormMessage className="text-sm text-destructive" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
                    <FormField
                      control={form.control}
                      name={`previousJobs.${index}.admissionDate`}
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-2">
                          <FormLabel className="text-foreground">Data de admissão*</FormLabel>

                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  disabled={isPending}
                                  variant="date"
                                  className={cn("!mt-auto", !field.value && "text-muted-foreground")}
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
                                    <span className="text-muted-foreground">Selecione a data</span>
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
                                disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                                captionLayout="dropdown"
                                fromYear={1900}
                                toYear={currentYear}
                                classNames={{
                                  day_hidden: "invisible",
                                  dropdown: "px-2 py-1.5 bg-[#2E3675]/80 text-white text-sm focus-visible:outline-none",
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
                      name={`previousJobs.${index}.resignationDate`}
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-2">
                          <FormLabel className="text-foreground">Data de demissão*</FormLabel>

                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  disabled={isPending}
                                  variant="date"
                                  className={cn("!mt-auto", !field.value && "text-muted-foreground")}
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
                                    <span className="text-muted-foreground">Selecione a data</span>
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
                                disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                                captionLayout="dropdown"
                                fromYear={1900}
                                toYear={currentYear}
                                classNames={{
                                  day_hidden: "invisible",
                                  dropdown: "px-2 py-1.5 bg-[#2E3675]/80 text-white text-sm focus-visible:outline-none",
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
                    name={`previousJobs.${index}.jobDescription`}
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-2">
                        <FormLabel className="text-foreground">
                          Descreva brevemente as tarefas exercidas do seu cargo*
                        </FormLabel>

                        <FormControl>
                          <Textarea disabled={isPending} className="resize-none !mt-auto" {...field} />
                        </FormControl>

                        <FormMessage className="text-sm text-destructive" />
                      </FormItem>
                    )}
                  />

                  {index !== previousJobs.length - 1 && <Separator className="bg-white my-6" />}
                </div>
              ))}

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
            </div>

            <span className="text-foreground text-base font-medium mb-6">
              Informe pelo menos os dois últimos cursos concluídos. Caso não tenha ensino superior ou médio completo,
              informe o ensino básico.
            </span>

            <div className="w-full bg-secondary rounded-xl p-4 space-y-6">
              <div className="w-full flex flex-col gap-x-4 gap-y-6">
                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-6">
                  <FormField
                    control={form.control}
                    name={`courses.${currentCoursesIndex}.institutionName`}
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-2">
                        <FormLabel>Nome completo da instituição*</FormLabel>

                        <FormControl>
                          <Input className="!mt-auto" disabled={isPending} {...field} />
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
                          <Input className="!mt-auto" disabled={isPending} {...field} />
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
                        <FormLabel>Cidade*</FormLabel>

                        <FormControl>
                          <Input className="!mt-auto" disabled={isPending} {...field} />
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
                        <FormLabel>Estado*</FormLabel>

                        <FormControl>
                          <Input className="!mt-auto" disabled={isPending} {...field} />
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
                        <FormLabel>País*</FormLabel>

                        <FormControl>
                          <Input className="!mt-auto" disabled={isPending} {...field} />
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
                        <FormLabel>Nome do curso*</FormLabel>

                        <FormControl>
                          <Input className="!mt-auto" disabled={isPending} {...field} />
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
                        <FormLabel>Data de início*</FormLabel>

                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                disabled={isPending}
                                variant="date"
                                className={cn("!mt-auto", !field.value && "text-muted-foreground")}
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
                                  <span className="text-muted-foreground">Selecione a data</span>
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
                              disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                              captionLayout="dropdown"
                              fromYear={1900}
                              toYear={currentYear}
                              classNames={{
                                day_hidden: "invisible",
                                dropdown: "px-2 py-1.5 bg-[#2E3675]/80 text-white text-sm focus-visible:outline-none",
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
                        <FormLabel>Data de término*</FormLabel>

                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                disabled={isPending}
                                variant="date"
                                className={cn("!mt-auto", !field.value && "text-muted-foreground")}
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
                                  <span className="text-muted-foreground">Selecione a data</span>
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
                              disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                              captionLayout="dropdown"
                              fromYear={1900}
                              toYear={currentYear}
                              classNames={{
                                day_hidden: "invisible",
                                dropdown: "px-2 py-1.5 bg-[#2E3675]/80 text-white text-sm focus-visible:outline-none",
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

              {courses.length > 0 && (
                <div className="w-full flex flex-col sm:flex-row sm:flex-wrap gap-2">
                  {courses.map((item, index) => (
                    <div
                      key={`otherName-${index}`}
                      className={cn(
                        "w-full py-2 px-4 bg-primary/50 hover:bg-primary/75 rounded-xl flex items-center gap-2 group sm:w-fit",
                        {
                          "bg-primary hover:bg-primary": currentCoursesIndex === index,
                        }
                      )}
                    >
                      <div
                        onClick={() => setCurrentCoursesIndex(index)}
                        className="w-full flex flex-col items-center gap-2 cursor-pointer"
                      >
                        <span className="text-sm font-medium text-white">
                          Curso: {item.courseName ? item.courseName : "(A preencher)"}
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

          <div className="w-full flex flex-col-reverse items-center gap-4 sm:flex-row sm:justify-end">
            {isEditing ? (
              <>
                <Button
                  size="xl"
                  variant="outline"
                  type="button"
                  className="w-full flex items-center gap-2 sm:w-fit"
                  disabled={isPending || isSavePending}
                  onClick={() => router.push(`/resumo-formulario/${profileId}`)}
                >
                  Cancelar
                </Button>

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

                <Button
                  size="xl"
                  type="submit"
                  className="w-full flex items-center gap-2 sm:w-fit"
                  disabled={isPending || isSavePending}
                >
                  {isPending ? (
                    <>
                      Enviando
                      <Loader2 className="size-5 animate-spin" strokeWidth={1.5} />
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
