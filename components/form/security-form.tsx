"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2, Save } from "lucide-react";
import { Form as FormType } from "@prisma/client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import useFormStore from "@/constants/stores/useFormStore";
import { trpc } from "@/lib/trpc-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect } from "react";

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
  currentForm: FormType;
  profileId: string;
  isEditing: boolean;
}

export function SecurityForm({ currentForm, profileId, isEditing }: Props) {
  const { redirectStep, setRedirectStep } = useFormStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contagiousDiseaseConfirmation: currentForm.contagiousDiseaseConfirmation
        ? "Sim"
        : "Não",
      phisicalMentalProblemConfirmation:
        currentForm.phisicalMentalProblemConfirmation ? "Sim" : "Não",
      crimeConfirmation: currentForm.crimeConfirmation ? "Sim" : "Não",
      drugsProblemConfirmation: currentForm.drugsProblemConfirmation
        ? "Sim"
        : "Não",
      lawViolateConfirmation: currentForm.lawViolateConfirmation
        ? "Sim"
        : "Não",
      prostitutionConfirmation: currentForm.prostitutionConfirmation
        ? "Sim"
        : "Não",
      moneyLaundryConfirmation: currentForm.moneyLaundryConfirmation
        ? "Sim"
        : "Não",
      peopleTrafficConfirmation: currentForm.peopleTrafficConfirmation
        ? "Sim"
        : "Não",
      helpPeopleTrafficConfirmation: currentForm.helpPeopleTrafficConfirmation
        ? "Sim"
        : "Não",
      parentPeopleTrafficConfirmation:
        currentForm.parentPeopleTrafficConfirmation ? "Sim" : "Não",
      spyConfirmation: currentForm.spyConfirmation ? "Sim" : "Não",
      terrorismConfirmation: currentForm.terrorismConfirmation ? "Sim" : "Não",
      financialAssistanceConfirmation:
        currentForm.financialAssistanceConfirmation ? "Sim" : "Não",
      terrorismMemberConfirmation: currentForm.terrorismMemberConfirmation
        ? "Sim"
        : "Não",
      parentTerrorismConfirmation: currentForm.parentTerrorismConfirmation
        ? "Sim"
        : "Não",
      genocideConfirmation: currentForm.genocideConfirmation ? "Sim" : "Não",
      tortureConfirmation: currentForm.tortureConfirmation ? "Sim" : "Não",
      assassinConfirmation: currentForm.assassinConfirmation ? "Sim" : "Não",
      childSoldierConfirmation: currentForm.childSoldierConfirmation
        ? "Sim"
        : "Não",
      religionLibertyConfirmation: currentForm.religionLibertyConfirmation
        ? "Sim"
        : "Não",
      abortConfirmation: currentForm.abortConfirmation ? "Sim" : "Não",
      coerciveTransplantConfirmation: currentForm.coerciveTransplantConfirmation
        ? "Sim"
        : "Não",
      visaFraudConfirmation: currentForm.visaFraudConfirmation ? "Sim" : "Não",
      deportedConfirmation: currentForm.deportedConfirmation ? "Sim" : "Não",
      childCustodyConfirmation: currentForm.childCustodyConfirmation
        ? "Sim"
        : "Não",
      lawViolationConfirmation: currentForm.lawViolationConfirmation
        ? "Sim"
        : "Não",
      avoidTaxConfirmation: currentForm.avoidTaxConfirmation ? "Sim" : "Não",
    },
  });

  const utils = trpc.useUtils();
  const router = useRouter();

  const { mutate: submitSecurity, isPending } =
    trpc.formsRouter.submitSecurity.useMutation({
      onSuccess: (data) => {
        toast.success(data.message);
        utils.formsRouter.getForm.invalidate();

        router.push(`/resumo-formulario/${profileId}`);
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
  const { mutate: saveSecurity, isPending: isSavePending } =
    trpc.formsRouter.saveSecurity.useMutation({
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

      saveSecurity({
        profileId,
        redirectStep,
        contagiousDiseaseConfirmation:
          values.contagiousDiseaseConfirmation ??
          (currentForm.contagiousDiseaseConfirmation ? "Sim" : "Não"),
        phisicalMentalProblemConfirmation:
          values.phisicalMentalProblemConfirmation ??
          (currentForm.phisicalMentalProblemConfirmation ? "Sim" : "Não"),
        crimeConfirmation:
          values.crimeConfirmation ??
          (currentForm.crimeConfirmation ? "Sim" : "Não"),
        drugsProblemConfirmation:
          values.drugsProblemConfirmation ??
          (currentForm.drugsProblemConfirmation ? "Sim" : "Não"),
        lawViolateConfirmation:
          values.lawViolateConfirmation ??
          (currentForm.lawViolateConfirmation ? "Sim" : "Não"),
        prostitutionConfirmation:
          values.prostitutionConfirmation ??
          (currentForm.prostitutionConfirmation ? "Sim" : "Não"),
        moneyLaundryConfirmation:
          values.moneyLaundryConfirmation ??
          (currentForm.moneyLaundryConfirmation ? "Sim" : "Não"),
        peopleTrafficConfirmation:
          values.peopleTrafficConfirmation ??
          (currentForm.peopleTrafficConfirmation ? "Sim" : "Não"),
        helpPeopleTrafficConfirmation:
          values.helpPeopleTrafficConfirmation ??
          (currentForm.helpPeopleTrafficConfirmation ? "Sim" : "Não"),
        parentPeopleTrafficConfirmation:
          values.parentPeopleTrafficConfirmation ??
          (currentForm.parentPeopleTrafficConfirmation ? "Sim" : "Não"),
        spyConfirmation:
          values.spyConfirmation ??
          (currentForm.spyConfirmation ? "Sim" : "Não"),
        terrorismConfirmation:
          values.terrorismConfirmation ??
          (currentForm.terrorismConfirmation ? "Sim" : "Não"),
        financialAssistanceConfirmation:
          values.financialAssistanceConfirmation ??
          (currentForm.financialAssistanceConfirmation ? "Sim" : "Não"),
        terrorismMemberConfirmation:
          values.terrorismMemberConfirmation ??
          (currentForm.terrorismMemberConfirmation ? "Sim" : "Não"),
        parentTerrorismConfirmation:
          values.parentTerrorismConfirmation ??
          (currentForm.parentTerrorismConfirmation ? "Sim" : "Não"),
        genocideConfirmation:
          values.genocideConfirmation ??
          (currentForm.genocideConfirmation ? "Sim" : "Não"),
        tortureConfirmation:
          values.tortureConfirmation ??
          (currentForm.tortureConfirmation ? "Sim" : "Não"),
        assassinConfirmation:
          values.assassinConfirmation ??
          (currentForm.assassinConfirmation ? "Sim" : "Não"),
        childSoldierConfirmation:
          values.childSoldierConfirmation ??
          (currentForm.childSoldierConfirmation ? "Sim" : "Não"),
        religionLibertyConfirmation:
          values.religionLibertyConfirmation ??
          (currentForm.religionLibertyConfirmation ? "Sim" : "Não"),
        abortConfirmation:
          values.abortConfirmation ??
          (currentForm.abortConfirmation ? "Sim" : "Não"),
        coerciveTransplantConfirmation:
          values.coerciveTransplantConfirmation ??
          (currentForm.coerciveTransplantConfirmation ? "Sim" : "Não"),
        visaFraudConfirmation:
          values.visaFraudConfirmation ??
          (currentForm.visaFraudConfirmation ? "Sim" : "Não"),
        deportedConfirmation:
          values.deportedConfirmation ??
          (currentForm.deportedConfirmation ? "Sim" : "Não"),
        childCustodyConfirmation:
          values.childCustodyConfirmation ??
          (currentForm.childCustodyConfirmation ? "Sim" : "Não"),
        lawViolationConfirmation:
          values.lawViolationConfirmation ??
          (currentForm.lawViolationConfirmation ? "Sim" : "Não"),
        avoidTaxConfirmation:
          values.avoidTaxConfirmation ??
          (currentForm.avoidTaxConfirmation ? "Sim" : "Não"),
      });
      setRedirectStep(null);
    }
  }, [redirectStep, setRedirectStep, saveSecurity, profileId]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    submitSecurity({ ...values, profileId, step: 11, isEditing });
  }

  function onSave() {
    const values = form.getValues();

    saveSecurity({
      profileId,
      contagiousDiseaseConfirmation:
        values.contagiousDiseaseConfirmation ??
        (currentForm.contagiousDiseaseConfirmation ? "Sim" : "Não"),
      phisicalMentalProblemConfirmation:
        values.phisicalMentalProblemConfirmation ??
        (currentForm.phisicalMentalProblemConfirmation ? "Sim" : "Não"),
      crimeConfirmation:
        values.crimeConfirmation ??
        (currentForm.crimeConfirmation ? "Sim" : "Não"),
      drugsProblemConfirmation:
        values.drugsProblemConfirmation ??
        (currentForm.drugsProblemConfirmation ? "Sim" : "Não"),
      lawViolateConfirmation:
        values.lawViolateConfirmation ??
        (currentForm.lawViolateConfirmation ? "Sim" : "Não"),
      prostitutionConfirmation:
        values.prostitutionConfirmation ??
        (currentForm.prostitutionConfirmation ? "Sim" : "Não"),
      moneyLaundryConfirmation:
        values.moneyLaundryConfirmation ??
        (currentForm.moneyLaundryConfirmation ? "Sim" : "Não"),
      peopleTrafficConfirmation:
        values.peopleTrafficConfirmation ??
        (currentForm.peopleTrafficConfirmation ? "Sim" : "Não"),
      helpPeopleTrafficConfirmation:
        values.helpPeopleTrafficConfirmation ??
        (currentForm.helpPeopleTrafficConfirmation ? "Sim" : "Não"),
      parentPeopleTrafficConfirmation:
        values.parentPeopleTrafficConfirmation ??
        (currentForm.parentPeopleTrafficConfirmation ? "Sim" : "Não"),
      spyConfirmation:
        values.spyConfirmation ?? (currentForm.spyConfirmation ? "Sim" : "Não"),
      terrorismConfirmation:
        values.terrorismConfirmation ??
        (currentForm.terrorismConfirmation ? "Sim" : "Não"),
      financialAssistanceConfirmation:
        values.financialAssistanceConfirmation ??
        (currentForm.financialAssistanceConfirmation ? "Sim" : "Não"),
      terrorismMemberConfirmation:
        values.terrorismMemberConfirmation ??
        (currentForm.terrorismMemberConfirmation ? "Sim" : "Não"),
      parentTerrorismConfirmation:
        values.parentTerrorismConfirmation ??
        (currentForm.parentTerrorismConfirmation ? "Sim" : "Não"),
      genocideConfirmation:
        values.genocideConfirmation ??
        (currentForm.genocideConfirmation ? "Sim" : "Não"),
      tortureConfirmation:
        values.tortureConfirmation ??
        (currentForm.tortureConfirmation ? "Sim" : "Não"),
      assassinConfirmation:
        values.assassinConfirmation ??
        (currentForm.assassinConfirmation ? "Sim" : "Não"),
      childSoldierConfirmation:
        values.childSoldierConfirmation ??
        (currentForm.childSoldierConfirmation ? "Sim" : "Não"),
      religionLibertyConfirmation:
        values.religionLibertyConfirmation ??
        (currentForm.religionLibertyConfirmation ? "Sim" : "Não"),
      abortConfirmation:
        values.abortConfirmation ??
        (currentForm.abortConfirmation ? "Sim" : "Não"),
      coerciveTransplantConfirmation:
        values.coerciveTransplantConfirmation ??
        (currentForm.coerciveTransplantConfirmation ? "Sim" : "Não"),
      visaFraudConfirmation:
        values.visaFraudConfirmation ??
        (currentForm.visaFraudConfirmation ? "Sim" : "Não"),
      deportedConfirmation:
        values.deportedConfirmation ??
        (currentForm.deportedConfirmation ? "Sim" : "Não"),
      childCustodyConfirmation:
        values.childCustodyConfirmation ??
        (currentForm.childCustodyConfirmation ? "Sim" : "Não"),
      lawViolationConfirmation:
        values.lawViolationConfirmation ??
        (currentForm.lawViolationConfirmation ? "Sim" : "Não"),
      avoidTaxConfirmation:
        values.avoidTaxConfirmation ??
        (currentForm.avoidTaxConfirmation ? "Sim" : "Não"),
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col flex-grow gap-6"
      >
        <h2 className="w-full text-center text-2xl sm:text-3xl text-foreground font-semibold mb-6">
          Segurança
        </h2>

        <div className="w-full flex flex-col gap-12 justify-between flex-grow">
          <div className="w-full flex flex-col">
            <div className="w-full grid grid-cols-1 gap-4 mb-10">
              <FormField
                control={form.control}
                name="contagiousDiseaseConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Possui alguma doença contagiosa (cancroide, gonorreia,
                      granuloma inguinal, hanseníase infecciosa, linfogranuloma
                      venéreo, sífilis em estágio infeccioso, tuberculose ativa
                      e outras doenças) conforme determinado pelo Departamento
                      de Saúde e Serviços Humanos?
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

            <div className="w-full grid grid-cols-1 gap-4 mb-10">
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

            <div className="w-full grid grid-cols-1 gap-4 mb-10">
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

            <div className="w-full grid grid-cols-1 gap-4 mb-10">
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

            <div className="w-full grid grid-cols-1 gap-4 mb-10">
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

            <div className="w-full grid grid-cols-1 gap-4 mb-10">
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

            <div className="w-full grid grid-cols-1 gap-4 mb-10">
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

            <div className="w-full grid grid-cols-1 gap-4 mb-10">
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

            <div className="w-full grid grid-cols-1 gap-4 mb-10">
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

            <div className="w-full grid grid-cols-1 gap-4 mb-10">
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

            <div className="w-full grid grid-cols-1 gap-4 mb-10">
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

            <div className="w-full grid grid-cols-1 gap-4 mb-10">
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

            <div className="w-full grid grid-cols-1 gap-4 mb-10">
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

            <div className="w-full grid grid-cols-1 gap-4 mb-10">
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

            <div className="w-full grid grid-cols-1 gap-4 mb-10">
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

            <div className="w-full grid grid-cols-1 gap-4 mb-10">
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

            <div className="w-full grid grid-cols-1 gap-4 mb-10">
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

            <div className="w-full grid grid-cols-1 gap-4 mb-10">
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

            <div className="w-full grid grid-cols-1 gap-4 mb-10">
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

            <div className="w-full grid grid-cols-1 gap-4 mb-10">
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

            <div className="w-full grid grid-cols-1 gap-4 mb-10">
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

            <div className="w-full grid grid-cols-1 gap-4 mb-10">
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

            <div className="w-full grid grid-cols-1 gap-4 mb-10">
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

            <div className="w-full grid grid-cols-1 gap-4 mb-10">
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

            <div className="w-full grid grid-cols-1 gap-4 mb-10">
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

            <div className="w-full grid grid-cols-1 gap-4 mb-10">
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
          </div>

          <div className="w-full flex flex-col-reverse items-center gap-4 sm:flex-row sm:justify-end">
            {isEditing ? (
              <>
                <Button
                  size="xl"
                  type="submit"
                  className="w-full flex items-center gap-2 sm:w-fit"
                  disabled={isPending || isSavePending}
                >
                  {isPending ? (
                    <>
                      Salvando
                      <Loader2
                        className="size-5 animate-spin"
                        strokeWidth={1.5}
                      />
                    </>
                  ) : (
                    <>
                      Salvar
                      <Save className="size-5" strokeWidth={1.5} />
                    </>
                  )}
                </Button>
              </>
            ) : (
              <>
                <Button
                  size="xl"
                  variant="outline"
                  type="button"
                  className="w-full flex items-center gap-2 sm:w-fit"
                  disabled={isPending || isSavePending}
                  onClick={onSave}
                >
                  {isSavePending ? (
                    <>
                      Salvando
                      <Loader2
                        className="size-5 animate-spin"
                        strokeWidth={1.5}
                      />
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
                  type="submit"
                  className="w-full flex items-center gap-2 sm:w-fit"
                  disabled={isPending || isSavePending}
                >
                  {isPending ? (
                    <>
                      Enviando
                      <Loader2
                        className="size-5 animate-spin"
                        strokeWidth={1.5}
                      />
                    </>
                  ) : (
                    <>
                      Enviar
                      <ArrowRight className="size-5" strokeWidth={1.5} />
                    </>
                  )}
                </Button>
              </>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
}
