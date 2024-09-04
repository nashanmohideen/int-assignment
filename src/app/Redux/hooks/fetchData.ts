'use server';

const apiKey = "67475fb2c5f97ecb4fdc4adc1f3488f3";
const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  posterUrl: string;
}

export async function fetchMovieData() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }
    const data = await response.json();

    const movies = data.results.slice(0, 3).map((movie: Movie) => ({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    }));

    console.log('Data fetched.', movies);
    return movies;
  } catch (error) {
    console.error("Error fetching movie data: ", error);
    throw error; 
  }
}
