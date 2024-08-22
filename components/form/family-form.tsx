"use client";

import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import {
  Loader2,
  Plus,
  Trash,
  Calendar as CalendarIcon,
  Save,
  ArrowRight,
} from "lucide-react";
import { format, getYear } from "date-fns";
import { ptBR } from "date-fns/locale";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { FullForm, PrimaryFormControl } from "@/types";
import useFormStore from "@/constants/stores/useFormStore";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
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
});

interface Props {
  currentForm: FullForm;
}

export function FamilyForm({ currentForm }: Props) {
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const currentYear = getYear(new Date());
  const params = useParams();
  const {
    familyLivingInTheUSA,
    familyLivingInTheUSAIndex,
    familyLivingInTheUSAError,
    setFamilyLivingInTheUSA,
    setFamilyLivingInTheUSAError,
    setFamilyLivingInTheUSAIndex,
  } = useFormStore();

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
        ? currentForm.fatherLiveInTheUSAConfirmation === true
          ? "Sim"
          : "Não"
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
        ? currentForm.motherLiveInTheUSAConfirmation === true
          ? "Sim"
          : "Não"
        : "Não",
      motherUSASituation: currentForm.motherUSASituation
        ? currentForm.motherUSASituation
        : "",
      familyLivingInTheUSAConfirmation:
        currentForm.familyLivingInTheUSAConfirmation
          ? currentForm.familyLivingInTheUSAConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
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

  useEffect(() => {
    if (currentForm && currentForm.familyLivingInTheUSA.length > 0) {
      setFamilyLivingInTheUSA(currentForm.familyLivingInTheUSA);
      setFamilyLivingInTheUSAIndex(currentForm.familyLivingInTheUSA.length);
    }
  }, [currentForm, setFamilyLivingInTheUSA, setFamilyLivingInTheUSAIndex]);

  function handleFamilyLivingInTheUSAChange(
    value: string,
    property: "name" | "relation" | "situation",
    index: number,
  ) {
    if (!familyLivingInTheUSA) return;

    const arr = [...familyLivingInTheUSA];

    arr[index][property] = value;

    setFamilyLivingInTheUSA(arr);
  }

  function handleAddFamilyLivingInTheUSAInput() {
    if (!familyLivingInTheUSA) return;

    setIsFetching(true);

    axios
      .post("/api/form/family-living-in-the-usa/create", {
        familyLivingInTheUSA,
        formId: params.formId,
      })
      .then((res) => {
        setFamilyLivingInTheUSAIndex(familyLivingInTheUSAIndex + 1);
        setFamilyLivingInTheUSA(res.data.updatedFamilyLivingInTheUSA);
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response.data);
      })
      .finally(() => {
        setIsFetching(false);
      });
  }

  function handleRemoveFamilyLivingInTheUSAInput(id: string) {
    if (!familyLivingInTheUSA) return;

    setIsFetching(true);

    axios
      .put("/api/form/family-living-in-the-usa/delete", {
        familyLivingInTheUSAId: id,
        familyLivingInTheUSA,
        formId: params.formId,
      })
      .then((res) => {
        setFamilyLivingInTheUSAIndex(familyLivingInTheUSAIndex - 1);
        setFamilyLivingInTheUSA(res.data.updatedFamilyLivingInTheUSA);
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response.data);
      })
      .finally(() => {
        setIsFetching(false);
      });
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col flex-grow gap-6"
      >
        <h2 className="w-full text-center text-2xl sm:text-3xl text-foreground font-semibold mb-6">
          Informações da Família
        </h2>

        <div className="w-full flex flex-col gap-12 justify-between flex-grow">
          <div className="w-full flex flex-col gap-4">
            <span className="text-foreground text-base font-medium">
              Inserir todos os dados, mesmo se falecidos
            </span>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="fatherCompleteName"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-between">
                    <FormLabel className="text-foreground text-sm">
                      Nome completo do pai*
                    </FormLabel>

                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fatherBirthdate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Data de nascimento do pai*
                    </FormLabel>

                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full h-12 pl-3 text-left border-secondary font-normal group",
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

                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="fatherLiveInTheUSAConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Seu pai se encontra nos EUA?
                    </FormLabel>

                    <FormControl>
                      <RadioGroup
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

                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />

              {fatherLiveInTheUSAConfirmation === "Sim" && (
                <FormField
                  control={form.control}
                  name="fatherUSASituation"
                  render={({ field }) => (
                    <FormItem className="w-full bg-secondary p-4">
                      <FormLabel className="text-foreground text-sm">
                        Em qual situação? (trabalhando legalmente, passeando,
                        etc)
                      </FormLabel>

                      <FormControl>
                        <Input {...field} />
                      </FormControl>

                      <FormMessage className="text-sm text-red-500" />
                    </FormItem>
                  )}
                />
              )}
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="motherCompleteName"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-between">
                    <FormLabel className="text-foreground text-sm">
                      Nome completo da mãe*
                    </FormLabel>

                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="motherBirthdate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Data de nascimento da mãe*
                    </FormLabel>

                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full h-12 pl-3 text-left border-secondary font-normal group",
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

                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="motherLiveInTheUSAConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Sua mãe se encontra nos EUA?
                    </FormLabel>

                    <FormControl>
                      <RadioGroup
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

                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />

              {motherLiveInTheUSAConfirmation === "Sim" && (
                <FormField
                  control={form.control}
                  name="motherUSASituation"
                  render={({ field }) => (
                    <FormItem className="w-full bg-secondary p-4">
                      <FormLabel className="text-foreground text-sm">
                        Em qual situação? (trabalhando legalmente, passeando,
                        etc)
                      </FormLabel>

                      <FormControl>
                        <Input {...field} />
                      </FormControl>

                      <FormMessage className="text-sm text-red-500" />
                    </FormItem>
                  )}
                />
              )}
            </div>

            <div className="w-full grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="familyLivingInTheUSAConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Excluindo os pais, há alguém da sua família nos EUA?
                    </FormLabel>

                    <FormControl>
                      <RadioGroup
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

                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />

              {familyLivingInTheUSAConfirmation === "Sim" && (
                <div className="w-full  flex flex-col gap-8 mt-6">
                  <span className="text-foreground text-base font-medium">
                    Em caso afirmativo, informe:
                  </span>

                  <div className="w-full flex flex-col gap-6">
                    {familyLivingInTheUSA ? (
                      familyLivingInTheUSA.map((obj, index) => (
                        <div
                          key={obj.id}
                          className="w-full bg-secondary p-4 flex sm:items-end gap-4"
                        >
                          <div className="w-full grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-[auto_1fr] gap-4">
                            <div className="w-full flex flex-col gap-2 sm:h-fit">
                              <label className="text-sm text-foreground font-medium">
                                Nome
                              </label>

                              <Input
                                value={obj.name!}
                                onChange={(
                                  event: ChangeEvent<HTMLInputElement>,
                                ) =>
                                  handleFamilyLivingInTheUSAChange(
                                    event.target.value,
                                    "name",
                                    index,
                                  )
                                }
                              />
                            </div>

                            <div className="w-full flex flex-col gap-2 sm:h-fit">
                              <label className="text-sm text-foreground font-medium">
                                Parentesco
                              </label>

                              <Input
                                value={obj.relation!}
                                onChange={(
                                  event: ChangeEvent<HTMLInputElement>,
                                ) =>
                                  handleFamilyLivingInTheUSAChange(
                                    event.target.value,
                                    "relation",
                                    index,
                                  )
                                }
                              />
                            </div>

                            <div className="w-full flex flex-col gap-2 sm:col-span-2">
                              <label className="text-sm text-foreground font-medium">
                                Situação (cidadão americano, residente legal,
                                não imigrante, etc...)
                              </label>

                              <Textarea
                                className="resize-none"
                                value={obj.situation!}
                                onChange={(
                                  event: ChangeEvent<HTMLTextAreaElement>,
                                ) =>
                                  handleFamilyLivingInTheUSAChange(
                                    event.target.value,
                                    "situation",
                                    index,
                                  )
                                }
                              />
                            </div>
                          </div>

                          {index === familyLivingInTheUSAIndex - 1 ? (
                            <Button
                              type="button"
                              size="xl"
                              className="px-3"
                              disabled={
                                obj.name === "" ||
                                obj.relation === "" ||
                                obj.situation === "" ||
                                isFetching
                              }
                              onClick={handleAddFamilyLivingInTheUSAInput}
                            >
                              {isFetching ? (
                                <Loader2 className="animate-spin" />
                              ) : (
                                <Plus />
                              )}
                            </Button>
                          ) : (
                            <Button
                              type="button"
                              size="xl"
                              className="px-3"
                              onClick={() =>
                                handleRemoveFamilyLivingInTheUSAInput(obj.id)
                              }
                              disabled={isFetching}
                            >
                              {isFetching ? (
                                <Loader2 className="animate-spin" />
                              ) : (
                                <Trash />
                              )}
                            </Button>
                          )}
                        </div>
                      ))
                    ) : (
                      <div>Loading...</div>
                    )}
                  </div>

                  {familyLivingInTheUSAError.length > 0 && (
                    <span className="text-sm text-red-500">
                      {familyLivingInTheUSAError}
                    </span>
                  )}
                </div>
              )}
            </div>

            <span className="text-foreground text-base font-medium">
              Dados do cônjuge, parceiro doméstico ou ex-cônjuge
            </span>

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="partnerCompleteName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground text-sm">
                      Nome completo
                    </FormLabel>

                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="partnerBirthdate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground text-sm">
                      Data de nascimento
                    </FormLabel>

                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full h-12 pl-3 text-left border-secondary font-normal group",
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

                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="partnerNationality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground text-sm">
                      Nacionalidade
                    </FormLabel>

                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="partnerCity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground text-sm">
                      Cidade de nascimento
                    </FormLabel>

                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="partnerState"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground text-sm">
                      Estado de nascimento
                    </FormLabel>

                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="partnerCountry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground text-sm">
                      País de nascimento
                    </FormLabel>

                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            <span className="text-foreground text-base font-medium">
              Se separado(a) ou divorciado(a)
            </span>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="unionDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground text-sm">
                      Data da união
                    </FormLabel>

                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full h-12 pl-3 text-left border-secondary font-normal group",
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

                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="divorceDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground text-sm">
                      Data da separação
                    </FormLabel>

                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full h-12 pl-3 text-left border-secondary font-normal group",
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

                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="w-full flex flex-col-reverse items-center gap-4 sm:flex-row sm:justify-end">
            <Button
              size="xl"
              variant="outline"
              type="button"
              className="w-full flex items-center gap-2 sm:w-fit"
            >
              Salvar
              <Save className="size-5" strokeWidth={1.5} />
            </Button>

            <Button
              size="xl"
              // disabled={isSubmitting || isSaving}
              type="submit"
              className="w-full flex items-center gap-2 sm:w-fit"
            >
              Enviar{" "}
              {false ? (
                <Loader2 className="animate-spin" />
              ) : (
                <ArrowRight className="hidden" />
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
