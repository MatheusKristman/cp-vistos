"use client";

import { toast } from "sonner";
import { useState } from "react";
import { Search } from "lucide-react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import useClientDetailsModalStore from "@/constants/stores/useClientDetailsModalStore";

import { cn } from "@/lib/utils";
import { trpc } from "@/lib/trpc-client";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    id: false,
    name: true,
    group: true,
    CASVDate: true,
    interviewDate: true,
    meetingDate: true,
    visaType: true,
    visaStatus: true,
    scheduleAccount: true,
    tax: true,
    statusDS: true,
  });
  const { openModal, setClient, setToResume } =
    //eslint-disable-next-line
    useClientDetailsModalStore();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  const { mutate: handleOpenDetailsModal, isPending } = trpc.userRouter.getClientDetails.useMutation({
    onSuccess({ client }) {
      console.log({ client });
      setClient(client);
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
    <div>
      <div className="flex items-center py-4">
        <div className="h-12 flex items-center gap-2 border border-muted/70 rounded-xl transition duration-300 bg-background px-3 py-2 text-sm group focus-within:border-primary hover:border-border w-full sm:max-w-xs">
          <Search className="w-5 h-5 text-border flex-shrink-0" strokeWidth={1.5} />

          <div className="w-[2px] flex-shrink-0 h-full bg-muted rounded-full" />

          <Input
            placeholder="Pesquise pelo nome..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
            className="flex h-full w-full transition border-0 duration-300 bg-background text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0  disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
      </div>

      <div className="border rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  onClick={() =>
                    handleOpenDetailsModal({
                      profileId: row.getValue("id"),
                    })
                  }
                  className={cn("cursor-pointer", {
                    "cursor-not-allowed pointer-events-none opacity-70": isPending,
                  })}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-center text-foreground font-medium">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="w-full flex items-center justify-between">
        <div className="hidden sm:flex w-[100px] items-center justify-center text-sm font-medium">
          Pagina {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
        </div>
        <div className="w-full flex items-center justify-between space-x-2 py-4 sm:justify-end sm:w-fit">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Próximo
          </Button>
        </div>
      </div>
    </div>
  );
}
