// Banner.test.tsx
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Banner from '@/components/banner';

describe('Banner Component', () => {
  test('renders the Banner component with correct content', () => {
    // Render the Banner component
    render(<Banner />);
    
    // Check if the component is in the document
    expect(screen.getByText(/Banner/i)).toBeInTheDocument();

    // Optionally, check for specific styles if needed
    const bannerElement = screen.getByText(/Banner/i).closest('div');
    expect(bannerElement).toHaveClass('w-full');
    expect(bannerElement).toHaveClass('h-40');
    expect(bannerElement).toHaveClass('lg:w-[800px]');
    expect(bannerElement).toHaveClass('bg-purple-200');
    expect(bannerElement).toHaveClass('flex');
    expect(bannerElement).toHaveClass('justify-center');
    expect(bannerElement).toHaveClass('items-center');
  });
});
