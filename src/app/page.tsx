import { fetchMovieData } from "./Redux/hooks/fetchData";
import ClientWrapper from "@/components/clientWrapper";

async function getMovies() {
  try {
    const movies = await fetchMovieData();
    return movies.map((movie: any) => ({
      id: movie.id,
      title: movie.title,
      posterUrl: movie.posterUrl,
      likes: false,
      count: 0,
    }));
  } catch (error) {
    console.error("Error fetching movies:", error);
    return { error: "Failed to fetch movies. Please try again later." };
  }
}

export default async function Page() {
  const result = await getMovies();

  if ("error" in result) {
    return <ClientWrapper initialMovies={[]} error={result.error} />;
  }

  return <ClientWrapper initialMovies={result} error={null} />;
}
