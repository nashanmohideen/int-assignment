import React from 'react'
import { render, screen } from '@testing-library/react'
import NotFound from '@/app/not-found'

// Mock the next/link component
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>
  }
})

describe('NotFound', () => {
  it('renders the 404 page', () => {
    render(<NotFound />)
    
    // Check if the main heading is present
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('404 - Page Not Found')
    
    // Check if the description is present
    expect(screen.getByText("Oops! The page you're looking for doesn't exist.")).toBeInTheDocument()
    
    // Check if the "Return Home" link is present
    expect(screen.getByRole('link', { name: /return home/i })).toBeInTheDocument()
  })

  it('has a link to the home page', () => {
    render(<NotFound />)
    
    const homeLink = screen.getByRole('link', { name: /return home/i })
    expect(homeLink).toHaveAttribute('href', '/')
  })
})