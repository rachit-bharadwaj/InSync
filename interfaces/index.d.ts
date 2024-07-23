import { PropsWithChildren } from "react";

// lucia
import { Session, User } from "lucia";

// components
import { ButtonProps } from "@/components/ui/button";

declare interface DatabaseUserAttributes {
  id: string;
  username: string;
  name: string;
  avatarUrl: string | null;
  googleId: string | null;
  email: string | null;
}

declare interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
}

declare interface SessionContextInterface {
  user: User;
  session: Session;
}

declare global {
  interface InfiniteScrollProps extends PropsWithChildren {
    onBottomReached: () => void;
    className: string;
  }
}
