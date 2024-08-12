"use server";

import { PartialWorkout, WorkoutRepo } from "@/data/repo/workout-repo";
import { getCurrentUser } from "@/lib/utils";
import { workoutSchema } from "@/schemas/workout-schema";
import { ServerResponse } from "@/types/server-response";
import { Workout } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const updateWorkoutAction = async (
  formData: z.infer<typeof workoutSchema>
): Promise<ServerResponse<Workout>> => {
  if (!formData.id)
    return { status: "error", message: "Workout ID is required" };

  const user = await getCurrentUser();
  if (!user?.id) return { status: "error", message: "Operation not permitted" };

  const partialWorkout: PartialWorkout = {
    ...formData,
    userId: user.id,
  };
  const res = await WorkoutRepo.updateWorkout(formData.id, partialWorkout);
  revalidatePath("/workouts");
  return res;
};
