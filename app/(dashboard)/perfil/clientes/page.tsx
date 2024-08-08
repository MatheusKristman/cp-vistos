"use client";

import { toast } from "sonner";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { trpc } from "@/lib/trpc-client";
import { Skeleton } from "@/components/ui/skeleton";
import { ClientDetailsModal } from "@/components/dashboard/client-details-modal";

export default function ClientsPage() {
  const session = useSession();
  const { data, isFetching } = trpc.userRouter.getClients.useQuery();

  useEffect(() => {
    if (session.status === "unauthenticated") {
      toast.error("Usuário não autorizado");
      redirect("/");
    }
  }, [session]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <div className="w-full lg:w-[calc(100%-250px)] px-6 sm:px-16 lg:ml-[250px] lg:px-40">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-6 mt-6 lg:mt-12">Clientes</h1>
        {isFetching ? (
          <div>
            <div className="flex items-center py-4">
              <Skeleton className="h-12 w-full sm:max-w-xs" />
            </div>
            <Skeleton className="h-32 w-full" />

            <div className="w-full flex items-center justify-between">
              <Skeleton className="h-4 w-24" />
              <div className="w-full flex items-center justify-between space-x-2 py-4 sm:justify-end sm:w-fit">
                <Skeleton className="h-9 w-20" />
                <Skeleton className="h-9 w-20" />
              </div>
            </div>
          </div>
        ) : (
          <DataTable columns={columns} data={data?.clients ?? []} />
        )}
      </div>

      <ClientDetailsModal />
    </>
  );
}
