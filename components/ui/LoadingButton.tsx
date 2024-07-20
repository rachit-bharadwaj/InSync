"use client";

import { LoadingButtonProps } from "@/interfaces";
import { Button } from "./button";
import { cn } from "@/lib/utils";

import { Loader2 } from "lucide-react";

export default function LoadingButton({
  loading,
  disabled,
  className,
  ...props
}: LoadingButtonProps) {
  return (
    <Button
      disabled={loading || disabled}
      className={cn("flex items-center gap-3", className)}
      {...props}
    >
      {loading && <Loader2 className="text-xl animate-spin" />}
      {props.children}
    </Button>
  );
}
