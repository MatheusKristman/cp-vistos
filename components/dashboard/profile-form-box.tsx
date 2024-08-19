"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { format } from "date-fns";
import { StatusDS } from "@prisma/client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Props {
  profileId: string;
  statusForm: "awaiting" | "filling" | "filled";
  statusDS: StatusDS;
  profileName: string;
  CASVDate: Date | null;
  interviewDate: Date | null;
  DSNumber: number;
  updatedAt: Date;
  formStep: number;
}

export function ProfileFormBox({
  profileId,
  statusForm,
  statusDS,
  profileName,
  CASVDate,
  interviewDate,
  DSNumber,
  updatedAt,
  formStep,
}: Props) {
  const [statusDSFormatted, setStatusDSFormatted] = useState<string>("");
  const [statusFormFormatted, setStatusFormFormatted] = useState<string>("");

  const formLink = `/formulario/${profileId}?formStep=${formStep}`;

  useEffect(() => {
    switch (statusDS) {
      case "awaiting":
        setStatusDSFormatted("Aguardando");
        break;
      case "filling":
        setStatusDSFormatted("Preenchendo");
        break;
      case "filled":
        setStatusDSFormatted("Preenchido");
        break;
      case "emitted":
        setStatusDSFormatted("Emitido");
        break;
      default:
        setStatusDSFormatted("Status Offline");
        break;
    }
  }, [statusDS]);

  useEffect(() => {
    switch (statusForm) {
      case "awaiting":
        setStatusFormFormatted("Vazio");
        break;
      case "filling":
        setStatusFormFormatted("Incompleto");
        break;
      case "filled":
        setStatusFormFormatted("Completo");
        break;
      default:
        setStatusFormFormatted("Sem Status");
        break;
    }
  }, [statusForm]);

  return (
    <div className="w-full bg-card p-8 flex flex-col gap-6">
      <div className="w-full flex flex-col gap-4 sm:flex-row sm:justify-between md:flex-col 2xl:flex-row">
        <div className="flex flex-col gap-1 items-center sm:items-start md:items-center 2xl:items-start">
          <h6 className="text-2xl font-semibold text-white">{profileName}</h6>

          <span
            className={cn(
              "w-fit px-2 py-1 text-base font-semibold uppercase text-center",
              {
                "bg-destructive text-destructive-foreground":
                  statusForm === "awaiting",
                "bg-caution text-caution-foreground": statusForm === "filling",
                "bg-confirm text-confirm-foreground": statusForm === "filled",
              },
            )}
          >
            Formulário {statusFormFormatted}
          </span>
        </div>

        <Button
          variant="secondary"
          size="xl"
          className="flex items-center gap-2"
          asChild
        >
          <Link href={formLink}>
            Formulário
            <ArrowUpRight />
          </Link>
        </Button>
      </div>

      <div className="w-full flex flex-col gap-4">
        <div className="w-full flex flex-col gap-4 items-center p-9 bg-[#6A7DA6] sm:flex-row sm:justify-around md:flex-col md:justify-start 2xl:flex-row 2xl:justify-around">
          <div className="w-fit flex flex-col items-center gap-1">
            <span className="text-sm font-medium text-white/75">
              Data do CASV
            </span>
            <span className="text-lg font-semibold text-white">
              {CASVDate
                ? format(new Date(CASVDate), "dd/MM/yyyy")
                : "--/--/----"}
            </span>
          </div>

          <div className="w-fit flex flex-col items-center gap-1">
            <span className="text-sm font-medium text-white/75">
              Data da Entrevista
            </span>
            <span className="text-lg font-semibold text-white">
              {interviewDate
                ? format(new Date(interviewDate), "dd/MM/yyyy")
                : "--/--/----"}
            </span>
          </div>

          <div className="w-fit flex flex-col items-center gap-1">
            <span className="text-sm font-medium text-white/75">Número DS</span>
            <span className="text-lg font-semibold text-white">{DSNumber}</span>
          </div>
        </div>

        <div className="w-full flex flex-col gap-2 items-center sm:flex-row sm:justify-between md:flex-col md:justify-start 2xl:flex-row 2xl:justify-between">
          <div className="flex items-center gap-2 h-5">
            <span className="text-muted-foreground text-base font-medium">
              Status DS
            </span>
            <div className="h-full w-[1.5px] rounded-full bg-muted-foreground" />
            <strong className="text-muted-foreground text-base font-semibold">
              {statusDSFormatted}
            </strong>
          </div>

          <span className="text-muted-foreground text-sm font-medium">
            Última Atualização: {format(new Date(updatedAt), "dd/MM/yyyy")}
          </span>
        </div>
      </div>
    </div>
  );
}
