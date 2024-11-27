const BASE_URL = "https://pokeapi.co/api/v2";

export const pokemonApi = {
  // Get paginated Pokemon list
  getPokemonList: async (limit = 12, offset = 0) => {
    try {
      const response = await fetch(
        `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`,
      );
      const data = await response.json();

      return {
        results: data.results,
        totalCount: data.count,
        nextPage: data.next,
        previousPage: data.previous,
      };
    } catch (error) {
      console.error("Error fetching Pokemon list:", error);
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
