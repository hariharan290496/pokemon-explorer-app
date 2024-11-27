'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { pokemonApi } from '../services/pokemonApi';
import { ITEMS_PER_PAGE } from '../utils/constants';

const PokemonContext = createContext();

export function PokemonProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('id');
  const [filterType, setFilterType] = useState('');

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error
  } = useInfiniteQuery({
    queryKey: ['pokemon-infinite'],
    queryFn: async ({ pageParam = 0 }) => {
      const offset = pageParam * ITEMS_PER_PAGE;
      const { results, totalCount, nextPage } = await pokemonApi.getPokemonList(ITEMS_PER_PAGE, offset);
      
      const detailedPokemons = await Promise.all(
        results.map(pokemon => pokemonApi.getPokemonDetails(pokemon.name))
      );

      return {
        pokemons: detailedPokemons,
        nextPage,
        totalCount,
      };
    },
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.nextPage) return undefined;
      return pages.length;
    },
    staleTime: 5 * 60 * 1000,
  });

  const allPokemons = data?.pages.flatMap(page => page.pokemons) ?? [];

  const filteredAndSortedPokemon = useCallback(() => {
    return allPokemons
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
  }, [allPokemons, searchTerm, filterType, sortBy]);

  const value = {
    pokemons: filteredAndSortedPokemon(),
    loading: isLoading,
    error: error?.message || null,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    filterType,
    setFilterType,
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
