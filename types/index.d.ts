import { z } from "zod";
import { loginValidation, signupValidation } from "@/lib/validations";

declare type SignupValues = z.infer<typeof signupValidation>;

declare type LoginValues = z.infer<typeof loginValidation>;
