"use client";

import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface CarouselProps {
  slides: React.ReactNode[];
  children?: React.ReactNode;
}

export default function Carousel({ slides }: CarouselProps) {
  const [curr, setCurr] = useState(0);

  const prev = () => {
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  };

  const next = () => {
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
  };

  //   if (!slides || slides.length === 0) {
  //     return <div>No slides available</div>;
  //   }

  return (
    <div className="overflow-hidden relative flex items-center">
      <div className="flex justify-center w-full h-[200px] overflow-hidden  bg-gray-800 border-4 border-gray-800 rounded-lg max-w-lg md:hidden md:justify-center lg:hidden transform transition ease-in duration-500 p-2">
        {slides[curr]}
      </div>
      <div className="absolute inset-0 flex items-center justify-between p-1">
        <button onClick={prev}>
          <FaArrowLeft
            size={35}
            color="black"
            className="p-1 rounded-full shadow bg-white bg-opacity-80 hover:bg-transparent"
          />
        </button>
        <button onClick={next}>
          <FaArrowRight
            size={35}
            color="black"
            className="p-1 rounded-full shadow bg-white bg-opacity-80 hover:bg-transparent"
          />
        </button>
      </div>
      <div className="absolute bottom-4 right-0 left-0 bg-gray">
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <div
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
