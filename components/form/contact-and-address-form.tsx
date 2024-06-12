"use client";

import { Control } from "react-hook-form";
import PhoneInput from "react-phone-number-input";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { PrimaryFormControl } from "@/types";

import "react-phone-number-input/style.css";

interface Props {
  formControl: Control<PrimaryFormControl>;
  postalAddressConfirmation: "Sim" | "Não";
  fiveYearsOtherTelConfirmation: "Sim" | "Não";
  fiveYearsOtherEmailConfirmation: "Sim" | "Não";
}

export function ContactAndAddressForm({
  formControl,
  postalAddressConfirmation,
  fiveYearsOtherTelConfirmation,
  fiveYearsOtherEmailConfirmation,
}: Props) {
  return (
    <div className="w-full flex flex-col gap-6">
      <h2 className="w-full text-center text-2xl sm:text-3xl text-primary font-semibold my-12">
        Endereço e Contatos
      </h2>

      <span className="text-primary text-base font-medium">
        Endereço de sua residencia
      </span>

      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
        <FormField
          control={formControl}
          name="address"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-between">
              <FormLabel className="text-primary text-sm">Endereço*</FormLabel>

              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={formControl}
          name="city"
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
          name="state"
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

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          control={formControl}
          name="cep"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-between">
              <FormLabel className="text-primary text-sm">CEP*</FormLabel>

              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={formControl}
          name="country"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-between">
              <FormLabel className="text-primary text-sm">País*</FormLabel>

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
          control={formControl}
          name="postalAddressConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">
                Seu endereço de correio é o mesmo endereço de sua residência?*
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

        {postalAddressConfirmation === "Sim" && (
          <FormField
            control={formControl}
            name="otherPostalAddress"
            render={({ field }) => (
              <FormItem className="w-full bg-secondary p-4">
                <FormLabel className="text-primary text-sm">
                  Informe seu outro endereço
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

      <span className="text-primary text-base font-medium mt-6">Telefone</span>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          control={formControl}
          name="cel"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-between">
              <FormLabel className="text-primary text-sm">Celular*</FormLabel>

              <FormControl>
                <PhoneInput
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

        <FormField
          control={formControl}
          name="tel"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-between">
              <FormLabel className="text-primary text-sm">Fixo*</FormLabel>

              <FormControl>
                <PhoneInput
                  limitMaxLength
                  smartCaret={false}
                  placeholder="Insira seu telefone fixo..."
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

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="w-full flex flex-col justify-between gap-4">
          <FormField
            control={formControl}
            name="fiveYearsOtherTelConfirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary">
                  Nos últimos 5 anos você usou outros números de telefone?*
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

          {fiveYearsOtherTelConfirmation === "Sim" && (
            <FormField
              control={formControl}
              name="otherTel"
              render={({ field }) => (
                <FormItem className="w-full bg-secondary p-4">
                  <FormLabel className="text-primary text-sm">
                    Informe seu outro telefone
                  </FormLabel>

                  <FormControl>
                    <PhoneInput
                      limitMaxLength
                      smartCaret={false}
                      placeholder="Insira seu outro telefone..."
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
          )}
        </div>

        <FormField
          control={formControl}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-primary text-sm">E-mail*</FormLabel>

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
          control={formControl}
          name="fiveYearsOtherEmailConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">
                Nos últimos 5 anos você teve outros e-mails?*
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

        {fiveYearsOtherEmailConfirmation === "Sim" && (
          <FormField
            control={formControl}
            name="otherEmail"
            render={({ field }) => (
              <FormItem className="w-full bg-secondary p-4">
                <FormLabel className="text-primary text-sm">
                  Informe seu outro e-mail
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

      <span className="text-primary text-base font-medium mt-6">
        Redes sociais (Somente @ ou nome)
      </span>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          control={formControl}
          name="facebook"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary text-sm">Facebook</FormLabel>

              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={formControl}
          name="linkedin"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary text-sm">Linkedin</FormLabel>

              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={formControl}
          name="instagram"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary text-sm">Instagram</FormLabel>

              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={formControl}
          name="othersSocialMedia"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary text-sm">
                Outras Redes
              </FormLabel>

              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
