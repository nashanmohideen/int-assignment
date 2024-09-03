import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import imageReducer, { setImages, toggleLike,incrementCount,decrementCount} from '@/app/Redux/features/imageSlice';
import ImageCard from '@/components/ImageCard';
import Modal from '@/components/Modal';

// Configure a mock store
const store = configureStore({
  reducer: { image: imageReducer },
});

describe('ImageCard', () => {
  const mockImage = {
    id: '1',
    url: 'https://example.com/image1.jpg',
    title: 'Movie 1',
    posterUrl: 'https://image.tmdb.org/t/p/w500/poster1.jpg',
    likes: false,
    count: 0,
  };

  beforeEach(() => {
    store.dispatch(setImages([mockImage]));
  });

  it('renders the image and displays the like count', () => {
    render(
      <Provider store={store}>
        <ImageCard url={mockImage.url} id={mockImage.id} title={mockImage.title} />
      </Provider>
    );

    expect(screen.getByAltText(`Image ${mockImage.id}`)).toBeInTheDocument();
    expect(screen.getByText(`Likes: ${mockImage.count}`)).toBeInTheDocument();
  });

  it('toggles the like button and updates the like count', () => {
    render(
      <Provider store={store}>
        <ImageCard url={mockImage.url} id={mockImage.id} title={mockImage.title} />
      </Provider>
    );
  
    const likeButton = screen.getByRole('button', { name: /like/i });
    expect(likeButton).toHaveClass('text-gray-500');
    expect(screen.getByText(`Likes: ${mockImage.count}`)).toBeInTheDocument();
  
    fireEvent.click(likeButton);
    expect(likeButton).toHaveClass('text-red-500');
    expect(screen.getByText('Likes: 1')).toBeInTheDocument();
  
    fireEvent.click(likeButton);
    expect(likeButton).toHaveClass('text-gray-500');
    expect(screen.getByText(`Likes: ${mockImage.count}`)).toBeInTheDocument();
  });
  

  it('opens and closes the modal when the image is clicked', () => {
    render(
      <Provider store={store}>
        <ImageCard url={mockImage.url} id={mockImage.id} title={mockImage.title} />
      </Provider>
    );

    const image = screen.getByAltText(`Image ${mockImage.id}`);
    fireEvent.click(image);
    expect(screen.getByText(mockImage.title)).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    expect(screen.queryByText(mockImage.title)).not.toBeInTheDocument();
  });
});
