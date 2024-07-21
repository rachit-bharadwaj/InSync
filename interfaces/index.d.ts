import { ButtonProps } from "@/components/ui/button";
import { Session, User } from "lucia";

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
