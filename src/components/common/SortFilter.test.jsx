import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SortFilter from './SortFilter';
import { SORT_OPTIONS, POKEMON_TYPES } from '../../utils/constants';

// Mock the usePokemonContext hook
jest.mock('../../context/PokemonContext', () => ({
  usePokemonContext: jest.fn()
}));

// Import the mocked module
import { usePokemonContext } from '../../context/PokemonContext';

describe('SortFilter', () => {
  const mockSetSortBy = jest.fn();
  const mockSetFilterType = jest.fn();
  const mockClearFilters = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Set up the default mock implementation for usePokemonContext
    usePokemonContext.mockImplementation(() => ({
      sortBy: 'id_asc',
      setSortBy: mockSetSortBy,
      filterType: '',
      setFilterType: mockSetFilterType,
      searchTerm: '',
      clearFilters: mockClearFilters
    }));
  });

  it('renders sort and filter options', () => {
    render(<SortFilter />);
    expect(screen.getByLabelText('Sort by')).toBeInTheDocument();
    expect(screen.getByLabelText('Filter by type')).toBeInTheDocument();
  });

  it('changes sort option', () => {
    render(<SortFilter />);
    const sortSelect = screen.getByLabelText('Sort by');
    fireEvent.change(sortSelect, { target: { value: 'name_asc' } });
    expect(mockSetSortBy).toHaveBeenCalledWith('name_asc');
  });

  it('changes filter type', () => {
    render(<SortFilter />);
    const filterSelect = screen.getByLabelText('Filter by type');
    fireEvent.change(filterSelect, { target: { value: 'fire' } });
    expect(mockSetFilterType).toHaveBeenCalledWith('fire');
  });

  it('shows clear filters button when filters are active', () => {
    usePokemonContext.mockImplementation(() => ({
      sortBy: 'name_asc',
      setSortBy: mockSetSortBy,
      filterType: 'fire',
      setFilterType: mockSetFilterType,
      searchTerm: '',
      clearFilters: mockClearFilters
    }));
    render(<SortFilter />);
    expect(screen.getByTitle('Clear all filters')).toBeInTheDocument();
  });

  it('hides clear filters button when no filters are active', () => {
    render(<SortFilter />);
    expect(screen.queryByTitle('Clear all filters')).not.toBeInTheDocument();
  });

  it('calls clearFilters when clear button is clicked', () => {
    usePokemonContext.mockImplementation(() => ({
      sortBy: 'name_asc',
      setSortBy: mockSetSortBy,
      filterType: 'fire',
      setFilterType: mockSetFilterType,
      searchTerm: '',
      clearFilters: mockClearFilters
    }));
    render(<SortFilter />);
    const clearButton = screen.getByTitle('Clear all filters');
    fireEvent.click(clearButton);
    expect(mockClearFilters).toHaveBeenCalled();
  });

  it('displays all sort options', () => {
    render(<SortFilter />);
    const sortSelect = screen.getByLabelText('Sort by');
    SORT_OPTIONS.forEach(option => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it('displays all type options', () => {
    render(<SortFilter />);
    const filterSelect = screen.getByLabelText('Filter by type');
    expect(screen.getByText('All Types')).toBeInTheDocument();
    POKEMON_TYPES.forEach(type => {
      const displayType = type.charAt(0).toUpperCase() + type.slice(1);
      expect(screen.getByText(displayType)).toBeInTheDocument();
    });
  });
});
