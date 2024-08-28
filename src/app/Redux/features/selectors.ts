import { createSelector } from 'reselect';
import { RootState } from '../store'; // Adjust the import path as necessary

const selectImageState = (state: RootState) => state.image;

export const selectImages = createSelector(
  [selectImageState],
  (imageState) => imageState.images
);

export const selectImageCounts = createSelector(
  [selectImageState],
  (imageState) => {
    return imageState.images.reduce((acc, img) => {
      acc[img.id] = img.count;
      return acc;
    }, {} as { [id: string]: number });
  }
);

