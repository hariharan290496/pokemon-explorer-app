'use client';

import React, { useState } from 'react';
import PokemonCard from '../PokemonCard/PokemonCard';
import Pagination from '../Pagination/Pagination';
import SearchBar from '../common/SearchBar';
import SortFilter from '../common/SortFilter';
import Loading from '../common/Loading';
import { usePokemonData } from '../../hooks/usePokemonData';

const PokemonList = () => {
  const {
    pokemons,
    loading,
    error,
    currentPage,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    setCurrentPage
  } = usePokemonData();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('id');
  const [filterType, setFilterType] = useState('');

  //Filter and sort pokemon
  const filteredAndSortedPokemon = pokemons
    .filter(pokemon => {
      const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType ? pokemon.types.some(t => t.type.name === filterType) : true;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'id') return a.id - b.id;
      return a.base_experience - b.base_experience;
    });

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
        {filteredAndSortedPokemon.map(pokemon => (
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
