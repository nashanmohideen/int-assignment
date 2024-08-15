import React from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { toggleLike } from "../lib/features/likeSlice";
import { RootState } from "../lib/store";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface ImageCardProps {
  url: string;
  id: string;
}

const ImageCard = ({ url, id }: ImageCardProps) => {
  const dispatch = useDispatch();
  const likes = useSelector((state: RootState) => state.like.likes);
  const likeCount = useSelector(
    (state: RootState) => state.like.counts[id] || 0
  );

  const handleLikeClick = () => {
    dispatch(toggleLike(id));
  };

  return (
    <div className="relative bg-white rounded-xl">
      <Image
        src={url}
        width={250}
        height={250}
        alt={`Image ${id}`}
        className="rounded-r-lg rounded-lg p-3 object-center"
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
  );
};

export default ImageCard;
