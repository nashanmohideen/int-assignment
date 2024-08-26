import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Image {
  url: string;
  id: string;
  likes: boolean;
  count: number;
}

interface ImageState {
  images: Image[];
}

const initialState: ImageState = {
  images: [],
};

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    setImages: (state, action: PayloadAction<Image[]>) => {
      state.images = action.payload;
    },
    incrementCount: (state, action: PayloadAction<string>) => {
      const imageId = action.payload;
      const image = state.images.find((img) => img.id === imageId);
      if (image) {
        image.count += 1;
      }
    },
    decrementCount: (state, action: PayloadAction<string>) => {
      const imageId = action.payload;
      const image = state.images.find((img) => img.id === imageId);
      if (image) {
        image.count = Math.max(image.count - 1, 0);
      }
    },
    toggleLike: (state, action: PayloadAction<string>) => {
      const imageId = action.payload;
      const image = state.images.find((img) => img.id === imageId);
      if (image) {
        image.likes = !image.likes;
        if (image.likes) {
          image.count += 1;
        } else {
          image.count = Math.max(image.count - 1, 0);
        }
      }
    },
  },
});

export const { setImages, incrementCount, decrementCount, toggleLike } = imageSlice.actions;
export default imageSlice.reducer;
