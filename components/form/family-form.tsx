//TODO: criar função para submit
//TODO: mandar para o proximo formulário

"use client";

import { Control } from "react-hook-form";
import { Plus, Trash } from "lucide-react";
import { format, getYear } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { Element } from "react-scroll";

import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { PrimaryFormControl } from "@/types";
import useFormStore, { FamilyLivingInTheUSADetails } from "@/constants/stores/useFormStore";
import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent } from "react";

interface Props {
  formControl: Control<PrimaryFormControl>;
  fatherLiveInTheUSAConfirmation: "Sim" | "Não";
  motherLiveInTheUSAConfirmation: "Sim" | "Não";
  familyLivingInTheUSAConfirmation: "Sim" | "Não";
}

export function FamilyForm({
  formControl,
  fatherLiveInTheUSAConfirmation,
  motherLiveInTheUSAConfirmation,
  familyLivingInTheUSAConfirmation,
}: Props) {
  const currentYear = getYear(new Date());
  const {
    familyLivingInTheUSA,
    familyLivingInTheUSAIndex,
    familyLivingInTheUSAError,
    setFamilyLivingInTheUSA,
    setFamilyLivingInTheUSAError,
    setFamilyLivingInTheUSAIndex,
  } = useFormStore();

  function handleFamilyLivingInTheUSAChange(value: string, property: "name" | "relation" | "situation", index: number) {
    const arr = [...familyLivingInTheUSA];

    arr[index][property] = value;

    setFamilyLivingInTheUSA(arr);
  }

  function handleAddFamilyLivingInTheUSAInput() {
    setFamilyLivingInTheUSAIndex(familyLivingInTheUSAIndex + 1);

    const arr = [...familyLivingInTheUSA];

    arr.push({
      name: "",
      relation: "",
      situation: "",
    });

    setFamilyLivingInTheUSA(arr);
  }

  function handleRemoveFamilyLivingInTheUSAInput(index: number) {
    setFamilyLivingInTheUSAIndex(familyLivingInTheUSAIndex - 1);

    let arr = [...familyLivingInTheUSA].filter((value: FamilyLivingInTheUSADetails, i: number) => i !== index);

    setFamilyLivingInTheUSA(arr);
  }

  return (
    <Element name="family" className="w-full flex flex-col gap-6">
      <h2 className="w-full text-center text-2xl sm:text-3xl text-foreground font-semibold my-12">
        Informações da Família
      </h2>

      <span className="text-foreground text-base font-medium">Inserir todos os dados, mesmo se falecidos</span>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          control={formControl}
          name="fatherCompleteName"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-between">
              <FormLabel className="text-foreground text-sm">Nome completo do pai*</FormLabel>

              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={formControl}
          name="fatherBirthdate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">Data de nascimento do pai*</FormLabel>

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

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          control={formControl}
          name="fatherLiveInTheUSAConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">Seu pai se encontra nos EUA?</FormLabel>

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

        {fatherLiveInTheUSAConfirmation === "Sim" && (
          <FormField
            control={formControl}
            name="fatherUSASituation"
            render={({ field }) => (
              <FormItem className="w-full bg-secondary p-4">
                <FormLabel className="text-foreground text-sm">
                  Em qual situação? (trabalhando legalmente, passeando, etc)
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
          control={formControl}
          name="motherCompleteName"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-between">
              <FormLabel className="text-foreground text-sm">Nome completo da mãe*</FormLabel>

              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={formControl}
          name="motherBirthdate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">Data de nascimento da mãe*</FormLabel>

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

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          control={formControl}
          name="motherLiveInTheUSAConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">Sua mãe se encontra nos EUA?</FormLabel>

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

        {motherLiveInTheUSAConfirmation === "Sim" && (
          <FormField
            control={formControl}
            name="motherUSASituation"
            render={({ field }) => (
              <FormItem className="w-full bg-secondary p-4">
                <FormLabel className="text-foreground text-sm">
                  Em qual situação? (trabalhando legalmente, passeando, etc)
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
          control={formControl}
          name="familyLivingInTheUSAConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">Excluindo os pais, há alguém da sua família nos EUA?</FormLabel>

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

        {familyLivingInTheUSAConfirmation === "Sim" && (
          <div className="w-full  flex flex-col gap-8 mt-6">
            <span className="text-foreground text-base font-medium">Em caso afirmativo, informe:</span>

            <div className="w-full flex flex-col gap-6">
              {familyLivingInTheUSA.map((obj, index) => (
                <div
                  key={`family-living-in-the-usa-${index}`}
                  className="w-full bg-secondary p-4 flex sm:items-end gap-4"
                >
                  <div className="w-full grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-[auto_1fr] gap-4">
                    <div className="w-full flex flex-col gap-2 sm:h-fit">
                      <label className="text-sm text-foreground font-medium">Nome</label>

                      <Input
                        value={obj.name!}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                          handleFamilyLivingInTheUSAChange(event.target.value, "name", index)
                        }
                      />
                    </div>

                    <div className="w-full flex flex-col gap-2 sm:h-fit">
                      <label className="text-sm text-foreground font-medium">Parentesco</label>

                      <Input
                        value={obj.relation!}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                          handleFamilyLivingInTheUSAChange(event.target.value, "relation", index)
                        }
                      />
                    </div>

                    <div className="w-full flex flex-col gap-2 sm:col-span-2">
                      <label className="text-sm text-foreground font-medium">
                        Situação (cidadão americano, residente legal, não imigrante, etc...)
                      </label>

                      <Textarea
                        className="resize-none"
                        value={obj.situation!}
                        onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                          handleFamilyLivingInTheUSAChange(event.target.value, "situation", index)
                        }
                      />
                    </div>
                  </div>

                  {index === familyLivingInTheUSAIndex - 1 ? (
                    <Button
                      type="button"
                      size="xl"
                      className="px-3"
                      disabled={obj.name === "" || obj.relation === "" || obj.situation === ""}
                      onClick={handleAddFamilyLivingInTheUSAInput}
                    >
                      <Plus />
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      size="xl"
                      className="px-3"
                      onClick={() => handleRemoveFamilyLivingInTheUSAInput(index)}
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

      <span className="text-foreground text-base font-medium">Dados do cônjuge, parceiro doméstico ou ex-cônjuge</span>

      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
        <FormField
          control={formControl}
          name="partnerCompleteName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground text-sm">Nome completo</FormLabel>

              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={formControl}
          name="partnerBirthdate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground text-sm">Data de nascimento</FormLabel>

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
          name="partnerNationality"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground text-sm">Nacionalidade</FormLabel>

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
          name="partnerCity"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground text-sm">Cidade de nascimento</FormLabel>

              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={formControl}
          name="partnerState"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground text-sm">Estado de nascimento</FormLabel>

              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={formControl}
          name="partnerCountry"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground text-sm">País de nascimento</FormLabel>

              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />
      </div>

      <span className="text-foreground text-base font-medium">Se separado(a) ou divorciado(a)</span>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          control={formControl}
          name="unionDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground text-sm">Data da união</FormLabel>

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
          name="divorceDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground text-sm">Data da separação</FormLabel>

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
    </Element>
  );
}
