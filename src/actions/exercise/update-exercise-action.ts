"use server";

import { ExerciseRepo, PartialExercise } from "@/data/repo/exercise-repo";
import { getCurrentUser } from "@/lib/utils";
import { newExerciseSchema } from "@/schemas/new-exercise-schema";
import { ServerResponse } from "@/types/server-response";
import { Exercise } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const updateExerciseAction = async (
  formData: z.infer<typeof newExerciseSchema>
): Promise<ServerResponse<Exercise>> => {
  if(!formData.id) return { status: "error", message: "Exercise ID is required" };

  const user = await getCurrentUser();
  if (!user?.id) return { status: "error", message: "Operation not permitted" };

  const partialExercise: PartialExercise = {
    ...formData,
    userId: user.id,
  };
  const res = await ExerciseRepo.updateExercise(formData.id, partialExercise);
  revalidatePath("/exercise");
  return res;
};
