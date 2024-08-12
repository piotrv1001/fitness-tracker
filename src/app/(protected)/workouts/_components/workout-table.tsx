"use client";

import FitnessDropdownMenu, {
  FitnessDropdownMenuItem,
} from "@/components/fitness-dropdown-menu";
import DataTable from "@/components/table/data-table";
import { formatDate } from "@/lib/utils";
import { Workout } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { MoreVerticalIcon, PencilIcon, TrashIcon } from "lucide-react";

type WorkoutTableProps = {
  workouts: Workout[];
  onEditClick: (workout: Workout) => void;
  onDeleteClick: (workout: Workout) => void;
};

export default function WorkoutTable({
  workouts,
  onEditClick,
  onDeleteClick,
}: WorkoutTableProps) {
  const exerciseColumns: ColumnDef<Workout>[] = [
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Date",
      accessorKey: "date",
      cell: ({ row }) => {
        const workout = row.original as Workout;
        return <span>{formatDate(workout.date, "dd-MM-yyyy")}</span>;
      },
    },
    {
      header: "Duration",
      accessorKey: "duration",
      cell: ({ row }) => {
        const workout = row.original as Workout;
        const formattedDuration = workout.duration ? `${workout.duration} min` : "-";
        return <span>{formattedDuration}</span>;
      }
    },
    {
      header: "Calories",
      accessorKey: "kcal",
      cell: ({ row }) => {
        const workout = row.original as Workout;
        const formattedKcal = workout.kcal ? `${workout.kcal} kcal` : "-";
        return <span>{formattedKcal}</span>;
      }
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const workout = row.original as Workout;
        return (
          <div className="flex justify-end">
            <FitnessDropdownMenu trigger={<MoreVerticalIcon />}>
              <FitnessDropdownMenuItem
                icon={<PencilIcon />}
                btnText="Edit"
                onClick={() => {
                  onEditClick(workout);
                }}
              />
              <FitnessDropdownMenuItem
                icon={<TrashIcon />}
                btnText="Delete"
                onClick={() => {
                  onDeleteClick(workout);
                }}
              />
            </FitnessDropdownMenu>
          </div>
        );
      },
    },
  ];

  return <DataTable columns={exerciseColumns} data={workouts} showSearch />;
}
