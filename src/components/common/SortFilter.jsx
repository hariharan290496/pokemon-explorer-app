'use client';

import React from 'react';

const SortFilter = ({ sortBy, onSortChange, filterType, onFilterChange }) => {
  const pokemonTypes = [
    'all', 'normal', 'fire', 'water', 'electric', 'grass', 'ice',
    'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
    'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
  ];

  const sortOptions = [
    { value: 'id', label: 'ID (Default)' },
    { value: 'name', label: 'Name' },
    { value: 'baseExperience', label: 'Base Experience' }
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1">
        <label className="block text-sm font-medium text-neutral-600 mb-2">
          Sort by
        </label>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg
                   focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
        >
          {sortOptions.map(option => (
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
          onChange={(e) => onFilterChange(e.target.value)}
          className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg
                   focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
        >
          <option value="">All Types</option>
          {pokemonTypes.map(type => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SortFilter;
