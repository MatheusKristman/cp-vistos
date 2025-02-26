import { Form as FormType } from "@prisma/client";

import { cn } from "@/lib/utils";

interface TravelCompanyViewProps {
  form: FormType;
  className?: string;
}

export function TravelCompanyView({ form, className }: TravelCompanyViewProps) {
  return (
    <>
      <div className="w-full flex flex-col gap-9">
        {form.otherPeopleTravelingConfirmation &&
        form.otherPeopleTraveling &&
        form.otherPeopleTraveling.length > 0 ? (
          form.otherPeopleTraveling.map((otherPeople, index) => (
            <div
              key={`otherPeopleTraveling-${index}`}
              className="w-full bg-[#D3D3E2] p-5 flex flex-col gap-4"
            >
              <div className="w-full flex flex-col sm:flex-row items-center gap-2">
                <div className="w-8 min-w-[32px] h-8 min-h-[32px] rounded-full bg-primary flex items-center justify-center">
                  <span className="text-white text-lg font-medium">
                    {index + 1}
                  </span>
                </div>

                <span className="text-foreground text-lg text-center font-medium">
                  Pessoa Acompanhante
                </span>
              </div>

              <div
                className={cn(
                  "w-full grid grid-cols-1 sm:grid-cols-2 gap-6",
                  className,
                )}
              >
                <div className="w-full flex flex-col gap-1">
                  <span className="text-sm text-foreground/70 font-medium">
                    Nome completo da outra pessoa
                  </span>

                  <span className="text-lg font-medium text-foreground">
                    {otherPeople.name}
                  </span>
                </div>

                <div className="w-full flex flex-col gap-1">
                  <span className="text-sm text-foreground/70 font-medium">
                    Relação com a outra pessoa
                  </span>

                  <span className="text-lg font-medium text-foreground">
                    {otherPeople.relation}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full bg-[#D3D3E2] p-5 flex items-center justify-center">
            <span className="text-foreground text-lg text-center font-semibold">
              Não possui pessoa acompanhante
            </span>
          </div>
        )}
      </div>

      <div
        className={cn(
          "w-full grid grid-cols-1 sm:grid-cols-2 gap-6",
          className,
        )}
      >
        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Esta viajando como integrante de um grupo de viagem?
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.groupMemberConfirmation ? "Sim" : "Não"}
          </span>
        </div>

        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Nome da organização ou grupo
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.groupMemberConfirmation &&
            form.groupName &&
            form.groupName.length > 0
              ? form.groupName
              : "Não Preenchido"}
          </span>
        </div>
      </div>
    </>
  );
}
