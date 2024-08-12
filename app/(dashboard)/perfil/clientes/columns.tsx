"use client";

import { ScheduleAccount, StatusDS, VisaType } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowUpDown, Loader2, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import useClientDetailsModalStore from "@/constants/stores/useClientDetailsModalStore";
import { trpc } from "@/lib/trpc-client";
import { toast } from "sonner";

export type UserTable = {
  id: string;
  name: string;
  CASVDate: Date | null;
  interviewDate: Date | null;
  meetingDate: Date | null;
  DSValid: Date | null;
  visaType: VisaType;
  scheduleAccount: ScheduleAccount;
  tax: boolean;
  statusDS: StatusDS;
};

export const columns: ColumnDef<UserTable>[] = [
  {
    accessorKey: "id",
    enableHiding: true,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
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
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Data do barcode
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      if (!row.getValue("DSValid")) {
        return <span>--/--/----</span>;
      }

      //TODO: adicionar função de notificação com ícones para quando estiver próximo

      const dateFormatted = format(row.getValue("DSValid"), "dd/MM/yyyy");

      return <span>{dateFormatted}</span>;
    },
  },
  {
    accessorKey: "CASVDate",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Data do CASV
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      if (!row.getValue("CASVDate")) {
        <span>--/--/----</span>;
      }

      const dateFormatted = format(row.getValue("CASVDate"), "dd/MM/yyyy");

      return <span>{dateFormatted}</span>;
    },
  },
  {
    accessorKey: "interviewDate",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Data da entrevista
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
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Data da reunião
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
    accessorKey: "visaType",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Status do visto
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
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Conta de agendamento
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
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
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
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
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
    id: "actions",
    cell: ({ row }) => {
      // NOTE: funciona normalmente
      //eslint-disable-next-line
      const { openModal, setClient, setRole, setToResume } = useClientDetailsModalStore();

      console.log(row.getAllCells());

      const { mutate: handleOpenDetailsModal, isPending } = trpc.userRouter.getClientDetails.useMutation({
        onSuccess({ client, role }) {
          setClient(client);
          setRole(role);
          openModal();
          setToResume();
        },
        onError(error) {
          console.error(error.data);

          if (error.data && error.data.code === "NOT_FOUND") {
            toast.error(error.message);
          } else {
            toast.error("Ocorreu um erro ao abrir os detalhes do perfil!");
          }
        },
      });

      return (
        <Button
          onClick={() =>
            handleOpenDetailsModal({
              profileId: row.getValue("id"),
            })
          }
          disabled={isPending}
          variant="ghost"
        >
          {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <MoreHorizontal className="h-4 w-4" />}
        </Button>
      );
    },
  },
];
