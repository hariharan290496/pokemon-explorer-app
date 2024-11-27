import { useQuery } from "@tanstack/react-query";
import { pokemonApi } from "../services/pokemonApi";

export function usePokemonDetails(id) {
  return useQuery({
    queryKey: ["pokemon", id],
    queryFn: () => pokemonApi.getPokemonDetails(id),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}
