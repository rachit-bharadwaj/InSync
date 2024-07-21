"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { navItems } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Navbar({ className }: NavbarProps) {
  const path = usePathname();

  return (
    <nav className={className}>
      {navItems.map((item) => (
        <Button
          key={item.name}
          variant="ghost"
          className={cn("flex items-center justify-start gap-3", {
            "bg-primary text-white hover:bg-primary/90 hover:text-white":
              path === item.href,
          })}
          title={item.name}
          asChild
        >
          <Link href={item.href}>
            <item.Icon />
            <span className="hidden lg:inline">{item.name}</span>
          </Link>
        </Button>
      ))}
    </nav>
  );
}
