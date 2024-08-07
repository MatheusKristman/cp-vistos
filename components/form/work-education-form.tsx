"use client";

import { Control } from "react-hook-form";
import { Loader2, Plus, Trash } from "lucide-react";
import { format, getYear } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { Element } from "react-scroll";
import PhoneInput from "react-phone-number-input";
import { ChangeEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import {
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { PrimaryFormControl } from "@/types";
import useFormStore from "@/constants/stores/useFormStore";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { toast } from "sonner";
import { useParams } from "next/navigation";

interface Props {
  formControl: Control<PrimaryFormControl>;
  occupation: string;
  previousJobConfirmation: "Sim" | "Não";
  handleCEPWorkEducationChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function WorkEducationForm({
  formControl,
  occupation,
  previousJobConfirmation,
  handleCEPWorkEducationChange,
}: Props) {
  const [isPreviousJobsFetching, setIsPreviousJobsFetching] =
    useState<boolean>(false);
  const [isCoursesFetching, setIsCoursesFetching] = useState<boolean>(false);

  const currentYear = getYear(new Date());
  const params = useParams();
  const {
    previousJobs,
    setPreviousJobs,
    previousJobsIndex,
    setPreviousJobsIndex,
    courses,
    setCourses,
    coursesIndex,
    setCoursesIndex,
    coursesError,
    setCoursesError,
  } = useFormStore();

  function handlePreviousJobsChangeString(
    value: string,
    property:
      | "companyAddress"
      | "companyCep"
      | "companyCity"
      | "companyCountry"
      | "companyName"
      | "companyState"
      | "companyTel"
      | "jobDescription"
      | "office"
      | "supervisorName",
    index: number,
  ) {
    if (!previousJobs) return;

    const arr = [...previousJobs];

    if (property === "companyCep") {
      let formattedValue = value.replace(/[^\d]/g, "");

      formattedValue = formattedValue.replace(/(\d{5})(\d{3})/, "$1-$2");

      arr[index][property] = formattedValue;
    } else {
      arr[index][property] = value;
    }

    setPreviousJobs(arr);
  }

  function handlePreviousJobsChangeDate(
    value: Date,
    property: "admissionDate" | "resignationDate",
    index: number,
  ) {
    if (!previousJobs) return;

    const arr = [...previousJobs];

    arr[index][property] = value;

    setPreviousJobs(arr);
  }

  function handleAddPreviousJobsInput() {
    if (!previousJobs) return;

    setIsPreviousJobsFetching(true);

    axios
      .post("/api/form/previous-jobs/create", {
        previousJobs,
        formId: params.formId,
      })
      .then((res) => {
        setPreviousJobsIndex(previousJobsIndex + 1);
        setPreviousJobs(res.data.updatedPreviousJobs);
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response.data);
      })
      .finally(() => {
        setIsPreviousJobsFetching(false);
      });
  }

  function handleRemovePreviousJobsInput(id: string) {
    if (!previousJobs) return;

    setIsPreviousJobsFetching(true);

    axios
      .put("/api/form/previous-jobs/delete", {
        previousJobsId: id,
        previousJobs,
        formId: params.formId,
      })
      .then((res) => {
        setPreviousJobsIndex(previousJobsIndex - 1);
        setPreviousJobs(res.data.updatedPreviousJobs);
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response.data);
      })
      .finally(() => {
        setIsPreviousJobsFetching(false);
      });
  }

  function handleCoursesChangeString(
    value: string,
    property:
      | "address"
      | "cep"
      | "city"
      | "country"
      | "courseName"
      | "institutionName"
      | "state",
    index: number,
  ) {
    if (!courses) return;

    const arr = [...courses];

    if (property === "cep") {
      let formattedValue = value.replace(/[^\d]/g, "");

      formattedValue = formattedValue.replace(/(\d{5})(\d{3})/, "$1-$2");

      arr[index][property] = formattedValue;
    } else {
      arr[index][property] = value;
    }

    setCourses(arr);
  }

  function handleCourseChangeDate(
    value: Date,
    property: "initialDate" | "finishDate",
    index: number,
  ) {
    if (!courses) return;

    const arr = [...courses];

    arr[index][property] = value;

    setCourses(arr);
  }

  function handleAddCoursesInput() {
    if (!courses) return;

    setIsCoursesFetching(true);

    axios
      .post("/api/form/courses/create", {
        courses,
        formId: params.formId,
      })
      .then((res) => {
        setCoursesIndex(coursesIndex + 1);
        setCourses(res.data.updatedCourses);
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response.data);
      })
      .finally(() => {
        setIsCoursesFetching(false);
      });
  }

  function handleRemoveCoursesInput(id: string) {
    if (!courses) return;

    setIsCoursesFetching(true);

    axios
      .put("/api/form/courses/delete", {
        coursesId: id,
        courses,
        formId: params.formId,
      })
      .then((res) => {
        setCoursesIndex(coursesIndex - 1);
        setCourses(res.data.updatedCourses);
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response.data);
      })
      .finally(() => {
        setIsCoursesFetching(false);
      });
  }

  return (
    <Element name="work-education" className="w-full flex flex-col gap-6">
      <h2 className="w-full text-center text-2xl sm:text-3xl text-foreground font-semibold my-12">
        Trabalho e Educação
      </h2>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          control={formControl}
          name="occupation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">
                Selecione a sua ocupação atual?*
              </FormLabel>

              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
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

                  <SelectItem value="Não Trabalho">Não Trabalho</SelectItem>

                  <SelectItem value="Aposentado">Aposentado</SelectItem>

                  <SelectItem value="Outro">Outro</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          control={formControl}
          name="office"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground text-sm">
                Cargo / Função
              </FormLabel>

              <FormControl>
                <Input
                  disabled={
                    occupation === "Não Trabalho" ||
                    occupation === "Aposentado" ||
                    occupation === "Empresário/Proprietário"
                  }
                  {...field}
                />
              </FormControl>

              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={formControl}
          name="companyOrBossName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground text-sm">
                {occupation === "Empresário/Proprietário"
                  ? "Nome fantasia ou razão social"
                  : "Nome do empregador atual ou empresa"}
              </FormLabel>

              <FormControl>
                <Input
                  disabled={
                    occupation === "Aposentado" || occupation === "Não Trabalho"
                  }
                  {...field}
                />
              </FormControl>

              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
        <FormField
          control={formControl}
          name="companyAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground text-sm">
                Endereço completo
              </FormLabel>

              <FormControl>
                <Input
                  disabled={
                    occupation === "Não Trabalho" || occupation === "Aposentado"
                  }
                  {...field}
                />
              </FormControl>

              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={formControl}
          name="companyCity"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground text-sm">Cidade</FormLabel>

              <FormControl>
                <Input
                  disabled={
                    occupation === "Não Trabalho" || occupation === "Aposentado"
                  }
                  {...field}
                />
              </FormControl>

              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={formControl}
          name="companyState"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground text-sm">Estado</FormLabel>

              <FormControl>
                <Input
                  disabled={
                    occupation === "Não Trabalho" || occupation === "Aposentado"
                  }
                  {...field}
                />
              </FormControl>

              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
        <FormField
          control={formControl}
          name="companyCountry"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground text-sm">País</FormLabel>

              <FormControl>
                <Input
                  disabled={
                    occupation === "Não Trabalho" || occupation === "Aposentado"
                  }
                  {...field}
                />
              </FormControl>

              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={formControl}
          name="companyCep"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground text-sm">CEP</FormLabel>

              <FormControl>
                <Input
                  disabled={
                    occupation === "Não Trabalho" || occupation === "Aposentado"
                  }
                  maxLength={9}
                  name={field.name}
                  ref={field.ref}
                  onBlur={field.onBlur}
                  value={field.value}
                  onChange={handleCEPWorkEducationChange}
                />
              </FormControl>

              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={formControl}
          name="companyTel"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground text-sm">
                Telefone
              </FormLabel>

              <FormControl>
                <PhoneInput
                  disabled={
                    occupation === "Não Trabalho" || occupation === "Aposentado"
                  }
                  limitMaxLength
                  smartCaret={false}
                  placeholder="Insira o telefone da empresa..."
                  defaultCountry="BR"
                  className={cn(
                    "flex h-12 w-full border border-secondary transition duration-300 bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-0 focus-within:ring-offset-0 focus-within:border-primary disabled:cursor-not-allowed disabled:opacity-50",
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

              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
        <FormField
          control={formControl}
          name="admissionDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">
                Data de admissão
              </FormLabel>

              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      disabled={
                        occupation === "Não Trabalho" ||
                        occupation === "Aposentado"
                      }
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
          control={formControl}
          name="retireeDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">
                Data de aposentadoria
              </FormLabel>

              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      disabled={
                        occupation === "Não Trabalho" ||
                        occupation === "Empresário/Proprietário" ||
                        occupation === "Registrado (CLT/PJ)" ||
                        occupation === "Autônomo" ||
                        occupation === "Outro"
                      }
                      variant={"outline"}
                      className={cn(
                        "w-full h-12 pl-3 text-left border-secondary font-normal group",
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

              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={formControl}
          name="monthlySalary"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground text-sm">
                Renda mensal (R$)
              </FormLabel>

              <FormControl>
                <Input
                  disabled={
                    occupation === "Não Trabalho" || occupation === "Aposentado"
                  }
                  {...field}
                />
              </FormControl>

              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />
      </div>

      <div className="w-full grid grid-cols-1 gap-4">
        <FormField
          control={formControl}
          name="jobDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground text-sm">
                Descreva quais são suas funções dentro da sua empresa, se possui
                funcionários registrados e outras informações relacionadas ao
                seu negócio
              </FormLabel>

              <FormControl>
                <Textarea
                  disabled={
                    occupation === "Não Trabalho" || occupation === "Aposentado"
                  }
                  className="resize-none"
                  {...field}
                />
              </FormControl>

              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />
      </div>

      <div className="w-full grid grid-cols-1 gap-4">
        <FormField
          control={formControl}
          name="previousJobConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">
                Já trabalhou anteriormente? Se sim, informe abaixo os dois
                últimos
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
      </div>

      {previousJobConfirmation === "Sim" && (
        <div className="w-full flex flex-col gap-8">
          {previousJobs ? (
            previousJobs.map((obj, i) => (
              <div
                key={`previous-jobs-${i}`}
                className="w-full flex flex-col gap-6 bg-secondary p-4"
              >
                <div className="w-full flex flex-col gap-4">
                  <div className="w-full grid grid-cols-1 gap-4">
                    <div className="w-full flex flex-col gap-2">
                      <label
                        htmlFor="companyName"
                        className="text-sm text-foreground font-medium"
                      >
                        Nome do empregador ou empresa anterior
                      </label>

                      <Input
                        id="companyName"
                        value={obj.companyName!}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                          handlePreviousJobsChangeString(
                            event.target.value,
                            "companyName",
                            i,
                          )
                        }
                      />
                    </div>
                  </div>

                  <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="w-full flex flex-col gap-2">
                      <label
                        htmlFor="companyAddress"
                        className="text-sm text-foreground font-medium"
                      >
                        Endereço completo
                      </label>

                      <Input
                        id="companyAddress"
                        value={obj.companyAddress!}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                          handlePreviousJobsChangeString(
                            event.target.value,
                            "companyAddress",
                            i,
                          )
                        }
                      />
                    </div>

                    <div className="w-full flex flex-col gap-2">
                      <label
                        htmlFor="companyCity"
                        className="text-sm text-foreground font-medium"
                      >
                        Cidade
                      </label>

                      <Input
                        id="companyCity"
                        value={obj.companyCity!}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                          handlePreviousJobsChangeString(
                            event.target.value,
                            "companyCity",
                            i,
                          )
                        }
                      />
                    </div>

                    <div className="w-full flex flex-col gap-2">
                      <label
                        htmlFor="companyState"
                        className="text-sm text-foreground font-medium"
                      >
                        Estado
                      </label>

                      <Input
                        id="companyState"
                        value={obj.companyState!}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                          handlePreviousJobsChangeString(
                            event.target.value,
                            "companyState",
                            i,
                          )
                        }
                      />
                    </div>
                  </div>

                  <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="w-full flex flex-col gap-2">
                      <label
                        htmlFor="companyCountry"
                        className="text-sm text-foreground font-medium"
                      >
                        País
                      </label>

                      <Input
                        id="companyCountry"
                        value={obj.companyCountry!}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                          handlePreviousJobsChangeString(
                            event.target.value,
                            "companyCountry",
                            i,
                          )
                        }
                      />
                    </div>

                    <div className="w-full flex flex-col gap-2">
                      <label
                        htmlFor="companyCep"
                        className="text-sm text-foreground font-medium"
                      >
                        CEP
                      </label>

                      <Input
                        maxLength={9}
                        id="companyCep"
                        value={obj.companyCep!}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                          handlePreviousJobsChangeString(
                            event.target.value,
                            "companyCep",
                            i,
                          )
                        }
                      />
                    </div>

                    <div className="w-full flex flex-col gap-2">
                      <label
                        htmlFor="companyTel"
                        className="text-sm text-foreground font-medium"
                      >
                        Telefone
                      </label>

                      <PhoneInput
                        id="companyTel"
                        limitMaxLength
                        smartCaret={false}
                        placeholder="Insira seu celular..."
                        defaultCountry="BR"
                        className={cn(
                          "flex h-12 w-full border border-secondary transition duration-300 bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-0 focus-within:ring-offset-0 focus-within:border-primary disabled:cursor-not-allowed disabled:opacity-50",
                          {
                            "input-error": false,
                          },
                        )}
                        name="companyTel"
                        value={obj.companyTel!}
                        onChange={(value) =>
                          handlePreviousJobsChangeString(
                            value as string,
                            "companyTel",
                            i,
                          )
                        }
                      />
                    </div>
                  </div>

                  <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="w-full flex flex-col gap-2">
                      <label
                        htmlFor="office"
                        className="text-sm text-foreground font-medium"
                      >
                        Cargo / Função
                      </label>

                      <Input
                        id="office"
                        value={obj.office!}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                          handlePreviousJobsChangeString(
                            event.target.value,
                            "office",
                            i,
                          )
                        }
                      />
                    </div>

                    <div className="w-full flex flex-col gap-2">
                      <label
                        htmlFor="supervisorName"
                        className="text-sm text-foreground font-medium"
                      >
                        Nome completo do supervisor
                      </label>

                      <Input
                        id="supervisorName"
                        value={obj.supervisorName!}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                          handlePreviousJobsChangeString(
                            event.target.value,
                            "supervisorName",
                            i,
                          )
                        }
                      />
                    </div>
                  </div>

                  <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="w-full flex flex-col gap-2">
                      <label
                        htmlFor="admissionDate"
                        className="text-foreground text-sm font-medium"
                      >
                        Data de admissão
                      </label>

                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id="admissionDate"
                            variant={"outline"}
                            className={cn(
                              "w-full h-12 pl-3 text-left border-secondary font-normal group bg-background",
                              !obj.admissionDate && "text-muted-foreground",
                            )}
                          >
                            {obj.admissionDate ? (
                              format(obj.admissionDate, "PPP", {
                                locale: ptBR,
                              })
                            ) : (
                              <span className="text-foreground opacity-80 group-hover:text-white group-hover:opacity-100">
                                Selecione a data
                              </span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>

                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            locale={ptBR}
                            selected={obj.admissionDate!}
                            onSelect={(day, selectedDay) =>
                              handlePreviousJobsChangeDate(
                                selectedDay,
                                "admissionDate",
                                i,
                              )
                            }
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
                    </div>

                    <div className="w-full flex flex-col gap-2">
                      <label
                        htmlFor="resignationDate"
                        className="text-foreground text-sm font-medium"
                      >
                        Data de demissão
                      </label>

                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id="resignationDate"
                            variant={"outline"}
                            className={cn(
                              "w-full h-12 pl-3 text-left border-secondary font-normal group bg-background",
                              !obj.resignationDate && "text-muted-foreground",
                            )}
                          >
                            {obj.resignationDate ? (
                              format(obj.resignationDate, "PPP", {
                                locale: ptBR,
                              })
                            ) : (
                              <span className="text-foreground opacity-80 group-hover:text-white group-hover:opacity-100">
                                Selecione a data
                              </span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>

                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            locale={ptBR}
                            selected={obj.resignationDate!}
                            onSelect={(day, selectedDay) =>
                              handlePreviousJobsChangeDate(
                                selectedDay,
                                "resignationDate",
                                i,
                              )
                            }
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
                    </div>
                  </div>

                  <div className="w-full grid grid-cols-1 gap-4">
                    <div className="w-full flex flex-col gap-2">
                      <label
                        htmlFor="jobDescription"
                        className="text-sm text-foreground font-medium"
                      >
                        Faça descrição da tarefa exercida
                      </label>

                      <Textarea
                        id="jobDescription"
                        value={obj.jobDescription!}
                        onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                          handlePreviousJobsChangeString(
                            event.target.value,
                            "jobDescription",
                            i,
                          )
                        }
                      />
                    </div>
                  </div>
                </div>

                {i === previousJobsIndex - 1 ? (
                  <Button
                    type="button"
                    size="xl"
                    className="px-3 w-full sm:w-fit flex items-center gap-2"
                    disabled={
                      obj.companyAddress === "" ||
                      obj.companyCep === "" ||
                      obj.companyCountry === "" ||
                      obj.companyName === "" ||
                      obj.companyState === "" ||
                      obj.companyTel === "" ||
                      obj.companyCity === "" ||
                      isPreviousJobsFetching
                    }
                    onClick={handleAddPreviousJobsInput}
                  >
                    {isPreviousJobsFetching ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <Plus />
                    )}

                    <span className="hidden sm:block">
                      Adicionar emprego anterior
                    </span>
                  </Button>
                ) : (
                  <Button
                    type="button"
                    size="xl"
                    className="px-3 w-full sm:w-fit flex items-center gap-2"
                    onClick={() => handleRemovePreviousJobsInput(obj.id)}
                    disabled={isPreviousJobsFetching}
                  >
                    {isPreviousJobsFetching ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <Trash />
                    )}

                    <span className="hidden sm:block">Remover emprego</span>
                  </Button>
                )}
              </div>
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
      )}

      <span className="text-foreground text-base font-medium mt-6">
        Informe as duas últimas instituições de ensino que frequentou
      </span>

      <div className="w-full grid grid-cols-1 gap-4">
        <div className="w-full flex flex-col gap-8">
          {courses ? (
            courses.map((obj, i) => (
              <div
                key={`courses-${i}`}
                className="w-full flex flex-col gap-6 bg-secondary p-4"
              >
                <div className="w-full flex flex-col gap-4">
                  <div className="w-full grid grid-cols-1 gap-4">
                    <div className="w-full flex flex-col gap-2">
                      <label
                        htmlFor="institutionName"
                        className="text-sm text-foreground font-medium"
                      >
                        Nome completo da instituição*
                      </label>

                      <Input
                        id="institutionName"
                        value={obj.institutionName!}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                          handleCoursesChangeString(
                            event.target.value,
                            "institutionName",
                            i,
                          )
                        }
                      />
                    </div>
                  </div>

                  <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="w-full flex flex-col gap-2">
                      <label
                        htmlFor="address"
                        className="text-sm text-foreground font-medium"
                      >
                        Endereço completo*
                      </label>

                      <Input
                        id="address"
                        value={obj.address!}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                          handleCoursesChangeString(
                            event.target.value,
                            "address",
                            i,
                          )
                        }
                      />
                    </div>

                    <div className="w-full flex flex-col gap-2">
                      <label
                        htmlFor="city"
                        className="text-sm text-foreground font-medium"
                      >
                        Cidade*
                      </label>

                      <Input
                        id="city"
                        value={obj.city!}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                          handleCoursesChangeString(
                            event.target.value,
                            "city",
                            i,
                          )
                        }
                      />
                    </div>

                    <div className="w-full flex flex-col gap-2">
                      <label
                        htmlFor="state"
                        className="text-sm text-foreground font-medium"
                      >
                        Estado*
                      </label>

                      <Input
                        id="state"
                        value={obj.state!}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                          handleCoursesChangeString(
                            event.target.value,
                            "state",
                            i,
                          )
                        }
                      />
                    </div>
                  </div>

                  <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="w-full flex flex-col gap-2">
                      <label
                        htmlFor="country"
                        className="text-sm text-foreground font-medium"
                      >
                        País*
                      </label>

                      <Input
                        id="country"
                        value={obj.country!}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                          handleCoursesChangeString(
                            event.target.value,
                            "country",
                            i,
                          )
                        }
                      />
                    </div>

                    <div className="w-full flex flex-col gap-2">
                      <label
                        htmlFor="cep"
                        className="text-sm text-foreground font-medium"
                      >
                        CEP*
                      </label>

                      <Input
                        maxLength={9}
                        id="cep"
                        value={obj.cep!}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                          handleCoursesChangeString(
                            event.target.value,
                            "cep",
                            i,
                          )
                        }
                      />
                    </div>
                  </div>

                  <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="w-full flex flex-col gap-2">
                      <label
                        htmlFor="courseName"
                        className="text-sm text-foreground font-medium"
                      >
                        Nome do curso*
                      </label>

                      <Input
                        id="courseName"
                        value={obj.courseName!}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                          handleCoursesChangeString(
                            event.target.value,
                            "courseName",
                            i,
                          )
                        }
                      />
                    </div>

                    <div className="w-full flex flex-col gap-2">
                      <label
                        htmlFor="initialDate"
                        className="text-sm text-foreground font-medium"
                      >
                        Data de início*
                      </label>

                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id="initialDate"
                            variant={"outline"}
                            className={cn(
                              "w-full h-12 pl-3 text-left border-secondary font-normal group bg-background",
                              !obj.initialDate && "text-muted-foreground",
                            )}
                          >
                            {obj.initialDate ? (
                              format(obj.initialDate, "PPP", { locale: ptBR })
                            ) : (
                              <span className="text-foreground opacity-80 group-hover:text-white group-hover:opacity-100">
                                Selecione a data
                              </span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>

                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            locale={ptBR}
                            selected={obj.initialDate!}
                            onSelect={(day, selectedDay) =>
                              handleCourseChangeDate(
                                selectedDay,
                                "initialDate",
                                i,
                              )
                            }
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
                    </div>

                    <div className="w-full flex flex-col gap-2">
                      <label
                        htmlFor="finishDate"
                        className="text-sm text-foreground font-medium"
                      >
                        Data de término*
                      </label>

                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id="finishDate"
                            variant={"outline"}
                            className={cn(
                              "w-full h-12 pl-3 text-left border-secondary font-normal group bg-background",
                              !obj.finishDate && "text-muted-foreground",
                            )}
                          >
                            {obj.finishDate ? (
                              format(obj.finishDate, "PPP", { locale: ptBR })
                            ) : (
                              <span className="text-foreground opacity-80 group-hover:text-white group-hover:opacity-100">
                                Selecione a data
                              </span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>

                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            locale={ptBR}
                            selected={obj.finishDate!}
                            onSelect={(day, selectedDay) =>
                              handleCourseChangeDate(
                                selectedDay,
                                "finishDate",
                                i,
                              )
                            }
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
                    </div>
                  </div>
                </div>

                {i === coursesIndex - 1 ? (
                  <Button
                    type="button"
                    size="xl"
                    className="px-3 w-full sm:w-fit flex items-center gap-2"
                    disabled={
                      obj.address === "" ||
                      obj.cep === "" ||
                      obj.city === "" ||
                      obj.country === "" ||
                      obj.courseName === "" ||
                      obj.institutionName === "" ||
                      obj.state === "" ||
                      isCoursesFetching
                    }
                    onClick={handleAddCoursesInput}
                  >
                    {isCoursesFetching ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <Plus />
                    )}

                    <span className="hidden sm:block">Adicionar ensino</span>
                  </Button>
                ) : (
                  <Button
                    type="button"
                    size="xl"
                    className="px-3 w-full sm:w-fit flex items-center gap-2"
                    onClick={() => handleRemoveCoursesInput(obj.id)}
                    disabled={isCoursesFetching}
                  >
                    {isCoursesFetching ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <Trash />
                    )}

                    <span className="hidden sm:block">Remover ensino</span>
                  </Button>
                )}
              </div>
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>

        {coursesError.length > 0 && (
          <span className="text-sm text-red-500">{coursesError}</span>
        )}
      </div>
    </Element>
  );
}
