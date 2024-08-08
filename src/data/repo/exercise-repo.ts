import { db } from "@/lib/db";
import { ServerResponse } from "@/types/server-response";
import { Exercise } from "@prisma/client";

export type NewExercise = Omit<Exercise, "id" | "createdAt" | "updatedAt">;
export type PartialExercise = Partial<Exercise>;

export class ExerciseRepo {
  static async getExercisesByUserId(
    userId: string
  ): Promise<ServerResponse<Exercise[]>> {
    try {
      const exercises = await db.exercise.findMany({
        where: {
          userId,
        },
      });
      return { status: "success", data: exercises };
    } catch {
      return { status: "error", message: "Failed to get exercises" };
    }
  }
  static async createExercise(
    newExercise: NewExercise
  ): Promise<ServerResponse<Exercise>> {
    try {
      const exercise = await db.exercise.create({
        data: newExercise,
      });
      return { status: "success", data: exercise };
    } catch {
      return { status: "error", message: "Failed to create exercise" };
    }
  }
  static async updateExercise(
    id: string,
    partialExercise: PartialExercise
  ): Promise<ServerResponse<Exercise>> {
    try {
      const exercise = await db.exercise.update({
        where: { id },
        data: partialExercise,
      });
      return { status: "success", data: exercise };
    } catch {
      return { status: "error", message: "Failed to update exercise" };
    }
  }
  static async deleteExercise(id: string): Promise<ServerResponse<Exercise>> {
    try {
      const exercise = await db.exercise.delete({
        where: { id },
      });
      return { status: "success", data: exercise };
    } catch {
      return { status: "error", message: "Failed to delete exercise" };
    }
  }
}
