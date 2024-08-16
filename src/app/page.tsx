"use client";
// React and React-related imports
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Next.js imports
import Image from "next/image";

// Relative imports
import Header from "../components/header";
import Footer from "../components/footer";
import Banner from "../components/banner";
import Text from "../components/text";
import Carousel from "../components/carousel";
import ImageCard from "../components/ImageCard";
import { setImages } from "./Redux/features/imageSlice";
import { toggleLike } from "./Redux/features/likeSlice";
import { RootState } from "./Redux/store";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const images = useSelector((state: RootState) => state.image.images);
  const likes = useSelector((state: RootState) => state.like.likes);
  const counts = useSelector((state: RootState) => state.like.counts);

  useEffect(() => {
    fetch("https://hp-api.onrender.com/api/characters")
      .then((response) => response.json())
      .then((data) => {
        const imageData = data.slice(0, 3).map((character: any) => ({
          url: character.image,
          id: character.name,
          count: 0, // Initialize the count for each image
        }));
        dispatch(setImages(imageData)); // Dispatch the images to the Redux store
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching Images: ", error));
  }, [dispatch]);

  useEffect(() => {
    // Load likes from local storage and update Redux state
    const savedLikes = JSON.parse(localStorage.getItem("likes") || "{}");
    const savedCounts = JSON.parse(localStorage.getItem("counts") || "{}");

    Object.keys(savedLikes).forEach((id) => {
      if (savedLikes[id]) {
        dispatch(toggleLike(id)); // Set initial likes in Redux
      }
    });
    Object.keys(savedCounts).forEach((id) => {
      if (savedCounts[id] !== undefined) {
        dispatch(toggleLike(id)); // Set initial counts in Redux
      }
    });
  }, [dispatch]);

  useEffect(() => {
    // Save likes to local storage
    localStorage.setItem("likes", JSON.stringify(likes));
  }, [likes]);

  const slides = images.map(({ url, id }: any) => ({ url, id }));

  return (
    <div className="w-full">
      <Header />
      <main className="flex flex-col items-center gap-2 md:p-3 lg:p-3">
        <Banner />
        <Text text="Text 1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et sequi,
          porro recusandae ea iste aliquam soluta, aliquid molestiae possimus
          impedit enim deserunt, libero nihil facere a numquam minus dolorem
          unde!
        </Text>
        {loading ? (
          <div className="flex justify-center items-center h-60">
            <div className="animate-spin border-t-4 border-blue-500 border-solid rounded-full w-16 h-16"></div>
          </div>
        ) : (
          <div className="transition-all duration-500 ease-in-out hidden md:grid md:grid-cols-3 lg:grid lg:grid-cols-3 w-fit h-fit items-center rounded-lg gap-2 bg-gray-800 p-3 ">
            {images.map(({ url, id }: any) => (
              <ImageCard key={id} url={url} id={id} count={counts[id]} />
            ))}
          </div>
        )}

        {!loading && <Carousel slides={slides} />}
        <Text text="Text 2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
          similique quis sint. Doloribus, obcaecati laborum neque, dicta
          architecto eius totam illum sunt consequatur, vel possimus in
          exercitationem praesentium amet atque.
        </Text>
        <div className="w-full p-3 text-left m-2  md:hidden lg:hidden">
          <h3>
            <b>Note:</b>
          </h3>
          <p className="sm:text-xs text-left ">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            voluptatum in laborum optio reprehenderit tempore, enim minus aut
            incidunt expedita praesentium accusantium sunt neque exercitationem
            veniam illo doloremque laboriosam quos!
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
