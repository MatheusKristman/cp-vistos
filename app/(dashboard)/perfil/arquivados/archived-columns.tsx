"use client";

import {
  ScheduleAccount,
  Shipping,
  StatusDS,
  VisaStatus,
  VisaType,
} from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { differenceInDays, format } from "date-fns";
import { AlertTriangle, ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type UserTable = {
  id: string;
  name: string;
  CASVDate: Date | null;
  interviewDate: Date | null;
  meetingDate: Date | null;
  DSValid: Date | null;
  visaType: VisaType;
  scheduleAccount: ScheduleAccount;
  shipping: Shipping;
  tax: boolean;
  statusDS: StatusDS;
};

export const archivedColumns: ColumnDef<UserTable>[] = [
  {
    accessorKey: "id",
    enableHiding: true,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "DSValid",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data Barcode
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      if (!row.getValue("DSValid")) {
        return <span>--/--/----</span>;
      }

      const dateFormatted = format(row.getValue("DSValid"), "dd/MM/yyyy");

      return (
        <span className="w-full flex items-center justify-center gap-2">
          {dateFormatted}
          {differenceInDays(row.getValue("DSValid"), new Date()) <= 0 ? (
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger>
                  <AlertTriangle className="text-rose-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Vencido</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : differenceInDays(row.getValue("DSValid"), new Date()) <= 10 ? (
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger>
                  <AlertTriangle className="text-amber-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Proximo do vencimento</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : null}
        </span>
      );
    },
  },
  {
    accessorKey: "CASVDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          CASV
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      if (!row.getValue("CASVDate")) {
        return <span>--/--/----</span>;
      }

      const dateFormatted = format(row.getValue("CASVDate"), "dd/MM/yyyy");

      return <span>{dateFormatted}</span>;
    },
  },
  {
    accessorKey: "interviewDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Entrevista
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      if (!row.getValue("interviewDate")) {
        return <span>--/--/----</span>;
      }

      const dateFormatted = format(row.getValue("interviewDate"), "dd/MM/yyyy");

      return <span>{dateFormatted}</span>;
    },
  },
  {
    accessorKey: "meetingDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Reunião
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      if (!row.getValue("meetingDate")) {
        return <span>--/--/----</span>;
      }

      const dateFormatted = format(row.getValue("meetingDate"), "dd/MM/yyyy");

      return <span>{dateFormatted}</span>;
    },
  },
  {
    accessorKey: "shipping",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Envio
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      let shipping;

      const value = row.getValue("shipping") as Shipping;

      switch (value) {
        case "verifying":
          shipping = "A Verificar";
          break;
        case "pickup":
          shipping = "Retirada";
          break;
        case "sedex":
          shipping = "SEDEX";
          break;
        case "c_pickup":
          shipping = "C-Retirada";
          break;
        case "c_sedex":
          shipping = "C-SEDEX";
          break;
        default:
          shipping = "A Verificar";
          break;
      }

      return <span>{shipping}</span>;
    },
  },
  {
    accessorKey: "visaType",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Visto
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      let visaType;

      const value = row.getValue("visaType") as VisaType;

      switch (value) {
        case "primeiro_visto":
          visaType = "Primeiro Visto";
          break;
        case "renovacao":
          visaType = "Renovação";
          break;
      }

      return <span>{visaType}</span>;
    },
  },
  {
    accessorKey: "scheduleAccount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Agendamento
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      let scheduleAccount;

      const value = row.getValue("scheduleAccount") as ScheduleAccount;

      switch (value) {
        case "active":
          scheduleAccount = "Ativo";
          break;
        case "inactive":
          scheduleAccount = "Inativo";
          break;
      }

      return <span>{scheduleAccount}</span>;
    },
  },
  {
    accessorKey: "tax",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Taxa
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      let tax;

      const value = row.getValue("tax") as boolean;

      if (value) {
        tax = "Pago";
      } else {
        tax = "Pendente";
      }

      return <span>{tax}</span>;
    },
  },
  {
    accessorKey: "statusDS",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          DS-160
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      let statusDS;

      const value = row.getValue("statusDS") as StatusDS;

      switch (value) {
        case "awaiting":
          statusDS = "Aguardando";
          break;
        case "emitted":
          statusDS = "Emitido";
          break;
        case "filled":
          statusDS = "Preenchido";
          break;
        case "filling":
          statusDS = "Preenchendo";
          break;
      }

      return <span>{statusDS}</span>;
    },
  },
  {
    accessorKey: "group",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Grupo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      if (!row.getValue("group")) {
        return <span>----</span>;
      }

      return <span>{row.getValue("group")}</span>;
    },
  },
  {
    accessorKey: "visaStatus",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      let visaStatus;

      const value = row.getValue("visaStatus") as VisaStatus;

      switch (value) {
        case "awaiting":
          visaStatus = "Aguardando";
          break;
        case "in_progress":
          visaStatus = "Em Andamento";
          break;
        case "approved":
          visaStatus = "Aprovado";
          break;
        case "disapproved":
          visaStatus = "Reprovado";
          break;
        case "finished":
          visaStatus = "Finalizado";
          break;
      }

      return <span>{visaStatus}</span>;
    },
  },
];
