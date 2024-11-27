'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { colors } from '../../utils/colors';
import { usePokemonDetails } from '../../hooks/usePokemonDetails';
import Loading from '../common/Loading';
import PokemonImageGallery from '../PokemonImageGallery/PokemonImageGallery';
import { STAT_THRESHOLDS } from '../../utils/constants';
import { useEvolutionChain } from '../../hooks/useEvolutionChain';
import EvolutionChain from '../EvolutionChain/EvolutionChain';

const PokemonDetail = () => {
  const params = useParams();
  const { data: pokemon, isLoading: loading, error } = usePokemonDetails(params.id);
  const { data: evolutionData } = useEvolutionChain(pokemon?.species?.url);

  const getStatColor = (value) => {
    if (value >= STAT_THRESHOLDS.EXCELLENT) return 'bg-green-500';
    if (value >= STAT_THRESHOLDS.GREAT) return 'bg-emerald-400';
    if (value >= STAT_THRESHOLDS.GOOD) return 'bg-yellow-400';
    if (value >= STAT_THRESHOLDS.FAIR) return 'bg-orange-400';
    return 'bg-red-400';
  };

  const formatStatName = (name) => {
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  if (loading) return <Loading />;
  if (error) return <div className="text-red-500 text-center">{error.message}</div>;
  if (!pokemon) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold capitalize mb-4 text-neutral-800">
            {pokemon.name}
            <span className="text-2xl text-neutral-400 ml-4">
              #{pokemon.id.toString().padStart(3, '0')}
            </span>
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              {/* Image gallery */}
              <PokemonImageGallery sprites={pokemon.sprites} name={pokemon.name} />
              
              {/* Stats Section */}
              <div className="bg-neutral-50 rounded-xl p-6 mt-8">
                <h3 className="text-xl font-semibold mb-6 text-neutral-800">Base Stats</h3>
                <div className="space-y-4">
                  {pokemon.stats.map((stat) => (
                    <div key={stat.stat.name} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-neutral-600">
                          {formatStatName(stat.stat.name)}
                        </span>
                        <span className="font-semibold">{stat.base_stat}</span>
                      </div>
                      <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${getStatColor(stat.base_stat)} transition-all duration-500`}
                          style={{ width: `${Math.min((stat.base_stat / 255) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              {/* Details Section */}
              <div className="bg-neutral-50 rounded-xl p-6">
                <h2 className="text-2xl font-semibold mb-4 text-neutral-800">Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm text-neutral-500">Height</p>
                    <p className="text-lg font-medium">{pokemon.height / 10}m</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-neutral-500">Weight</p>
                    <p className="text-lg font-medium">{pokemon.weight / 10}kg</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-neutral-500">Base Experience</p>
                    <p className="text-lg font-medium">{pokemon.baseExperience}</p>
                  </div>
                </div>
              </div>

              {/* Types Section */}
              <div className="bg-neutral-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 text-neutral-800">Types</h3>
                <div className="flex gap-3">
                  {pokemon.types?.map((type) => (
                    <span
                      key={type.type.name}
                      className="px-4 py-2 rounded-lg text-white font-medium capitalize"
                      style={{ backgroundColor: colors.type[type.type.name] }}
                    >
                      {type.type.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Updated Abilities Section */}
              <div className="bg-neutral-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 text-neutral-800">Abilities</h3>
                <div className="grid gap-3">
                  {pokemon.abilities?.map((ability) => (
                    <div
                      key={ability.ability.name}
                      className="bg-white rounded-lg p-4 shadow-sm border border-neutral-100 
                               hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-medium capitalize text-neutral-800">
                          {ability.ability.name.replace('-', ' ')}
                        </p>
                        {ability.is_hidden && (
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                            Hidden
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-neutral-500 mt-1">
                        {ability.slot === 1 ? 'Primary' : ability.slot === 2 ? 'Secondary' : 'Special'} Ability
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {evolutionData && (
                <div className="mb-8">
                  <EvolutionChain chain={evolutionData.chain} />
                </div>
              )}

              {/* Updated Moves Section */}
              <div className="bg-neutral-50 rounded-xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-neutral-800">Moves</h3>
                  <span className="text-sm text-neutral-500">
                    Showing first {Math.min(pokemon.moves.length, 20)} of {pokemon.moves.length}
                  </span>
                </div>
                <div className="grid gap-2 max-h-[400px] overflow-y-auto pr-2 
                              scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-neutral-100">
                  {pokemon.moves.slice(0, 20).map((move) => (
                    <div
                      key={move.move.name}
                      className="bg-white rounded-lg p-4 shadow-sm border border-neutral-100
                               hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium capitalize text-neutral-800">
                            {move.move.name.replace('-', ' ')}
                          </p>
                          <p className="text-sm text-neutral-500 mt-1 capitalize">
                            {move.version_group_details[0].move_learn_method.name.replace('-', ' ')}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {move.version_group_details[0].level_learned_at > 0 && (
                            <div className="flex flex-col items-end">
                              <span className="text-xs text-neutral-500">Level</span>
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
                                {move.version_group_details[0].level_learned_at}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;