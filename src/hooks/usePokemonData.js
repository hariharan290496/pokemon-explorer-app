import { useState, useEffect } from "react";
import { pokemonApi } from "../services/pokemonApi";

export const usePokemonData = (limit = 12) => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setLoading(true);
        const offset = (currentPage - 1) * limit;
        const data = await pokemonApi.getPokemonList(limit, offset);

        // Fetch detailed data for each Pokemon
        const detailedPokemons = await Promise.all(
          data.results.map(async (pokemon) => {
            const details = await pokemonApi.getPokemonDetail(pokemon.name);
            return details;
          }),
        );

        setPokemons(detailedPokemons);
        setTotalPages(Math.ceil(data.count / limit));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, [currentPage, limit]);

  return { pokemons, loading, error, currentPage, setCurrentPage, totalPages };
};
