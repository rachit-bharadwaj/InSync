// locals
import prisma from "@/lib/prisma";
import { PostDataInclude } from "@/constants";

import { Sidebar } from "@/containers/home";

// components
import { Editor, Post } from "@/components/posts";
import { ForYouFeed, TrendingTopics, WhoToFollow } from "@/components/home";

export default async function Home() {
  const posts = await prisma.post.findMany({
    include: PostDataInclude,
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="w-full flex gap-5">
      <div className="w-full flex flex-col gap-10">
        <Editor />

        
          <ForYouFeed />
        </div>
     

      <Sidebar>
        <WhoToFollow />
        <TrendingTopics />
      </Sidebar>
    </main>
  );
}
