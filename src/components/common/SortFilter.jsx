'use client';

import { usePokemonContext } from '../../context/PokemonContext';
import { SORT_OPTIONS, POKEMON_TYPES } from '../../utils/constants';
import { TiDelete } from 'react-icons/ti';

const SortFilter = () => {
  const { 
    sortBy, 
    setSortBy, 
    filterType, 
    setFilterType,
    searchTerm,
    clearFilters 
  } = usePokemonContext();

  const hasActiveFilters = filterType || sortBy !== 'id_asc' || searchTerm;

  return (
    <div className="flex flex-col sm:flex-row gap-4 relative">
      <div className="flex-1">
        <label className="block text-sm font-medium text-neutral-600 mb-2">
          Sort by
        </label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg
                   focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
        >
          {SORT_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      
      <div className="flex-1">
        <label className="block text-sm font-medium text-neutral-600 mb-2">
          Filter by type
        </label>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg
                   focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
        >
          <option value="">All Types</option>
          {POKEMON_TYPES.map(type => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="absolute -top-2 -right-2 text-neutral-500 hover:text-red-500 
                   transition-all duration-200"
          title="Clear all filters"
        >
          <TiDelete className="w-7 h-7" />
        </button>
      )}
    </div>
  );
};

export default SortFilter;
