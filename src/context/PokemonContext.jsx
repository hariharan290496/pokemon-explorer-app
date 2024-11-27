'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { pokemonApi } from '../services/pokemonApi';
import { ITEMS_PER_PAGE, SORT_OPTIONS } from '../utils/constants';

const PokemonContext = createContext();

export function PokemonProvider({ children }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState(SORT_OPTIONS[0].value);
  const [filterType, setFilterType] = useState('');

  // Fetch all Pokemon data
  const { data, isLoading, error } = useQuery({
    queryKey: ['all-pokemon'],
    queryFn: async () => {
      try {
        // Get list of all Pokemon
        const { results } = await pokemonApi.getAllPokemon();
        
        // Fetch details for Gen 1-Gen 3 pokemon only
        const detailedPokemon = await Promise.all(
          results.slice(0, 386).map(async (pokemon) => {
            try {
              return await pokemonApi.getPokemonDetails(pokemon.name);
            } catch (err) {
              console.error(`Error fetching details for ${pokemon.name}:`, err);
              return null;
            }
          })
        );

        // Filter out failed requests
        const validPokemon = detailedPokemon.filter(p => p !== null);
        
        if (validPokemon.length === 0) {
          throw new Error('No Pokemon data could be loaded');
        }

        return validPokemon;
      } catch (err) {
        console.error('Error in query function:', err);
        throw new Error('Failed to fetch Pokemon data. Please try again later.');
      }
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    retry: 2,
  });

  // Filter and sort Pokemon
  const filteredAndSortedPokemon = useCallback(() => {
    if (!data) return [];

    return data
      .filter(pokemon => {
        const matchesSearch = pokemon.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesType = filterType
          ? pokemon.types.some(t => t.type.name === filterType)
          : true;
        return matchesSearch && matchesType;
      })
      .sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'id') return a.id - b.id;
        return (a.baseExperience || 0) - (b.baseExperience || 0);
      });
  }, [data, searchTerm, filterType, sortBy]);

  // Paginate results
  const paginatedPokemon = useCallback(() => {
    const filtered = filteredAndSortedPokemon();
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAndSortedPokemon, currentPage]);

  const totalFilteredPages = Math.ceil(
    (filteredAndSortedPokemon()?.length || 0) / ITEMS_PER_PAGE
  );

  const value = {
    pokemons: paginatedPokemon(),
    loading: isLoading,
    error: error?.message || null,
    currentPage,
    totalPages: totalFilteredPages,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    filterType,
    setFilterType,
    setCurrentPage,
  };

  return (
    <PokemonContext.Provider value={value}>
      {children}
    </PokemonContext.Provider>
  );
}

export const usePokemonContext = () => {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error('usePokemonContext must be used within a PokemonProvider');
  }
  return context;
};
