"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useQueryString } from "../hooks/useQueryString";

export default function Genres({
  genres,
}: {
  genres: Array<{ id: string; title: string; movies: Array<string> }>;
}) {
  const [value, setValue] = useState("all");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { createQueryString } = useQueryString(searchParams);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);

    if (e.target.value === "all") {
      router.push(`/`);
      return;
    }

    const queryParams = createQueryString("genre", e.target.value, "page");
    router.push(`${pathname}?${queryParams}`);
  };

  return (
    <div className="max-w-xs">
      <label
        htmlFor="location"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Genre
      </label>
      <select
        id="location"
        name="location"
        onChange={handleChange}
        value={value}
        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
      >
        <option value="all">All</option>
        {genres.map((genre) => {
          return (
            <option key={genre.id} value={genre.title}>
              {genre.title}
            </option>
          );
        })}
      </select>
    </div>
  );
}
