import Image from "next/image";
import Link from "next/link";

// components
import { SearchField, UserButton } from "@/components/ui";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-secondary">
      <div className="max-w-7xl flex p-5 gap-10 justify-evenly mx-auto items-center">
        <Link href="/">
          <Image
            src="/graphics/logo-no-bg-full.svg"
            alt="logo"
            width={500}
            height={500}
            className="h-10 w-fit"
          />
        </Link>

        <SearchField />

        <UserButton />
      </div>
    </header>
  );
}
