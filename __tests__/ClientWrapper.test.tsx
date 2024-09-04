import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Store, UnknownAction } from 'redux';
import ClientWrapper from '@/components/clientWrapper';
import * as imageSlice from '@/app/Redux/features/imageSlice';

// Mock the dependencies
jest.mock('@/app/Redux/features/imageSlice', () => ({
  setImages: jest.fn(),
}));

jest.mock('@/components/home', () => {
  return jest.fn(() => <div>Home Component</div>);
});

jest.mock('@/components/Modal', () => {
  return jest.fn(({ isVisible, onClose, children }: { isVisible: boolean; onClose: () => void; children: React.ReactNode }) => (
    isVisible ? (
      <div data-testid="modal">
        {children}
        <button aria-label="Close" onClick={onClose}>Close</button>
      </div>
    ) : null
  ));
});

// Create a more complete mock store
const createMockStore = (): Store<any, UnknownAction> => {
  return {
    getState: jest.fn(),
    dispatch: jest.fn(),
    subscribe: jest.fn(() => () => {}),
    replaceReducer: jest.fn(),
    [Symbol.observable]: jest.fn(),
  };
};

describe('ClientWrapper', () => {
  let mockStore: Store<any, UnknownAction>;
  const initialMovies = [
    { id: '1', title: 'Movie 1', posterUrl: 'url1', likes: true, count: 10 },
    { id: '2', title: 'Movie 2', posterUrl: 'url2', likes: false, count: 5 },
  ];

  beforeEach(() => {
    mockStore = createMockStore();
    
    // Create a more complete mock for window.location
    const mockLocation = {
      ancestorOrigins: {} as DOMStringList,
      hash: '',
      host: 'localhost',
      hostname: 'localhost',
      href: 'http://localhost',
      origin: 'http://localhost',
      pathname: '/',
      port: '',
      protocol: 'http:',
      search: '',
      assign: jest.fn(),
      reload: jest.fn(),
      replace: jest.fn(),
      toString: jest.fn(),
    };

    Object.defineProperty(window, 'location', {
      value: mockLocation,
      writable: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders Home component when there is no error', () => {
    render(
      <Provider store={mockStore}>
        <ClientWrapper initialMovies={initialMovies} error={null} />
      </Provider>
    );

    expect(screen.getByText('Home Component')).toBeInTheDocument();
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  it('dispatches setImages action when there is no error', () => {
    render(
      <Provider store={mockStore}>
        <ClientWrapper initialMovies={initialMovies} error={null} />
      </Provider>
    );

    expect(mockStore.dispatch).toHaveBeenCalledWith(imageSlice.setImages(initialMovies));
  });

  it('renders Modal with error message when there is an error', () => {
    const errorMessage = 'Test error message';
    render(
      <Provider store={mockStore}>
        <ClientWrapper initialMovies={initialMovies} error={errorMessage} />
      </Provider>
    );

    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('reloads the page when error modal is closed', () => {
    const errorMessage = 'Test error message';
    render(
      <Provider store={mockStore}>
        <ClientWrapper initialMovies={initialMovies} error={errorMessage} />
      </Provider>
    );

    fireEvent.click(screen.getByText(errorMessage)); // Assuming the error message is inside the modal
    fireEvent.click(screen.getByRole('button', { name: /close/i })); 
    expect(window.location.reload).toHaveBeenCalled(); // This checks if the reload was triggered
  });

});
