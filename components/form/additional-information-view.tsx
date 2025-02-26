import { format } from "date-fns";
import { Form as FormType } from "@prisma/client";

import { cn } from "@/lib/utils";

interface AdditionalInformationViewProps {
  form: FormType;
  className?: string;
}

export function AdditionalInformationView({
  form,
  className,
}: AdditionalInformationViewProps) {
  return (
    <>
      <div
        className={cn(
          "w-full grid grid-cols-1 sm:grid-cols-2 gap-6",
          className,
        )}
      >
        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Você participa de algum clã ou tribo?
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.tribeParticipateConfirmation ? "Sim" : "Não"}
          </span>
        </div>

        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Quais idiomas você fala?
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.languages.length > 0
              ? form.languages.join(" | ")
              : "Não possui"}
          </span>
        </div>
      </div>

      <div
        className={cn(
          "w-full grid grid-cols-1 sm:grid-cols-2 gap-6",
          className,
        )}
      >
        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Viajou nos últimos 5 anos para outro país?
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.fiveYearsOtherCountryTravelsConfirmation ? "Sim" : "Não"}
          </span>
        </div>

        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Países que viajou
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.fiveYearsOtherCountryTravels.length > 0
              ? form.fiveYearsOtherCountryTravels.join(" | ")
              : "Não possui"}
          </span>
        </div>
      </div>

      <div
        className={cn(
          "w-full grid grid-cols-1 sm:grid-cols-2 gap-6",
          className,
        )}
      >
        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Contribui ou faz parte de alguma instituição de caridade ou
            organização social?
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.socialOrganizationConfirmation ? "Sim" : "Não"}
          </span>
        </div>

        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Organizações que você faz parte
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.socialOrganization.length > 0
              ? form.socialOrganization.join(" | ")
              : "Não possui"}
          </span>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 gap-6">
        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Você tem treinamento com arma de fogo?
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.weaponTrainingConfirmation ? "Sim" : "Não"}
          </span>
        </div>
      </div>

      {form.weaponTrainingConfirmation && form.weaponTrainingDetails && (
        <div className="w-full grid grid-cols-1 gap-6">
          <div className="w-full flex flex-col gap-1">
            <span className="text-sm text-foreground/60 font-medium">
              Mais detalhes sobre o treinamento
            </span>

            <span className="text-lg font-medium text-foreground">
              {form.weaponTrainingDetails
                ? form.weaponTrainingDetails
                : "Não possui"}
            </span>
          </div>
        </div>
      )}

      <div className="w-full grid grid-cols-1 gap-6">
        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Já prestou serviço militar?
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.militaryServiceConfirmation ? "Sim" : "Não"}
          </span>
        </div>
      </div>

      {form.militaryServiceConfirmation && (
        <>
          <div
            className={cn(
              "w-full grid grid-cols-1 sm:grid-cols-3 gap-6",
              className,
            )}
          >
            <div className="w-full flex flex-col gap-1">
              <span className="text-sm text-foreground/60 font-medium">
                País que serviu
              </span>

              <span className="text-lg font-medium text-foreground">
                {form.militaryServiceCountry
                  ? form.militaryServiceCountry
                  : "Não Preenchido"}
              </span>
            </div>

            <div className="w-full flex flex-col gap-1">
              <span className="text-sm text-foreground/60 font-medium">
                Local que serviu
              </span>

              <span className="text-lg font-medium text-foreground">
                {form.militaryServiceLocal
                  ? form.militaryServiceLocal
                  : "Não Preenchido"}
              </span>
            </div>

            <div className="w-full flex flex-col gap-1">
              <span className="text-sm text-foreground/60 font-medium">
                Patente
              </span>

              <span className="text-lg font-medium text-foreground">
                {form.militaryServicePatent
                  ? form.militaryServicePatent
                  : "Não Preenchido"}
              </span>
            </div>
          </div>

          <div
            className={cn(
              "w-full grid grid-cols-1 sm:grid-cols-3 gap-6",
              className,
            )}
          >
            <div className="w-full flex flex-col gap-1">
              <span className="text-sm text-foreground/60 font-medium">
                Especialidade
              </span>

              <span className="text-lg font-medium text-foreground">
                {form.militaryServiceSpecialty
                  ? form.militaryServiceSpecialty
                  : "Não Preenchido"}
              </span>
            </div>

            <div className="w-full flex flex-col gap-1">
              <span className="text-sm text-foreground/60 font-medium">
                Data de início
              </span>

              <span className="text-lg font-medium text-foreground">
                {form.militaryServiceStartDate
                  ? format(form.militaryServiceStartDate, "dd/MM/yyyy")
                  : "Não Preenchido"}
              </span>
            </div>

            <div className="w-full flex flex-col gap-1">
              <span className="text-sm text-foreground/60 font-medium">
                Data de Término
              </span>

              <span className="text-lg font-medium text-foreground">
                {form.militaryServiceEndDate
                  ? format(form.militaryServiceEndDate, "dd/MM/yyyy")
                  : "Não Preenchido"}
              </span>
            </div>
          </div>
        </>
      )}

      <div className="w-full grid grid-cols-1 gap-6">
        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Você já serviu, foi membro ou esteve envolvido em uma unidade
            paramilitar, unidade de vigilantes, grupo rebelde, grupo
            guerrilheiro ou organização insurgente?
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.insurgencyOrganizationConfirmation ? "Sim" : "Não"}
          </span>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 gap-6">
        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Mais detalhes sobre sua participação
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.insurgencyOrganizationDetails
              ? form.insurgencyOrganizationDetails
              : "Não Preenchido"}
          </span>
        </div>
      </div>
    </>
  );
}
