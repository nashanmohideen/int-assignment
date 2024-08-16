// Redux/features/imageSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Image {
  url: string;
  id: string;
  count: number; // Number of likes or interactions
  liked: boolean; // Whether the image is currently liked
}

interface ImageState {
  images: Image[];
  likes: { [id: string]: boolean };
  counts: { [id: string]: number };
}

const initialState: ImageState = {
    images: [],
    likes: {},
    counts: {},
};

const imageSlice = createSlice({
    name: "image",
    initialState,
    reducers: {
      setImages: (state, action: PayloadAction<Image[]>) => {
        state.images = action.payload;
      },
      incrementCount: (state, action: PayloadAction<string>) => {
        const image = state.images.find((img) => img.id === action.payload);
        if (image) {
          image.count += 1;
        }
      },
      decrementCount: (state, action: PayloadAction<string>) => {
        const image = state.images.find((img) => img.id === action.payload);
        if (image) {
          image.count = Math.max(image.count - 1, 0);
        }
      },
      toggleLike: (state, action: PayloadAction<string>) => {
        const imageId = action.payload;
        const image = state.images.find((img) => img.id === imageId);
        if (image) {
          if (state.likes[imageId]) {
            // If already liked, unlike it and decrease the count
            state.likes[imageId] = false;
            image.count = Math.max(image.count - 1, 0);
          } else {
            // If not liked, like it and increase the count
            state.likes[imageId] = true;
            image.count = (image.count || 0) + 1;
          }
          // Update the counts state to match the images state
          state.counts[imageId] = image.count;
        }
      },
    },
  });
  

export const { setImages, incrementCount, decrementCount, toggleLike } = imageSlice.actions;
export default imageSlice.reducer;
