// locals
import prisma from "@/lib/prisma";
import { PostDataInclude } from "@/constants";

// components
import { Editor, Post } from "@/components/posts";

export default async function Home() {
  const posts = await prisma.post.findMany({
    include: PostDataInclude,
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="w-full">
      <Editor />

      <div className="flex flex-col gap-5 my-10">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
}
