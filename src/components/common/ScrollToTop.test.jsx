import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ScrollToTop from './ScrollToTop';

describe('ScrollToTop', () => {
  beforeEach(() => {
    // Mock window.pageYOffset
    Object.defineProperty(window, 'pageYOffset', {
      configurable: true,
      value: 0,
    });

    // Mock window.scrollTo
    window.scrollTo = jest.fn();
  });

  it('is hidden when page is at top', () => {
    render(<ScrollToTop />);
    expect(screen.queryByLabelText('Scroll to top')).not.toBeInTheDocument();
  });

  it('appears when page is scrolled down', () => {
    Object.defineProperty(window, 'pageYOffset', { value: 400 });
    render(<ScrollToTop />);
    fireEvent.scroll(window);
    expect(screen.getByLabelText('Scroll to top')).toBeInTheDocument();
  });

  it('scrolls to top when clicked', () => {
    Object.defineProperty(window, 'pageYOffset', { value: 400 });
    render(<ScrollToTop />);
    fireEvent.scroll(window);
    fireEvent.click(screen.getByLabelText('Scroll to top'));
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth'
    });
  });

  it('has correct aria label', () => {
    Object.defineProperty(window, 'pageYOffset', { value: 400 });
    render(<ScrollToTop />);
    fireEvent.scroll(window);
    expect(screen.getByLabelText('Scroll to top')).toBeInTheDocument();
  });

  it('applies correct CSS classes', () => {
    Object.defineProperty(window, 'pageYOffset', { value: 400 });
    render(<ScrollToTop />);
    fireEvent.scroll(window);
    const button = screen.getByLabelText('Scroll to top');
    expect(button).toHaveClass('fixed bottom-8 right-8 bg-white text-primary-blue p-3 rounded-full shadow-lg hover:bg-neutral-50 border border-neutral-200 transition-all duration-200 z-50');
  });
});
