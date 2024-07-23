import { validateRequest } from "@/auth";
import { PostDataInclude } from "@/constants";
import prisma from "@/lib/prisma";

export const GET = async () => {
  try {
    const { user } = await validateRequest();

    if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const posts = await prisma.post.findMany({
      include: PostDataInclude,
      orderBy: { createdAt: "desc" },
    });

    return Response.json(posts);
  } catch (error) {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
};
