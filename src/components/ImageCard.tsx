import React, { useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { toggleLike } from "@/app/Redux/features/imageSlice";
import { RootState } from "@/app/Redux/store";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Modal from "./Modal";

interface ImageCardProps {
  url: string;
  id: string;
  name?: string;
}

const ImageCard = ({ url, id, name }: ImageCardProps) => {
  const dispatch = useDispatch();
  const image = useSelector((state: RootState) =>
    state.image.images.find((img) => img.id === id)
  );
  const likes = image?.likes || false;
  const likeCount = image?.count || 0;

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleLikeClick = () => {
    dispatch(toggleLike(id));
  };

  const handleImageClick = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <div className="relative bg-white rounded-xl">
        <Image
          src={url}
          width={250}
          height={250}
          alt={`Image ${id}`}
          className="rounded-r-lg rounded-lg p-3 object-center"
          onClick={handleImageClick}
        />
        <button
          className={`absolute bottom-4 right-3 pr-2 ${
            likes ? "text-red-500" : "text-gray-500"
          }`}
          onClick={handleLikeClick}
        >
          {likes ? (
            <FavoriteIcon className="h-6 w-6" />
          ) : (
            <FavoriteBorderIcon className="h-6 w-6" />
          )}
        </button>
        <div className="absolute pl-2 bottom-4 left-3 text-white">
          Likes: {likeCount}
        </div>
      </div>
      <Modal isVisible={modalVisible} onClose={closeModal}>
        <div className="relative">
          <Image
            src={url}
            width={500}
            height={500}
            alt={`Image ${id}`}
            className="rounded-lg object-center"
          />
          <h2 className="font-bold text-center text-black">{name || id}</h2>
          <button
            className={`absolute bottom-8 right-4 ${
              likes ? "text-red-500" : "text-gray-500"
            }`}
            onClick={handleLikeClick}
          >
            {likes ? (
              <FavoriteIcon className="h-8 w-8" />
            ) : (
              <FavoriteBorderIcon className="h-8 w-8" />
            )}
          </button>
          <div className="absolute pl-1 bottom-8 left-3 text-white">
            Likes: {likeCount}
          </div>
        </div>
        <div className="w-full md:w-[600px] text-center mt-4">
          <p>Additional details can be added here.</p>
        </div>
      </Modal>
    </>
  );
};

export default ImageCard;
