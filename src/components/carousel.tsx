"use client";

import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import ImageCard from "./ImageCard";

interface CarouselProps {
  slides: { posterUrl: string; id: string; count: number }[];
}

export default function Carousel({ slides }: CarouselProps) {
  // console.log(slides);
  const [curr, setCurr] = useState(0);

  const prev = () => {
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  };

  const next = () => {
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
  };

  if (slides.length === 0) {
    return <div className="text-red-500">No images to display</div>;
  }

  return (
    <div className="overflow-hidden relative flex items-center">
      <div className="flex justify-center w-fit h-full overflow-hidden bg-gray-800 border-4 border-gray-800 rounded-lg max-w-lg md:hidden md:justify-center lg:hidden transform transition ease-in duration-500 p-2">
        <ImageCard
          url={slides[curr].posterUrl}
          id={slides[curr].id}
          key={slides[curr].id}
        />
        <button aria-label="Previous slide" onClick={prev}>
          <FaArrowLeft
            size={35}
            color="black"
            className="absolute left-6 mt-1 p-1 top-6 rounded-full shadow bg-white bg-opacity-80 hover:bg-white hover:text-black"
          />
        </button>
        <button aria-label="Next slide" onClick={next}>
          <FaArrowRight
            size={35}
            color="black"
            className="absolute right-6 mt-1 p-1 top-6 rounded-full shadow bg-white bg-opacity-80 hover:bg-white hover:text-black"
          />
        </button>
      </div>

      <div className="absolute bottom-4 right-0 left-0 bg-gray">
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`transition-all w-2 h-2 bg-gray-300 rounded-full hover:bg-gray-50 ${
                curr === i ? "p-2" : "bg-opacity-50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
