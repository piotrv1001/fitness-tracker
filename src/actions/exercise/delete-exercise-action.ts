"use server";

import { ExerciseRepo } from "@/data/repo/exercise-repo";
import { getCurrentUser } from "@/lib/utils";
import { ServerResponse } from "@/types/server-response";
import { Exercise } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const deleteExerciseAction = async (
  id?: string
): Promise<ServerResponse<Exercise>> => {
  if (!id) return { status: "error", message: "Exercise ID is required" };

  const user = await getCurrentUser();
  if (!user?.id) return { status: "error", message: "Operation not permitted" };

  const res = await ExerciseRepo.deleteExercise(id);
  revalidatePath("/exercise");
  return res;
};
