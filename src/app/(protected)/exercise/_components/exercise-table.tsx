"use client";

import FitnessDropdownMenu, {
  FitnessDropdownMenuItem,
} from "@/components/fitness-dropdown-menu";
import DataTable from "@/components/table/data-table";
import { Exercise } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { MoreVerticalIcon, PencilIcon, TrashIcon } from "lucide-react";

type ExerciseTableProps = {
  exercises: Exercise[];
  onEditClick: (exercise: Exercise) => void;
  onDeleteClick: (exercise: Exercise) => void;
};

export default function ExericseTable({
  exercises,
  onEditClick,
  onDeleteClick,
}: ExerciseTableProps) {
  const exerciseColumns: ColumnDef<Exercise>[] = [
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Muscle group",
      accessorKey: "muscleGroup",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const exercise = row.original as Exercise;
        return (
          <div className="flex justify-end">
            <FitnessDropdownMenu trigger={<MoreVerticalIcon />}>
              <FitnessDropdownMenuItem
                icon={<PencilIcon />}
                btnText="Edit"
                onClick={() => {
                  onEditClick(exercise);
                }}
              />
              <FitnessDropdownMenuItem
                icon={<TrashIcon />}
                btnText="Delete"
                onClick={() => {
                  onDeleteClick(exercise);
                }}
              />
            </FitnessDropdownMenu>
          </div>
        );
      },
    },
  ];

  return <DataTable columns={exerciseColumns} data={exercises} showSearch />;
}
