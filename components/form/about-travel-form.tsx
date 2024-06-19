//TODO: criar função para submit
//TODO: mandar para o proximo formulário
//TODO: ajustar bug de adicionar mais inputs

"use client";

import { ChangeEvent } from "react";
import { Control } from "react-hook-form";
import { Plus, Trash } from "lucide-react";
import { format, getYear } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { Element } from "react-scroll";
import PhoneInput from "react-phone-number-input";

import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { PrimaryFormControl } from "@/types";
import useFormStore from "@/constants/stores/useFormStore";

interface Props {
  formControl: Control<PrimaryFormControl>;
  travelItineraryConfirmation: "Sim" | "Não";
}

export function AboutTravelForm({ formControl, travelItineraryConfirmation }: Props) {
  const {
    visitLocations,
    visitLocationsError,
    visitLocationsIndex,
    myselfValue,
    setMyselfValue,
    setVisitLocations,
    setVisitLocationsIndex,
  } = useFormStore();

  const currentYear = getYear(new Date());

  function handleVisitLocationsChange(event: ChangeEvent<HTMLInputElement>, index: number) {
    const values = [...visitLocations];
    values[index] = event.target.value;
    setVisitLocations(values);
  }

  function handleAddVisitLocationsInput() {
    setVisitLocationsIndex(visitLocationsIndex + 1);

    const values = [...visitLocations];
    values[values.length] = "";
    console.log(values);
    setVisitLocations(values);
  }

  function handleRemoveVisitLocationsInput(index: number) {
    setVisitLocationsIndex(visitLocationsIndex - 1);

    const values = [...visitLocations].filter((value: string, i: number) => i !== index);
    setVisitLocations(values);
  }

  return (
    <Element name="about-travel" className="w-full flex flex-col gap-6">
      <h2 className="w-full text-center text-2xl sm:text-3xl text-primary font-semibold my-12">Sobre a Viagem</h2>

      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
        <FormField
          control={formControl}
          name="travelItineraryConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">Possui itinerário de viagem?*</FormLabel>

              <FormControl>
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
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
          control={formControl}
          name="USAPreviewArriveDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">Data prevista de chegada aos EUA</FormLabel>

              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      disabled={travelItineraryConfirmation === "Não"}
                      variant={"outline"}
                      className={cn(
                        "w-full h-12 pl-3 text-left border-secondary font-normal group",
                        !field.value && "text-muted-foreground"
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
                    disabled={(date) => date < new Date("1900-01-01")}
                    captionLayout="dropdown"
                    fromYear={1900}
                    toYear={2100}
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

              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={formControl}
          name="arriveFlyNumber"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-between">
              <FormLabel className="text-primary text-sm">Número do voo de chegada</FormLabel>

              <FormControl>
                <Input disabled={travelItineraryConfirmation === "Não"} {...field} />
              </FormControl>

              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-4 gap-4">
        <FormField
          control={formControl}
          name="arriveCity"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-between">
              <FormLabel className="text-primary text-sm">Cidade de chegada</FormLabel>

              <FormControl>
                <Input disabled={travelItineraryConfirmation === "Não"} {...field} />
              </FormControl>

              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={formControl}
          name="USAPreviewReturnDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">Data prevista de retorno ao Brasil</FormLabel>

              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      disabled={travelItineraryConfirmation === "Não"}
                      variant={"outline"}
                      className={cn(
                        "w-full h-12 pl-3 text-left border-secondary font-normal group",
                        !field.value && "text-muted-foreground"
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
                    disabled={(date) => date < new Date("1900-01-01")}
                    captionLayout="dropdown"
                    fromYear={1900}
                    toYear={2100}
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

              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={formControl}
          name="returnFlyNumber"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-between">
              <FormLabel className="text-primary text-sm">Número do voo de partida</FormLabel>

              <FormControl>
                <Input disabled={travelItineraryConfirmation === "Não"} {...field} />
              </FormControl>

              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={formControl}
          name="returnCity"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-between">
              <FormLabel className="text-primary text-sm">Cidade de partida</FormLabel>

              <FormControl>
                <Input disabled={travelItineraryConfirmation === "Não"} {...field} />
              </FormControl>

              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          control={formControl}
          name="estimatedTimeOnUSA"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-between">
              <FormLabel className="text-primary text-sm">Tempo estimado de permanência nos EUA*</FormLabel>

              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />

        <div className="w-full bg-secondary p-4 flex flex-col space-y-3">
          <label htmlFor="visitLocations" className="text-sm font-medium text-primary">
            Locais que pretende visitar
          </label>

          <div className="flex flex-col gap-4 w-full">
            {Array.from(Array(visitLocationsIndex).keys()).map((i) => (
              <div key={i} className="flex gap-2 justify-between items-end">
                <Input
                  name="visitLocations"
                  value={visitLocations[i]}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleVisitLocationsChange(e, i)}
                />

                {i === visitLocationsIndex - 1 ? (
                  <Button
                    type="button"
                    size="xl"
                    className="px-3"
                    disabled={visitLocations[visitLocations.length - 1] === ""}
                    onClick={handleAddVisitLocationsInput}
                  >
                    <Plus />
                  </Button>
                ) : (
                  <Button type="button" size="xl" className="px-3" onClick={() => handleRemoveVisitLocationsInput(i)}>
                    <Trash />
                  </Button>
                )}
              </div>
            ))}
          </div>

          {visitLocationsError.length > 0 && <span className="text-sm text-red-500">{visitLocationsError}</span>}
        </div>
      </div>

      <span className="text-primary text-base font-medium mt-6">
        Referente ao endereço onde ficará nos EUA (preencha apenas se possuir)
      </span>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          control={formControl}
          name="USACompleteAddress"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-between">
              <FormLabel className="text-primary text-sm">Endereço completo de onde ficará nos EUA</FormLabel>

              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={formControl}
          name="USAZipCode"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-between">
              <FormLabel className="text-primary text-sm">Zip Code (caso souber)</FormLabel>

              <FormControl>
                <Input maxLength={5} {...field} />
              </FormControl>

              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          control={formControl}
          name="USACity"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-between">
              <FormLabel className="text-primary text-sm">Cidade nos EUA</FormLabel>

              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={formControl}
          name="USAState"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-between">
              <FormLabel className="text-primary text-sm">Estado nos EUA</FormLabel>

              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />
      </div>

      <span className="text-primary text-base font-medium mt-6">Referente ao indivíduo pagador</span>

      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
        <FormField
          control={formControl}
          name="payerNameOrCompany"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-between">
              <FormLabel className="text-primary text-sm">
                Nome ou Empresa que pagará a viagem (caso seja você, marque a opção EU MESMO)*
              </FormLabel>

              <FormControl>
                <Input disabled={myselfValue === true} {...field} />
              </FormControl>

              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />

        <div className="flex flex-col justify-between">
          <label htmlFor="payerNameOrCompanyMeValue" className="text-sm text-primary font-medium">
            Eu mesmo
          </label>

          <div className="h-12">
            <Checkbox id="payerNameOrCompanyMeValue" checked={myselfValue} onCheckedChange={setMyselfValue} />
          </div>
        </div>

        <FormField
          control={formControl}
          name="payerTel"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-between">
              <FormLabel className="text-primary text-sm">Telefone Residencial*</FormLabel>

              <FormControl>
                <PhoneInput
                  limitMaxLength
                  smartCaret={false}
                  placeholder="Insira o telefone residencial..."
                  defaultCountry="BR"
                  className={cn(
                    "flex h-12 w-full border border-secondary transition duration-300 bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-0 focus-within:ring-offset-0 focus-within:border-primary disabled:cursor-not-allowed disabled:opacity-50",
                    {
                      "input-error": false,
                    }
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
          name="payerAddress"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-between">
              <FormLabel className="text-primary text-sm">Endereço completo*</FormLabel>

              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={formControl}
          name="payerRelation"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-between">
              <FormLabel className="text-primary text-sm">Relação com o Solicitante*</FormLabel>

              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={formControl}
          name="payerEmail"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-between">
              <FormLabel className="text-primary text-sm">E-mail*</FormLabel>

              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />
      </div>
    </Element>
  );
}
