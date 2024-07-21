import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { validateRequest } from "@/auth";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const { user } = await validateRequest();

  if (user) redirect("/");

  return <>{children}</>;
}
