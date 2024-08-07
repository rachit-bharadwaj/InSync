// next
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

// components
import { SignupForm } from "@/components/auth";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function SignupPage() {
  return (
    <div className="h-screen p-3 flex justify-evenly flex-col">
      <Link href="/">
        <Image
          src="/graphics/logo-no-bg-full.svg"
          alt="logo"
          width={500}
          height={500}
          className="h-28 w-fit px-10"
        />
      </Link>

      <div className="flex justify-evenly">
        <div className="flex flex-col w-full justify-evenly px-5 sm:px-28 md:px-0 md:max-w-sm">
          <div className="my-5 flex flex-col gap-1 items-center">
            <h1 className="text-4xl font-bold">Sign up</h1>
            <p className="text-muted-foreground">Get in sync with people</p>
          </div>

          <SignupForm />

          <div className="flex gap-1 justify-center my-5">
            <p>Already have an account?</p>
            <Link href="/login" className="text-primary">
              Login
            </Link>
          </div>
        </div>

        <Image
          src="/graphics/signup.jpg"
          alt="Signup Illustration"
          width={500}
          height={500}
          className="h-96 w-fit hidden md:block"
        />
      </div>
    </div>
  );
}
