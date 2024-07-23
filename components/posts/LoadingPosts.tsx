import { Skeleton } from "../ui/skeleton";

export default function LoadingPosts() {
  return (
    <div className="space-y-5">
      <LoadingSkeleton />
      <LoadingSkeleton />
      <LoadingSkeleton />
    </div>
  );
}

const LoadingSkeleton = () => {
  return (
    <div className="w-full animate-pulse space-y-7 rounded-2xl bg-secondary/50 p-5">
      <div className="flex flex-wrap gap-3">
        <Skeleton className="size-12 rounded-full" />

        <div className="space-y-1.5">
          <Skeleton className="h-4 w-24 rounded-lg" />
          <Skeleton className="h-4 w-20 rounded-lg" />
        </div>
      </div>
      <Skeleton className="h-16 rounded-lg" />
    </div>
  );
};
