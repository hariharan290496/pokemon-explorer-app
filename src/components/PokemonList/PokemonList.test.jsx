import React from 'react';
import { render, screen } from '@testing-library/react';
import PokemonList from './PokemonList';

// Mock the usePokemonContext hook
jest.mock('../../context/PokemonContext', () => ({
  usePokemonContext: jest.fn()
}));

// Import the mocked module
import { usePokemonContext } from '../../context/PokemonContext';

// Mock the child components
jest.mock('../common/SearchBar', () => () => <div data-testid="search-bar" />);
jest.mock('../common/SortFilter', () => () => <div data-testid="sort-filter" />);
jest.mock('../PokemonCard/PokemonCard', () => ({ pokemon }) => (
  <div data-testid="pokemon-card">{pokemon.name}</div>
));
jest.mock('../common/Loading', () => () => <div data-testid="loading" />);

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockImplementation(callback => {
  return {
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn()
  };
});
window.IntersectionObserver = mockIntersectionObserver;

describe('PokemonList', () => {
  const mockFetchNextPage = jest.fn();

  const defaultMockData = {
    pokemons: [
      { id: 1, name: 'bulbasaur' },
      { id: 2, name: 'ivysaur' }
    ],
    loading: false,
    error: null,
    hasNextPage: true,
    fetchNextPage: mockFetchNextPage,
    isFetchingNextPage: false,
    searchTerm: '',
    setSearchTerm: jest.fn(),
    sortBy: 'id_asc',
    setSortBy: jest.fn(),
    filterType: '',
    setFilterType: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    usePokemonContext.mockImplementation(() => defaultMockData);
  });

  it('renders search and filter components', () => {
    render(<PokemonList />);
    expect(screen.getByTestId('search-bar')).toBeInTheDocument();
    expect(screen.getByTestId('sort-filter')).toBeInTheDocument();
  });

  it('renders loading state', () => {
    usePokemonContext.mockImplementation(() => ({
      ...defaultMockData,
      loading: true,
      pokemons: []
    }));
    render(<PokemonList />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('renders pokemon cards', () => {
    render(<PokemonList />);
    const cards = screen.getAllByTestId('pokemon-card');
    expect(cards).toHaveLength(2);
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('ivysaur')).toBeInTheDocument();
  });

  it('shows no results message when search yields no results', () => {
    usePokemonContext.mockImplementation(() => ({
      ...defaultMockData,
      pokemons: [],
      searchTerm: 'nonexistent'
    }));
    render(<PokemonList />);
    expect(screen.getByText(/No Pokémon found for "nonexistent"/)).toBeInTheDocument();
  });

  it('shows no results message when filter yields no results', () => {
    usePokemonContext.mockImplementation(() => ({
      ...defaultMockData,
      pokemons: [],
      filterType: 'dragon'
    }));
    render(<PokemonList />);
    expect(screen.getByText(/No Pokémon found of type "dragon"/)).toBeInTheDocument();
  });

  it('shows end of list message when there are no more pokemon to load', () => {
    usePokemonContext.mockImplementation(() => ({
      ...defaultMockData,
      hasNextPage: false
    }));
    render(<PokemonList />);
    expect(screen.getByText('No more Pokémon to load')).toBeInTheDocument();
  });

  it('renders error message when there is an error', () => {
    usePokemonContext.mockImplementation(() => ({
      ...defaultMockData,
      error: 'Failed to fetch Pokemon'
    }));
    render(<PokemonList />);
    expect(screen.getByText(/Failed to fetch Pokemon/)).toBeInTheDocument();
  });

  it('calls fetchNextPage when intersection observer triggers', () => {
    render(<PokemonList />);
    expect(mockIntersectionObserver).toHaveBeenCalled();
  });
});
