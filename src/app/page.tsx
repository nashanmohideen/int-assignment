"use client";

import { useSelector } from "react-redux";
import { selectImageCounts, selectImages } from "./Redux/features/selectors";
import { useInitializeImages } from "./Redux/hooks/useInitializeImages";

import Header from "../components/header";
import Footer from "../components/footer"; 
import Banner from "../components/banner";
import Text from "../components/text";
import Carousel from "../components/carousel";
import ImageCard from "../components/ImageCard";
import Modal from "../components/Modal";

export default function Home() {
  const { loading, error, setError } = useInitializeImages();
  const images = useSelector(selectImages);
  const counts = useSelector(selectImageCounts);

  const slides = images.map(({ url, id }) => ({
    url,
    id,
    count: counts[id] || 0,
  }));

  const handleCloseModal = () => {
    setError(null);
  };

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
            {images.map(({ url, id }) => (
              <ImageCard key={id} url={url} id={id} name={id} />
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

      <Modal isVisible={!!error} onClose={handleCloseModal}>
        <div className="flex flex-col items-center">
          <p>{error}</p>
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
