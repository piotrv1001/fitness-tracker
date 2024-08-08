"use client";

import { MenuIcon, X } from "lucide-react";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { routes } from "./sidebar";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

export default function MobileSidebar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathName = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Button variant="ghost" size="icon" className="md:hidden" asChild>
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        hideCloseButton
        className="flex flex-col divide-y"
      >
        <SheetTitle>Menu</SheetTitle>
        <nav>
          <ul className="flex flex-col gap-y-1.5">
            {routes.map((link) => (
              <li key={link.href} className="cursor-pointer">
                <SheetClose asChild className="left-0">
                  <div
                    className="w-full py-4"
                    onClick={() => {
                      setOpen(false);
                      router.push(link.href);
                    }}
                  >
                    <div
                      className={cn(
                        "gap-x-2 items-center text-muted-foreground text-sm group flex p-3 w-full justify-start font-medium rounded-md",
                        pathName === link.href &&
                          "text-foreground bg-foreground/5"
                      )}
                    >
                      <link.icon className="h-5 w-5" />
                      <span>{link.label}</span>
                    </div>
                  </div>
                </SheetClose>
              </li>
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
