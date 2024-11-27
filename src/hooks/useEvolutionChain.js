import { useQuery } from "@tanstack/react-query";

export const useEvolutionChain = (speciesUrl) => {
  return useQuery({
    queryKey: ["evolution", speciesUrl],
    queryFn: async () => {
      // First get the species data to get evolution chain URL
      const speciesResponse = await fetch(speciesUrl);
      const speciesData = await speciesResponse.json();

      // Then fetch the evolution chain
      const evolutionResponse = await fetch(speciesData.evolution_chain.url);
      const evolutionData = await evolutionResponse.json();

      return evolutionData;
    },
    enabled: !!speciesUrl,
  });
};
