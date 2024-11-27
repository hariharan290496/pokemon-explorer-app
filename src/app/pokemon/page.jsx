'use client';

import PokemonList from '../../components/PokemonList/PokemonList';

export default function PokemonListPage() {
  return (
    <div className="min-h-screen p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">Pokémon List</h1>
      </header>
      <PokemonList />
    </div>
  );
}
