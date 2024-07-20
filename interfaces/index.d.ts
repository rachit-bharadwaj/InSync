import { ButtonProps } from "@/components/ui/button";

declare interface DatabaseUserAttributes {
  id: string;
  username: string;
  name: string;
  avatarUrl: string | null;
  googleId: string | null;
}

declare interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
}