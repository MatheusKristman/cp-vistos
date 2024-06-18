//TODO: criar função para submit
//TODO: mandar para o proximo formulário

"use client";

import { Control } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import { ptBR } from "date-fns/locale";
import { format, getYear } from "date-fns";
import { Element } from "react-scroll";

import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { PrimaryFormControl } from "@/types";

interface Props {
  formControl: Control<PrimaryFormControl>;
  passportNoExpireDate: boolean;
  passportLostConfirmation: "Sim" | "Não";
}

export function PassportForm({ formControl, passportNoExpireDate, passportLostConfirmation }: Props) {
  const currentYear = getYear(new Date());

  return (
    <Element name="passport" className="w-full flex flex-col gap-6">
      <h2 className="w-full text-center text-2xl sm:text-3xl text-primary font-semibold my-12">Passaporte</h2>

      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
        <FormField
          control={formControl}
          name="passportNumber"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-between">
              <FormLabel className="text-primary text-sm">Número do passaporte*</FormLabel>

              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={formControl}
          name="passportCity"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-between">
              <FormLabel className="text-primary text-sm">Cidade*</FormLabel>

              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={formControl}
          name="passportState"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-between">
              <FormLabel className="text-primary text-sm">Estado*</FormLabel>

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
          control={formControl}
          name="passportIssuingCountry"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-between">
              <FormLabel className="text-primary text-sm">País emissor*</FormLabel>

              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={formControl}
          name="passportIssuingDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">Data de emissão*</FormLabel>

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
          name="passportExpireDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">Data de expiração*</FormLabel>

              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      disabled={passportNoExpireDate}
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
          name="passportNoExpireDate"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-3">
              <FormLabel className="text-sm text-primary">Sem expiração</FormLabel>

              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      <div className="w-full grid grid-cols-1 gap-4">
        <FormField
          control={formControl}
          name="passportLostConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">Você já perdeu um passaporte ou teve ele roubado?*</FormLabel>

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

      <div
        className={cn("w-full grid grid-cols-1 sm:grid-cols-2 gap-4", { hidden: passportLostConfirmation === "Não" })}
      >
        <FormField
          control={formControl}
          name="lostPassportNumber"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-between">
              <FormLabel className="text-primary text-sm">Informe o número do passaporte</FormLabel>

              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={formControl}
          name="lostPassportCountry"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-between">
              <FormLabel className="text-primary text-sm">Informe o país do passaporte</FormLabel>

              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />
      </div>

      <div className={cn("w-full grid grid-cols-1 gap-4", { hidden: passportLostConfirmation === "Não" })}>
        <FormField
          control={formControl}
          name="lostPassportDetails"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-between">
              <FormLabel className="text-primary text-sm">Explique o ocorrido</FormLabel>

              <FormControl>
                <Textarea className="resize-none" {...field} />
              </FormControl>

              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />
      </div>
    </Element>
  );
}
