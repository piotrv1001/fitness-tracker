"use server";

import { NewWorkout, WorkoutRepo } from "@/data/repo/workout-repo";
import { getCurrentUser } from "@/lib/utils";
import { workoutSchema } from "@/schemas/workout-schema";
import { ServerResponse } from "@/types/server-response";
import { Workout } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createWorkoutAction = async (
  formData: z.infer<typeof workoutSchema>
): Promise<ServerResponse<Workout>> => {
  const user = await getCurrentUser();
  if (!user?.id) return { status: "error", message: "Operation not permitted" };

  const newWorkout: NewWorkout = {
    ...formData,
    userId: user.id,
  };
  const res = await WorkoutRepo.createWorkout(newWorkout);
  revalidatePath("/workouts");
  return res;
};
