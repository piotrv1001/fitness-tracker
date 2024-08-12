import { z } from "zod";

export const workoutSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, {
    message: "Name is required",
  }),
  date: z.date({
    required_error: "Date is required",
  }),
  duration: z.coerce.number().nullable(),
  kcal: z.coerce.number().nullable(),
});