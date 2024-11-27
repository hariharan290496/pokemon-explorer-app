'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">Pokémon Explorer</h1>
      </header>
      <Link 
        href="/pokemon"
        className="block w-fit mx-auto px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Explore Pokémon
      </Link>
    </div>
  );
}
