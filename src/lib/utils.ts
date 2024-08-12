import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { auth } from "@/auth";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getCurrentUser() {
  const session = await auth();
  return session?.user;
}

export const formatDate = (date: string | Date, dateFormat: string) => {
  return format(new Date(date), dateFormat);
}
