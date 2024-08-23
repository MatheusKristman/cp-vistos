"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Loader2, Plus, Save, X } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import PhoneInput from "react-phone-number-input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Form as FormType } from "@prisma/client";

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
import { cn } from "@/lib/utils";
import useFormStore from "@/constants/stores/useFormStore";
import { trpc } from "@/lib/trpc-client";

const formSchema = z.object({
  travelItineraryConfirmation: z.enum(["Sim", "Não"]),
  USAPreviewArriveDate: z.date({ message: "Campo obrigatório" }).optional(),
  arriveFlyNumber: z.string(),
  arriveCity: z.string(),
  USAPreviewReturnDate: z.date({ message: "Campo obrigatório" }).optional(),
  returnFlyNumber: z.string(),
  returnCity: z.string(),
  estimatedTimeOnUSA: z.string().min(1, { message: "Campo obrigatório" }),
  visitLocations: z
    .array(z.string().min(1, { message: "Valor não pode ser vazio" }))
    .optional(),
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
});

interface Props {
  currentForm: FormType;
  profileId: string;
}

export function AboutTravelForm({ currentForm, profileId }: Props) {
  const [visitLocationsValue, setVisitLocationsValue] = useState<string>("");

  const { redirectStep, setRedirectStep } = useFormStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      travelItineraryConfirmation: currentForm.travelItineraryConfirmation
        ? currentForm.travelItineraryConfirmation === true
          ? "Sim"
          : "Não"
        : "Não",
      USAPreviewArriveDate: currentForm.USAPreviewArriveDate
        ? currentForm.USAPreviewArriveDate
        : undefined,
      arriveFlyNumber: currentForm.arriveFlyNumber
        ? currentForm.arriveFlyNumber
        : "",
      arriveCity: currentForm.arriveCity ? currentForm.arriveCity : "",
      USAPreviewReturnDate: currentForm.USAPreviewReturnDate
        ? currentForm.USAPreviewReturnDate
        : undefined,
      returnFlyNumber: currentForm.returnFlyNumber
        ? currentForm.returnFlyNumber
        : "",
      returnCity: currentForm.returnCity ? currentForm.returnCity : "",
      estimatedTimeOnUSA: currentForm.estimatedTimeOnUSA
        ? currentForm.estimatedTimeOnUSA
        : "",
      visitLocations: currentForm.visitLocations
        ? currentForm.visitLocations
        : [],
      USACompleteAddress: currentForm.USACompleteAddress
        ? currentForm.USACompleteAddress
        : "",
      USAZipCode: currentForm.USAZipCode ? currentForm.USAZipCode : "",
      USACity: currentForm.USACity ? currentForm.USACity : "",
      USAState: currentForm.USAState ? currentForm.USAState : "",
      payerNameOrCompany: currentForm.payerNameOrCompany
        ? currentForm.payerNameOrCompany
        : "",
      payerTel: currentForm.payerTel ? currentForm.payerTel : "",
      payerAddress: currentForm.payerAddress ? currentForm.payerAddress : "",
      payerRelation: currentForm.payerRelation ? currentForm.payerRelation : "",
      payerEmail: currentForm.payerEmail ? currentForm.payerEmail : "",
    },
  });

  const travelItineraryConfirmation = form.watch("travelItineraryConfirmation");
  const visitLocations = form.watch("visitLocations");
  const utils = trpc.useUtils();
  const router = useRouter();

  const { mutate: submitAboutTravel, isPending } =
    trpc.formsRouter.submitAboutTravel.useMutation({
      onSuccess: (data) => {
        toast.success(data.message);
        utils.formsRouter.getForm.invalidate();
        router.push(`/formulario/${profileId}?formStep=4`);
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
  const { mutate: saveAboutTravel, isPending: isSavePending } =
    trpc.formsRouter.saveAboutTravel.useMutation({
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
    if (redirectStep !== null) {
      const values = form.getValues();

      saveAboutTravel({
        profileId,
        redirectStep,
        travelItineraryConfirmation:
          values.travelItineraryConfirmation ??
          (currentForm.travelItineraryConfirmation ? "Sim" : "Não"),
        USAPreviewArriveDate:
          values.USAPreviewArriveDate ?? currentForm.USAPreviewArriveDate,
        arriveFlyNumber:
          values.arriveFlyNumber !== ""
            ? values.arriveFlyNumber
            : currentForm.arriveFlyNumber,
        arriveCity:
          values.arriveCity !== "" ? values.arriveCity : currentForm.arriveCity,
        USAPreviewReturnDate:
          values.USAPreviewReturnDate ?? currentForm.USAPreviewReturnDate,
        returnFlyNumber:
          values.returnFlyNumber !== ""
            ? values.returnFlyNumber
            : currentForm.returnFlyNumber,
        returnCity:
          values.returnCity !== "" ? values.returnCity : currentForm.returnCity,
        estimatedTimeOnUSA:
          values.estimatedTimeOnUSA !== ""
            ? values.estimatedTimeOnUSA
            : currentForm.estimatedTimeOnUSA,
        visitLocations: values.visitLocations ?? currentForm.visitLocations,
        USACompleteAddress:
          values.USACompleteAddress !== ""
            ? values.USACompleteAddress
            : currentForm.USACompleteAddress,
        USAZipCode:
          values.USAZipCode !== "" ? values.USAZipCode : currentForm.USAZipCode,
        USACity: values.USACity !== "" ? values.USACity : currentForm.USACity,
        USAState:
          values.USAState !== "" ? values.USAState : currentForm.USAState,
        payerNameOrCompany:
          values.payerNameOrCompany !== ""
            ? values.payerNameOrCompany
            : currentForm.payerNameOrCompany,
        payerTel:
          values.payerTel !== "" ? values.payerTel : currentForm.payerTel,
        payerAddress:
          values.payerAddress !== ""
            ? values.payerAddress
            : currentForm.payerAddress,
        payerRelation:
          values.payerRelation !== ""
            ? values.payerRelation
            : currentForm.payerRelation,
        payerEmail:
          values.payerEmail !== "" ? values.payerEmail : currentForm.payerEmail,
      });
      setRedirectStep(null);
    }
  }, [redirectStep, setRedirectStep, saveAboutTravel, profileId]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    submitAboutTravel({ ...values, profileId, step: 4 });
  }

  function handleAddVisitLocationsInput() {
    if (visitLocationsValue === "") {
      return;
    }

    const currentLocations = visitLocations ?? [];

    currentLocations.push(visitLocationsValue);

    form.setValue("visitLocations", currentLocations);
    setVisitLocationsValue("");
  }

  function handleRemoveVisitLocations(index: number) {
    const currentLocations = visitLocations ?? [];

    if (currentLocations.length === 0) {
      return;
    }

    const locationsUpdated = currentLocations.filter(
      (_, locationIndex) => locationIndex !== index,
    );

    form.setValue("visitLocations", locationsUpdated);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col flex-grow gap-6"
      >
        <h2 className="w-full text-center text-2xl sm:text-3xl text-foreground font-semibold mb-6">
          Sobre a Viagem
        </h2>

        <div className="w-full flex flex-col gap-12 justify-between flex-grow">
          <div className="w-full flex flex-col">
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              <FormField
                control={form.control}
                name="travelItineraryConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Possui itinerário de viagem?*
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
            </div>

            <div
              className={cn(
                "w-full grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10",
                travelItineraryConfirmation === "Não" && "hidden",
              )}
            >
              <FormField
                control={form.control}
                name="USAPreviewArriveDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Data prevista de chegada aos EUA
                    </FormLabel>

                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            disabled={
                              travelItineraryConfirmation === "Não" ||
                              isPending ||
                              isSavePending
                            }
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
                          disabled={(date) => date < new Date("1900-01-01")}
                          captionLayout="dropdown"
                          fromYear={1900}
                          toYear={2100}
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
                name="arriveFlyNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Número do voo de chegada
                    </FormLabel>

                    <FormControl>
                      <Input
                        disabled={
                          travelItineraryConfirmation === "Não" ||
                          isPending ||
                          isSavePending
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
                name="arriveCity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Cidade de chegada
                    </FormLabel>

                    <FormControl>
                      <Input
                        disabled={
                          travelItineraryConfirmation === "Não" ||
                          isPending ||
                          isSavePending
                        }
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />
            </div>

            <div
              className={cn(
                "w-full grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10",
                travelItineraryConfirmation === "Não" && "hidden",
              )}
            >
              <FormField
                control={form.control}
                name="USAPreviewReturnDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Data prevista de retorno ao Brasil
                    </FormLabel>

                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            disabled={
                              travelItineraryConfirmation === "Não" ||
                              isPending ||
                              isSavePending
                            }
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
                          disabled={(date) => date < new Date("1900-01-01")}
                          captionLayout="dropdown"
                          fromYear={1900}
                          toYear={2100}
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
                name="returnFlyNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Número do voo de partida
                    </FormLabel>

                    <FormControl>
                      <Input
                        disabled={
                          travelItineraryConfirmation === "Não" ||
                          isPending ||
                          isSavePending
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
                name="returnCity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Cidade de partida
                    </FormLabel>

                    <FormControl>
                      <Input
                        disabled={
                          travelItineraryConfirmation === "Não" ||
                          isPending ||
                          isSavePending
                        }
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              <FormField
                control={form.control}
                name="estimatedTimeOnUSA"
                render={({ field }) => (
                  <FormItem className="py-4">
                    <FormLabel className="text-foreground">
                      Tempo estimado de permanência nos EUA*
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
                name="visitLocations"
                render={({ field }) => (
                  <FormItem className="bg-secondary p-4">
                    <FormLabel className="text-foreground">
                      Locais que pretende visitar
                    </FormLabel>

                    <FormControl>
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-2 justify-between">
                          <Input
                            disabled={isPending || isSavePending}
                            name={field.name}
                            ref={field.ref}
                            onBlur={field.onBlur}
                            value={visitLocationsValue}
                            onChange={(event) =>
                              setVisitLocationsValue(event.target.value)
                            }
                          />

                          <Button
                            disabled={isPending || isSavePending}
                            type="button"
                            size="xl"
                            className="px-3"
                            onClick={handleAddVisitLocationsInput}
                          >
                            <Plus />
                          </Button>
                        </div>

                        {visitLocations && (
                          <div className="w-full flex flex-wrap gap-2">
                            {visitLocations.map((location, index) => (
                              <div
                                key={`otherName-${index}`}
                                className="py-2 px-4 bg-border rounded-full flex items-center gap-2 group"
                              >
                                <span className="text-sm font-medium text-foreground">
                                  {location}
                                </span>

                                <Button
                                  type="button"
                                  variant="link"
                                  size="icon"
                                  className="size-5 hidden opacity-0 transition-all group-hover:block group-hover:opacity-100"
                                  disabled={isPending || isSavePending}
                                  onClick={() =>
                                    handleRemoveVisitLocations(index)
                                  }
                                >
                                  <X strokeWidth={1} size={20} />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />
            </div>

            <span className="text-foreground text-base font-medium mb-6">
              Referente ao endereço onde ficará nos EUA (preencha apenas se
              possuir)
            </span>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              <FormField
                control={form.control}
                name="USACompleteAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Endereço completo de onde ficará nos EUA
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
                name="USAZipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Zip Code (caso souber)
                    </FormLabel>

                    <FormControl>
                      <Input
                        disabled={isPending || isSavePending}
                        maxLength={5}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              <FormField
                control={form.control}
                name="USACity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Cidade nos EUA
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
                name="USAState"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Estado nos EUA
                    </FormLabel>

                    <FormControl>
                      <Input disabled={isPending || isSavePending} {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />
            </div>

            <span className="text-foreground text-base font-medium mb-6">
              Referente ao indivíduo pagador
            </span>

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              <FormField
                control={form.control}
                name="payerNameOrCompany"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Nome ou Empresa que pagará a viagem (caso seja você,
                      digite &quot;Eu mesmo&quot;)*
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
                name="payerTel"
                render={({ field }) => (
                  <FormItem className="sm:pt-[72px] md:pt-[48px] lg:pt-[24px]">
                    <FormLabel className="text-foreground">
                      Telefone Residencial*
                    </FormLabel>

                    <FormControl>
                      <PhoneInput
                        disabled={isPending || isSavePending}
                        limitMaxLength
                        smartCaret={false}
                        placeholder="Insira o telefone residencial..."
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

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="payerRelation"
                render={({ field }) => (
                  <FormItem className="sm:pt-[72px] md:pt-[48px] lg:pt-[24px]">
                    <FormLabel className="text-foreground">
                      Relação com o Solicitante*
                    </FormLabel>

                    <FormControl>
                      <Input disabled={isPending || isSavePending} {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="payerAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Endereço completo*
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
                name="payerEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">E-mail*</FormLabel>

                    <FormControl>
                      <Input disabled={isPending || isSavePending} {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
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
              disabled={isPending || isSavePending}
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
              disabled={isPending || isSavePending}
              type="submit"
              className="w-full flex items-center gap-2 sm:w-fit"
            >
              {isPending ? (
                <>
                  Enviando
                  <Loader2 className="size-5 animate-spin" strokeWidth={1.5} />
                </>
              ) : (
                <>
                  Enviar
                  <ArrowRight className="size-5" strokeWidth={1.5} />
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
