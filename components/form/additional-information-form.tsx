import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Save, Loader2, ArrowRight } from "lucide-react";
import { format, getYear } from "date-fns";
import { ptBR } from "date-fns/locale";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z
  .object({
    tribeParticipateConfirmation: z.enum(["Sim", "Não"]),
    languages: z.array(
      z.string().min(1, { message: "Idioma precisa ser preenchido" }),
    ),
    fiveYearsOtherCountryTravelsConfirmation: z.enum(["Sim", "Não"]),
    fiveYearsOtherCountryTravels: z.array(
      z.string().min(1, { message: "Países precisam ser preenchidos" }),
    ),
    socialOrganizationConfirmation: z.enum(["Sim", "Não"]),
    socialOrganization: z.array(
      z.string().min(1, { message: "Os campos precisam ser preenchidos" }),
    ),
    weaponTrainingConfirmation: z.enum(["Sim", "Não"]),
    weaponTrainingDetails: z.string(),
    militaryServiceConfirmation: z.enum(["Sim", "Não"]),
    militaryServiceCountry: z.string(),
    militaryServiceLocal: z.string(),
    militaryServicePatent: z.string(),
    militaryServiceSpecialty: z.string(),
    militaryServiceStartDate: z.date().optional(),
    militaryServiceEndDate: z.date().optional(),
    insurgencyOrganizationConfirmation: z.enum(["Sim", "Não"]),
    insurgencyOrganizationDetails: z.string(),
  })
  .superRefine(
    (
      {
        fiveYearsOtherCountryTravelsConfirmation,
        fiveYearsOtherCountryTravels,
        socialOrganizationConfirmation,
        socialOrganization,
        weaponTrainingConfirmation,
        weaponTrainingDetails,
        militaryServiceConfirmation,
        militaryServicePatent,
        militaryServiceLocal,
        militaryServiceCountry,
        militaryServiceEndDate,
        militaryServiceSpecialty,
        militaryServiceStartDate,
        insurgencyOrganizationConfirmation,
        insurgencyOrganizationDetails,
      },
      ctx,
    ) => {
      if (
        fiveYearsOtherCountryTravelsConfirmation === "Sim" &&
        fiveYearsOtherCountryTravels.length === 0
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Campo vazio, preencha para prosseguir",
          path: ["fiveYearsOtherCountryTravels"],
        });
      }

      if (
        socialOrganizationConfirmation === "Sim" &&
        socialOrganization.length === 0
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Campo vazio, preencha para prosseguir",
          path: ["socialOrganization"],
        });
      }

      if (
        weaponTrainingConfirmation === "Sim" &&
        weaponTrainingDetails.length === 0
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Campo vazio, preencha para prosseguir",
          path: ["weaponTrainingDetails"],
        });
      }

      if (
        militaryServiceConfirmation === "Sim" &&
        militaryServiceSpecialty.length === 0
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Campo vazio, preencha para prosseguir",
          path: ["militaryServiceSpecialty"],
        });
      }

      if (
        militaryServiceConfirmation === "Sim" &&
        militaryServiceCountry.length === 0
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Campo vazio, preencha para prosseguir",
          path: ["militaryServiceCountry"],
        });
      }

      if (
        militaryServiceConfirmation === "Sim" &&
        militaryServiceLocal.length === 0
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Campo vazio, preencha para prosseguir",
          path: ["militaryServiceLocal"],
        });
      }

      if (
        militaryServiceConfirmation === "Sim" &&
        militaryServicePatent.length === 0
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Campo vazio, preencha para prosseguir",
          path: ["militaryServicePatent"],
        });
      }

      if (
        militaryServiceConfirmation === "Sim" &&
        militaryServiceStartDate === undefined
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Campo vazio, preencha para prosseguir",
          path: ["militaryServiceStartDate"],
        });
      }

      if (
        militaryServiceConfirmation === "Sim" &&
        militaryServiceEndDate === undefined
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Campo vazio, preencha para prosseguir",
          path: ["militaryServiceEndDate"],
        });
      }
    },
  );

export function AdditionalInformationForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tribeParticipateConfirmation: "Não",
      languages: [],
      fiveYearsOtherCountryTravelsConfirmation: "Não",
      fiveYearsOtherCountryTravels: [],
      socialOrganizationConfirmation: "Não",
      socialOrganization: [],
      weaponTrainingConfirmation: "Não",
      weaponTrainingDetails: "",
      militaryServiceConfirmation: "Não",
      militaryServiceCountry: "",
      militaryServiceLocal: "",
      militaryServicePatent: "",
      militaryServiceSpecialty: "",
      militaryServiceStartDate: undefined,
      militaryServiceEndDate: undefined,
      insurgencyOrganizationConfirmation: "Não",
      insurgencyOrganizationDetails: "",
    },
  });

  const currentYear = getYear(new Date());

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-6"
      >
        <h2 className="w-full text-center text-2xl sm:text-3xl text-foreground font-semibold mb-6">
          Informações Adicionais
        </h2>

        <div className="w-full flex flex-col gap-12">
          <div className="w-full flex flex-col gap-4">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="tribeParticipateConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Você participa de algum clã ou tribo?
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

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                name="languages"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Quais idiomas você fala?
                    </FormLabel>

                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                name="fiveYearsOtherCountryTravelsConfirmation"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Viajou nos últimos 5 anos para outro país?
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

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                name="fiveYearsOtherCountryTravels"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Informe os países que viajou
                    </FormLabel>

                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                name="socialOrganizationConfirmation"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Contribui ou faz parte de alguma instituição de caridade
                      ou organização social?
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

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                name="socialOrganization"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Quais organizações você faz parte?
                    </FormLabel>

                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                name="weaponTrainingConfirmation"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Você tem treinamento com arma de fogo?
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

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                name="weaponTrainingDetails"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Conte mais sobre o treinamento
                    </FormLabel>

                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FormField
                name="militaryServiceConfirmation"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Já prestou serviço militar?
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

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                name="militaryServiceCountry"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      País que serviu
                    </FormLabel>

                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                name="militaryServiceLocal"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Local que serviu
                    </FormLabel>

                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FormField
                name="militaryServicePatent"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Patente</FormLabel>

                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                name="militaryServiceStartDate"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Data de início
                    </FormLabel>

                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
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

                      <PopoverContent
                        className="w-auto p-0 bg-background"
                        align="start"
                      >
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
                              "px-2 py-1.5 bg-muted text-primary text-sm focus-visible:outline-none",
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
                name="militaryServiceEndDate"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Data de término
                    </FormLabel>

                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
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

                      <PopoverContent
                        className="w-auto p-0 bg-background"
                        align="start"
                      >
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
                              "px-2 py-1.5 bg-muted text-primary text-sm focus-visible:outline-none",
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

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                name="insurgencyOrganizationConfirmation"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Você já serviu, foi membro ou esteve envolvido em uma
                      unidade paramilitar, unidade de vigilantes, grupo rebelde,
                      grupo guerrilheiro ou organização insurgente?
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

                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                name="insurgencyOrganizationDetails"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Conte mais detalhes
                    </FormLabel>

                    <FormControl>
                      <Input {...field} />
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
