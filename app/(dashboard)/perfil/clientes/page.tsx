import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { addDays } from "date-fns";

import { UserTable, columns } from "./columns";
import { DataTable } from "./data-table";
import { ScheduleAccount, StatusDS, VisaType } from "@prisma/client";
import { auth } from "@/auth";

// TODO: adicionar perfis na tabela

async function getData(): Promise<UserTable[]> {
  return [
    {
      id: "asdlfjaslk",
      CASVDate: new Date(),
      interviewDate: new Date(),
      meetingDate: new Date(),
      name: "Matheus Kristman",
      scheduleAccount: ScheduleAccount.active,
      statusDS: StatusDS.filling,
      tax: !!new Date(),
      visaType: VisaType.primeiro_visto,
    },
    {
      id: "faasdasdkk",
      CASVDate: addDays(new Date(), 5),
      interviewDate: addDays(new Date(), 5),
      meetingDate: addDays(new Date(), 5),
      name: "Kleber Kristman",
      scheduleAccount: ScheduleAccount.inactive,
      statusDS: StatusDS.awaiting,
      tax: !new Date(),
      visaType: VisaType.renovacao,
    },
    {
      id: "asdasdf",
      CASVDate: addDays(new Date(), 2),
      interviewDate: addDays(new Date(), 2),
      meetingDate: addDays(new Date(), 2),
      name: "Julio Kristman",
      scheduleAccount: ScheduleAccount.inactive,
      statusDS: StatusDS.emitted,
      tax: !!new Date(),
      visaType: VisaType.primeiro_visto,
    },
    {
      id: "asdffasdsfad",
      CASVDate: addDays(new Date(), 3),
      interviewDate: addDays(new Date(), 3),
      meetingDate: addDays(new Date(), 3),
      name: "Alberto Kristman",
      scheduleAccount: ScheduleAccount.active,
      statusDS: StatusDS.filled,
      tax: !new Date(),
      visaType: VisaType.renovacao,
    },
    {
      id: "asfdasdadf",
      CASVDate: addDays(new Date(), 3),
      interviewDate: addDays(new Date(), 3),
      meetingDate: addDays(new Date(), 3),
      name: "Giselli Galhardo",
      scheduleAccount: ScheduleAccount.active,
      statusDS: StatusDS.filled,
      tax: !new Date(),
      visaType: VisaType.renovacao,
    },
  ];
}

export default async function ClientsPage() {
  const session = await auth();
  const data = await getData();

  if (!session?.user) {
    toast.error("Usuário não autorizado");
    redirect("/");
  }

  return (
    <>
      <div className="w-full lg:w-[calc(100%-250px)] px-6 sm:px-16 lg:ml-[250px] lg:px-40">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-6 mt-6 lg:mt-12">Clientes</h1>

        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
}
