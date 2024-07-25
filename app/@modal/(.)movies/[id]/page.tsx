import { getMovieDetails } from "@/app/movies/[id]/page";
import Modal from "./modal";

export default async function MoviesModal({
  params,
}: {
  params: { id: string };
}) {
  const movie = await getMovieDetails(params.id);

  return <Modal movie={movie} />;
}