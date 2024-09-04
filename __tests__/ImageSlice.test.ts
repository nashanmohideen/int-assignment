import imageReducer, { setImages, toggleLike, incrementCount, decrementCount } from '@/app/Redux/features/imageSlice';

describe('imageSlice', () => {
  const initialState = {
    images: [
      {
        id: '1',
        url: 'https://example.com/image1.jpg',
        title: 'Movie 1',
        posterUrl: 'https://image.tmdb.org/t/p/w500/poster1.jpg', 
        likes: false,
        count: 0,
      },
    ],
  };

  it('should handle initial state', () => {
    expect(imageReducer(undefined, { type: 'unknown' })).toEqual({
      images: [],
    });
  });

  it('should handle setImages', () => {
    const newImages = [
      {
        id: '2',
        url: 'https://example.com/image2.jpg',
        title: 'Movie 2', 
        posterUrl: 'https://image.tmdb.org/t/p/w500/poster2.jpg',
        likes: false,
        count: 0,
      },
    ];
    const actual = imageReducer(initialState, setImages(newImages));
    expect(actual.images).toEqual(newImages);
  });

  it('should handle toggleLike', () => {
    const actual = imageReducer(initialState, toggleLike('1'));
    expect(actual.images[0].likes).toBe(true);
  });

  it('should handle incrementCount', () => {
    const actual = imageReducer(initialState, incrementCount('1'));
    expect(actual.images[0].count).toBe(1);
  });

  it('should handle decrementCount', () => {
    // Set the initial state with a count greater than 0
    const stateWithCount = {
      images: [
        {
          id: '1',
          url: 'https://example.com/image1.jpg',
          title: 'Movie 1',
          posterUrl: 'https://image.tmdb.org/t/p/w500/poster1.jpg',
          likes: false,
          count: 2, 
        },
      ],
    };
    const actual = imageReducer(stateWithCount, decrementCount('1'));
    expect(actual.images[0].count).toBe(1);
  });
});
