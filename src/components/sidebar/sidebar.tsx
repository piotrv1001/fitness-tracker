"use client";

import {
  LayoutDashboardIcon,
  DumbbellIcon,
  FileIcon,
  ListCheckIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import RouteItem from "./route-item";

export const routes = [
  {
    icon: LayoutDashboardIcon,
    href: "/dashboard",
    label: "Dashboard",
  },
  {
    icon: DumbbellIcon,
    href: "/workouts",
    label: "Workouts",
  },
  {
    icon: ListCheckIcon,
    href: "/exercise",
    label: "Exercises",
  },
  {
    icon: FileIcon,
    href: "/templates",
    label: "Templates",
  },
] as const;

export default function Sidebar() {
  const pathName = usePathname();
  
  return (
    <div className="space-y-4 flex flex-col h-full text-primary overflow-y-auto">
      <div className="p-3 flex-1 justify-center flex">
        <div className="space-1 md:space-y-2 w-full">
          {routes.map((route) => (
            <RouteItem key={route.href} pathName={pathName} route={route} />
          ))}
        </div>
      </div>
    </div>
  );
}
