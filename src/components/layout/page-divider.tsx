import { cn } from "@/lib/utils";

type PageDividerProps = {
  className?: string;
};

export default function PageDivider({ className }: PageDividerProps) {
  return <div className={cn("my-8 bg-muted h-[1px] w-full flex-none", className)}></div>;
}
