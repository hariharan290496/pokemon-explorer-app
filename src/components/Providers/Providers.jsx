'use client';

import QueryProvider from './QueryProvider';
import { PokemonProvider } from '../../context/PokemonContext';

export default function Providers({ children }) {
  return (
    <QueryProvider>
      <PokemonProvider>
        {children}
      </PokemonProvider>
    </QueryProvider>
  );
}
