'use client';

import { useParams } from 'next/navigation';
import PokemonDetail from '../../../components/PokemonDetail/PokemonDetail';

export default function PokemonDetailPage() {
  const params = useParams();
  
  return <PokemonDetail id={params.id} />;
}
