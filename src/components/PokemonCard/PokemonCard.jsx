'use client';

import React from 'react';
import { Link } from 'react-router-dom';

const PokemonCard = ({ pokemon }) => {
  return (
    <Link 
      to={`/pokemon/${pokemon.id}`}
      className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative pb-[100%]">
        <img
          src={pokemon.sprites.other['official-artwork'].front_default}
          alt={pokemon.name}
          className="absolute top-0 left-0 w-full h-full object-contain"
        />
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-bold capitalize">{pokemon.name}</h2>
        <div className="flex gap-2 mt-2">
          {pokemon.types.map(({ type }) => (
            <span
              key={type.name}
              className="px-3 py-1 rounded-full text-sm text-white"
              style={{ backgroundColor: getTypeColor(type.name) }}
            >
              {type.name}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

//Basic Type colors. Need to add more
const getTypeColor = (type) => {
  const colors = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
  };
  return colors[type] || '#777';
};

export default PokemonCard;
