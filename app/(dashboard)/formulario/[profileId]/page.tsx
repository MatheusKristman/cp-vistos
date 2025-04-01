"use client";

import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { differenceInYears } from "date-fns";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { PersonalDataWrapper } from "./components/personal-data/personal-data-wrapper";
import { ContactAndAddressForm } from "./components/contact-and-address-form";
import { PassportForm } from "./components/passport-form";
import { AboutTravelForm } from "./components/about-travel-form";
import { TravelCompanyForm } from "./components/travel-company-form";
import { PreviousTravelForm } from "./components/previous-travel-form";
import { USAContactForm } from "./components/usa-contact-form";
import { FamilyForm } from "./components/family-form";
import { WorkEducationForm } from "./components/work-education-form";
import { AdditionalInformationForm } from "./components/additional-information-form";
import { SecurityForm } from "./components/security-form";
import { DashboardHeader } from "../../perfil/components/dashboard-header";

import { cn } from "@/lib/utils";
import { STEPS } from "@/constants";
import { trpc } from "@/lib/trpc-client";
import useFormStore from "@/constants/stores/useFormStore";

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

  const { data: currentStep, isPending: isCurrentStepPending } = trpc.formsRouter.getCurrentStep.useQuery({
    profileId,
  });
  const { data: isMinor, isPending: checkIsMinorPending } = trpc.formsRouter.checkIsMinor.useQuery({ profileId });

  if (!currentStep || checkIsMinorPending || isCurrentStepPending) {
    return (
      <div className="w-screen h-screen flex flex-col gap-4 items-center justify-center">
        <Loader2 size={100} strokeWidth={1} className="animate-spin" />

        <span className="text-center text-2xl font-semibold text-primary">Um momento...</span>
      </div>
    );
  }

  const stepDisabled = (step: number) => step > currentStep;

  return (
    <>
      <DashboardHeader
        profileId={profileId}
        isEditing={isEditing}
        currentStep={currentStep}
        formStep={formStep}
        isForm
      />

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

        {formStep === "0" && <PersonalDataWrapper profileId={profileId} isEditing={isEditing} />}
        {/* {formStep === "1" && (
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
        {formStep === "10" && <SecurityForm currentForm={formData.form} profileId={profileId} isEditing={isEditing} />} */}
      </div>
    </>
  );
}
