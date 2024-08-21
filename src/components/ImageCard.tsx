import React, { useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { incrementCount } from "@/app/Redux/features/imageSlice";
import { decrementCount } from "@/app/Redux/features/imageSlice";
import { toggleLike } from "../app/Redux/features/imageSlice";
import { RootState } from "../app/Redux/store";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Modal from "./Modal";

interface ImageCardProps {
  url: string;
  id: string;
  count: number;
}

const ImageCard = ({ url, id }: ImageCardProps) => {
  const dispatch = useDispatch();
  const likes = useSelector((state: RootState) => state.like.likes);
  const likeCount = useSelector(
    (state: RootState) => state.like.counts[id] || 0
  );

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleLikeClick = () => {
    dispatch(toggleLike(id)); // Toggle the like state
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
            likes[id] ? "text-red-500" : "text-gray-500"
          }`}
          onClick={handleLikeClick}
        >
          {likes[id] ? (
            <FavoriteIcon className="h-6 w-6" />
          ) : (
            <FavoriteBorderIcon className="h-6 w-6" />
          )}
        </button>
        <div className="absolute pl-2 bottom-4 left-3 text-white">
          Likes: {likeCount}
        </div>
      </div>
      <Modal
        isVisible={modalVisible}
        onClose={() => {
          setModalVisible(false);
        }}
      >
        <Image
          src={url}
          width={500}
          height={500}
          alt={`Image ${id}`}
          className="rounded-lg object-center"
        />
        <div className="text-center mt-4">
          Additional details about the image can go here.
        </div>
      </Modal>
    </>
  );
};

export default ImageCard;
