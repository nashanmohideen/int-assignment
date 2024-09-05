import { fetchMovieData } from "@/Redux/hooks/fetchData";

// Setup mocks before each test
beforeEach(() => {
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

  // Mock console.log and console.error to prevent actual logging during tests
  jest.spyOn(console, 'log').mockImplementation(() => {});
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

// Clean up mocks after each test
afterEach(() => {
  jest.restoreAllMocks(); // Restore original implementations
});

describe('fetchMovieData', () => {
  // Test case for successful data fetch
  it('fetches and processes movie data correctly', async () => {
    const movies = await fetchMovieData();
    
    expect(movies).toEqual([
      { id: 1, title: 'Movie 1', poster_path: '/poster1.jpg', posterUrl: 'https://image.tmdb.org/t/p/w500/poster1.jpg' },
      { id: 2, title: 'Movie 2', poster_path: '/poster2.jpg', posterUrl: 'https://image.tmdb.org/t/p/w500/poster2.jpg' },
      { id: 3, title: 'Movie 3', poster_path: '/poster3.jpg', posterUrl: 'https://image.tmdb.org/t/p/w500/poster3.jpg' },
    ]);

    // Ensure fetch was called once with the correct URL
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(expect.any(String));
  });

  // Test case for a failed fetch
  it('throws an error when fetch fails', async () => {
    // Override the fetch mock to simulate a failure
    global.fetch = jest.fn(() =>
      Promise.reject(new Error('API is down'))
    );

    // Expect the function to throw the correct error
    await expect(fetchMovieData()).rejects.toThrow('API is down');

    // Ensure fetch was called once
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  // Test case for handling non-OK response
  it('throws an error when API response is not OK', async () => {
    // Override the fetch mock to simulate a non-OK response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        json: async () => ({}),
      } as Response)
    );

    // Expect the function to throw the correct error
    await expect(fetchMovieData()).rejects.toThrow('Failed to fetch movies');

    // Ensure fetch was called once
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
