'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { colors } from '../../utils/colors';
import { pokemonApi } from '../../services/pokemonApi';
import Loading from '../common/Loading';
import PokemonImageGallery from '../PokemonImageGallery/PokemonImageGallery';

const PokemonDetail = () => {
  const params = useParams();
  const id = params.id;
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        const details = await pokemonApi.getPokemonDetails(id);
        setPokemon(details);
        setError(null);
      } catch (err) {
        setError('Failed to load Pokémon details.');
        console.error('Error fetching Pokémon details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold capitalize mb-4 text-neutral-800">
            {pokemon.name}
            <span className="text-2xl text-neutral-400 ml-4">#{pokemon.id.toString().padStart(3, '0')}</span>
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <PokemonImageGallery sprites={pokemon.sprites} name={pokemon.name} />
            <div className="space-y-8">
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
                  {pokemon.types.map(type => (
                    <span
                      key={type.name}
                      className="px-4 py-2 rounded-lg text-white font-medium"
                      style={{ backgroundColor: colors.type[type.name] }}
                    >
                      {type.name}
                    </span>
                  ))}
                </div>
              </div>
  
              {/* Abilities Section */}
              <div className="bg-neutral-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 text-neutral-800">Abilities</h3>
                <div className="grid gap-3">
                  {pokemon.abilities.map(ability => (
                    <div
                      key={ability.name}
                      className="bg-white rounded-lg p-4 shadow-sm"
                    >
                      <p className="font-medium capitalize">{ability.name}</p>
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