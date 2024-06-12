//TODO: criar função para submit
//TODO: mandar para o proximo formulário

"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  ArrowLeft,
  ArrowRight,
  Loader2,
  Plus,
  Save,
  Trash,
} from "lucide-react";
import { format, getYear } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { Form as FormType } from "@prisma/client";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { CheckedState } from "@radix-ui/react-checkbox";

interface Props {
  currentForm: FormType | null;
}

const formSchema = z.object({
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
});

export function AboutTravelForm({ currentForm }: Props) {
  const [visitLocations, setVisitLocations] = useState<string[]>([]);
  const [visitLocationsIndex, setVisitLocationsIndex] = useState<number>(1);
  const [visitLocationsError, setVisitLocationsError] = useState<string>("");
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const [isSaving, setSaving] = useState<boolean>(false);
  const [myselfValue, setMyselfValue] = useState<CheckedState>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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
    },
  });
  const currentYear = getYear(new Date());

  function onSubmit(values: z.infer<typeof formSchema>) {
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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-12 mb-12"
      >
        <div className="w-full flex flex-col gap-6">
          <h2 className="w-full text-center text-2xl sm:text-3xl text-primary font-semibold mb-12">
            Sobre a Viagem
          </h2>

          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="travelItneraryConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">
                    Possui itnerário de viagem?*
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

            <FormField
              control={form.control}
              name="USAPreviewArriveDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">
                    Data prevista de chegada aos EUA
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
                            <span className="text-primary opacity-80 group-hover:text-white group-hover:opacity-100">
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
              name="arriveFlyNumber"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-between">
                  <FormLabel className="text-primary text-sm">
                    Número do voo de chegada
                  </FormLabel>

                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage className="text-sm text-red-500" />
                </FormItem>
              )}
            />
          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-4 gap-4">
            <FormField
              control={form.control}
              name="arriveCity"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-between">
                  <FormLabel className="text-primary text-sm">
                    Cidade de chegada
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
              name="USAPreviewReturnDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">
                    Data prevista de retorno ao Brasil
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
                            <span className="text-primary opacity-80 group-hover:text-white group-hover:opacity-100">
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
              name="returnFlyNumber"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-between">
                  <FormLabel className="text-primary text-sm">
                    Número do voo de partida
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
              name="returnCity"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-between">
                  <FormLabel className="text-primary text-sm">
                    Cidade de partida
                  </FormLabel>

                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage className="text-sm text-red-500" />
                </FormItem>
              )}
            />
          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="estimatedTimeOnUSA"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-between">
                  <FormLabel className="text-primary text-sm">
                    Tempo estimado de permanência nos EUA*
                  </FormLabel>

                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage className="text-sm text-red-500" />
                </FormItem>
              )}
            />

            <div className="w-full bg-secondary p-4 flex flex-col space-y-3">
              <label
                htmlFor="visitLocations"
                className="text-sm font-medium text-primary"
              >
                Locais que pretende visitar
              </label>

              <div className="flex flex-col gap-4 w-full">
                {Array.from(Array(visitLocations).keys()).map((i) => (
                  <div key={i} className="flex gap-2 justify-between items-end">
                    <Input
                      name="visitLocations"
                      value={visitLocations[i]}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleOtherNamesChange(e, i)
                      }
                    />

                    {i === visitLocationsIndex - 1 ? (
                      <Button
                        type="button"
                        size="xl"
                        className="px-3"
                        disabled={
                          visitLocations[visitLocations.length - 1] === ""
                        }
                        onClick={handleAddOtherNamesInput}
                      >
                        <Plus />
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        size="xl"
                        className="px-3"
                        onClick={() => handleRemoveOtherNamesInput(i)}
                      >
                        <Trash />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              {visitLocationsError.length > 0 && (
                <span className="text-sm text-red-500">
                  {visitLocationsError}
                </span>
              )}
            </div>
          </div>

          <span className="text-primary text-base font-medium mt-6">
            Referente ao endereço onde ficará nos EUA (preencha apenas se
            possuir)
          </span>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="USACompleteAddress"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-between">
                  <FormLabel className="text-primary text-sm">
                    Endereço completo de onde ficará nos EUA
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
              name="USAZipCode"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-between">
                  <FormLabel className="text-primary text-sm">
                    Zip Code (caso souber)
                  </FormLabel>

                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage className="text-sm text-red-500" />
                </FormItem>
              )}
            />
          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="USACity"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-between">
                  <FormLabel className="text-primary text-sm">
                    Cidade nos EUA
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
              name="USAState"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-between">
                  <FormLabel className="text-primary text-sm">
                    Estado nos EUA
                  </FormLabel>

                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage className="text-sm text-red-500" />
                </FormItem>
              )}
            />
          </div>

          <span className="text-primary text-base font-medium mt-6">
            Referente ao indivíduo pagador
          </span>

          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="payerNameOrCompany"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-between">
                  <FormLabel className="text-primary text-sm">
                    Nome ou Empresa que pagará a viagem (caso seja você, coloque
                    EU MESMO)
                  </FormLabel>

                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage className="text-sm text-red-500" />
                </FormItem>
              )}
            />

            <div className="flex flex-col justify-between">
              <label
                htmlFor="payerNameOrCompanyMeValue"
                className="text-sm text-primary font-medium"
              >
                Sem expiração
              </label>

              <div className="h-12">
                <Checkbox
                  id="payerNameOrCompanyMeValue"
                  checked={myselfValue}
                  onCheckedChange={setMyselfValue}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="USAState"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-between">
                  <FormLabel className="text-primary text-sm">
                    Estado nos EUA
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
              name="payerAddress"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-between">
                  <FormLabel className="text-primary text-sm">
                    Endereço completo
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
              name="payerRelation"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-between">
                  <FormLabel className="text-primary text-sm">
                    Relação com o Solicitante
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
              name="payerEmail"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-between">
                  <FormLabel className="text-primary text-sm">E-mail</FormLabel>

                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage className="text-sm text-red-500" />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
          <Button
            type="button"
            disabled={isSubmitting || isSaving}
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
