// locals
import { validateRequest } from "@/auth";
import { UserDataSelect } from "@/constants";
import prisma from "@/lib/prisma";

// components
import { UserAvatar } from "../ui";

// shadcn
import { Button } from "../ui/button";

export default async function WhoToFollow() {
  const { user } = await validateRequest();

  if (!user) return null;

  const usersToFollow = await prisma.user.findMany({
    where: {
      id: {
        not: user.id,
      },
    },
    select: UserDataSelect,
    take: 5,
  });

  return (
    <div className="space-y-5 rounded-2xl bg-secondary p-5 shadow-sm">
      <div className="text-xl font-bold">Who to follow</div>

      <div>
        {usersToFollow.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <UserAvatar avatarUrl={user.avatarUrl} size={35} />
              <div>
                <div className="text-sm font-bold">{user.name}</div>
                <div className="text-sm text-muted-foreground">
                  {`@${user.username}`}
                </div>
              </div>
            </div>
            <Button>Follow</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
