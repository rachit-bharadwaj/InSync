"use client";

import { createContext, PropsWithChildren } from "react";

import { SessionContextInterface } from "@/interfaces";

export const SessionContext = createContext<SessionContextInterface | null>(null);

export default function SessionProvider({
  children,
  value,
}: PropsWithChildren<{ value: SessionContextInterface }>) {
  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}
