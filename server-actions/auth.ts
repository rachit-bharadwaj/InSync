"use server";

// next
import { isRedirectError } from "next/dist/client/components/redirect";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { hash, verify } from "@node-rs/argon2";

// lucia
import { lucia, validateRequest } from "@/auth";
import { generateIdFromEntropySize } from "lucia";

// locals
import prisma from "@/lib/prisma";
import { loginValidation, signupValidation } from "@/lib/validations";
import { LoginValues, SignupValues } from "@/types";

export async function login(
  credentials: LoginValues
): Promise<{ error: string }> {
  try {
    const { password, username } = loginValidation.parse(credentials);

    const passwordHash = await hash(password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    const userId = generateIdFromEntropySize(10);

    const existingUser = await prisma.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
    });

    if (!existingUser || !existingUser.password)
      return { error: "Invalid credentials" };

    const validPassword = await verify(existingUser.password, password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    if (!validPassword) return { error: "Invalid credentials" };

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return redirect("/");
  } catch (error) {
    if (isRedirectError(error)) throw new Error(error.message);
    console.log(error);
    return { error: "Something went wrong" };
  }
}

export async function signup(
  credentials: SignupValues
): Promise<{ error: string }> {
  try {
    const { name, email, password, username } =
      signupValidation.parse(credentials);

    const passwordHash = await hash(password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    const userId = generateIdFromEntropySize(10);

    const existingUser = await prisma.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
    });

    if (existingUser) return { error: "Username already exists" };

    const existingEmail = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive",
        },
      },
    });

    if (existingEmail) return { error: "Email already registered" };

    await prisma.user.create({
      data: {
        id: userId,
        username,
        name,
        email,
        password: passwordHash,
      },
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return redirect("/");
  } catch (error) {
    if (isRedirectError(error)) throw new Error(error.message);
    console.log(error);
    return { error: "Something went wrong" };
  }
}

export async function logout() {
  const { session } = await validateRequest();

  if (!session) throw new Error("Unauthorized");

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return redirect("/login");
}
