'use client';

import React from 'react';

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="relative flex-1">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search Pokémon..."
        className="w-full px-4 py-3 pl-12 bg-white border border-neutral-200 rounded-xl 
                 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent
                 shadow-sm hover:shadow-md transition-shadow duration-300"
      />
      <svg
        className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400"
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
  );
};

export default SearchBar;
