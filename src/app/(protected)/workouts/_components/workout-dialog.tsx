import DialogWrapper from "@/components/dialog-wrapper";
import { Workout } from "@prisma/client";
import { z } from "zod";
import { workoutSchema } from "@/schemas/workout-schema";
import WorkoutForm from "./workout-form";

type WorkoutDialogProps = {
  workout?: Workout | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: z.infer<typeof workoutSchema>) => void;
};

export default function WorkoutDialog({
  workout,
  open,
  onOpenChange,
  onSubmit,
}: WorkoutDialogProps) {
  const isEdit = !!workout;

  return (
    <DialogWrapper
      title={isEdit ? "Edit workout" : "Add workout"}
      description="Provide the information about the workout"
      open={open}
      onOpenChange={onOpenChange}
    >
      <WorkoutForm workout={workout} onSubmit={onSubmit} />
    </DialogWrapper>
  );
}
