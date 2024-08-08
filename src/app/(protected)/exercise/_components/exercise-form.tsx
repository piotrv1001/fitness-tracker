"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Exercise } from "@prisma/client";
import { newExerciseSchema } from "@/schemas/new-exercise-schema";

type ExerciseFormProps = {
  exercise?: Exercise | null;
  onSubmit: (values: z.infer<typeof newExerciseSchema>) => void;
};

export default function ExerciseForm({
  exercise,
  onSubmit,
}: ExerciseFormProps) {
  const form = useForm<z.infer<typeof newExerciseSchema>>({
    resolver: zodResolver(newExerciseSchema),
    defaultValues: exercise
      ? {
          id: exercise.id,
          name: exercise.name,
          muscleGroup: exercise.muscleGroup,
        }
      : {
          name: "",
          muscleGroup: "",
        },
  });

  const handleSubmit = (values: z.infer<typeof newExerciseSchema>) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Name of the exercise"
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="muscleGroup"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Muscle group</FormLabel>
                <FormControl>
                  <Input {...field} type="text" placeholder="Muscle group" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}
