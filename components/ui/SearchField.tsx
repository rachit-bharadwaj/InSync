"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";

// components
import { Input } from "./input";

// icons
import { SearchIcon } from "lucide-react";

export default function SearchField() {
  const router = useRouter();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const q = (form.q as HTMLInputElement).value.trim();
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <form onSubmit={handleSearch}>
      <div className="relative">
        <Input name="q" placeholder="Search" className="pe-10" />
        <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
      </div>
    </form>
  );
}
