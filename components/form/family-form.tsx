"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Loader2,
  Plus,
  Calendar as CalendarIcon,
  Save,
  ArrowRight,
  X,
} from "lucide-react";
import { format, getYear, differenceInYears } from "date-fns";
import { ptBR } from "date-fns/locale";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form as FormType, Profile } from "@prisma/client";

import { Button } from "@/components/ui/button";
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
} from "../ui/select";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import useFormStore from "@/constants/stores/useFormStore";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc-client";

const formSchema = z
  .object({
    fatherCompleteName: z.string(),
    fatherBirthdate: z.date({ message: "Campo obrigatório" }).optional(),
    fatherLiveInTheUSAConfirmation: z.enum(["Sim", "Não"]),
    fatherUSASituation: z.string(),
    motherCompleteName: z.string().min(1, { message: "Campo obrigatório" }),
    motherBirthdate: z.date({ message: "Campo obrigatório" }).optional(),
    motherLiveInTheUSAConfirmation: z.enum(["Sim", "Não"]),
    motherUSASituation: z.string(),
    familyLivingInTheUSAConfirmation: z.enum(["Sim", "Não"]),
    familyLivingInTheUSA: z.array(
      z.object({
        name: z.string(),
        relation: z.string(),
        situation: z.string(),
      }),
    ),
    partnerCompleteName: z.string(),
    partnerBirthdate: z.date({ message: "Campo obrigatório" }).optional(),
    partnerNationality: z.string(),
    partnerCity: z.string(),
    partnerState: z.string(),
    partnerCountry: z.string(),
    unionDate: z.date({ message: "Campo obrigatório" }).optional(),
    divorceDate: z.date({ message: "Campo obrigatório" }).optional(),
  })
  .superRefine(
    (
      {
        familyLivingInTheUSAConfirmation,
        familyLivingInTheUSA,
        fatherLiveInTheUSAConfirmation,
        fatherUSASituation,
        motherLiveInTheUSAConfirmation,
        motherUSASituation,
      },
      ctx,
    ) => {
      if (
        fatherLiveInTheUSAConfirmation === "Sim" &&
        fatherUSASituation.length === 0
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Campo vazio, preencha para prosseguir",
          path: ["fatherUSASituation"],
        });
      }

      if (
        motherLiveInTheUSAConfirmation === "Sim" &&
        motherUSASituation.length === 0
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Campo vazio, preencha para prosseguir",
          path: ["motherUSASituation"],
        });
      }

      if (
        familyLivingInTheUSAConfirmation === "Sim" &&
        familyLivingInTheUSA.length === 1 &&
        familyLivingInTheUSA.filter((item) => item.name === "").length === 1
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Campo vazio, preencha para prosseguir",
          path: [
            `familyLivingInTheUSA.${familyLivingInTheUSA.length - 1}.name`,
          ],
        });
      }

      if (
        familyLivingInTheUSAConfirmation === "Sim" &&
        familyLivingInTheUSA.length === 1 &&
        familyLivingInTheUSA.filter((item) => item.relation === "").length === 1
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Campo vazio, preencha para prosseguir",
          path: [
            `familyLivingInTheUSA.${familyLivingInTheUSA.length - 1}.relation`,
          ],
        });
      }

      if (
        familyLivingInTheUSAConfirmation === "Sim" &&
        familyLivingInTheUSA.length === 1 &&
        familyLivingInTheUSA.filter((item) => item.situation === "").length ===
          1
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Campo vazio, preencha para prosseguir",
          path: [
            `familyLivingInTheUSA.${familyLivingInTheUSA.length - 1}.situation`,
          ],
        });
      }
    },
  );

interface Props {
  profileId: string;
  currentForm: FormType;
  isEditing: boolean;
  profile: Profile;
}

