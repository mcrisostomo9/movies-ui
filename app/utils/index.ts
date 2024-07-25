import { Movie } from "../components/movie-card";

const BASE_URL = "https://0kadddxyh3.execute-api.us-east-1.amazonaws.com";

async function apiClient<T>(endpoint: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, init);
  const data = await response.json();

  return data;
}

async function getToken() {
  const { token } = await apiClient<{ token: string }>("/auth/token");
  return token;
}

export async function getMovieDetails(id: string) {
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

async function getTotalMovies(lastPage: number, token: string) {
  const res = await apiClient<{
    data: Array<Movie>;
    totalPages: number;
  }>(`/movies?page=${lastPage}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.length;
}

export async function getMovies(searchParams: SearchParams) {
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

  const totalMovies = await getTotalMovies(res.totalPages, token);

  console.log({ totalMovies });

  const movies = res.data;
  const totalPages = res.totalPages;
  return { movies, totalPages };
}

export async function getGenres() {
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
