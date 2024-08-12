import { db } from "@/lib/db";
import { ServerResponse } from "@/types/server-response";
import { Workout, WorkoutExercise, WorkoutSet } from "@prisma/client";

export type NewWorkout = Omit<Workout, "id" | "createdAt" | "updatedAt">;
export type PartialWorkout = Partial<Workout>;
export type WorkoutExerciseWithSets = WorkoutExercise & {
  workoutSets: WorkoutSet[];
};
export type WorkoutWithExercises = Workout & {
  workoutExercises: WorkoutExerciseWithSets[];
};

export class WorkoutRepo {
  static async createWorkout(
    newWorkout: NewWorkout
  ): Promise<ServerResponse<Workout>> {
    try {
      const workout = await db.workout.create({
        data: newWorkout,
      });
      return { status: "success", data: workout };
    } catch {
      return { status: "error", message: "Failed to create workout" };
    }
  }
  static async updateWorkout(
    id: string,
    partialWorkout: PartialWorkout
  ): Promise<ServerResponse<Workout>> {
    try {
      const workout = await db.workout.update({
        where: { id },
        data: partialWorkout,
      });
      return { status: "success", data: workout };
    } catch {
      return { status: "error", message: "Failed to update workout" };
    }
  }
  static async deleteWorkout(id: string): Promise<ServerResponse<Workout>> {
    try {
      const workout = await db.workout.delete({
        where: { id },
      });
      return { status: "success", data: workout };
    } catch {
      return { status: "error", message: "Failed to delete workout" };
    }
  }
  static async getWorkoutsByUserId(
    userId: string
  ): Promise<ServerResponse<Workout[]>> {
    try {
      const workotus = await db.workout.findMany({
        where: { userId },
      });
      return { status: "success", data: workotus };
    } catch {
      return { status: "error", message: "Failed to get workouts" };
    }
  }
}
