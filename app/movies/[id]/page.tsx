import { getMovieDetails } from "@/app/utils";
export default async function MovieDetails({
  params,
}: {
  params: { id: string };
}) {
  const movie = await getMovieDetails(params.id);
  return (
    <div className="container mx-auto">
      <h1>{movie.title}</h1>
      <p>{movie.summary}</p>
    </div>
  );
}
