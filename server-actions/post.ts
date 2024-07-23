"use server";

import { validateRequest } from "@/auth";
import { PostDataInclude } from "@/constants";
import prisma from "@/lib/prisma";
import { postValidation } from "@/lib/validations";

export async function createPost(input: string) {
  const { user } = await validateRequest();

  if (!user) return { error: "Unauthorized" };

  try {
    const { content } = postValidation.parse({
      content: input,
    });

    const newPost = await prisma.post.create({
      data: {
        content,
        userId: user.id,
      },

      include: PostDataInclude,
    });

    return newPost;
  } catch (error: any) {
    return error.message;
  }
}

export async function deletePost(id: string) {
  const { user } = await validateRequest();

  try {
    if (!user) return { error: "Unauthorized" };

    const post = await prisma.post.findUnique({
      where: {
        id,
      },
    });

    if (!post) return { error: "Post not found" };

    if (post.userId !== user.id) return { error: "Unauthorized" };

    const deletedPost = await prisma.post.delete({
      where: {
        id,
      },

      include: PostDataInclude,
    });

    return deletedPost;
  } catch (error: any) {
    return error.message;
  }
}
