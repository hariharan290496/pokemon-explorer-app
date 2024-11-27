'use client';

import { useState } from 'react';
import { useTeam } from '../../context/TeamContext';
import TeamCard from '../../components/TeamCard/TeamCard';
import { FaPlus } from 'react-icons/fa';
import { CgPokemon } from 'react-icons/cg';
import PrivateRoute from '../../components/Auth/PrivateRoute';

export default function TeamsPage() {
  const { teams, createTeam } = useTeam();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');

  const handleCreateTeam = (e) => {
    e.preventDefault();
    if (newTeamName.trim()) {
      createTeam(newTeamName.trim());
      setNewTeamName('');
      setShowCreateModal(false);
    }
  };

  return (
    <PrivateRoute>
      <div className="min-h-screen p-4 sm:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold flex items-center gap-2 sm:gap-3">
            <CgPokemon className="w-8 h-8 sm:w-10 sm:h-10" />
            My Teams
          </h1>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 w-full sm:w-auto justify-center"
          >
            <FaPlus className="w-4 h-4" />
            Create Team
          </button>
        </div>

        {teams.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <p className="text-gray-600">No teams yet. Create your first team!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {teams.map(team => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
        )}

        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md mx-auto">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-2">
                <CgPokemon className="w-6 h-6 text-primary-blue" />
                Create New Team
              </h3>
              <form onSubmit={handleCreateTeam}>
                <input
                  type="text"
                  value={newTeamName}
                  onChange={(e) => setNewTeamName(e.target.value)}
                  placeholder="Enter team name"
                  className="w-full p-2.5 sm:p-3 border-2 border-gray-200 rounded-lg mb-4 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 outline-none text-sm sm:text-base"
                  maxLength={20}
                  required
                />
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <button
                    type="submit"
                    className="flex-1 p-2.5 sm:p-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg hover:shadow-md transition-all duration-200"
                  >
                    Create Team
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 p-2.5 sm:p-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </PrivateRoute>
  );
}
