'use client';

import { useState } from 'react';
import { useTeam } from '../../context/TeamContext';
import { FaTrash, FaPlus } from 'react-icons/fa';
import { colors } from '../../utils/colors';
import Image from 'next/image';
import Link from 'next/link';
import PokemonList from '../PokemonList/PokemonList';

const TeamCard = ({ team }) => {
  const { removePokemonFromTeam, deleteTeam, addPokemonToTeam } = useTeam();
  const [showPokemonModal, setShowPokemonModal] = useState(false);
  const [error, setError] = useState('');

  const handlePokemonSelect = (pokemon) => {
    const success = addPokemonToTeam(team.id, pokemon);
    if (!success) {
      // Check if pokemon already exists in team
      const isDuplicate = team.pokemon.some(p => p.id === pokemon.id);
      if (isDuplicate) {
        setError(`${pokemon.name} is already in this team!`);
        setTimeout(() => setError(''), 3000); // Clear error after 3 seconds
        return;
      }
    }
    setShowPokemonModal(false);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold">{team.name}</h3>
          <button
            onClick={() => deleteTeam(team.id, team.name)}
            className="text-red-500 hover:text-red-600 p-2"
            aria-label={`Delete ${team.name}`}
          >
            <FaTrash className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[...Array(6)].map((_, index) => {
            const pokemon = team.pokemon[index];
            return pokemon ? (
              <Link key={pokemon.id} href={`/pokemon/${pokemon.id}`} passHref>
                <div className="relative group cursor-pointer">
                  <div className="aspect-square relative bg-gray-50 rounded-lg p-2">
                    <Image
                      src={pokemon.sprites.default}
                      alt={pokemon.name}
                      layout="fill"
                      objectFit="contain"
                      className="p-1"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); //Prevent link navigation
                        removePokemonFromTeam(team.id, pokemon.id, pokemon.name);
                      }}
                      className="absolute -top-2 -right-2 p-1.5 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label={`Remove ${pokemon.name}`}
                    >
                      <FaTrash className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="mt-1 flex gap-1 justify-center">
                    {pokemon.types.map(({ type }) => (
                      <span
                        key={type.name}
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: colors.type[type.name] }}
                        title={type.name}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-center block mt-1 capitalize">
                    {pokemon.name}
                  </span>
                </div>
              </Link>
            ) : (
              <button
                key={`empty-${index}`}
                onClick={() => setShowPokemonModal(true)}
                className="border-2 border-dashed border-gray-200 rounded-lg aspect-square flex items-center justify-center hover:bg-gray-50 transition-colors group"
                aria-label="Add Pokémon to team"
              >
                <FaPlus className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Pokémon Selection Modal */}
      {showPokemonModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full h-full sm:h-auto sm:max-h-[90vh] sm:max-w-4xl mx-auto overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold">Add Pokémon to {team.name}</h3>
                {error && (
                  <p className="text-red-500 text-sm mt-1 animate-fade-in">
                    {error}
                  </p>
                )}
              </div>
              <button
                onClick={() => {
                  setShowPokemonModal(false);
                  setError('');
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <span className="text-gray-500">Cancel</span>
              </button>
            </div>
            <div className="relative">
              <PokemonList 
                isModal={true} 
                onPokemonSelect={handlePokemonSelect}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TeamCard;
