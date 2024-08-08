import { cn } from "@/lib/utils";

type PageHeadingProps = {
  text: string;
  className?: string;
};

export default function PageHeading({ text, className }: PageHeadingProps) {
  return <h1 className={cn("text-2xl font-bold", className)}>{text}</h1>;
}
