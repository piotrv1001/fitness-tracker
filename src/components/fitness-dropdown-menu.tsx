"use client";

import { ClassValue } from "clsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

type FitnessDropdownMenuProps = {
  children: React.ReactNode;
  trigger: React.ReactNode;
  btnClassName?: ClassValue;
};

export default function FitnessDropdownMenu({
  children,
  trigger,
  btnClassName,
}: FitnessDropdownMenuProps) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn("px-2 py-2 rounded-full", btnClassName)}
        >
          {trigger}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="min-w-[160px] w-max p-2 space-y-1"
        align="end"
      >
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type FitnessDropdownMenuItemProps = {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: (e: any) => void;
  className?: ClassValue;
  btnText?: string;
  disabled?: boolean;
};

export function FitnessDropdownMenuItem({
  children,
  className,
  icon,
  onClick,
  btnText,
  disabled,
}: FitnessDropdownMenuItemProps) {
  return (
    <DropdownMenuItem
      disabled={disabled}
      className={cn(
        " cursor-pointer hover:bg-background rounded-md",
        className
      )}
      onClick={onClick}
    >
      {children ?? (
        <div className="flex gap-x-4 items-center">
          {icon}
          {btnText && <button>{btnText}</button>}
        </div>
      )}
    </DropdownMenuItem>
  );
}
