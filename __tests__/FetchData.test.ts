// fetchData.test.ts
import { fetchMovieData } from "@/app/Redux/hooks/fetchData";

beforeEach(() => {
  // Mock console methods to suppress logs during tests
  jest.spyOn(console, 'log').mockImplementation(() => {});
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  // Restore the original implementations after each test
  jest.restoreAllMocks();
});

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    statusText: 'OK',
    headers: new Headers(),
    redirected: false,
    json: () => Promise.resolve({
      results: [
        { id: 1, title: 'Movie 1', poster_path: '/poster1.jpg' },
        { id: 2, title: 'Movie 2', poster_path: '/poster2.jpg' },
        { id: 3, title: 'Movie 3', poster_path: '/poster3.jpg' },
      ],
    }),
  } as Response)
);

describe('fetchMovieData', () => {
  it('fetches and processes movie data correctly', async () => {
    const movies = await fetchMovieData();
    
    expect(movies).toEqual([
      { id: 1, title: 'Movie 1', poster_path: '/poster1.jpg', posterUrl: 'https://image.tmdb.org/t/p/w500/poster1.jpg' },
      { id: 2, title: 'Movie 2', poster_path: '/poster2.jpg', posterUrl: 'https://image.tmdb.org/t/p/w500/poster2.jpg' },
      { id: 3, title: 'Movie 3', poster_path: '/poster3.jpg', posterUrl: 'https://image.tmdb.org/t/p/w500/poster3.jpg' },
    ]);
  });

  it('throws an error when fetch fails', async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error('API is down'))
    );

    await expect(fetchMovieData()).rejects.toThrow('API is down');
  });
});
