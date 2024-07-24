"use client";
import { CheckIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

export default function Search() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  let [modifierKey, setModifierKey] = useState<string>();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(pathname);
    const formData = new FormData(e.currentTarget);
    const search = formData.get("search") as string;
    const queryParams = createQueryString("search", search);
    router.push(`/?${queryParams}`);
  };
  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <form onSubmit={handleSubmit} className="container mx-auto flex flex-1">
          <label htmlFor="search-field" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <MagnifyingGlassIcon
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-500"
            />
            <input
              id="search-field"
              name="search"
              type="search"
              placeholder="Search for movie titles..."
              className="block h-full w-full border-0 bg-transparent py-0 pl-8 pr-0 text-gray-900 sm:text-sm"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
