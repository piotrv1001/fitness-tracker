import { Column, Table } from "@tanstack/react-table";
import { ArrowUpIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function DataTableSortableHeader<T>({
  column,
  label,
  table,
}: {
  column: Column<T, unknown>;
  label: string;
  table: Table<T>;
}) {
  const rowCount = table.getRowCount();
  const showSortIcon = rowCount > 1;
  const sorted = column.getIsSorted();
  return (
    <>
      {showSortIcon ? (
        <Button
          className="bg-transparent hover:bg-transparent text-muted-foreground hover:text-foreground transition-colors pl-0 select-none"
          onClick={() => column.toggleSorting(sorted === "asc")}
        >
          <span className="font-bold uppercase text-xs">{label}</span>
          <ArrowUpIcon
            className={cn("ml-2 h-4 w-4 transition-transform", {
              "rotate-180": sorted === "asc",
              "rotate-0": sorted !== "asc",
            })}
          />
        </Button>
      ) : (
        <span className="font-bold uppercase text-xs">{label}</span>
      )}
    </>
  );
}
