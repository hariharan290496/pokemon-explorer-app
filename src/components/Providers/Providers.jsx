'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { AuthProvider } from '../../context/AuthContext';
import { TeamProvider } from '../../context/TeamContext';
import { PokemonProvider } from '../../context/PokemonContext';

export default function Providers({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TeamProvider>
          <PokemonProvider>
            {children}
          </PokemonProvider>
        </TeamProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
