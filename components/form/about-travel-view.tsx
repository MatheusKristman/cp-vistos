import { format } from "date-fns";
import { Form as FormType } from "@prisma/client";

import { cn } from "@/lib/utils";

interface AboutTravelViewProps {
  form: FormType;
  className?: string;
}

export function AboutTravelView({ form, className }: AboutTravelViewProps) {
  function formatPhone(value: string) {
    if (!value) return;

    return value
      .replace(/\D+/g, "")
      .replace(/(\d{2})(\d{2})(\d{4,5})(\d{4})/, "+$1 ($2) $3-$4");
  }

  return (
    <>
      <div
        className={cn(
          "w-full grid grid-cols-1 sm:grid-cols-4 gap-6",
          className,
        )}
      >
        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Possui itinerário de viagem?
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.travelItineraryConfirmation ? "Sim" : "Não"}
          </span>
        </div>

        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Data prevista de chegada nos EUA
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.travelItineraryConfirmation && form.USAPreviewArriveDate
              ? format(form.USAPreviewArriveDate, "dd/MM/yyyy")
              : "Não Preenchido"}
          </span>
        </div>

        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Número do voo de chegada
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.travelItineraryConfirmation &&
            form.arriveFlyNumber &&
            form.arriveFlyNumber.length > 0
              ? form.arriveFlyNumber
              : "Não Preenchido"}
          </span>
        </div>

        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Cidade de chegada
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.travelItineraryConfirmation &&
            form.arriveCity &&
            form.arriveCity.length > 0
              ? form.arriveCity
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
            Data prevista de retorno ao Brasil
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.travelItineraryConfirmation && form.USAPreviewReturnDate
              ? format(form.USAPreviewReturnDate, "dd/MM/yyyy")
              : "Não Preenchido"}
          </span>
        </div>

        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Número do voo de partida
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.travelItineraryConfirmation &&
            form.returnFlyNumber &&
            form.returnFlyNumber.length > 0
              ? form.returnFlyNumber
              : "Não Preenchido"}
          </span>
        </div>

        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Cidade de partida
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.travelItineraryConfirmation &&
            form.returnCity &&
            form.returnCity.length > 0
              ? form.returnCity
              : "Não Preenchido"}
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
            Tempo estimado de permanência nos EUA
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.estimatedTimeOnUSA && form.estimatedTimeOnUSA.length > 0
              ? form.estimatedTimeOnUSA
              : "Não sabe"}
          </span>
        </div>

        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Locais que irá visitar
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.visitLocations ? form.visitLocations : "Não Preenchido"}
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
            Endereço completo onde ficará nos EUA
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.USACompleteAddress && form.USACompleteAddress.length > 0
              ? form.USACompleteAddress
              : "Não Preenchido"}
          </span>
        </div>

        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            ZIP Code de onde ficará nos EUA
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.USAZipCode && form.USAZipCode.length > 0
              ? form.USAZipCode
              : "Não Preenchido"}
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
            Cidade nos EUA
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.USACity && form.USACity.length > 0
              ? form.USACity
              : "Não Preenchido"}
          </span>
        </div>

        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Estado nos EUA
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.USAState && form.USAState.length > 0
              ? form.USAState
              : "Não Preenchido"}
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
            Nome ou empresa que pagará a viagem
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.payerNameOrCompany && form.payerNameOrCompany.length > 0
              ? form.payerNameOrCompany
              : "Não Preenchido"}
          </span>
        </div>

        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Telefone Residencial
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.payerTel && form.payerTel.length > 0
              ? formatPhone(form.payerTel)
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
            Endereço Completo
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.payerAddress && form.payerAddress.length > 0
              ? form.payerAddress
              : "Não Preenchido"}
          </span>
        </div>

        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">
            Relação com o solicitante
          </span>

          <span className="text-lg font-medium text-foreground">
            {form.payerRelation && form.payerRelation.length > 0
              ? form.payerRelation
              : "Não Preenchido"}
          </span>
        </div>

        <div className="w-full flex flex-col gap-1">
          <span className="text-sm text-foreground/60 font-medium">E-mail</span>

          <span className="text-lg font-medium text-foreground break-words">
            {form.payerEmail && form.payerEmail.length > 0
              ? form.payerEmail
              : "Não Preenchido"}
          </span>
        </div>
      </div>
    </>
  );
}
