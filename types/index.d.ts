import { ComponentProps } from "react";
import { z } from "zod";
import { loginValidation, signupValidation } from "@/lib/validations";
import { Post as PostData, Prisma } from "@prisma/client";
import { PostDataInclude } from "@/constants";

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

  type PostData = Prisma.PostGetPayload<{ include: typeof PostDataInclude }>;

  type PostProps = {
    post: PostData;
  };

  type PostsPage = {
    posts: PostData[];
    nextCursor: string | null;
  };
}
