import Link from "next/link";
import React from "react";

export type Movie = {
  id: string;
  title: string;
  posterUrl: string;
  rating: string;
};

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <Link href={`/${movie.id}`} className="group">
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
      <h3 className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
        {movie.title}
      </h3>
      {movie.rating ? (
        <p className="mt-1 text-sm text-gray-500">Rating: {movie.rating}</p>
      ) : (
        <p className="mt-1 text-sm text-gray-500">No rating available</p>
      )}
    </Link>
  );
}
