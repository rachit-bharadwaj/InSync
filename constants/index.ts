import { Prisma } from "@prisma/client";

// icons
import { Bell, Bookmark, Home, Mail } from "lucide-react";

export const navItems = [
  {
    name: "Home",
    Icon: Home,
    href: "/",
  },

  {
    name: "Notifications",
    Icon: Bell,
    href: "/notifications",
  },

  {
    name: "Messages",
    Icon: Mail,
    href: "/messages",
  },
  {
    name: "Bookmarks",
    Icon: Bookmark,
    href: "/bookmarks",
  },
];

export const UserDataSelect = {
  id: true,
  name: true,
  avatarUrl: true,
  username: true,
} satisfies Prisma.UserSelect;

export const PostDataInclude = {
  user: {
    select: UserDataSelect,
  },
} satisfies Prisma.PostInclude;
