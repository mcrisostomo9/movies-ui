"use client";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useRouter } from "next/navigation";

type Props = {
  movie: Movie;
};

type Movie = {
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
};

export default function MovieModal(props: Props) {
  const router = useRouter();
  const movie = props.movie;
  return (
    <Dialog
      open
      onClose={() => {
        router.back();
      }}
      className="fixed inset-0 z-20"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative grid transform gap-x-6 overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 md:grid-cols-[2fr_3fr] lg:max-w-xl"
          >
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
            <div>
              <DialogTitle>{movie.title}</DialogTitle>

              {movie.rating ? (
                <p className="mt-1 text-sm text-gray-500">
                  Rating: {movie.rating}
                </p>
              ) : (
                <p className="mt-1 text-sm text-gray-500">
                  No rating available
                </p>
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
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
