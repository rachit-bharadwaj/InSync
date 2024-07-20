"use client";

// react
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";

// locals
import { LoginValues } from "@/types";
import { loginValidation } from "@/lib/validations";
import { login } from "@/server-actions/auth";

// shadcn
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { LoadingButton, PasswordInput } from "../ui";

export default function LoginForm() {
  const [error, setError] = useState<string>();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginValidation),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleSubmit = (values: LoginValues) => {
    setError(undefined);

    startTransition(async () => {
      const result = await login(values);

      if (result.error) {
        setError(result.error);
      } else if (result.redirectTo) {
        router.push(result.redirectTo);
      }
    });
  };

  return (
    <Form {...form}>
      {error && <p className="text-destructive">{error}</p>}
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  className="lowercase"
                  placeholder="username"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton
          loading={isPending}
          type="submit"
          className="w-full my-5"
        >
          Login
        </LoadingButton>
      </form>
    </Form>
  );
}
