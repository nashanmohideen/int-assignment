import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '@/components/header'; 

describe('Header Component', () => {
  it('should render the header with the correct text', () => {
    render(<Header />);
    
    const headerElement = screen.getByRole('banner');
    const headingElement = screen.getByText('Header');
    
    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toHaveClass('bg-blue-700', 'w-full', 'h-20', 'flex', 'justify-center', 'items-center', 'text-white', 'font-bold');
    expect(headingElement).toBeInTheDocument();
  });
});
