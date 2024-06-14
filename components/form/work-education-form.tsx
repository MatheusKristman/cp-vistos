//TODO: criar função para submit
//TODO: mandar para o proximo formulário
//TODO: incluir previousJobs no store
//TODO: incluir courses no store

"use client";

import { Control } from "react-hook-form";
import { Plus, Trash } from "lucide-react";
import { format, getYear } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { AmericanLicense, FamilyLivingInTheUSADetails, USALastTravel } from "@prisma/client";
import PhoneInput from "react-phone-number-input";

import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { PrimaryFormControl } from "@/types";
import useFormStore from "@/constants/stores/useFormStore";
import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent } from "react";

interface Props {
  formControl: Control<PrimaryFormControl>;
  occupation: string;
}

export function WorkEducationForm({ formControl, occupation }: Props) {
  const currentYear = getYear(new Date());

  return (
    <div className="w-full flex flex-col gap-6">
      <h2 className="w-full text-center text-2xl sm:text-3xl text-primary font-semibold my-12">Trabalho e Educação</h2>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          control={formControl}
          name="occupation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">Selecione a sua ocupação atual?*</FormLabel>

              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a opção" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  <SelectItem value="Aposentado">Aposentado</SelectItem>

                  <SelectItem value="Dona de Casa">Dona de Casa</SelectItem>

                  <SelectItem value="Estudante">Estudante</SelectItem>

                  <SelectItem value="Empresário">Empresário</SelectItem>

                  <SelectItem value="Outro">Outro</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />
      </div>

      {occupation === "Aposentado" ? (
        <>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={formControl}
              name="retireeDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">Data de aposentadoria</FormLabel>

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
          </div>
        </>
      ) : occupation === "Dona de Casa" ? null : occupation === "Estudante" ? null : occupation === "Empresário" ? (
        <>
          <div className="w-full grid grid-cols-1 gap-4">
            <FormField
              control={formControl}
              name="companyOrBossName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary text-sm">Nome fantasia ou razão social</FormLabel>

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
              control={formControl}
              name="companyAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary text-sm">Endereço completo</FormLabel>

                  <FormControl>
                    <Input {...field} />
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
                  <FormLabel className="text-primary text-sm">Cidade</FormLabel>

                  <FormControl>
                    <Input {...field} />
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
                  <FormLabel className="text-primary text-sm">Estado</FormLabel>

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
              control={formControl}
              name="companyCountry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary text-sm">País</FormLabel>

                  <FormControl>
                    <Input {...field} />
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
                  <FormLabel className="text-primary text-sm">CEP</FormLabel>

                  <FormControl>
                    <Input {...field} />
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
                  <FormLabel className="text-primary text-sm">Telefone</FormLabel>

                  <FormControl>
                    <PhoneInput
                      limitMaxLength
                      smartCaret={false}
                      placeholder="Insira o telefone da empresa..."
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

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={formControl}
              name="admissionDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">Data da abertura da empresa</FormLabel>

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
              name="monthlySalary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary text-sm">Renda mensal (R$)</FormLabel>

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
              name="jobDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary text-sm">
                    Descreva quais são suas funções dentro da sua empresa, se possui funcionários registrados e outras
                    informações relacionadas ao seu negócio
                  </FormLabel>

                  <FormControl>
                    <Textarea className="resize-none" {...field} />
                  </FormControl>

                  <FormMessage className="text-sm text-red-500" />
                </FormItem>
              )}
            />
          </div>
        </>
      ) : occupation === "Outro" ? (
        <>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={formControl}
              name="office"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary text-sm">Cargo / função</FormLabel>

                  <FormControl>
                    <Input {...field} />
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
                  <FormLabel className="text-primary text-sm">Nome do empregador atual ou empresa</FormLabel>

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
              control={formControl}
              name="companyAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary text-sm">Endereço completo</FormLabel>

                  <FormControl>
                    <Input {...field} />
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
                  <FormLabel className="text-primary text-sm">Cidade</FormLabel>

                  <FormControl>
                    <Input {...field} />
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
                  <FormLabel className="text-primary text-sm">Estado</FormLabel>

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
              control={formControl}
              name="companyCountry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary text-sm">País</FormLabel>

                  <FormControl>
                    <Input {...field} />
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
                  <FormLabel className="text-primary text-sm">CEP</FormLabel>

                  <FormControl>
                    <Input {...field} />
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
                  <FormLabel className="text-primary text-sm">Telefone</FormLabel>

                  <FormControl>
                    <PhoneInput
                      limitMaxLength
                      smartCaret={false}
                      placeholder="Insira o telefone da empresa..."
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

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={formControl}
              name="admissionDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">Data de admissão</FormLabel>

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
              name="monthlySalary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary text-sm">Renda mensal (R$)</FormLabel>

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
              name="jobDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary text-sm">
                    Descreva quais são suas funções dentro da sua empresa, se possui funcionários registrados e outras
                    informações relacionadas ao seu negócio
                  </FormLabel>

                  <FormControl>
                    <Textarea className="resize-none" {...field} />
                  </FormControl>

                  <FormMessage className="text-sm text-red-500" />
                </FormItem>
              )}
            />
          </div>
        </>
      ) : null}
    </div>
  );
}
