"use client";

import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { differenceInYears } from "date-fns";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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
import { DashboardHeader } from "../../perfil/components/dashboard-header";

import { trpc } from "@/lib/trpc-client";
import { cn } from "@/lib/utils";
import useFormStore from "@/constants/stores/useFormStore";

import "react-phone-number-input/style.css";

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

export default function FormPage({ params }: { params: { profileId: string } }) {
  const profileId = params.profileId;
  const searchParams = useSearchParams();
  const formStep = searchParams.get("formStep");
  const isEditingParam = searchParams.get("isEditing");
  const isEditing: boolean = isEditingParam ? JSON.parse(isEditingParam) : false;
  const { setRedirectStep } = useFormStore();

  if (!profileId) {
    return (
      <div className="w-screen h-screen flex flex-col gap-4 items-center justify-center">
        <Loader2 size={100} strokeWidth={1} className="animate-spin" />

        <span className="text-center text-2xl font-semibold text-primary">Um momento...</span>
      </div>
    );
  }

  const { data: formData } = trpc.formsRouter.getForm.useQuery({ profileId });
  const { data: profileData } = trpc.formsRouter.getProfile.useQuery({
    profileId,
  });

  if (formData === undefined || profileData === undefined) {
    return (
      <div className="w-screen h-screen flex flex-col gap-4 items-center justify-center">
        <Loader2 size={100} strokeWidth={1} className="animate-spin" />

        <span className="text-center text-2xl font-semibold text-primary">Um momento...</span>
      </div>
    );
  }

  const currentStep = formData.form.profile.formStep;
  const stepDisabled = (step: number) => step > currentStep;
  const isMinor = profileData.profile.birthDate
    ? differenceInYears(new Date(), profileData.profile.birthDate) < 14
    : false;

  return (
    <>
      <DashboardHeader profileId={profileId} isEditing={isEditing} currentStep={currentStep} />

      <div className="w-full h-full min-h-[calc(100vh-80px)] p-6 flex flex-col pt-20 sm:pt-36 sm:px-16 sm:py-12 lg:container lg:mx-auto lg:min-h-[calc(100vh-96px)]">
        <div className={cn("w-full flex flex-col items-center gap-4 mb-6 sm:mb-12 lg:mb-24", isEditing && "hidden")}>
          <h1 className="text-2xl sm:text-3xl text-center font-semibold text-foreground">Complete seu cadastro</h1>

          <div className="hidden lg:flex items-center gap-4">
            <TooltipProvider>
              {isMinor
                ? STEPS.filter((step) => step.step !== 8).map((step) => {
                    const disabled = stepDisabled(step.step);

                    return (
                      <Tooltip key={step.step} delayDuration={0}>
                        <TooltipTrigger
                          disabled={disabled}
                          onClick={() => setRedirectStep(step.step)}
                          className={cn(
                            "size-4 flex-shrink-0 rounded-full border border-primary hover:bg-primary/10 disabled:cursor-not-allowed disabled:opacity-50",
                            {
                              "bg-primary hover:bg-primary": formStep === step.step.toString(),
                            }
                          )}
                        />

                        <TooltipContent side="bottom">
                          <p className="font-medium">{step.label}</p>
                        </TooltipContent>
                      </Tooltip>
                    );
                  })
                : STEPS.map((step) => {
                    const disabled = stepDisabled(step.step);

                    return (
                      <Tooltip key={step.step} delayDuration={0}>
                        <TooltipTrigger
                          disabled={disabled}
                          onClick={() => setRedirectStep(step.step)}
                          className={cn(
                            "size-4 flex-shrink-0 rounded-full border border-primary hover:bg-primary/10 disabled:cursor-not-allowed disabled:opacity-50",
                            {
                              "bg-primary hover:bg-primary": formStep === step.step.toString(),
                            }
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
          <PersonalDataForm currentForm={formData.form} profileId={profileId} isEditing={isEditing} />
        )}
        {formStep === "1" && (
          <ContactAndAddressForm currentForm={formData.form} profileId={profileId} isEditing={isEditing} />
        )}
        {formStep === "2" && <PassportForm currentForm={formData.form} profileId={profileId} isEditing={isEditing} />}
        {formStep === "3" && (
          <AboutTravelForm currentForm={formData.form} profileId={profileId} isEditing={isEditing} />
        )}
        {formStep === "4" && (
          <TravelCompanyForm currentForm={formData.form} profileId={profileId} isEditing={isEditing} />
        )}
        {formStep === "5" && (
          <PreviousTravelForm currentForm={formData.form} profileId={profileId} isEditing={isEditing} />
        )}
        {formStep === "6" && <USAContactForm currentForm={formData.form} profileId={profileId} isEditing={isEditing} />}
        {formStep === "7" && (
          <FamilyForm
            currentForm={formData.form}
            profileId={profileId}
            isEditing={isEditing}
            profile={profileData.profile}
          />
        )}
        {formStep === "8" && (
          <WorkEducationForm currentForm={formData.form} profileId={profileId} isEditing={isEditing} />
        )}
        {formStep === "9" && (
          <AdditionalInformationForm currentForm={formData.form} profileId={profileId} isEditing={isEditing} />
        )}
        {formStep === "10" && <SecurityForm currentForm={formData.form} profileId={profileId} isEditing={isEditing} />}
      </div>
    </>
  );
}
