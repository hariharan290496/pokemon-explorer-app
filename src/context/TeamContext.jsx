'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const TeamContext = createContext();

export function useTeam() {
  return useContext(TeamContext);
}

export function TeamProvider({ children }) {
  const [teams, setTeams] = useState([]);
  const [activeTeam, setActiveTeam] = useState(null);

  useEffect(() => {
    const savedTeams = Cookies.get('pokemon-teams');
    if (savedTeams) {
      setTeams(JSON.parse(savedTeams));
    }
  }, []);

  const createTeam = (name) => {
    const newTeam = {
      id: Date.now(),
      name,
      pokemon: []
    };
    const updatedTeams = [...teams, newTeam];
    setTeams(updatedTeams);
    Cookies.set('pokemon-teams', JSON.stringify(updatedTeams));
    return newTeam;
  };

  const addPokemonToTeam = (teamId, pokemon) => {
    const team = teams.find(t => t.id === teamId);
    if (!team || team.pokemon.length >= 6) return false;
    
    const updatedTeams = teams.map(t => {
      if (t.id === teamId) {
        return {
          ...t,
          pokemon: [...t.pokemon, pokemon]
        };
      }
      return t;
    });
    
    setTeams(updatedTeams);
    Cookies.set('pokemon-teams', JSON.stringify(updatedTeams));
    return true;
  };

  const removePokemonFromTeam = (teamId, pokemonId) => {
    const updatedTeams = teams.map(t => {
      if (t.id === teamId) {
        return {
          ...t,
          pokemon: t.pokemon.filter(p => p.id !== pokemonId)
        };
      }
      return t;
    });
    
    setTeams(updatedTeams);
    Cookies.set('pokemon-teams', JSON.stringify(updatedTeams));
  };

  const deleteTeam = (teamId) => {
    const updatedTeams = teams.filter(t => t.id !== teamId);
    setTeams(updatedTeams);
    Cookies.set('pokemon-teams', JSON.stringify(updatedTeams));
  };

  const value = {
    teams,
    activeTeam,
    setActiveTeam,
    createTeam,
    addPokemonToTeam,
    removePokemonFromTeam,
    deleteTeam
  };

  return (
    <TeamContext.Provider value={value}>
      {children}
    </TeamContext.Provider>
  );
}
