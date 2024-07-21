import { useContext } from "react";

import { SessionContext } from "@/contexts/Session";

export default function useSession() {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }

  return context;
}
