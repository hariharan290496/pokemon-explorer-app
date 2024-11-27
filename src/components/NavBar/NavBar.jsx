'use client';

import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { FaSignOutAlt, FaHome } from 'react-icons/fa';
import { CgPokemon } from 'react-icons/cg';
import Link from 'next/link';

export default function NavBar() {
  const { currentUser, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <nav className="pokemon-gradient text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 w-full sm:w-auto">
          <Link 
            href="/pokemon" 
            className="text-2xl sm:text-3xl font-bold flex items-center gap-2"
          >
            <CgPokemon className="w-6 h-6 sm:w-8 sm:h-8" />
            Pokédex
          </Link>
          {currentUser && (
            <div className="flex items-center gap-2 sm:gap-4">
              <Link 
                href="/pokemon" 
                className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:bg-white/10 transition-colors text-sm sm:text-base"
              >
                <FaHome className="w-3 h-3 sm:w-4 sm:h-4" />
                Pokémons
              </Link>
              <Link 
                href="/teams" 
                className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:bg-white/10 transition-colors text-sm sm:text-base"
              >
                <CgPokemon className="w-3 h-3 sm:w-4 sm:h-4" />
                My Teams
              </Link>
            </div>
          )}
        </div>
        {currentUser && (
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 w-full sm:w-auto">
            <span className="text-xs sm:text-sm bg-white/10 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg truncate max-w-[200px]">
              {currentUser.email}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500/80 hover:bg-red-600/80 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg transition-colors duration-200 w-full sm:w-auto justify-center"
              aria-label="Logout"
            >
              <FaSignOutAlt className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
