'use client';

import PrivateRoute from '../../components/Auth/PrivateRoute';
import PokemonList from '../../components/PokemonList/PokemonList';

export default function PokemonListPage() {
  return (
    <PrivateRoute>
      <div className="min-h-screen p-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold">Pokédex</h1>
        </header>
        <PokemonList />
      </div>
    </PrivateRoute>
  );
}
