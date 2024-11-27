'use client';

import { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { pokemonApi } from '../services/pokemonApi';
import { ITEMS_PER_PAGE, MAX_POKEMON_LIMIT } from '../utils/constants';
import debounce from 'lodash/debounce';

const PokemonContext = createContext();

export function PokemonProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('id_asc');
  const [filterType, setFilterType] = useState('');

  const debouncedSetSearch = useMemo(
    () => debounce((value) => {
      setDebouncedSearchTerm(value);
    }, 300),
    []
  );

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    debouncedSetSearch(value);
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    refetch
  } = useInfiniteQuery({
    queryKey: ['pokemon-infinite', debouncedSearchTerm, filterType, sortBy],
    queryFn: async ({ pageParam = 0 }) => {
      const batchSize = (debouncedSearchTerm || filterType) ? 151 : ITEMS_PER_PAGE;
      const offset = pageParam * batchSize;

      if (offset >= MAX_POKEMON_LIMIT) {
        return {
          pokemons: [],
          nextPage: null,
          totalCount: MAX_POKEMON_LIMIT,
        };
      }

      const remainingItems = MAX_POKEMON_LIMIT - offset;
      const limit = Math.min(batchSize, remainingItems);

      const { results, totalCount } = await pokemonApi.getPokemonList(limit, offset);
      
      const detailedPokemons = await Promise.all(
        results.map(pokemon => pokemonApi.getPokemonDetails(pokemon.name))
      );

      const filteredPokemons = detailedPokemons.filter(pokemon => {
        const matchesSearch = debouncedSearchTerm ? 
          pokemon.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) : 
          true;
        const matchesType = filterType ? 
          pokemon.types.some(t => t.type.name === filterType) : 
          true;
        return matchesSearch && matchesType;
      });

      const hasMore = offset + limit < MAX_POKEMON_LIMIT && 
                     (filteredPokemons.length > 0 || offset + limit < MAX_POKEMON_LIMIT);

      return {
        pokemons: filteredPokemons,
        nextPage: hasMore ? pageParam + 1 : null,
        totalCount: Math.min(totalCount, MAX_POKEMON_LIMIT),
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    refetch();
  }, [debouncedSearchTerm, filterType, refetch]);

  const allPokemons = data?.pages.flatMap(page => page.pokemons) ?? [];

  const filteredAndSortedPokemon = useCallback(() => {
    return allPokemons.sort((a, b) => {
      const [field, direction] = sortBy.split('_');
      const multiplier = direction === 'desc' ? -1 : 1;

      switch (field) {
        case 'name':
          return multiplier * a.name.localeCompare(b.name);
        case 'id':
          return multiplier * (a.id - b.id);
        case 'baseExperience':
          return multiplier * ((a.baseExperience || 0) - (b.baseExperience || 0));
        default:
          return 0;
      }
    });
  }, [allPokemons, sortBy]);

  const clearFilters = useCallback(() => {
    setSearchTerm('');
    setDebouncedSearchTerm('');
    setSortBy('id_asc');
    setFilterType('');
    // Cancel any pending debounced search
    debouncedSetSearch.cancel();
    // Refetch the data with cleared filters
    refetch();
  }, [debouncedSetSearch, refetch]);

  const value = {
    pokemons: filteredAndSortedPokemon(),
    loading: isLoading,
    error: error?.message || null,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    searchTerm,
    setSearchTerm: handleSearchChange,
    sortBy,
    setSortBy,
    filterType,
    setFilterType,
    clearFilters,
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
