"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { postValidation } from "@/lib/validations";

export async function createPost(
  title: string,
  content: string
): Promise<{ error?: string }> {
  const { user } = await validateRequest();

  if (!user) return { error: "Unauthorized" };

  try {
    const { content: validatedContent, title: validatedTitle } =
      postValidation.parse({ content, title });

    await prisma.post.create({
      data: {
        title: validatedTitle,
        content: validatedContent,
        userId: user.id,
      },
    });
  } catch (error) {
    return { error: "Something went wrong" };
  }

  return { error: "Not implemented" };
}
