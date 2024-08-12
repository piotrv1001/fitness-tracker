import { Exercise } from "@prisma/client";
import { ExerciseRepo } from "../repo/exercise-repo";
import { getCurrentUser } from "@/lib/utils";

export class ExerciseService {
  static async getExercisesForLoggedUser(): Promise<Exercise[]> {
    const user = await getCurrentUser();
    if (!user?.id) return [];

    const res = await ExerciseRepo.getExercisesByUserId(user.id);
    if (res.status === "error") return [];

    return res.data;
  }
}
