"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { Post } from "../posts";

export default function ForYouFeed() {
  const query = useQuery<PostData[]>({
    queryKey: ["post-feed", "for-you"],
    queryFn: async () => {
      const res = await fetch("/api/posts/for-you");
      const resData = await res.json();
      if (!res.ok) throw Error(`Error: ${res.status}`);

      console.log("resData", resData);
      return resData;
    },
  });

  if (query.status === "pending")
    return <Loader2Icon className="animate-spin text-2xl mx-auto" />;

  if (query.status === "error")
    return <p className="text-destructive text-center">Error fetching posts</p>;

  return (
    <div className="flex flex-col gap-5">
      {query.data?.map((post) => <Post key={post.id} post={post} />)}
    </div>
  );
}
