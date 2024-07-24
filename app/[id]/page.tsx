import { apiClient, getToken } from "../utils";

async function getMovieDetails(id: string) {
  const token = await getToken();
  const data = await apiClient<{
    id: string;
    title: string;
    posterUrl: string;
    rating: string;
    summary: string;
    duration: string;
    directors: Array<string>;
    mainActors: Array<string>;
    dataPublished: string;
    ratingValue: number;
    bestRating: number;
    worstRating: number;
    writers: Array<string>;
    genres: Array<{ id: string; title: string }>;
  }>(`/movies/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

export default async function MovieDetails({
  params,
}: {
  params: { id: string };
}) {
  const movie = await getMovieDetails(params.id);
  return (
    <div className="container mx-auto">
      <h1>{movie.title}</h1>
    </div>
  );
}
