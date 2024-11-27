'use client';

import { useParams } from 'next/navigation';
import PrivateRoute from '../../../components/Auth/PrivateRoute';
import PokemonDetail from '../../../components/PokemonDetail/PokemonDetail';

export default function PokemonDetailPage() {
  const params = useParams();
  
  return <PrivateRoute><PokemonDetail id={params.id} /></PrivateRoute>;
}
