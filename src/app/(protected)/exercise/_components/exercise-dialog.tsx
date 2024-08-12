import DialogWrapper from "@/components/dialog-wrapper";
import ExerciseForm from "./exercise-form";
import { exerciseSchema } from "@/schemas/exercise-schema";
import { Exercise } from "@prisma/client";
import { z } from "zod";

type ExerciseDialogProps = {
  exercise?: Exercise | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: z.infer<typeof exerciseSchema>) => void;
};

export default function ExerciseDialog({
  exercise,
  open,
  onOpenChange,
  onSubmit,
}: ExerciseDialogProps) {
  const isEdit = !!exercise;

  return (
    <DialogWrapper
      title={isEdit ? "Edit Exercise" : "Add Exercise"}
      description="Provide the information about the exercise"
      open={open}
      onOpenChange={onOpenChange}
    >
      <ExerciseForm exercise={exercise} onSubmit={onSubmit} />
    </DialogWrapper>
  );
}
