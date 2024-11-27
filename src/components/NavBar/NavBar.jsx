'use client';

import { useAuth } from '../../context/AuthContext';

export default function NavBar() {
  const { currentUser, logout } = useAuth();

  return (
    <nav className="pokemon-gradient text-white">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Pokédex Explorer</h1>
        {currentUser && (
          <button
            onClick={logout}
            className="bg-white text-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-100"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
