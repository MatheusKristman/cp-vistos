"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2, Save } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FullForm } from "@/types";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  contagiousDiseaseConfirmation: z.enum(["Sim", "Não"]),
  phisicalMentalProblemConfirmation: z.enum(["Sim", "Não"]),
  crimeConfirmation: z.enum(["Sim", "Não"]),
  drugsProblemConfirmation: z.enum(["Sim", "Não"]),
  lawViolateConfirmation: z.enum(["Sim", "Não"]),
  prostitutionConfirmation: z.enum(["Sim", "Não"]),
  moneyLaundryConfirmation: z.enum(["Sim", "Não"]),
  peopleTrafficConfirmation: z.enum(["Sim", "Não"]),
  helpPeopleTrafficConfirmation: z.enum(["Sim", "Não"]),
  parentPeopleTrafficConfirmation: z.enum(["Sim", "Não"]),
  spyConfirmation: z.enum(["Sim", "Não"]),
  terrorismConfirmation: z.enum(["Sim", "Não"]),
  financialAssistanceConfirmation: z.enum(["Sim", "Não"]),
  terrorismMemberConfirmation: z.enum(["Sim", "Não"]),
  parentTerrorismConfirmation: z.enum(["Sim", "Não"]),
  genocideConfirmation: z.enum(["Sim", "Não"]),
  tortureConfirmation: z.enum(["Sim", "Não"]),
  assassinConfirmation: z.enum(["Sim", "Não"]),
  childSoldierConfirmation: z.enum(["Sim", "Não"]),
  religionLibertyConfirmation: z.enum(["Sim", "Não"]),
  abortConfirmation: z.enum(["Sim", "Não"]),
  coerciveTransplantConfirmation: z.enum(["Sim", "Não"]),
  visaFraudConfirmation: z.enum(["Sim", "Não"]),
  deportedConfirmation: z.enum(["Sim", "Não"]),
  childCustodyConfirmation: z.enum(["Sim", "Não"]),
  lawViolationConfirmation: z.enum(["Sim", "Não"]),
  avoidTaxConfirmation: z.enum(["Sim", "Não"]),
});

interface Props {
  currentForm: FullForm;
}

