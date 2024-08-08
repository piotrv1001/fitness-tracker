"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  SortingState,
  getSortedRowModel,
  getPaginationRowModel,
  PaginationState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  SearchIcon,
  XIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import DataTableFilterableHeader from "./data-table-filterable-header";

const PAGE_SIZE = 10;

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filters?: {
    column: string;
    title: string;
    options: { label: string; value: string }[];
    enableSearch?: boolean;
  }[];
  filterPlaceholder?: string;
  showSearch?: boolean;
  className?: string;
  disablePagination?: boolean;
};

export default function DataTable<TData, TValue>({
  columns,
  data,
  filters,
  filterPlaceholder,
  showSearch,
  className,
  disablePagination,
}: DataTableProps<TData, TValue>) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: PAGE_SIZE,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filtering, setFiltering] = useState("");
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setFiltering,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: disablePagination
      ? undefined
      : getPaginationRowModel(),
    state: {
      globalFilter: filtering,
      sorting,
      pagination: disablePagination ? undefined : pagination,
    },
  });

  return (
    <div className={className}>
      <div className="flex gap-2 md:items-center mb-4 flex-col md:flex-row w-full">
        {showSearch && (
          <div className="flex items-center md:max-w-[50%] lg:max-w-[25%] w-full">
            <div className="relative mr-4 w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                <SearchIcon className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex gap-x-4">
                {filtering !== "" && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                    <button
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      onClick={() => setFiltering("")}
                    >
                      <XIcon className="h-5 w-5" />
                    </button>
                  </div>
                )}
                <Input
                  value={filtering}
                  onChange={(e) => setFiltering(e.target.value)}
                  spellCheck={false}
                  placeholder={filterPlaceholder ?? "Search"}
                  className="px-[36px] w-full bg-transparent border border-muted text-foregound transition-colors placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
            </div>
          </div>
        )}
        <div className="flex gap-x-2">
          {filters?.map((filter, idx) => {
            const col = table.getColumn(filter.column);
            if (col) {
              return (
                <DataTableFilterableHeader
                  key={idx}
                  column={col}
                  title={filter.title}
                  options={filter.options}
                  enableSearch={filter.enableSearch}
                />
              );
            }
            return null;
          })}
        </div>
      </div>
      {!disablePagination && (
        <div className="flex justify-center w-full gap-x-2">
          {table.getPageCount() > 1 && (
            <div className="flex items-center justify-end space-x-2 py-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setPagination((prev) => ({
                    ...prev,
                    pageIndex: prev.pageIndex - 1,
                  }))
                }
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </Button>
              <span className="text-sm select-none w-24 text-center">
                Page {pagination.pageIndex + 1} of {table.getPageCount()}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setPagination((prev) => ({
                    ...prev,
                    pageIndex: prev.pageIndex + 1,
                  }))
                }
                disabled={!table.getCanNextPage()}
              >
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      )}

      <div className="rounded-md border-input border overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-input bg-muted hover:bg-muted"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{ width: header.getSize() }}
                      className="text-muted-foreground font-bold uppercase text-xs"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="border-input bg-background text-foreground"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  No data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
