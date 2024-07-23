"use client";

import { useSession } from "@/hooks";

// components
import UserAvatar from "./UserAvatar";

// shadcn
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { logout } from "@/server-actions/auth";
import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";

export default function UserButton({ className }: UserButtonProps) {
  const { user } = useSession();
  const { setTheme, theme } = useTheme();
  const queryClient = useQueryClient();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none" asChild>
        <button className={className}>
          <UserAvatar avatarUrl={user?.avatarUrl} size={40} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="text-muted-foreground">
          {user?.name}
        </DropdownMenuLabel>
        <DropdownMenuItem className="p-0" asChild>
          <Link href={`/${user?.username}`} className="cursor-pointer">
            <p className="w-full p-2 hover:bg-muted">Profile</p>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Monitor className="mr-2 size-4" />
            Theme
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem
                onClick={() => setTheme("system")}
                className={cn(
                  `cursor-pointer ${theme === "system" && "bg-primary text-white"}`
                )}
              >
                <Monitor className="mr-2 size-4" /> System Default
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme("light")}
                className={cn(
                  `cursor-pointer ${theme === "light" && "bg-primary text-white"}`
                )}
              >
                <Sun className="mr-2 size-4" /> Light
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme("dark")}
                className={cn(
                  `cursor-pointer ${theme === "dark" && "bg-primary text-white"}`
                )}
              >
                <Moon className="mr-2 size-4" /> Dark
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="p-0">
          <button
            className="w-full p-2 hover:bg-muted cursor-pointer"
            onClick={() => {
              queryClient.clear();
              logout();
            }}
          >
            Log out
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
