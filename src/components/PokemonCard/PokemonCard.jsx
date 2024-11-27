'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';
import { useTeam } from '../../context/TeamContext';
import { colors } from '../../utils/colors';

const PokemonCard = ({ pokemon }) => {
  const [imageError, setImageError] = useState(false);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const { teams, addPokemonToTeam } = useTeam();

  const handleAddToTeam = (teamId) => {
    addPokemonToTeam(teamId, {
      id: pokemon.id,
      name: pokemon.name,
      types: pokemon.types,
      sprites: pokemon.sprites
    });
    setShowTeamModal(false);
  };

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
    <div className="relative">
      <Link 
        href={`/pokemon/${pokemon.id}`}
        className="block bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      >
        <div className="relative pb-[100%]">
          <img
            src={getImageUrl()}
            alt={pokemon.name}
            onError={() => setImageError(true)}
            className="absolute top-0 left-0 w-full h-full object-contain"
            loading="lazy"
          />
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

      <button
        onClick={() => setShowTeamModal(true)}
        className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
        aria-label={`Add ${pokemon.name} to team`}
      >
        <FaPlus className="w-4 h-4 text-primary-blue" />
      </button>

      {showTeamModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold mb-4">Add to Team</h3>
            {teams.length === 0 ? (
              <p className="text-gray-600">No teams available. Create a team first.</p>
            ) : (
              <div className="space-y-2">
                {teams.map(team => (
                  <button
                    key={team.id}
                    onClick={() => handleAddToTeam(team.id)}
                    disabled={team.pokemon.length >= 6}
                    className={`w-full p-3 text-left rounded-lg transition-colors
                      ${team.pokemon.length >= 6 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                        : 'bg-gray-50 hover:bg-gray-100'}`}
                  >
                    <span className="font-medium">{team.name}</span>
                    <span className="text-sm text-gray-500 ml-2">
                      ({team.pokemon.length}/6)
                    </span>
                  </button>
                ))}
              </div>
            )}
            <button
              onClick={() => setShowTeamModal(false)}
              className="mt-4 w-full p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonCard;
