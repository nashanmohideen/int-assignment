"use client";

import { useState, useEffect } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import Banner from "./components/banner";
import Text from "./components/text";
import Carousel from "./components/carousel";
import Image from "next/image";

export default function Home() {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    fetch("https://hp-api.onrender.com/api/characters")
      .then((response) => response.json())
      .then((data) => {
        const urls = data.slice(0, 3).map((character: any) => character.image);
        setImageUrls(urls);
      })
      .catch((error) => console.error("Error fetching Images: ", error));
  }, []);

  const slides = imageUrls.map((url, index) => (
    <Image
      key={index}
      src={url}
      alt={`Slide ${index + 1}`}
      width={250}
      height={250}
      className="rounded-r-lg rounded-l-sm p-3 object-center"
    />
  ));

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
        <div className="hidden md:grid md:grid-cols-3 lg:grid lg:grid-cols-3 w-fit h-fit items-center rounded-lg gap-2 bg-gray-800 p-3 ">
          {slides}
        </div>
        <Carousel slides={slides} />
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
