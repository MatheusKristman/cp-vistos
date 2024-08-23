"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { Header } from "@/components/global/header";
import { MobileMenu } from "@/components/global/mobile-menu";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { trpc } from "@/lib/trpc-client";
import { PersonalDataForm } from "@/components/form/personal-data-form";
import { ContactAndAddressForm } from "@/components/form/contact-and-address-form";
import { PassportForm } from "@/components/form/passport-form";
import { AboutTravelForm } from "@/components/form/about-travel-form";
import { TravelCompanyForm } from "@/components/form/travel-company-form";
import { PreviousTravelForm } from "@/components/form/previous-travel-form";
import { USAContactForm } from "@/components/form/usa-contact-form";
import { FamilyForm } from "@/components/form/family-form";
import { WorkEducationForm } from "@/components/form/work-education-form";
import { AdditionalInformationForm } from "@/components/form/additional-information-form";
import { SecurityForm } from "@/components/form/security-form";

import "react-phone-number-input/style.css";
import { Loader2 } from "lucide-react";
import useFormStore from "@/constants/stores/useFormStore";

const STEPS = [
  { label: "Dados Pessoais", step: 0 },
  { label: "Endereço e Contatos", step: 1 },
  { label: "Passaporte", step: 2 },
  { label: "Sobre a Viagem", step: 3 },
  { label: "Companhia de Viagem", step: 4 },
  { label: "Viagens Anteriores", step: 5 },
  { label: "Contato nos Estados Unidos", step: 6 },
  { label: "Informações da Família", step: 7 },
  { label: "Trabalho e Educação", step: 8 },
  { label: "Informações Adicionais", step: 9 },
  { label: "Segurança", step: 10 },
] as const;

export default function FormPage({
  params,
}: {
  params: { profileId: string };
}) {
  const profileId = params.profileId;
  const searchParams = useSearchParams();
  const router = useRouter();
  const formStep = searchParams.get("formStep");
  const { setRedirectStep } = useFormStore();

  if (!profileId) {
    return (
      <div className="w-screen h-screen flex flex-col gap-4 items-center justify-center">
        <Loader2 size={100} strokeWidth={1} className="animate-spin" />

        <span className="text-center text-2xl font-semibold text-primary">
          Um momento...
        </span>
      </div>
    );
  }

  const { data } = trpc.formsRouter.getForm.useQuery({ profileId });

  if (data === undefined) {
    return (
      <div className="w-screen h-screen flex flex-col gap-4 items-center justify-center">
        <Loader2 size={100} strokeWidth={1} className="animate-spin" />

        <span className="text-center text-2xl font-semibold text-primary">
          Um momento...
        </span>
      </div>
    );
  }

  const currentStep = data.form.profile.formStep;
  const stepDisabled = (step: number) => step > currentStep;

  console.log(data.form);

  return (
    <>
      <Header />
      <MobileMenu />

      <div className="w-full h-full p-6 flex flex-col sm:px-16 sm:py-12 sm:min-h-[calc(100vh-176px)] lg:container lg:mx-auto lg:min-h-[calc(100vh-192px)]">
        <div className="w-full flex flex-col items-center gap-4 mb-12 sm:mb-24">
          <h1 className="text-2xl sm:text-3xl text-center font-semibold text-foreground">
            Complete seu cadastro
          </h1>

          <div className="flex items-center gap-4">
            <TooltipProvider>
              {STEPS.map((step) => {
                const disabled = stepDisabled(step.step);

                return (
                  <Tooltip key={step.step} delayDuration={0}>
                    <TooltipTrigger
                      disabled={disabled}
                      onClick={() => setRedirectStep(step.step)}
                      className={cn(
                        "size-4 flex-shrink-0 rounded-full border border-primary hover:bg-primary/10 disabled:cursor-not-allowed disabled:opacity-50",
                        {
                          "bg-primary hover:bg-primary":
                            formStep === step.step.toString(),
                        },
                      )}
                    />

                    <TooltipContent side="bottom">
                      <p className="font-medium">{step.label}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </TooltipProvider>
          </div>
        </div>

        {formStep === "0" && (
          <PersonalDataForm currentForm={data.form} profileId={profileId} />
        )}
        {formStep === "1" && (
          <ContactAndAddressForm
            currentForm={data.form}
            profileId={profileId}
          />
        )}
        {formStep === "2" && (
          <PassportForm currentForm={data.form} profileId={profileId} />
        )}
        {formStep === "3" && (
          <AboutTravelForm currentForm={data.form} profileId={profileId} />
        )}
        {formStep === "4" && (
          <TravelCompanyForm currentForm={data.form} profileId={profileId} />
        )}
        {formStep === "5" && (
          <PreviousTravelForm currentForm={data.form} profileId={profileId} />
        )}
        {formStep === "6" && (
          <USAContactForm currentForm={data.form} profileId={profileId} />
        )}
        {formStep === "7" && (
          <FamilyForm currentForm={data.form} profileId={profileId} />
        )}
        {formStep === "8" && (
          <WorkEducationForm currentForm={data.form} profileId={profileId} />
        )}
        {formStep === "9" && <AdditionalInformationForm />}
        {formStep === "10" && <SecurityForm currentForm={data.form} />}
      </div>
    </>
  );
}
