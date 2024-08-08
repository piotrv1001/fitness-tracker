"use server";

import { ExerciseRepo, NewExercise } from "@/data/repo/exercise-repo";
import { getCurrentUser } from "@/lib/utils";
import { newExerciseSchema } from "@/schemas/new-exercise-schema";
import { ServerResponse } from "@/types/server-response";
import { Exercise } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createExerciseAction = async (
  formData: z.infer<typeof newExerciseSchema>
): Promise<ServerResponse<Exercise>> => {
  const user = await getCurrentUser();
  if (!user?.id) return { status: "error", message: "Operation not permitted" };

  const newExercise: NewExercise = {
    ...formData,
    userId: user.id,
  };
  const res = await ExerciseRepo.createExercise(newExercise);
  revalidatePath("/exercise");
  return res;
};
