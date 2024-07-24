import { apiClient, getToken } from "./utils";
import MovieCard, { type Movie } from "./components/movie-card";
import Genres from "./components/genres";
import Search from "./components/search";
import Pagination from "./components/pagination";

type SearchParams = {
  page: string;
  limit: string;
  search: string;
  genre: string;
};

async function getMovies(searchParams: SearchParams) {
  const queryParams = new URLSearchParams([
    ...Object.entries(searchParams),
  ]).toString();

  const token = await getToken();
  const res = await apiClient<{
    data: Array<Movie>;
    totalPages: number;
  }>(`/movies?${queryParams}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const movies = res.data;
  const totalPages = res.totalPages;
  return { movies, totalPages };
}

async function getGenres() {
  const token = await getToken();
  const { data } = await apiClient<{
    data: Array<{ id: string; title: string; movies: Array<string> }>;
  }>("/genres/movies", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

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
        <Genres genres={genres} />
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
            <Pagination totalPages={totalPages} />
          </div>
        </div>
      </div>
    </main>
  );
}
