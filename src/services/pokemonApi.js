const BASE_URL = "https://pokeapi.co/api/v2";

export const pokemonApi = {
  //Get paginated list of Pokemon
  getPokemonList: async (limit = 12, offset = 0) => {
    const response = await fetch(
      `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`,
    );
    return response.json();
  },

  //Get detailed Pokemon info
  getPokemonDetail: async (nameOrId) => {
    const response = await fetch(`${BASE_URL}/pokemon/${nameOrId}`);
    return response.json();
  },
};