export function SecurityForm({ currentForm }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contagiousDiseaseConfirmation: currentForm.contagiousDiseaseConfirmation
        ? currentForm.contagiousDiseaseConfirmation === true
          ? "Sim"
          : "Não"
        : "Não",
      phisicalMentalProblemConfirmation:
        currentForm.phisicalMentalProblemConfirmation
          ? currentForm.phisicalMentalProblemConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
      crimeConfirmation: currentForm.crimeConfirmation
        ? currentForm.crimeConfirmation === true
          ? "Sim"
          : "Não"
        : "Não",
      drugsProblemConfirmation: currentForm.drugsProblemConfirmation
        ? currentForm.drugsProblemConfirmation === true
          ? "Sim"
          : "Não"
        : "Não",
      lawViolateConfirmation: currentForm.lawViolateConfirmation
        ? currentForm.lawViolateConfirmation === true
          ? "Sim"
          : "Não"
        : "Não",
      prostitutionConfirmation: currentForm.prostitutionConfirmation
        ? currentForm.prostitutionConfirmation === true
          ? "Sim"
          : "Não"
        : "Não",
      moneyLaundryConfirmation: currentForm.moneyLaundryConfirmation
        ? currentForm.moneyLaundryConfirmation === true
          ? "Sim"
          : "Não"
        : "Não",
      peopleTrafficConfirmation: currentForm.peopleTrafficConfirmation
        ? currentForm.peopleTrafficConfirmation === true
          ? "Sim"
          : "Não"
        : "Não",
      helpPeopleTrafficConfirmation: currentForm.helpPeopleTrafficConfirmation
        ? currentForm.helpPeopleTrafficConfirmation === true
          ? "Sim"
          : "Não"
        : "Não",
      parentPeopleTrafficConfirmation:
        currentForm.parentPeopleTrafficConfirmation
          ? currentForm.parentPeopleTrafficConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
      spyConfirmation: currentForm.spyConfirmation
        ? currentForm.spyConfirmation === true
          ? "Sim"
          : "Não"
        : "Não",
      terrorismConfirmation: currentForm.terrorismConfirmation
        ? currentForm.terrorismConfirmation === true
          ? "Sim"
          : "Não"
        : "Não",
      financialAssistanceConfirmation:
        currentForm.financialAssistanceConfirmation
          ? currentForm.financialAssistanceConfirmation === true
            ? "Sim"
            : "Não"
          : "Não",
      terrorismMemberConfirmation: currentForm.terrorismMemberConfirmation
        ? currentForm.terrorismMemberConfirmation === true
          ? "Sim"
          : "Não"
        : "Não",
      parentTerrorismConfirmation: currentForm.parentTerrorismConfirmation
        ? currentForm.parentTerrorismConfirmation === true
          ? "Sim"
          : "Não"
        : "Não",
      genocideConfirmation: currentForm.genocideConfirmation
        ? currentForm.genocideConfirmation === true
          ? "Sim"
          : "Não"
        : "Não",
      tortureConfirmation: currentForm.tortureConfirmation
        ? currentForm.tortureConfirmation === true
          ? "Sim"
          : "Não"
        : "Não",
      assassinConfirmation: currentForm.assassinConfirmation
        ? currentForm.assassinConfirmation === true
          ? "Sim"
          : "Não"
        : "Não",
      childSoldierConfirmation: currentForm.childSoldierConfirmation
        ? currentForm.childSoldierConfirmation === true
          ? "Sim"
          : "Não"
        : "Não",
      religionLibertyConfirmation: currentForm.religionLibertyConfirmation
        ? currentForm.religionLibertyConfirmation === true
          ? "Sim"
          : "Não"
        : "Não",
      abortConfirmation: currentForm.abortConfirmation
        ? currentForm.abortConfirmation === true
          ? "Sim"
          : "Não"
        : "Não",
      coerciveTransplantConfirmation: currentForm.coerciveTransplantConfirmation
        ? currentForm.coerciveTransplantConfirmation === true
          ? "Sim"
          : "Não"
        : "Não",
      visaFraudConfirmation: currentForm.visaFraudConfirmation
        ? currentForm.visaFraudConfirmation === true
          ? "Sim"
          : "Não"
        : "Não",
      deportedConfirmation: currentForm.deportedConfirmation
        ? currentForm.deportedConfirmation === true
          ? "Sim"
          : "Não"
        : "Não",
      childCustodyConfirmation: currentForm.childCustodyConfirmation
        ? currentForm.childCustodyConfirmation === true
          ? "Sim"
          : "Não"
        : "Não",
      lawViolationConfirmation: currentForm.lawViolationConfirmation
        ? currentForm.lawViolationConfirmation === true
          ? "Sim"
          : "Não"
        : "Não",
      avoidTaxConfirmation: currentForm.avoidTaxConfirmation
        ? currentForm.avoidTaxConfirmation === true
          ? "Sim"
          : "Não"
        : "Não",
    },
  });

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
          Segurança
        </h2>

        <div className="w-full flex flex-col gap-12">
          <div className="w-full flex flex-col gap-4">
            <div className="w-full grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="contagiousDiseaseConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Possui alguma doença contagiosa (cancroide, gonorreia,
                      granuloma inguinal, hanseníase infecciosa, linfogranuloma
                      venéreo, sífilis em estágio infeccioso, tuberculose ativa
                      e outras doenças, conforme determinado pelo Departamento
                      de Saúde e Serviços Humanos?
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

            <div className="w-full grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="phisicalMentalProblemConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Possui algum problema físico ou mental que possa
                      interferir em sua segurança ou de outras pessoas?
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

            <div className="w-full grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="crimeConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Você já foi preso ou condenado por algum delito ou crime,
                      mesmo que tenha sido objeto de perdão, anistia ou outra
                      ação semelhante?
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

            <div className="w-full grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="drugsProblemConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Já teve problemas com drogas?
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

            <div className="w-full grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="lawViolateConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Você já violou ou esteve envolvido em alguma conspiração
                      para violar qualquer lei relacionada ao controle de
                      substâncias?
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

            <div className="w-full grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="prostitutionConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Você está vindo para os Estados Unidos para se envolver em
                      prostituição ou vício comercializado ilegalmente ou esteve
                      envolvido em prostituição ou procura de prostitutas nos
                      últimos 10 anos?
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

            <div className="w-full grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="moneyLaundryConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Você já esteve envolvido ou pretende se envolver em
                      lavagem de dinheiro?
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

            <div className="w-full grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="peopleTrafficConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Você já cometeu ou conspirou para cometer um crime de
                      tráfico de pessoas nos Estados Unidos ou fora dos Estados
                      Unidos?
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

            <div className="w-full grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="helpPeopleTrafficConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Você já ajudou, encorajou, ajudou ou conspirou
                      conscientemente com um indivíduo que cometeu ou conspirou
                      para cometer um crime grave de tráfico de pessoas nos
                      Estados Unidos ou fora?
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

            <div className="w-full grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="parentPeopleTrafficConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Você é cônjuge, filho ou filha de um indivíduo que cometeu
                      ou conspirou para cometer um crime de tráfico de pessoas
                      nos Estados Unidos ou fora e, nos últimos cinco anos,
                      beneficiou-se conscientemente das atividades de tráfico?
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

            <div className="w-full grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="spyConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Você procura se envolver em espionagem, sabotagem,
                      violações de controle de exportação ou qualquer outra
                      atividade ilegal enquanto estiver nos Estados Unidos?
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

            <div className="w-full grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="terrorismConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Você procura se envolver em atividades terroristas
                      enquanto estiver nos Estados Unidos ou já se envolveu em
                      atividades terroristas?
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

            <div className="w-full grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="financialAssistanceConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Você já prestou ou pretende fornecer assistência
                      financeira ou outro tipo de apoio a terroristas ou
                      organizações terroristas?
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

            <div className="w-full grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="terrorismMemberConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Você é membro ou representante de uma organização
                      terrorista?
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

            <div className="w-full grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="parentTerrorismConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Você é cônjuge, filho ou filha de um indivíduo que se
                      envolveu em atividades terroristas, inclusive fornecendo
                      assistência financeira ou outro apoio a terroristas ou
                      organizações terroristas, nos últimos cinco anos?
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

            <div className="w-full grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="genocideConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Você já ordenou, incitou, cometeu, ajudou ou de alguma
                      forma participou de genocídio?
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

            <div className="w-full grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="tortureConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Você já cometeu, ordenou, incitou, ajudou ou participou de
                      alguma forma em tortura?
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

            <div className="w-full grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="assassinConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Você cometeu, ordenou, incitou, ajudou ou de alguma forma
                      participou em assassinatos extrajudiciais, assassinatos
                      políticos ou outros atos de violência?
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

            <div className="w-full grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="childSoldierConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Você já se envolveu no recrutamento ou na utilização de
                      crianças-soldados?
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

            <div className="w-full grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="religionLibertyConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Você, enquanto servia como funcionário do governo, foi
                      responsável ou executou diretamente, em qualquer momento,
                      violações particularmente graves da liberdade religiosa?
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

            <div className="w-full grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="abortConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Você já esteve diretamente envolvido no estabelecimento ou
                      na aplicação de controles populacionais que forçaram uma
                      mulher a se submeter a um aborto contra a sua livre
                      escolha ou um homem ou uma mulher a se submeter à
                      esterilização contra a sua livre vontade?
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

            <div className="w-full grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="coerciveTransplantConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Você já esteve diretamente envolvido no transplante
                      coercitivo de órgãos humanos ou tecidos corporais?
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

            <div className="w-full grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="visaFraudConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Você já tentou obter ou ajudar outras pessoas a obter um
                      visto, entrada nos Estados Unidos ou qualquer outro
                      benefício de imigração dos Estados Unidos por meio de
                      fraude, deturpação intencional ou outros meios ilegais?
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

            <div className="w-full grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="deportedConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Você já foi removido ou deportado de algum país?
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

            <div className="w-full grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="childCustodyConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Você já recebeu a custódia de uma criança cidadã dos EUA
                      fora dos Estados Unidos de uma pessoa que recebeu a
                      custódia legal de um tribunal dos EUA?
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

            <div className="w-full grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="lawViolationConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Você votou nos Estados Unidos violando alguma lei ou
                      regulamento?
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

            <div className="w-full grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="avoidTaxConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Você já renunciou à cidadania dos Estados Unidos para
                      evitar impostos?
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
