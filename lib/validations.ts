import { z } from "zod";

const requiredString = z.string().trim().min(1, "Required");

export const signupValidation = z.object({
  name: requiredString,
  email: requiredString.email("Invalid email"),
  username: requiredString.regex(
    // allowed alphanumeric characters, underscore, dot and hyphen but the username should only begin with a letter, number or an underscore
    /^[a-zA-Z0-9_][a-zA-Z0-9_.-]*$/,
    "Username can only contain letters, numbers, underscores, periods and hyphens and must begin with a letter, number or underscore"
  ),
  password: requiredString.regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character"
  ),
});

export const loginValidation = z.object({
  username: requiredString,
  password: requiredString,
});

export const postValidation = z.object({
  content: requiredString,
});
