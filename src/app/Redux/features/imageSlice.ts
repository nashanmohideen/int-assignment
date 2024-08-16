// Redux/features/imageSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Image {
  url: string;
  id: string;
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
  },
});

export const { setImages, incrementCount, decrementCount } = imageSlice.actions;
export default imageSlice.reducer;