export function FamilyForm({
  currentForm,
  profileId,
  isEditing,
  profile,
}: Props) {
  const [currentFamilyIndex, setCurrentFamilyIndex] = useState<number>(
    currentForm.familyLivingInTheUSA.length || 0,
  );
  const [familyLivingInTheUSAItems, setFamilyLivingInTheUSAItems] = useState<
    { name: string; relation: string; situation: string }[]
  >([]);
  const [resetFamilyFields, setResetFamilyFields] = useState<boolean>(false);

  const currentYear = getYear(new Date());
  const { redirectStep, setRedirectStep } = useFormStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fatherCompleteName: currentForm.fatherCompleteName
        ? currentForm.fatherCompleteName
        : "",
      fatherBirthdate: currentForm.fatherBirthdate
        ? currentForm.fatherBirthdate
        : undefined,
      fatherLiveInTheUSAConfirmation: currentForm.fatherLiveInTheUSAConfirmation
        ? "Sim"
        : "Não",
      fatherUSASituation: currentForm.fatherUSASituation
        ? currentForm.fatherUSASituation
        : "",
      motherCompleteName: currentForm.motherCompleteName
        ? currentForm.motherCompleteName
        : "",
      motherBirthdate: currentForm.motherBirthdate
        ? currentForm.motherBirthdate
        : undefined,
      motherLiveInTheUSAConfirmation: currentForm.motherLiveInTheUSAConfirmation
        ? "Sim"
        : "Não",
      motherUSASituation: currentForm.motherUSASituation
        ? currentForm.motherUSASituation
        : "",
      familyLivingInTheUSAConfirmation:
        currentForm.familyLivingInTheUSAConfirmation ? "Sim" : "Não",
      familyLivingInTheUSA:
        currentForm.familyLivingInTheUSA.length > 0
          ? [
              ...currentForm.familyLivingInTheUSA,
              { name: "", relation: "", situation: "" },
            ]
          : [{ name: "", relation: "", situation: "" }],
      partnerCompleteName: currentForm.partnerCompleteName
        ? currentForm.partnerCompleteName
        : "",
      partnerBirthdate: currentForm.partnerBirthdate
        ? currentForm.partnerBirthdate
        : undefined,
      partnerNationality: currentForm.partnerNationality
        ? currentForm.partnerNationality
        : "",
      partnerCity: currentForm.partnerCity ? currentForm.partnerCity : "",
      partnerState: currentForm.partnerState ? currentForm.partnerState : "",
      partnerCountry: currentForm.partnerCountry
        ? currentForm.partnerCountry
        : "",
      unionDate: currentForm.unionDate ? currentForm.unionDate : undefined,
      divorceDate: currentForm.divorceDate
        ? currentForm.divorceDate
        : undefined,
    },
  });

  const fatherLiveInTheUSAConfirmation = form.watch(
    "fatherLiveInTheUSAConfirmation",
  );
  const motherLiveInTheUSAConfirmation = form.watch(
    "motherLiveInTheUSAConfirmation",
  );
  const familyLivingInTheUSAConfirmation = form.watch(
    "familyLivingInTheUSAConfirmation",
  );
  const familyLivingInTheUSA = form.watch("familyLivingInTheUSA");
  const utils = trpc.useUtils();
  const router = useRouter();
  const maritalStatus = currentForm.maritalStatus;
  const isMinor = profile.birthDate
    ? differenceInYears(new Date(), profile.birthDate) < 14
    : false;

  const { mutate: submitFamily, isPending } =
    trpc.formsRouter.submitFamily.useMutation({
      onSuccess: (data) => {
        toast.success(data.message);
        utils.formsRouter.getForm.invalidate();

        if (data.isEditing) {
          router.push(`/resumo-formulario/${profileId}`);
        } else {
          if (isMinor) {
            router.push(`/formulario/${profileId}?formStep=9`);
          } else {
            router.push(`/formulario/${profileId}?formStep=8`);
          }
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
  const { mutate: saveFamily, isPending: isSavePending } =
    trpc.formsRouter.saveFamily.useMutation({
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
    if (currentForm.familyLivingInTheUSA.length > 0) {
      setCurrentFamilyIndex(currentForm.familyLivingInTheUSA.length);

      const familyFiltered = currentForm.familyLivingInTheUSA.filter(
        (item) =>
          (item.name !== "" && item.relation !== "") || item.situation !== "",
      );

      setFamilyLivingInTheUSAItems(familyFiltered);
    }
  }, [currentForm]);

  useEffect(() => {
    if (resetFamilyFields) {
      form.setValue(`familyLivingInTheUSA.${currentFamilyIndex}.name`, "");
      form.setValue(`familyLivingInTheUSA.${currentFamilyIndex}.relation`, "");
      form.setValue(`familyLivingInTheUSA.${currentFamilyIndex}.situation`, "");

      setResetFamilyFields(false);
    }
  }, [resetFamilyFields]);

  useEffect(() => {
    if (redirectStep !== null) {
      const values = form.getValues();

      saveFamily({
        profileId,
        redirectStep,
        fatherCompleteName:
          values.fatherCompleteName !== ""
            ? values.fatherCompleteName
            : !currentForm.fatherCompleteName
              ? ""
              : currentForm.fatherCompleteName,
        fatherBirthdate: values.fatherBirthdate ?? currentForm.fatherBirthdate,
        fatherLiveInTheUSAConfirmation:
          values.fatherLiveInTheUSAConfirmation ??
          (currentForm.fatherLiveInTheUSAConfirmation ? "Sim" : "Não"),
        fatherUSASituation:
          values.fatherUSASituation !== ""
            ? values.fatherUSASituation
            : !currentForm.fatherUSASituation
              ? ""
              : currentForm.fatherUSASituation,
        motherCompleteName:
          values.motherCompleteName !== ""
            ? values.motherCompleteName
            : !currentForm.motherCompleteName
              ? ""
              : currentForm.motherCompleteName,
        motherBirthdate: values.motherBirthdate ?? currentForm.motherBirthdate,
        motherLiveInTheUSAConfirmation:
          values.motherLiveInTheUSAConfirmation ??
          (currentForm.motherLiveInTheUSAConfirmation ? "Sim" : "Não"),
        motherUSASituation:
          values.motherUSASituation !== ""
            ? values.motherUSASituation
            : !currentForm.motherUSASituation
              ? ""
              : currentForm.motherUSASituation,
        familyLivingInTheUSAConfirmation:
          values.familyLivingInTheUSAConfirmation ??
          (currentForm.familyLivingInTheUSAConfirmation ? "Sim" : "Não"),
        familyLivingInTheUSA:
          familyLivingInTheUSAItems.length > 0
            ? familyLivingInTheUSAItems
            : currentForm.familyLivingInTheUSA,
        partnerCompleteName:
          values.partnerCompleteName !== ""
            ? values.partnerCompleteName
            : !currentForm.partnerCompleteName
              ? ""
              : currentForm.partnerCompleteName,
        partnerBirthdate:
          values.partnerBirthdate ?? currentForm.partnerBirthdate,
        partnerNationality:
          values.partnerNationality !== ""
            ? values.partnerNationality
            : !currentForm.partnerNationality
              ? ""
              : currentForm.partnerNationality,
        partnerCity:
          values.partnerCity !== ""
            ? values.partnerCity
            : !currentForm.partnerCity
              ? ""
              : currentForm.partnerCity,
        partnerState:
          values.partnerState !== ""
            ? values.partnerState
            : !currentForm.partnerState
              ? ""
              : currentForm.partnerState,
        partnerCountry:
          values.partnerCountry !== ""
            ? values.partnerCountry
            : !currentForm.partnerCountry
              ? ""
              : currentForm.partnerCountry,
        unionDate: values.unionDate ?? currentForm.unionDate,
        divorceDate: values.divorceDate ?? currentForm.divorceDate,
      });
      setRedirectStep(null);
    }
  }, [redirectStep, setRedirectStep, saveFamily, profileId]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (isMinor) {
      submitFamily({
        ...values,
        familyLivingInTheUSA: familyLivingInTheUSAItems,
        profileId,
        step: 9,
        isEditing,
      });
    } else {
      submitFamily({
        ...values,
        familyLivingInTheUSA: familyLivingInTheUSAItems,
        profileId,
        step: 8,
        isEditing,
      });
    }
  }

  function onSave() {
    const values = form.getValues();

    saveFamily({
      profileId,
      fatherCompleteName:
        values.fatherCompleteName !== ""
          ? values.fatherCompleteName
          : !currentForm.fatherCompleteName
            ? ""
            : currentForm.fatherCompleteName,
      fatherBirthdate: values.fatherBirthdate ?? currentForm.fatherBirthdate,
      fatherLiveInTheUSAConfirmation:
        values.fatherLiveInTheUSAConfirmation ??
        (currentForm.fatherLiveInTheUSAConfirmation ? "Sim" : "Não"),
      fatherUSASituation:
        values.fatherUSASituation !== ""
          ? values.fatherUSASituation
          : !currentForm.fatherUSASituation
            ? ""
            : currentForm.fatherUSASituation,
      motherCompleteName:
        values.motherCompleteName !== ""
          ? values.motherCompleteName
          : !currentForm.motherCompleteName
            ? ""
            : currentForm.motherCompleteName,
      motherBirthdate: values.motherBirthdate ?? currentForm.motherBirthdate,
      motherLiveInTheUSAConfirmation:
        values.motherLiveInTheUSAConfirmation ??
        (currentForm.motherLiveInTheUSAConfirmation ? "Sim" : "Não"),
      motherUSASituation:
        values.motherUSASituation !== ""
          ? values.motherUSASituation
          : !currentForm.motherUSASituation
            ? ""
            : currentForm.motherUSASituation,
      familyLivingInTheUSAConfirmation:
        values.familyLivingInTheUSAConfirmation ??
        (currentForm.familyLivingInTheUSAConfirmation ? "Sim" : "Não"),
      familyLivingInTheUSA:
        familyLivingInTheUSAItems.length > 0
          ? familyLivingInTheUSAItems
          : currentForm.familyLivingInTheUSA,
      partnerCompleteName:
        values.partnerCompleteName !== ""
          ? values.partnerCompleteName
          : !currentForm.partnerCompleteName
            ? ""
            : currentForm.partnerCompleteName,
      partnerBirthdate: values.partnerBirthdate ?? currentForm.partnerBirthdate,
      partnerNationality:
        values.partnerNationality !== ""
          ? values.partnerNationality
          : !currentForm.partnerNationality
            ? ""
            : currentForm.partnerNationality,
      partnerCity:
        values.partnerCity !== ""
          ? values.partnerCity
          : !currentForm.partnerCity
            ? ""
            : currentForm.partnerCity,
      partnerState:
        values.partnerState !== ""
          ? values.partnerState
          : !currentForm.partnerState
            ? ""
            : currentForm.partnerState,
      partnerCountry:
        values.partnerCountry !== ""
          ? values.partnerCountry
          : !currentForm.partnerCountry
            ? ""
            : currentForm.partnerCountry,
      unionDate: values.unionDate ?? currentForm.unionDate,
      divorceDate: values.divorceDate ?? currentForm.divorceDate,
    });
  }

  function addFamily() {
    form
      .trigger([
        `familyLivingInTheUSA.${currentFamilyIndex}.name`,
        `familyLivingInTheUSA.${currentFamilyIndex}.relation`,
        `familyLivingInTheUSA.${currentFamilyIndex}.situation`,
      ])
      .then(() => {
        if (Object.keys(form.formState.errors).length === 0) {
          form.setValue("familyLivingInTheUSA", [
            ...familyLivingInTheUSA,
            {
              name: "",
              relation: "",
              situation: "",
            },
          ]);

          const familyFiltered = familyLivingInTheUSA.filter(
            (item) =>
              item.name !== "" || item.relation !== "" || item.situation !== "",
          );

          setCurrentFamilyIndex((prev) => prev + 1);
          setFamilyLivingInTheUSAItems(familyFiltered);
          setResetFamilyFields(true);
        }
      });
  }

  function removeFamily(index: number) {
    const newArr = familyLivingInTheUSA.filter((_, i) => i !== index);

    form.setValue("familyLivingInTheUSA", newArr);

    const familyFiltered = newArr.filter(
      (item) =>
        item.name !== "" && item.relation !== "" && item.situation !== "",
    );

    setCurrentFamilyIndex((prev) => prev - 1);
    setFamilyLivingInTheUSAItems(familyFiltered);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col flex-grow gap-6"
      >
        <h2 className="w-full text-center text-2xl sm:text-3xl text-foreground font-semibold mb-6">
          Informações Familiares
        </h2>

        <div className="w-full flex flex-col gap-12 justify-between flex-grow">
          <div className="w-full flex flex-col">
            <span className="text-foreground text-base font-medium mb-6">
              Inserir todos os dados, mesmo se falecidos
            </span>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 mb-6">
              <FormField
                control={form.control}
                name="fatherCompleteName"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">
                      Nome completo do pai
                    </FormLabel>

                    <FormControl>
                      <Input
                        className="!mt-auto"
                        disabled={isPending || isSavePending}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fatherBirthdate"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">
                      Data de nascimento do pai
                    </FormLabel>

                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            disabled={isPending || isSavePending}
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
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 mb-6">
              <FormField
                control={form.control}
                name="fatherLiveInTheUSAConfirmation"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">
                      Seu pai se encontra nos EUA?
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

              <FormField
                control={form.control}
                name="fatherUSASituation"
                render={({ field }) => (
                  <FormItem
                    className={cn(
                      "w-full bg-secondary rounded-xl p-4 flex flex-col gap-2",
                      fatherLiveInTheUSAConfirmation === "Não" && "hidden",
                    )}
                  >
                    <FormLabel className="text-foreground">
                      Em qual situação? (trabalhando legalmente, passeando, etc)
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
                        <SelectItem value="Cidadão Dos EUA">
                          Cidadão Dos EUA
                        </SelectItem>

                        <SelectItem value="Residente Permanente Legal Dos EUA">
                          Residente Permanente Legal Dos EUA
                        </SelectItem>

                        <SelectItem value="Não Imigrante">
                          Não Imigrante
                        </SelectItem>

                        <SelectItem value="Outro/Não Sei">
                          Outro/Não Sei
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 mb-6">
              <FormField
                control={form.control}
                name="motherCompleteName"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">
                      Nome completo da mãe*
                    </FormLabel>

                    <FormControl>
                      <Input
                        className="!mt-auto"
                        disabled={isPending || isSavePending}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="motherBirthdate"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">
                      Data de nascimento da mãe
                    </FormLabel>

                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            disabled={isPending || isSavePending}
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
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 mb-6">
              <FormField
                control={form.control}
                name="motherLiveInTheUSAConfirmation"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">
                      Sua mãe se encontra nos EUA?
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

              <FormField
                control={form.control}
                name="motherUSASituation"
                render={({ field }) => (
                  <FormItem
                    className={cn(
                      "w-full bg-secondary rounded-xl p-4 flex flex-col gap-2",
                      motherLiveInTheUSAConfirmation === "Não" && "hidden",
                    )}
                  >
                    <FormLabel className="text-foreground">
                      Em qual situação? (trabalhando legalmente, passeando, etc)
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
                        <SelectItem value="Cidadão Dos EUA">
                          Cidadão Dos EUA
                        </SelectItem>

                        <SelectItem value="Residente Permanente Legal Dos EUA">
                          Residente Permanente Legal Dos EUA
                        </SelectItem>

                        <SelectItem value="Não Imigrante">
                          Não Imigrante
                        </SelectItem>

                        <SelectItem value="Outro/Não Sei">
                          Outro/Não Sei
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full grid grid-cols-1 gap-x-4 gap-y-6 mb-10">
              <FormField
                control={form.control}
                name="familyLivingInTheUSAConfirmation"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">
                      Excluindo os pais, há alguém da sua família nos EUA?
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

              <div
                className={cn(
                  "w-full bg-secondary rounded-xl p-4 space-y-6",
                  familyLivingInTheUSAConfirmation === "Não" && "hidden",
                )}
              >
                <span className="text-foreground text-base font-medium">
                  Em caso afirmativo, informe:
                </span>

                <div className="w-full flex flex-col gap-4">
                  <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`familyLivingInTheUSA.${currentFamilyIndex}.name`}
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-2">
                          <FormLabel className="text-foreground">
                            Nome
                          </FormLabel>

                          <FormControl>
                            <Input
                              className="!mt-auto"
                              disabled={isPending || isSavePending}
                              {...field}
                            />
                          </FormControl>

                          <FormMessage className="text-sm text-destructive" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`familyLivingInTheUSA.${currentFamilyIndex}.relation`}
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-2">
                          <FormLabel className="text-foreground">
                            Relação Parental
                          </FormLabel>

                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger
                                className="!mt-auto"
                                disabled={isPending || isSavePending}
                              >
                                <SelectValue placeholder="Selecione a relação parental" />
                              </SelectTrigger>
                            </FormControl>

                            <SelectContent>
                              <SelectItem value="Pai/Mãe">Pai/Mãe</SelectItem>

                              <SelectItem value="Filho(a)">Filho(a)</SelectItem>

                              <SelectItem value="Amigo(a)">Amigo(a)</SelectItem>

                              <SelectItem value="Parente">Parente</SelectItem>
                            </SelectContent>
                          </Select>

                          <FormMessage className="text-sm text-destructive" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name={`familyLivingInTheUSA.${currentFamilyIndex}.situation`}
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-2">
                        <FormLabel className="text-foreground">
                          Situação
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
                            <SelectItem value="Cidadão Dos EUA">
                              Cidadão Dos EUA
                            </SelectItem>

                            <SelectItem value="Residente Permanente Legal Dos EUA">
                              Residente Permanente Legal Dos EUA
                            </SelectItem>

                            <SelectItem value="Não Imigrante">
                              Não Imigrante
                            </SelectItem>

                            <SelectItem value="Outro/Não Sei">
                              Outro/Não Sei
                            </SelectItem>
                          </SelectContent>
                        </Select>

                        <FormMessage className="text-sm text-destructive" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="w-full lg:flex">
                  <Button
                    type="button"
                    size="xl"
                    className="px-3 w-full flex items-center gap-2 lg:w-fit"
                    disabled={isPending || isSavePending}
                    onClick={addFamily}
                  >
                    Adicionar
                    <Plus />
                  </Button>
                </div>

                {familyLivingInTheUSAItems.length > 0 && (
                  <div className="w-full flex flex-col sm:flex-row sm:flex-wrap gap-2">
                    {familyLivingInTheUSAItems.map((item, index) => (
                      <div
                        key={`otherName-${index}`}
                        className="w-full py-2 px-4 bg-primary/50 rounded-xl flex items-center gap-2 group sm:w-fit"
                      >
                        <div className="w-full flex flex-col items-center gap-2">
                          <span className="text-sm font-medium text-white">
                            Nome: {item.name}
                          </span>

                          <div className="w-full h-px bg-primary" />

                          <span className="text-sm font-medium text-white">
                            Relação: {item.relation}
                          </span>
                        </div>

                        <Button
                          type="button"
                          variant="link"
                          size="icon"
                          className="size-5 hidden opacity-0 transition-all group-hover:block group-hover:opacity-100"
                          disabled={isPending || isSavePending}
                          onClick={() => removeFamily(index)}
                        >
                          <X strokeWidth={1} size={20} />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <span
              className={cn("text-foreground text-base font-medium mb-6", {
                hidden:
                  maritalStatus === "Solteiro(a)" ||
                  maritalStatus === "Divorciado(a)",
              })}
            >
              {maritalStatus === "Divorciado(a)" ||
              maritalStatus === "Separado(a)" ? (
                <>Dados do ex-cônjuge</>
              ) : maritalStatus === "Viúvo(a)" ? (
                <>Dados do cônjuge falecido</>
              ) : maritalStatus === "Casado(a)" ||
                maritalStatus === "União Estavel" ||
                maritalStatus === "Parceiro(a) Doméstico(a)" ? (
                <>Dados do cônjuge</>
              ) : null}
            </span>

            <div
              className={cn(
                "w-full grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-6 mb-6",
                {
                  hidden: maritalStatus === "Solteiro(a)",
                },
              )}
            >
              <FormField
                control={form.control}
                name="partnerCompleteName"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">
                      Nome completo
                    </FormLabel>

                    <FormControl>
                      <Input disabled={isPending || isSavePending} {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="partnerBirthdate"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">
                      Data de nascimento
                    </FormLabel>

                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            disabled={isPending || isSavePending}
                            variant="date"
                            className={cn(
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
                name="partnerNationality"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">
                      Nacionalidade
                    </FormLabel>

                    <FormControl>
                      <Input disabled={isPending || isSavePending} {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />
            </div>

            <div
              className={cn(
                "w-full grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-6 mb-10",
                {
                  hidden: maritalStatus === "Solteiro(a)",
                },
              )}
            >
              <FormField
                control={form.control}
                name="partnerCity"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">
                      Cidade de nascimento
                    </FormLabel>

                    <FormControl>
                      <Input disabled={isPending || isSavePending} {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="partnerState"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">
                      Estado de nascimento
                    </FormLabel>

                    <FormControl>
                      <Input disabled={isPending || isSavePending} {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="partnerCountry"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">
                      País de nascimento
                    </FormLabel>

                    <FormControl>
                      <Input disabled={isPending || isSavePending} {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />
            </div>

            <span
              className={cn("text-foreground text-base font-medium mb-6", {
                hidden:
                  maritalStatus === "Solteiro(a)" ||
                  maritalStatus === "Casado(a)" ||
                  maritalStatus === "Viúvo(a)" ||
                  maritalStatus === "União Estavel" ||
                  maritalStatus === "Parceiro(a) Doméstico(a)",
              })}
            >
              Se separado(a) ou divorciado(a)
            </span>

            <div
              className={cn(
                "w-full grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6",
                {
                  hidden:
                    maritalStatus === "Solteiro(a)" ||
                    maritalStatus === "Casado(a)" ||
                    maritalStatus === "Viúvo(a)" ||
                    maritalStatus === "União Estavel" ||
                    maritalStatus === "Parceiro(a) Doméstico(a)",
                },
              )}
            >
              <FormField
                control={form.control}
                name="unionDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">
                      Data da união
                    </FormLabel>

                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            disabled={isPending || isSavePending}
                            variant="date"
                            className={cn(
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
                name="divorceDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-foreground">
                      Data da separação
                    </FormLabel>

                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            disabled={isPending || isSavePending}
                            variant="date"
                            className={cn(
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
            </div>
          </div>

          <div className="w-full flex flex-col-reverse items-center gap-4 sm:flex-row sm:justify-end">
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
                      Enviar
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
