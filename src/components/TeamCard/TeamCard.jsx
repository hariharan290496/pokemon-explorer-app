'use client';

import { useTeam } from '../../context/TeamContext';
import { FaTrash } from 'react-icons/fa';
import { colors } from '../../utils/colors';
import Image from 'next/image';

const TeamCard = ({ team }) => {
  const { removePokemonFromTeam, deleteTeam } = useTeam();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold">{team.name}</h3>
        <button
          onClick={() => deleteTeam(team.id)}
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
            <div key={pokemon.id} className="relative group">
              <div className="aspect-square relative bg-gray-50 rounded-lg p-2">
                <Image
                  src={pokemon.sprites.default}
                  alt={pokemon.name}
                  layout="fill"
                  objectFit="contain"
                  className="p-1"
                />
                <button
                  onClick={() => removePokemonFromTeam(team.id, pokemon.id)}
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
          ) : (
            <div
              key={`empty-${index}`}
              className="border-2 border-dashed border-gray-200 rounded-lg aspect-square flex items-center justify-center"
            >
              <span className="text-gray-400 text-sm">Empty</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TeamCard;
