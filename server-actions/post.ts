"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { postValidation } from "@/lib/validations";

export async function createPost(input: string): Promise<{ error?: string }> {
  const { user } = await validateRequest();

  if (!user) return { error: "Unauthorized" };

  try {
    const { content } = postValidation.parse({
      content: input,
    });

    await prisma.post.create({
      data: {
        content,
        userId: user.id,
      },
    });
  } catch (error) {
    return { error: "Something went wrong" };
  }

  return { error: "Not implemented" };
}
