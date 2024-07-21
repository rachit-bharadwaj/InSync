import { ComponentProps } from "react";
import { z } from "zod";
import { loginValidation, signupValidation } from "@/lib/validations";

declare global {
  type SignupValues = z.infer<typeof signupValidation>;

  type LoginValues = z.infer<typeof loginValidation>;

  type UserButtonProps = {
    className?: string;
  };

  type AvatarProps = {
    avatarUrl: string | null | undefined;
    size?: number;
    className?: string;
  };

  type NavbarProps = {
    className?: string;
  };
}
