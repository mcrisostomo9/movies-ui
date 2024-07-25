"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

export default function Search() {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

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

    const formData = new FormData(e.currentTarget);
    const search = formData.get("search") as string;
    const queryParams = createQueryString("search", search);
    router.push(`/?${queryParams}`);
  };

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <form
          onSubmit={handleSubmit}
          className="container mx-auto flex flex-1 py-2"
        >
          <label htmlFor="search-field" className="sr-only">
            Search
          </label>
          <div className="relative mx-auto w-full max-w-lg">
            <MagnifyingGlassIcon
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-2 h-full w-5 text-gray-500"
            />
            <input
              id="search-field"
              ref={inputRef}
              name="search"
              type="search"
              placeholder="Search for movie titles..."
              className="block h-full w-full rounded-lg border bg-transparent py-0 pl-8 pr-0 text-gray-900 ring-slate-400 sm:text-sm"
            />
            <kbd className="absolute bottom-0 right-4 top-0 ml-auto flex items-center text-sm text-zinc-400 dark:text-zinc-500">
              <kbd className="font-sans">⌘</kbd>
              <kbd className="font-sans">K</kbd>
            </kbd>
          </div>
        </form>
      </div>
    </div>
  );
}
