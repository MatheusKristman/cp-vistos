//TODO: criar função para submit
//TODO: mandar para o proximo formulário

"use client";

import { Control } from "react-hook-form";
import { Plus, Trash } from "lucide-react";
import { format, getYear } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { AmericanLicense, USALastTravel } from "@prisma/client";

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
import { Textarea } from "@/components/ui/textarea";

interface Props {
  formControl: Control<PrimaryFormControl>;
  hasBeenOnUSAConfirmation: "Sim" | "Não";
  americanLicenseToDriveConfirmation: "Sim" | "Não";
  lostVisaConfirmation: "Sim" | "Não";
  canceledVisaConfirmation: "Sim" | "Não";
  deniedVisaConfirmation: "Sim" | "Não";
  immigrationRequestByAnotherPersonConfirmation: "Sim" | "Não";
}

export function PreviousTravelForm({
  formControl,
  hasBeenOnUSAConfirmation,
  americanLicenseToDriveConfirmation,
  lostVisaConfirmation,
  canceledVisaConfirmation,
  deniedVisaConfirmation,
  immigrationRequestByAnotherPersonConfirmation,
}: Props) {
  const currentYear = getYear(new Date());
  const {
    USALastTravel,
    setUSALastTravel,
    USALastTravelIndex,
    setUSALastTravelIndex,
    USALastTravelError,
    americanLicense,
    setAmericanLicense,
    americanLicenseError,
    americanLicenseIndex,
    setAmericanLicenseIndex,
    noVisaNumber,
    setNoVisaNumber,
  } = useFormStore();

  function handleArrivalDate(value: Date, index: number) {
    const arr = [...USALastTravel];

    arr[index].arriveDate = value;

    setUSALastTravel(arr);
  }

  function handleEstimatedTime(value: string, index: number) {
    const arr = [...USALastTravel];

    arr[index].estimatedTime = value;

    setUSALastTravel(arr);
  }

  function handleAddUSALastTravelInput() {
    setUSALastTravelIndex(USALastTravelIndex + 1);

    const values = [...USALastTravel];
    values[values.length] = { arriveDate: new Date(), estimatedTime: "", id: "", formId: "" };

    console.log(values);

    setUSALastTravel(values);
  }

  function handleRemoveUSALastTravelInput(index: number) {
    setUSALastTravelIndex(USALastTravelIndex - 1);

    const values = [...USALastTravel].filter((value: USALastTravel, i: number) => i !== index);
    setUSALastTravel(values);
  }

  function handleLicenseNumber(value: string, index: number) {
    const arr = [...americanLicense];

    arr[index].licenseNumber = value;

    setAmericanLicense(arr);
  }

  function handleState(value: string, index: number) {
    const arr = [...americanLicense];

    arr[index].state = value;

    setAmericanLicense(arr);
  }

  function handleAddAmericanLicenseInput() {
    setAmericanLicenseIndex(americanLicenseIndex + 1);

    const values = [...americanLicense];
    values[values.length] = { state: "", licenseNumber: "", id: "", formId: "" };

    console.log(values);

    setAmericanLicense(values);
  }

  function handleRemoveAmericanLicenseInput(index: number) {
    setAmericanLicenseIndex(americanLicenseIndex - 1);

    const values = [...americanLicense].filter((value: AmericanLicense, i: number) => i !== index);
    setAmericanLicense(values);
  }

  return (
    <div className="w-full flex flex-col gap-6">
      <h2 className="w-full text-center text-2xl sm:text-3xl text-primary font-semibold my-12">Viagens Anteriores</h2>

      <div className="w-full grid grid-cols-1 gap-4">
        <FormField
          control={formControl}
          name="hasBeenOnUSAConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">Você já foi para os EUA?</FormLabel>

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

        {hasBeenOnUSAConfirmation === "Sim" && (
          <div className="w-full bg-secondary p-4 flex flex-col space-y-8">
            <span className="text-primary text-base font-medium">
              Informe as datas das suas últimas 5 viagens aos EUA (data de entrada) e tempo de permanência
            </span>

            <div className="flex flex-col gap-6">
              {USALastTravel.map((obj, i) => (
                <div key={`usa-last-travel-${i}`} className="w-full flex sm:items-end gap-4">
                  <div className="w-full flex flex-col sm:flex-row gap-4">
                    <div className="w-full flex flex-col gap-2">
                      <label className="text-primary text-sm font-medium">Data de prevista de chegada aos EUA</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full bg-background h-12 pl-3 text-left border-secondary font-normal group",
                                !obj.arriveDate && "text-muted-foreground"
                              )}
                            >
                              {obj.arriveDate ? (
                                format(obj.arriveDate, "PPP", { locale: ptBR })
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
                            selected={obj.arriveDate!}
                            onSelect={(day, selectedDay, activeModifiers, e) => handleArrivalDate(selectedDay, i)}
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
                    </div>

                    <div className="w-full flex flex-col gap-2">
                      <label className="text-primary text-sm font-medium">Data de prevista de chegada aos EUA</label>
                      <Input
                        value={obj.estimatedTime!}
                        onChange={(event) => handleEstimatedTime(event.target.value, i)}
                      />
                    </div>
                  </div>

                  {i === USALastTravelIndex - 1 ? (
                    <Button
                      type="button"
                      size="xl"
                      className="px-3"
                      disabled={obj.estimatedTime === "" || !obj.arriveDate}
                      onClick={handleAddUSALastTravelInput}
                    >
                      <Plus />
                    </Button>
                  ) : (
                    <Button type="button" size="xl" className="px-3" onClick={() => handleRemoveUSALastTravelInput(i)}>
                      <Trash />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="w-full grid grid-cols-1 gap-4">
        <FormField
          control={formControl}
          name="americanLicenseToDriveConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">Já obteve uma licença americana para dirigir nos EUA?</FormLabel>

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

        {americanLicenseToDriveConfirmation === "Sim" && (
          <div className="w-full bg-secondary p-4 flex flex-col space-y-8">
            <div className="flex flex-col gap-6">
              {americanLicense.map((obj, i) => (
                <div key={`american-license-${i}`} className="w-full flex sm:items-end gap-4">
                  <div className="w-full flex flex-col sm:flex-row gap-4">
                    <div className="w-full flex flex-col gap-2">
                      <label className="text-primary text-sm font-medium">Data de prevista de chegada aos EUA</label>
                      <Input
                        value={obj.licenseNumber!}
                        onChange={(event) => handleLicenseNumber(event.target.value, i)}
                      />
                    </div>

                    <div className="w-full flex flex-col gap-2">
                      <label className="text-primary text-sm font-medium">Data de prevista de chegada aos EUA</label>
                      <Input value={obj.state!} onChange={(event) => handleState(event.target.value, i)} />
                    </div>
                  </div>

                  {i === americanLicenseIndex - 1 ? (
                    <Button
                      type="button"
                      size="xl"
                      className="px-3"
                      disabled={obj.licenseNumber === "" || obj.state === ""}
                      onClick={handleAddAmericanLicenseInput}
                    >
                      <Plus />
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      size="xl"
                      className="px-3"
                      onClick={() => handleRemoveAmericanLicenseInput(i)}
                    >
                      <Trash />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-4 gap-4">
        <FormField
          control={formControl}
          name="USAVisaConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">Já obteve visto(s) para os EUA?</FormLabel>

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
          name="visaIssuingDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">Data exata de Emissão</FormLabel>

              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
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

              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={formControl}
          name="visaNumber"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-between">
              <FormLabel className="text-primary text-sm">Número do visto</FormLabel>

              <FormControl>
                <Input disabled={noVisaNumber === true} {...field} />
              </FormControl>

              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />

        <div className="flex flex-col justify-between">
          <label htmlFor="noVisaNumber" className="text-sm text-primary font-medium">
            Não sei o número
          </label>

          <div className="h-12">
            <Checkbox id="noVisaNumber" checked={noVisaNumber} onCheckedChange={setNoVisaNumber} />
          </div>
        </div>
      </div>

      <span className="text-primary text-base font-medium">
        Responda as próximas 6 perguntas somente se você está <strong>renovando</strong> o visto
      </span>

      <div className="w-full grid grid-cols-1 gap-4">
        <FormField
          control={formControl}
          name="newVisaConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">
                Está solicitando o novo visto do mesmo País ou localização daquele concedido previamente?
              </FormLabel>

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
          name="sameCountryResidenceConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">
                Este País é o mesmo onde está localizada sua residência principal?
              </FormLabel>

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
      </div>

      <div className="w-full grid grid-cols-1 gap-4">
        <FormField
          control={formControl}
          name="sameVisaTypeConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">
                Está solicitando o mesmo tipo de visto concedido anteriormente?
              </FormLabel>

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
          name="fingerprintsProvidedConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">Forneceu digitais dos 10 dedos</FormLabel>

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
      </div>

      <div className="w-full grid grid-cols-1 gap-4">
        <FormField
          control={formControl}
          name="lostVisaConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">Já teve um visto perdido ou roubado?</FormLabel>

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

        {lostVisaConfirmation === "Sim" && (
          <FormField
            control={formControl}
            name="lostVisaDetails"
            render={({ field }) => (
              <FormItem className="w-full bg-secondary p-4">
                <FormLabel className="text-primary text-sm">Em qual ano? Explique o ocorrido</FormLabel>

                <FormControl>
                  <Textarea className="resize-none" {...field} />
                </FormControl>

                <FormMessage className="text-sm text-red-500" />
              </FormItem>
            )}
          />
        )}
      </div>

      <div className="w-full grid grid-cols-1 gap-4">
        <FormField
          control={formControl}
          name="canceledVisaConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">Já teve um visto revogado ou cancelado?</FormLabel>

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

        {canceledVisaConfirmation === "Sim" && (
          <FormField
            control={formControl}
            name="canceledVisaDetails"
            render={({ field }) => (
              <FormItem className="w-full bg-secondary p-4">
                <FormLabel className="text-primary text-sm">Em qual ano? Explique o ocorrido</FormLabel>

                <FormControl>
                  <Textarea className="resize-none" {...field} />
                </FormControl>

                <FormMessage className="text-sm text-red-500" />
              </FormItem>
            )}
          />
        )}
      </div>

      <div className="w-full grid grid-cols-1 gap-4">
        <FormField
          control={formControl}
          name="deniedVisaConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">Já teve um visto negado?</FormLabel>

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

        {deniedVisaConfirmation === "Sim" && (
          <FormField
            control={formControl}
            name="deniedVisaDetails"
            render={({ field }) => (
              <FormItem className="w-full bg-secondary p-4">
                <FormLabel className="text-primary text-sm">Em qual ano? Explique o ocorrido</FormLabel>

                <FormControl>
                  <Textarea className="resize-none" {...field} />
                </FormControl>

                <FormMessage className="text-sm text-red-500" />
              </FormItem>
            )}
          />
        )}
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          control={formControl}
          name="consularPost"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary text-sm">Qual posto consular do Brasil?</FormLabel>

              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={formControl}
          name="deniedVisaType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary text-sm">Categoria/tipo de visto negado</FormLabel>

              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />
      </div>

      <div className="w-full grid grid-cols-1 gap-4">
        <FormField
          control={formControl}
          name="immigrationRequestByAnotherPersonConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">
                Alguém já solicitou alguma petição de imigração em seu nome perante o Departamento de Imigração dos
                Estados Unidos?
              </FormLabel>

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

        {immigrationRequestByAnotherPersonConfirmation === "Sim" && (
          <FormField
            control={formControl}
            name="immigrationRequestByAnotherPersonDetails"
            render={({ field }) => (
              <FormItem className="w-full bg-secondary p-4">
                <FormLabel className="text-primary text-sm">Explique o motivo</FormLabel>

                <FormControl>
                  <Textarea className="resize-none" {...field} />
                </FormControl>

                <FormMessage className="text-sm text-red-500" />
              </FormItem>
            )}
          />
        )}
      </div>
    </div>
  );
}
