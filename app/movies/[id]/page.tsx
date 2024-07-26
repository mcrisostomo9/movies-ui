import { getMovieDetails } from "@/app/utils";

export default async function MovieDetails({
  params,
}: {
  params: { id: string };
}) {
  const movie = await getMovieDetails(params.id);

  return (
    <div className="container mx-auto">
      <div className="grid items-end justify-center gap-6 p-4 text-center sm:grid-cols-[1fr_3fr] sm:items-center sm:p-0">
        {movie.posterUrl ? (
          <div className="aspect-[2/3] w-full overflow-hidden rounded-md bg-gray-200">
            <img
              alt=""
              src={movie.posterUrl}
              className="h-full w-full object-cover object-center group-hover:opacity-75"
            />
          </div>
        ) : (
          <div className="flex aspect-[2/3] w-full items-center justify-center overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
            <p className="text-gray-600">No image available</p>
          </div>
        )}
        <div className="flex flex-col text-left">
          <h1>{movie.title}</h1>
          {movie.rating ? (
            <p className="mt-1 text-sm text-gray-500">Rating: {movie.rating}</p>
          ) : (
            <p className="mt-1 text-sm text-gray-500">No rating available</p>
          )}
          <p className="mt-1 text-sm text-gray-500">
            Duration: {movie.duration}
          </p>
          {movie.directors?.length > 0 && (
            <p className="mt-1 text-sm text-gray-500">
              Directed by: {movie.directors.join(", ")}
            </p>
          )}
          {movie.mainActors?.length > 0 && (
            <p className="mt-1 text-sm text-gray-500">
              Starring: {movie.mainActors.join(", ")}
            </p>
          )}
          <p className="mt-4 text-sm text-gray-500">{movie.summary}</p>
        </div>
      </div>
    </div>
  );
}
