import { getGenres, getMovies, type SearchParams } from "./utils";
import MovieCard from "./components/movie-card";
import Genres from "./components/genres";

import Pagination from "./components/pagination";
import { Suspense } from "react";

export default async function HomePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { movies, totalPages } = await getMovies(searchParams);
  const genres = await getGenres();

  return (
    <main className="flex min-h-screen flex-col bg-gray-50 pb-40">
      <div className="container mx-auto">
        <div className="py-24 text-center">
          {searchParams.search ? (
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                Search: {searchParams.search}
              </h1>
              <p>Number of results: {movies.length}</p>
            </div>
          ) : (
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Movies
            </h1>
          )}
        </div>
        <Suspense fallback={<p>Loading...</p>}>
          <Genres genres={genres} />
        </Suspense>
        <div className="mt-10">
          <div className="col-span-10">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-x-8">
              {movies.length > 0 ? (
                movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))
              ) : (
                <p>No movies found</p>
              )}
            </ul>
            <Suspense fallback={<p>Loading...</p>}>
              <Pagination totalPages={totalPages} />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}
