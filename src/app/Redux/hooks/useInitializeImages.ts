import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setImages, incrementCount, decrementCount, toggleLike } from "../features/imageSlice";
import { fetchMovieData } from "./fetchData";

export const useInitializeImages = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchMovieData()
      .then((data) => {
        const movieData = data.slice(0, 3).map((movie: any) => ({
          id: movie.id.toString(),
          title: movie.title,    
          posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          likes: false, // Initialize as boolean
          count: 0, // Initialize as number
        }));
        dispatch(setImages(movieData));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Images: ", error);
        setError(error.message);
        setLoading(false);
      });
  }, [dispatch]);

  useEffect(() => {
    const savedLikes = localStorage.getItem("likes");
    const savedCounts = localStorage.getItem("counts");

    const parsedLikes = savedLikes ? JSON.parse(savedLikes) : {};
    const parsedCounts = savedCounts ? JSON.parse(savedCounts) : {};

    Object.keys(parsedLikes).forEach((id) => {
      const liked = parsedLikes[id];
      if (liked) {
        dispatch(toggleLike(id));
      }
    });

    Object.keys(parsedCounts).forEach((id) => {
      const count = parsedCounts[id];
      if (count > 0) {
        for (let i = 0; i < count; i++) {
          dispatch(incrementCount(id));
        }
      } else {
        for (let i = 0; i < -count; i++) {
          dispatch(decrementCount(id));
        }
      }
    });
  }, [dispatch]);

  return { loading, error, setError }; 
};
