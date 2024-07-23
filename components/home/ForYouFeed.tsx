"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { LoadingPosts, Post } from "../posts";
import kyInstance from "@/lib/ky";
import { InfiniteScroll } from "@/containers/shared";

export default function ForYouFeed() {
  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["posts", "for-you"],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get(
          "/api/posts/for-you",
          pageParam ? { searchParams: { cursor: pageParam } } : {}
        )
        .json<PostsPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const posts = data?.pages.flatMap((page) => page.posts) || [];

  if (status === "pending") return <LoadingPosts />;

  if (status === "error")
    return <p className="text-destructive text-center">Error fetching posts</p>;

  return (
    <InfiniteScroll
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
      className="flex flex-col gap-5"
    >
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}

      {isFetchingNextPage && (
        <div className="flex justify-center">
          <Loader2Icon className="animate-spin text-2xl mx-auto" />
        </div>
      )}
    </InfiniteScroll>
  );
}
