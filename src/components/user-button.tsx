"use client";

import { LayoutDashboardIcon, PowerIcon } from "lucide-react";
import Link from "next/link";
import { useUser } from "@/hooks/use-user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import UserAvatar from "./user-avatar";
import LogoutButton from "./logout-button";
import ThemeToggle from "./theme-toggle";

export default function UserButton() {
  const user = useUser();
  const userName = user?.name ?? "(Guest User)";
  const userImage = user?.image;
  
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <UserAvatar src={userImage} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60 p-2" align="end">
        <div className="flex flex-col justify-center items-center gap-y-3 w-full bg-secondary rounded-md mb-2 py-4">
          <UserAvatar src={userImage} />
          <span className="text-sm font-semibold mt-3">{userName}</span>
        </div>
        <Link href="/dashboard">
          <DropdownMenuItem className="p-2">
            <LayoutDashboardIcon className="w-4 h-4 mr-2" />
            Dashboard
          </DropdownMenuItem>
        </Link>
        <ThemeToggle />
        <DropdownMenuSeparator />
        <LogoutButton>
          <DropdownMenuItem className="p-2">
            <PowerIcon className="w-4 h-4 mr-2" />
            Sign out
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
