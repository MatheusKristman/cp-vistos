import { trpc } from "@/lib/trpc-client";

import { columns } from "../columns";
import { DataTable } from "../data-table";
import { Skeleton } from "@/components/ui/skeleton";

// TODO: verificar com a gih os campos que terão no e_ta
export function E_TA() {
  const { data, isFetching } = trpc.userRouter.getClients.useQuery({ category: "passport" });

  if (isFetching) {
    return (
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
    );
  }

  return <DataTable columns={columns} data={data?.clients ?? []} />;
}
