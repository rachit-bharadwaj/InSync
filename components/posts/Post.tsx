import { UserAvatar } from "../ui";

export default function Post({ post }: PostProps) {
  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const seconds = diffInSeconds;
    const minutes = Math.floor(diffInSeconds / 60);
    const hours = Math.floor(diffInSeconds / 3600);
    const days = Math.floor(diffInSeconds / 86400);

    if (seconds < 60) return `${seconds}s ago`;
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 365) return `${days}d ago`;

    return `${date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}`;
  };

  return (
    <article className="bg-secondary p-5 rounded-2xl">
      <div className="flex gap-2 items-center">
        <UserAvatar avatarUrl={post.user.avatarUrl} size={40} />

        <div>
          <p>{post.user.name}</p>
          <p className="text-muted-foreground text-sm">
            {formatTime(new Date(post.createdAt))}
          </p>
        </div>
      </div>
      <p className="mt-5 whitespace-pre-line break-words">{post?.content}</p>
    </article>
  );
}
