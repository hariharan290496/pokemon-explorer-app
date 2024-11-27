'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { colors } from '../../utils/colors';

const PokemonCard = ({ pokemon }) => {
  const [imageError, setImageError] = useState(false);

  // Fallback chain for images
  const getImageUrl = () => {
    if (!imageError && pokemon.sprites.official) {
      return pokemon.sprites.official;
    } else if (pokemon.sprites.home) {
      return pokemon.sprites.home;
    } else if (pokemon.sprites.dreamWorld) {
      return pokemon.sprites.dreamWorld;
    } else {
      return pokemon.sprites.default;
    }
  };


return (
    <Link 
      href={`/pokemon/${pokemon.id}`}
      className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative pb-[100%]">
        <img
          src={getImageUrl()}
          alt={pokemon.name}
          onError={() => setImageError(true)}
          className="absolute top-0 left-0 w-full h-full object-contain"
          loading="lazy"
        />
        {pokemon.sprites.shiny && (
          <img
            src={pokemon.sprites.shiny}
            alt={`Shiny ${pokemon.name}`}
            className="absolute top-0 left-0 w-full h-full object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            loading="lazy"
          />
        )}
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-bold capitalize">{pokemon.name}</h2>
        <div className="flex gap-2 mt-2">
          {pokemon.types.map(({ type }) => (
            <span
              key={type.name}
              className="px-3 py-1 rounded-full text-sm text-white"
              style={{ backgroundColor: colors.type[type.name] }}
            >
              {type.name}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;
