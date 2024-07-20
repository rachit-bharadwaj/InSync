"use client";

// react
import { forwardRef, useState } from "react";

// locals
import { cn } from "@/lib/utils";

// shadcn
import { Input, InputProps } from "./input";

// icons
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          className={cn("pe-10", className)}
          ref={ref}
          {...props}
        />

        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-xl text-muted-foreground"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
        </button>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
