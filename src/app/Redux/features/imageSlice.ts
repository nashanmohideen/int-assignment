import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Image {
  url: string;
  id: string;
}

interface ImageState {
  images: Image[];
  likes: { [id: string]: boolean };
  counts: { [id: string]: number }; // Keep counts here
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
      state.counts[action.payload] = (state.counts[action.payload] || 0) + 1;
    },
    decrementCount: (state, action: PayloadAction<string>) => {
      state.counts[action.payload] = Math.max((state.counts[action.payload] || 0) - 1, 0);
    },
    toggleLike: (state, action: PayloadAction<string>) => {
      const imageId = action.payload;
      if (state.likes[imageId]) {
        state.likes[imageId] = false;
        state.counts[imageId] = Math.max((state.counts[imageId] || 0) - 1, 0);
      } else {
        state.likes[imageId] = true;
        state.counts[imageId] = (state.counts[imageId] || 0) + 1;
      }
    },
  },
});

export const { setImages, incrementCount, decrementCount, toggleLike } = imageSlice.actions;
export default imageSlice.reducer;
