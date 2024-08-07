"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useQueryString } from "../hooks/useQueryString";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");
  const { createQueryString } = useQueryString(searchParams);

  return (
    <div className="mt-10 flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <Link
          href={
            pathname +
            "?" +
            createQueryString("page", (currentPage + 1).toString())
          }
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </Link>
        <Link
          href={
            pathname +
            "?" +
            createQueryString("page", (currentPage + 1).toString())
          }
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </Link>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-end">
        <div>
          <nav
            aria-label="Pagination"
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          >
            <Link
              href={
                currentPage === 1
                  ? pathname
                  : pathname +
                    "?" +
                    createQueryString("page", (currentPage - 1).toString())
              }
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
            </Link>
            {Array.from({ length: totalPages }).map((_, i) => {
              return (
                <Link
                  key={i}
                  href={
                    pathname +
                    "?" +
                    createQueryString("page", (i + 1).toString())
                  }
                  className={
                    "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:z-20 focus:outline-offset-0" +
                    (currentPage === i + 1 ? " bg-gray-100" : "")
                  }
                >
                  {i + 1}
                </Link>
              );
            })}
            {currentPage < totalPages && (
              <Link
                href={
                  pathname +
                  "?" +
                  createQueryString("page", (currentPage + 1).toString())
                }
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
              </Link>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}
