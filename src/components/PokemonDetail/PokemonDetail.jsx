'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { pokemonApi } from '../../services/pokemonApi';
import Loading from '../common/Loading';
import PokemonImageGallery from './PokemonImageGallery';

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
      <h1 className="text-3xl font-bold capitalize mb-4">{pokemon.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <PokemonImageGallery sprites={pokemon.sprites} name={pokemon.name} />
        <div>
          <h2 className="text-2xl font-semibold mb-2">Details</h2>
          <ul className="list-disc list-inside">
            <li>ID: {pokemon.id}</li>
            <li>Height: {pokemon.height}</li>
            <li>Weight: {pokemon.weight}</li>
            <li>Base Experience: {pokemon.baseExperience}</li>
          </ul>
          <h3 className="text-xl font-semibold mt-4">Types</h3>
          <ul className="list-disc list-inside">
            {pokemon.types.map(type => (
              <li key={type.name}>{type.name}</li>
            ))}
          </ul>
          <h3 className="text-xl font-semibold mt-4">Abilities</h3>
          <ul className="list-disc list-inside">
            {pokemon.abilities.map(ability => (
              <li key={ability.name}>{ability.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;