'use client';

import React from 'react';
import { usePokemonContext } from '../../context/PokemonContext';
import PokemonCard from '../PokemonCard/PokemonCard';
import Pagination from '../Pagination/Pagination';
import SearchBar from '../common/SearchBar';
import SortFilter from '../common/SortFilter';
import Loading from '../common/Loading';

const PokemonList = () => {
  const {
    pokemons,
    loading,
    error,
    currentPage,
    totalPages,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    filterType,
    setFilterType,
    setCurrentPage
  } = usePokemonContext();

  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (loading) return <Loading />;

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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {pokemons.map(pokemon => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default PokemonList;
