'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const TeamContext = createContext();
const STORAGE_KEY = 'pokemon-teams';

export function useTeam() {
  return useContext(TeamContext);
}

export function TeamProvider({ children }) {
  const [teams, setTeams] = useState([]);

  // Load teams from localStorage on mount
  useEffect(() => {
    const savedTeams = localStorage.getItem(STORAGE_KEY);
    if (savedTeams) {
      try {
        setTeams(JSON.parse(savedTeams));
      } catch (error) {
        console.error('Error loading teams:', error);
        setTeams([]);
      }
    }
  }, []);

  const saveTeams = (updatedTeams) => {
    try {
      setTeams(updatedTeams);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTeams));
    } catch (error) {
      console.error('Error saving teams:', error);
    }
  };

  const createTeam = (name) => {
    const newTeam = {
      id: Date.now(),
      name,
      pokemon: []
    };
    const updatedTeams = [...teams, newTeam];
    saveTeams(updatedTeams);
    return newTeam;
  };

  const addPokemonToTeam = (teamId, pokemon) => {
    const team = teams.find(t => t.id === teamId);
    
    // Check if team exists and isn't full
    if (!team || team.pokemon.length >= 6) {
      console.log('TeamContext - Team not found or full');
      return false;
    }
    
    // Check if pokemon already exists in the team
    const isPokemonInTeam = team.pokemon.some(p => p.id === pokemon.id);
    if (isPokemonInTeam) {
      alert(`${pokemon.name} is already in this team!`);
      return false;
    }
    
    const spriteUrl = pokemon.sprites.default;

    const updatedTeams = teams.map(t => {
      if (t.id === teamId) {
        const updatedTeam = {
          ...t,
          pokemon: [...t.pokemon, {
            id: pokemon.id,
            name: pokemon.name,
            types: pokemon.types,
            sprites: {
              default: spriteUrl
            }
          }]
        };
        return updatedTeam;
      }
      return t;
    });
    
    saveTeams(updatedTeams);
    alert(`${pokemon.name} has been added to the team!`);
    return true;
  };

  const removePokemonFromTeam = (teamId, pokemonId, pokemonName) => {
    const confirmed = window.confirm(`Are you sure you want to remove ${pokemonName} from this team?`);
    if (!confirmed) return;

    const updatedTeams = teams.map(t => {
      if (t.id === teamId) {
        return {
          ...t,
          pokemon: t.pokemon.filter(p => p.id !== pokemonId)
        };
      }
      return t;
    });
    
    saveTeams(updatedTeams);
  };

  const deleteTeam = (teamId, teamName) => {
    const confirmed = window.confirm(`Are you sure you want to delete the team "${teamName}"? This action cannot be undone.`);
    if (!confirmed) return;

    const updatedTeams = teams.filter(t => t.id !== teamId);
    saveTeams(updatedTeams);
  };

  const value = {
    teams,
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
