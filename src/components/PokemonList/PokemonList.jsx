'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import { usePokemonContext } from '../../context/PokemonContext';
import PokemonCard from '../PokemonCard/PokemonCard';
import SearchBar from '../common/SearchBar';
import SortFilter from '../common/SortFilter';
import Loading from '../common/Loading';
import ScrollToTop from '../common/ScrollToTop';

const PokemonList = () => {
  const {
    pokemons,
    loading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    filterType,
    setFilterType,
  } = usePokemonContext();

  // Intersection Observer for infinite scroll
  const observerTarget = useRef(null);

  const handleObserver = useCallback(
    (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    const element = observerTarget.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.5,
    });

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [handleObserver]);

  if (error) {
    return (
      <div className="text-center text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <SortFilter
            sortBy={sortBy}
            onSortChange={setSortBy}
            filterType={filterType}
            onFilterChange={setFilterType}
          />
        </div>
      </div>

      {loading && !pokemons.length ? (
        <Loading />
      ) : (
        <>
          {pokemons.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-neutral-500 text-lg">
                {searchTerm ? (
                  <>No Pokémon found for "{searchTerm}"</>
                ) : filterType ? (
                  <>No Pokémon found of type "{filterType}"</>
                ) : (
                  <>No Pokémon found</>
                )}
              </div>
              <p className="text-neutral-400 mt-2">
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {pokemons.map(pokemon => (
                  <PokemonCard key={pokemon.id} pokemon={pokemon} />
                ))}
              </div>

              {/* Infinite scroll trigger */}
              <div
                ref={observerTarget}
                className="h-20 flex items-center justify-center"
              >
                {isFetchingNextPage && (
                  <div className="animate-spin rounded-full h-8 w-8 border-4 border-primary-blue border-t-transparent" />
                )}
              </div>

              {!hasNextPage && pokemons.length > 0 && (
                <div className="text-center text-gray-500 py-4">
                  No more Pokémon to load
                </div>
              )}
            </>
          )}
        </>
      )}

      <ScrollToTop />
    </div>
  );
};

export default PokemonList;
