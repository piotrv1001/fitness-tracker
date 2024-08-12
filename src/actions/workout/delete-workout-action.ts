"use server";

import { WorkoutRepo } from "@/data/repo/workout-repo";
import { getCurrentUser } from "@/lib/utils";
import { ServerResponse } from "@/types/server-response";
import { Workout } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const deleteWorkoutAction = async (
  id?: string
): Promise<ServerResponse<Workout>> => {
  if (!id) return { status: "error", message: "Workout ID is required" };

  const user = await getCurrentUser();
  if (!user?.id) return { status: "error", message: "Operation not permitted" };

  const res = await WorkoutRepo.deleteWorkout(id);
  revalidatePath("/workouts");
  return res;
};
