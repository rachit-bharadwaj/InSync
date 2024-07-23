import { ReactNode, Suspense } from "react";

// icons
import { Loader2 } from "lucide-react";

export default async function Sidebar({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <aside className="sticky top-24 hidden h-fit w-60 flex-none space-y-6 md:block lg:w-80">
      <Suspense fallback={<Loader2 className="mx-auto animate-spin" />}>
        {children}
      </Suspense>
    </aside>
  );
}
