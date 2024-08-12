"use client";

import { Workout } from "@prisma/client";
import WorkoutTable from "./workout-table";
import AddButton from "@/components/add-button";
import { useState } from "react";
import WorkoutDialog from "./workout-dialog";
import { workoutSchema } from "@/schemas/workout-schema";
import { z } from "zod";
import { createWorkoutAction } from "@/actions/workout/create-workout-action";
import { toast } from "@/components/ui/use-toast";
import { updateWorkoutAction } from "@/actions/workout/update-workout-action";
import { deleteWorkoutAction } from "@/actions/workout/delete-workout-action";
import WorkoutAlertDialog from "./workout-alert-dialog";

type WorkoutsWrapperProps = {
  workouts: Workout[];
};

export default function WorkoutsWrapper({ workouts }: WorkoutsWrapperProps) {
  const [showWorkoutDialog, setShowWorkoutDialog] = useState(false);
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);

  const addWorkout = async (formData: z.infer<typeof workoutSchema>) => {
    setShowWorkoutDialog(false);
    setSelectedWorkout(null);
    const res = await createWorkoutAction(formData);
    if (res.status === "error") {
      toast({
        variant: "error",
        description: res.message,
      });
    } else {
      toast({
        variant: "success",
        description: "Workout created successfully",
      });
    }
  };

  const updateWorkout = async (formData: z.infer<typeof workoutSchema>) => {
    setShowWorkoutDialog(false);
    setSelectedWorkout(null);
    const res = await updateWorkoutAction(formData);
    if (res.status === "error") {
      toast({
        variant: "error",
        description: res.message,
      });
    } else {
      toast({
        variant: "success",
        description: "Workout updated successfully",
      });
    }
  };

  const deleteWorkout = async () => {
    setShowAlertDialog(false);
    const res = await deleteWorkoutAction(selectedWorkout?.id);
    if (res.status === "error") {
      toast({
        variant: "error",
        description: res.message,
      });
    } else {
      toast({
        variant: "success",
        description: "Workout deleted successfully",
      });
    }
    setSelectedWorkout(null);
  };

  return (
    <>
      {showWorkoutDialog && (
        <WorkoutDialog
          workout={selectedWorkout}
          open={showWorkoutDialog}
          onOpenChange={(isOpen) => {
            setShowWorkoutDialog(isOpen);
            setSelectedWorkout(null);
          }}
          onSubmit={(values) => {
            if(selectedWorkout) {
              updateWorkout(values)
            } else {
              addWorkout(values);
            }
          }}
        />
      )}
       {showAlertDialog && (
        <WorkoutAlertDialog
          open={showAlertDialog}
          onOpenChange={(isOpen) => {
            setShowAlertDialog(isOpen);
            setSelectedWorkout(null);
          }}
          onCancel={() => {
            setShowAlertDialog(false);
            setSelectedWorkout(null);
          }}
          onSubmit={deleteWorkout}
        />
      )}
      <div className="mb-4 w-full flex justify-end">
        <AddButton onClick={() => setShowWorkoutDialog(true)} />
      </div>
      <WorkoutTable
        workouts={workouts}
        onEditClick={(workout) => {
          setSelectedWorkout(workout);
          setShowWorkoutDialog(true);
        }}
        onDeleteClick={(workout) => {
          setSelectedWorkout(workout);
          setShowAlertDialog(true);
        }}
      />
    </>
  );
}
