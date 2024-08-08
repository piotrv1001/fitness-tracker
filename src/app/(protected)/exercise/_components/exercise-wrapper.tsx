"use client";

import { Exercise } from "@prisma/client";
import ExericseTable from "./exercise-table";
import AddButton from "@/components/add-button";
import { useState } from "react";
import ExerciseDialog from "./exercise-dialog";
import ExerciseAlertDialog from "./exercise-alert-dialog";
import { z } from "zod";
import { createExerciseAction } from "@/actions/exercise/create-exercise-action";
import { toast } from "@/components/ui/use-toast";
import { newExerciseSchema } from "@/schemas/new-exercise-schema";
import { updateExerciseAction } from "@/actions/exercise/update-exercise-action";
import { deleteExerciseAction } from "@/actions/exercise/delete-exercise-action";

type ExerciseWrapperProps = {
  exercises: Exercise[];
};

export default function ExercisesWrapper({ exercises }: ExerciseWrapperProps) {
  const [showExerciseDialog, setShowExerciseDialog] = useState(false);
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null
  );

  const addExercise = async (formData: z.infer<typeof newExerciseSchema>) => {
    setShowExerciseDialog(false);
    setSelectedExercise(null);
    const res = await createExerciseAction(formData);
    if (res.status === "error") {
      toast({
        variant: "error",
        description: res.message,
      });
    } else {
      toast({
        variant: "success",
        description: "Exercise created successfully",
      });
    }
  };

  const updateExercise = async (
    formData: z.infer<typeof newExerciseSchema>
  ) => {
    setShowExerciseDialog(false);
    setSelectedExercise(null);
    const res = await updateExerciseAction(formData);
    if (res.status === "error") {
      toast({
        variant: "error",
        description: res.message,
      });
    } else {
      toast({
        variant: "success",
        description: "Exercise updated successfully",
      });
    }
  };

  const deleteExercise = async () => {
    setShowAlertDialog(false);
    const id = selectedExercise?.id;
    if (!id) {
      toast({
        variant: "error",
        description: "Exercise ID is required",
      });
      return;
    }
    const res = await deleteExerciseAction(id);
    if (res.status === "error") {
      toast({
        variant: "error",
        description: res.message,
      });
    } else {
      toast({
        variant: "success",
        description: "Exercise deleted successfully",
      });
    }
    setSelectedExercise(null);
  };

  return (
    <>
      {showExerciseDialog && (
        <ExerciseDialog
          exercise={selectedExercise}
          open={showExerciseDialog}
          onOpenChange={(isOpen) => {
            setShowExerciseDialog(isOpen);
            setSelectedExercise(null);
          }}
          onSubmit={(formData) => {
            if (selectedExercise) {
              updateExercise(formData);
            } else {
              addExercise(formData);
            }
          }}
        />
      )}
      {showAlertDialog && (
        <ExerciseAlertDialog
          open={showAlertDialog}
          onOpenChange={(isOpen) => {
            setShowAlertDialog(isOpen);
            setSelectedExercise(null);
          }}
          onCancel={() => {
            setShowAlertDialog(false);
            setSelectedExercise(null);
          }}
          onSubmit={deleteExercise}
        />
      )}
      <div className="mb-4 w-full flex justify-end">
        <AddButton onClick={() => setShowExerciseDialog(true)} />
      </div>
      <ExericseTable
        exercises={exercises}
        onEditClick={(exercise) => {
          setSelectedExercise(exercise);
          setShowExerciseDialog(true);
        }}
        onDeleteClick={(exercise) => {
          setSelectedExercise(exercise);
          setShowAlertDialog(true);
        }}
      />
    </>
  );
}
