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
    const response = await fetch(
      `${BASE_URL}/pokemon/${nameOrId.toLowerCase()}`,
    );
    const data = await response.json();
    return {
      id: data.id,
      name: data.name,
      height: data.height,
      weight: data.weight,
      types: data.types,
      abilities: data.abilities,
      baseExperience: data.base_experience,
      stats: data.stats,
      sprites: {
        default: data.sprites.front_default,
        shiny: data.sprites.front_shiny,
        official: data.sprites.other["official-artwork"].front_default,
        dreamWorld: data.sprites.other.dream_world.front_default,
        home: data.sprites.other.home.front_default,
      },
    };
  },
};
