'use client';

import { useState } from 'react';
import { useTeam } from '../../context/TeamContext';
import TeamCard from '../../components/TeamCard/TeamCard';
import { FaPlus } from 'react-icons/fa';
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
      <div className="min-h-screen p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">My Teams</h1>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-primary-blue text-white px-4 py-2 rounded-lg hover:bg-primary-indigo transition-colors"
          >
            <FaPlus className="w-4 h-4" />
            Create Team
          </button>
        </div>

        {teams.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No teams yet. Create your first team!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map(team => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
        )}

        {/* Create Team Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-bold mb-4">Create New Team</h3>
              <form onSubmit={handleCreateTeam}>
                <input
                  type="text"
                  value={newTeamName}
                  onChange={(e) => setNewTeamName(e.target.value)}
                  placeholder="Team name"
                  className="w-full p-2 border rounded-lg mb-4"
                  maxLength={20}
                  required
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 p-2 bg-primary-blue text-white rounded-lg hover:bg-primary-indigo"
                  >
                    Create
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
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
