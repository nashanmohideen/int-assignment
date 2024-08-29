'use client';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Provider } from 'react-redux';
import store from '@/app/Redux/store';
import { setImages } from '@/app/Redux/features/imageSlice';
import Home from './home';
import Modal from './Modal';  // Make sure this path is correct

interface ClientWrapperProps {
  initialMovies: {
    id: string;
    title: string;
    posterUrl: string;
    likes: boolean;
    count: number;
  }[];
  error: string | null;
}

function ClientWrapperContent({ initialMovies, error }: ClientWrapperProps) {
  const dispatch = useDispatch();
  const [localError, setLocalError] = useState<string | null>(error);

  useEffect(() => {
    if (!localError) {
      dispatch(setImages(initialMovies));
    }
  }, [dispatch, initialMovies, localError]);

  const handleRefresh = () => {
    setLocalError(null);
    window.location.reload();
  };

  return (
    <>
      <Modal isVisible={!!localError} onClose={handleRefresh}>
        <div className="text-center">
          <h2 className="text-xl font-semibold">Error</h2>
          <p>{localError}</p>
        </div>
      </Modal>
      <Home initialError={localError} onRefresh={handleRefresh} />
    </>
  );
}

export default function ClientWrapper({ initialMovies, error }: ClientWrapperProps) {
  return (
    <Provider store={store}>
      <ClientWrapperContent initialMovies={initialMovies} error={error} />
    </Provider>
  );
}
