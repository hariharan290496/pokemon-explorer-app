import { useState, useEffect } from "react";
import { pokemonApi } from "../services/pokemonApi";

export const usePokemonData = (limit = 12) => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setLoading(true);
        const offset = (currentPage - 1) * limit;

        //Get basic pokemon list
        const { results, totalCount, nextPage, previousPage } =
          await pokemonApi.getPokemonList(limit, offset);

        // Update pagination states
        setTotalPages(Math.ceil(totalCount / limit));
        setHasNextPage(!!nextPage);
        setHasPreviousPage(!!previousPage);

        //Fetch detailed data for each Pokemon
        const detailedPokemons = await Promise.all(
          results.map(async (pokemon) => {
            try {
              const details = await pokemonApi.getPokemonDetails(pokemon.name);
              return details;
            } catch (error) {
              console.error(
                `Error fetching details for ${pokemon.name}:`,
                error,
              );
              return null;
            }
          }),
        );

        //Filter out any failed requests
        const validPokemons = detailedPokemons.filter(
          (pokemon) => pokemon !== null,
        );
        setPokemons(validPokemons);
        setError(null);
      } catch (err) {
        setError("Failed to fetch Pokemon data. Please try again later.");
        console.error("Error fetching Pokemon:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, [currentPage, limit]);

  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return {
    pokemons,
    loading,
    error,
    currentPage,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    setCurrentPage: changePage,
  };
};
