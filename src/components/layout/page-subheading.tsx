import { cn } from "@/lib/utils";

type PageSubheadingProps = {
  text: string;
  className?: string;
};

export default function PageSubheading({
  text,
  className,
}: PageSubheadingProps) {
  return (
    <h3 className={cn("text-sm text-muted-foreground", className)}>{text}</h3>
  );
}
