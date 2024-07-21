import Image from "next/image";

import { cn } from "@/lib/utils";

// icons
import { TiUser } from "react-icons/ti";

export default function UserAvatar({
  avatarUrl,
  className,
  size,
}: AvatarProps) {
  return (
    <div>
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          alt="avatar"
          width={size ?? 48}
          height={size ?? 48}
          className={cn(
            "aspect-square h-fit flex-none rounded-full bg-secondary object-cover",
            className
          )}
        />
      ) : (
        <TiUser
          size={size}
          className={cn(
            "aspect-square h-fit flex-none rounded-full text-muted-foreground bg-secondary",
            className
          )}
        />
      )}
    </div>
  );
}
