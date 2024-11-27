const BASE_URL = "https://pokeapi.co/api/v2";

export const pokemonApi = {
  //Get paginated list of Pokemon
  getPokemonList: async (limit = 12, offset = 0) => {
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
  },

  //Get detailed Pokemon info
  getPokemonDetails: async (nameOrId) => {
    try {
      const response = await fetch(
        `${BASE_URL}/pokemon/${nameOrId.toString().toLowerCase()}`,
      );
      const data = await response.json();

      // Safely access nested sprite properties
      const sprites = {
        default: data.sprites?.front_default || null,
        shiny: data.sprites?.front_shiny || null,
        official:
          data.sprites?.other?.["official-artwork"]?.front_default || null,
        home: data.sprites?.other?.home?.front_default || null,
        dreamWorld: data.sprites?.other?.dream_world?.front_default || null,
      };

      return {
        id: data.id,
        name: data.name,
        height: data.height,
        weight: data.weight,
        baseExperience: data.base_experience,
        stats: data.stats,
        moves: data.moves,
        types: data.types.map((type) => ({
          type: {
            name: type.type.name,
          },
        })),
        abilities: data.abilities.map((ability) => ({
          ability: {
            name: ability.ability.name,
          },
          is_hidden: ability.is_hidden,
        })),
        sprites,
      };
    } catch (error) {
      console.error("Error fetching Pokemon details:", error);
      throw error;
    }
  },
};
