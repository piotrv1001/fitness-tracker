import { cn } from "@/lib/utils";
import Link from "next/link";
import { routes } from "./sidebar";

type RouteItemProps = {
  pathName: string;
  route: (typeof routes)[number];
};

export default function RouteItem({ pathName, route }: RouteItemProps) {
  return (
    <Link
      href={route.href}
      key={route.href}
      className={cn(
        "text-muted-foreground text-sm group flex p-3 w-full justify-start font-medium cursor-pointer rounded-lg transition",
        "hover:text-foreground hover:bg-foreground/5",
        pathName === route.href && "text-foreground bg-foreground/5"
      )}
    >
      <div className="flex gap-x-2 items-center w-full">
        <route.icon className="h-5 w-5" />
        <span className="text-center">{route.label}</span>
      </div>
    </Link>
  );
}
