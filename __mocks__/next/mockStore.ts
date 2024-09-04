import configureStore from 'redux-mock-store';
import { RootState } from '@/app/Redux/store';

const mockImages = [
  { id: '1', posterUrl: 'url1', title: 'Image 1', count: 1, likes: false },
  { id: '2', posterUrl: 'url2', title: 'Image 2', count: 2, likes: true }, 
];

const initialState: RootState = {
  image: {
    images: mockImages,
  },
};

const mockStore = configureStore<RootState>([]);

export const createMockStore = () => mockStore(initialState);

export { mockImages };
