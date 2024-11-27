'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

const EvolutionChain = ({ chain }) => {
  const renderEvolutionNode = (node) => {
    const pokemonId = node.species.url.split('/').slice(-2, -1)[0];
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;

    return (
      <div key={node.species.name} className="flex flex-col items-center">
        <Link 
          href={`/pokemon/${pokemonId}`}
          className="group transition-transform hover:scale-105"
        >
          <div className="relative w-24 h-24 sm:w-32 sm:h-32">
            <Image
              src={imageUrl}
              alt={node.species.name}
              fill
              className="object-contain"
            />
          </div>
          <p className="text-center mt-2 capitalize font-medium text-sm sm:text-base group-hover:text-blue-600">
            {node.species.name}
          </p>
        </Link>
        {node.evolution_details[0] && (
          <div className="text-xs text-gray-500 text-center mt-1">
            {node.evolution_details[0].min_level && 
              `Level ${node.evolution_details[0].min_level}`}
          </div>
        )}
      </div>
    );
  };

  const renderEvolutionChain = (node) => {
    return (
      <div className="flex items-center justify-center gap-4 sm:gap-8">
        {renderEvolutionNode(node)}
        {node.evolves_to.length > 0 && (
          <>
            <FaArrowRight className="text-gray-400 w-4 h-4 sm:w-6 sm:h-6" />
            {renderEvolutionChain(node.evolves_to[0])}
          </>
        )}
      </div>
    );
  };

  return (
    <div className="bg-neutral-50 rounded-xl p-6">
      <h3 className="text-xl font-semibold mb-6 text-neutral-800">Evolution Chain</h3>
      {renderEvolutionChain(chain)}
    </div>
  );
};

export default EvolutionChain;
