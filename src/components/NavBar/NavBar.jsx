'use client';

import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { FaSignOutAlt } from 'react-icons/fa';
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
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <Link href="/pokemon" className="text-3xl font-bold">
            Pokédex Explorer
          </Link>
          {currentUser && (
            <Link 
              href="/teams" 
              className="text-white hover:text-white/80 transition-colors"
            >
              My Teams
            </Link>
          )}
        </div>
        {currentUser && (
          <div className="flex items-center space-x-4">
            <span className="text-sm opacity-75">{currentUser.email}</span>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors duration-200"
              aria-label="Logout"
            >
              <FaSignOutAlt className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}