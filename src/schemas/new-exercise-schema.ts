import { z } from "zod";

export const newExerciseSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, {
    message: "Name is required",
  }),
  muscleGroup: z.string().min(1, {
    message: "Muscle group is required",
  }),
});