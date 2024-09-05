"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectImages } from "@/app/Redux/features/selectors";
import Header from "../components/header";
import Footer from "../components/footer";
import Banner from "../components/banner";
import Text from "../components/text";
import Carousel from "../components/carousel";
import ImageCard from "../components/ImageCard";
import Modal from "./Modal";

interface HomeProps {
  initialError: string | null;
  onRefresh: () => void;
}

export default function Home({ initialError, onRefresh }: HomeProps) {
  const images = useSelector(selectImages);
  const [error, setError] = useState<string | null>(initialError);

  const handleCloseModal = () => {
    setError(null);
    onRefresh();
  };

  useEffect(() => {
    if (initialError) {
      setError(initialError);
    }
  }, [initialError]);

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
        <div className="transition-all duration-500 ease-in-out hidden md:grid md:grid-cols-3 lg:grid lg:grid-cols-3 w-fit h-fit items-center rounded-lg gap-2 bg-gray-800 p-3 ">
          {images.map(({ posterUrl, id, title }) => (
            <ImageCard key={id} url={posterUrl} id={id} title={title} />
          ))}
        </div>
        <Carousel
          slides={images.map(({ posterUrl, id, title, count }) => ({
            posterUrl,
            title: title,
            id,
            count: count,
          }))}
        />
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

      <Modal isVisible={!!error} onClose={handleCloseModal}>
        {" "}
        <div className="flex flex-col items-center">
          {" "}
          <p>{error}</p>{" "}
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </button>
        </div>
      </Modal>
    </div>
  );
}
