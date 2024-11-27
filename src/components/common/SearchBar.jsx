'use client';

import React from 'react';

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="relative flex-1">
      <label className="block text-sm font-medium text-neutral-600 mb-2">
        Search Pokémon
      </label>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search by name..."
          className="w-full px-4 py-2.5 pl-11 bg-neutral-50 border border-neutral-200 rounded-lg
                   focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
        />
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
  );
};

export default SearchBar;
