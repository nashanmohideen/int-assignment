import { selectImages, selectImageCounts } from "@/Redux/features/selectors";
import { RootState } from "@/Redux/store";

describe("Selectors", () => {
  const mockState: RootState = {
    image: {
      images: [
        {
          id: "1",
          posterUrl: "url1",
          title: "Image 1",
          count: 1,
          likes: false,
        },
        { id: "2", posterUrl: "url2", title: "Image 2", count: 2, likes: true },
      ],
    },
  };

  it("selectImages should return all images", () => {
    const result = selectImages(mockState);
    expect(result).toEqual(mockState.image.images);
  });

  it("selectImageCounts should return object with image counts", () => {
    const result = selectImageCounts(mockState);
    expect(result).toEqual({
      "1": 1,
      "2": 2,
    });
  });

  it("selectImageCounts should handle empty image array", () => {
    const emptyState: RootState = {
      image: { images: [] },
    };
    const result = selectImageCounts(emptyState);
    expect(result).toEqual({});
  });
});
