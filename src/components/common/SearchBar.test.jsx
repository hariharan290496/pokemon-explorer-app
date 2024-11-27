import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';

// Mock the usePokemonContext hook
jest.mock('../../context/PokemonContext', () => ({
  usePokemonContext: jest.fn(),
}));

// Import the mocked module
import { usePokemonContext } from '../../context/PokemonContext';

describe('SearchBar', () => {
  const mockSetSearchTerm = jest.fn();

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    
    // Set up the default mock implementation for usePokemonContext
    usePokemonContext.mockImplementation(() => ({
      searchTerm: '',
      setSearchTerm: mockSetSearchTerm,
    }));
  });

  it('renders search input', () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText('Search by name...');
    expect(input).toBeInTheDocument();
  });

  it('displays current search term', () => {
    usePokemonContext.mockImplementation(() => ({
      searchTerm: 'pikachu',
      setSearchTerm: mockSetSearchTerm,
    }));
    render(<SearchBar />);
    const input = screen.getByPlaceholderText('Search by name...');
    expect(input).toHaveValue('pikachu');
  });

  it('calls setSearchTerm when input changes', () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText('Search by name...');
    fireEvent.change(input, { target: { value: 'charizard' } });
    expect(mockSetSearchTerm).toHaveBeenCalledWith('charizard');
  });

  it('renders search label', () => {
    render(<SearchBar />);
    expect(screen.getByText('Search Pokémon')).toBeInTheDocument();
  });

  it('renders search icon', () => {
    render(<SearchBar />);
    const searchIcon = screen.getByTestId('search-icon');
    expect(searchIcon).toBeInTheDocument();
  });

  it('has correct input attributes', () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText('Search by name...');
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveClass('w-full');
  });
});
