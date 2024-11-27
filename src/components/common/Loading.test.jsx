import React from 'react';
import { render, screen } from '@testing-library/react';
import Loading from './Loading';

describe('Loading', () => {
  it('renders the loading spinner', () => {
    render(<Loading />);
    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('animate-spin');
  });

  it('renders the loading text', () => {
    render(<Loading />);
    expect(screen.getByText('Loading Pokémon...')).toBeInTheDocument();
  });

  it('applies correct CSS classes to container', () => {
    render(<Loading />);
    const container = screen.getByTestId('loading-container');
    expect(container).toHaveClass('flex', 'flex-col', 'items-center', 'justify-center', 'min-h-[400px]');
  });

  it('applies correct CSS classes to spinner', () => {
    render(<Loading />);
    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toHaveClass(
      'animate-spin',
      'rounded-full',
      'h-16',
      'w-16',
      'border-4',
      'border-gray-300',
      'border-t-blue-600'
    );
  });

  it('has accessible loading text for screen readers', () => {
    render(<Loading />);
    const srOnlyText = screen.getByText('Loading...');
    expect(srOnlyText).toHaveClass('sr-only');
  });

  it('has correct role attribute', () => {
    render(<Loading />);
    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toHaveAttribute('role', 'status');
  });
});
