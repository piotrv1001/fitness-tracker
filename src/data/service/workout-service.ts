import { getCurrentUser } from "@/lib/utils";
import { WorkoutRepo } from "../repo/workout-repo";
import { Workout } from "@prisma/client";

export class WorkoutService {
  static async getWorkoutsForLoggedUser(): Promise<Workout[]> {
    const user = await getCurrentUser();
    if (!user?.id) return [];

    const res = await WorkoutRepo.getWorkoutsByUserId(user.id);
    if (res.status === "error") return [];

    return res.data;
  }
}
