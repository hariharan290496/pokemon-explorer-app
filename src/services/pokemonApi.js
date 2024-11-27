const BASE_URL = "https://pokeapi.co/api/v2";

export const pokemonApi = {
  // Get all Pokemon (for initial load)
  getAllPokemon: async () => {
    try {
      // First, get the total count
      const response = await fetch(`${BASE_URL}/pokemon?limit=1`);
      const data = await response.json();
      const totalCount = data.count;

      console.log("total count: ", totalCount);
      // Then fetch all Pokemon with the total count
      const allPokemonResponse = await fetch(
        `${BASE_URL}/pokemon?limit=${totalCount}`,
      );
      const allPokemonData = await allPokemonResponse.json();

      return {
        results: allPokemonData.results,
        totalCount,
      };
    } catch (error) {
      console.error("Error fetching all Pokemon:", error);
      throw new Error("Failed to fetch Pokemon list");
    }
  },

  // Get detailed Pokemon info
  getPokemonDetails: async (nameOrId) => {
    try {
      const response = await fetch(
        `${BASE_URL}/pokemon/${nameOrId.toString().toLowerCase()}`,
      );
      const data = await response.json();

      return {
        id: data.id,
        name: data.name,
        height: data.height,
        weight: data.weight,
        baseExperience: data.base_experience,
        types: data.types,
        abilities: data.abilities,
        stats: data.stats,
        moves: data.moves,
        sprites: {
          default: data.sprites?.front_default || null,
          shiny: data.sprites?.front_shiny || null,
          official:
            data.sprites?.other?.["official-artwork"]?.front_default || null,
          home: data.sprites?.other?.home?.front_default || null,
          dreamWorld: data.sprites?.other?.dream_world?.front_default || null,
        },
      };
    } catch (error) {
      console.error("Error fetching Pokemon details:", error);
      throw new Error(`Failed to fetch details for ${nameOrId}`);
    }
  },
};
