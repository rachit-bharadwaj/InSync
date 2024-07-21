import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { validateRequest } from "@/auth";
import { SessionProvider } from "@/contexts";
import { Header, Navbar } from "@/components/shared";

export default async function MainLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const session = await validateRequest();

  if (!session.user) redirect("/login");

  return (
    <>
      <SessionProvider value={session}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <div className="flex w-full mx-auto max-w-7xl p-5 grow gap-5">
            <Navbar className="sticky top-20 h-fit hidden sm:block flex-none space-y-3 rounded-2xl bg-secondary/50 px-3 py-5 lg:px-5 xl:w-80" />
            {children}
          </div>

          <Navbar className="sticky bottom-0 w-full justify-center items-center flex gap-5 p-5 bg-secondary/50 sm:hidden" />
        </div>
      </SessionProvider>
    </>
  );
}
