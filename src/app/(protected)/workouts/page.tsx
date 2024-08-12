import PageDivider from "@/components/layout/page-divider";
import PageHeading from "@/components/layout/page-heading";
import PageSubheading from "@/components/layout/page-subheading";
import { WorkoutService } from "@/data/service/workout-service";
import WorkoutsWrapper from "./_components/workouts-wrapper";

export default async function WorkoutsPage() {
  const workouts = await WorkoutService.getWorkoutsForLoggedUser();
  return (
    <main>
    <PageHeading text="Workouts" className="mb-1" />
    <PageSubheading text="List of all workouts in the system" />
    <PageDivider />
    <WorkoutsWrapper workouts={workouts} />
  </main>
  )
}