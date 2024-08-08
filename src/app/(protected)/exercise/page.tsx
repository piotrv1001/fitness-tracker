import PageDivider from "@/components/layout/page-divider";
import PageHeading from "@/components/layout/page-heading";
import PageSubheading from "@/components/layout/page-subheading";
import { ExerciseService } from "@/data/service/exercise-service";
import ExercisesWrapper from "./_components/exercise-wrapper";

export default async function ExercisePage() {
  const exercises = await ExerciseService.getExercisesForLoggedUser(); 
  return (
    <main>
      <PageHeading text="Exercises" className="mb-1" />
      <PageSubheading text="List of all exercises in the system" />
      <PageDivider />
      <ExercisesWrapper exercises={exercises} />
    </main>
  )
}