import React, { useState } from 'react';
import { Club } from '../types';
import { clubsData as initialClubsData } from '../data';
import Modal from './Modal';
import {
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Loader,
  Check,
  X,
  LogOut,
  Users,
  Calendar,
  TrendingUp
} from 'lucide-react';

interface AdminPanelProps {
  onLogout: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onLogout }) => {
  const [clubs, setClubs] = useState<Club[]>(initialClubsData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClub, setEditingClub] = useState<Club | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    collegeName: 'GGITS',
    clubName: '',
    description: '',
    googleFormLink: '',
    startingYear: new Date().getFullYear(),
    memberCount: 0
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    if (editingClub) {
      setClubs(prev => prev.map(club => 
        club.id === editingClub.id 
          ? { 
              ...club, 
              ...formData,
              pastEvents: club.pastEvents
            }
          : club
      ));
    } else {
      const newClub: Club = {
        id: Date.now().toString(),
        ...formData,
        pastEvents: []
      };
      setClubs(prev => [...prev, newClub]);
    }

    setIsLoading(false);
    resetForm();
    setIsModalOpen(false);
  };

  const handleEdit = (club: Club) => {
    setEditingClub(club);
    setFormData({
      collegeName: club.collegeName,
      clubName: club.clubName,
      description: club.description,
      googleFormLink: club.googleFormLink,
      startingYear: club.startingYear,
      memberCount: club.memberCount
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setClubs(prev => prev.filter(club => club.id !== id));
    setShowDeleteConfirm(null);
    setIsLoading(false);
  };

  const resetForm = () => {
    setFormData({
      collegeName: 'GGITS',
      clubName: '',
      description: '',
      googleFormLink: '',
      startingYear: new Date().getFullYear(),
      memberCount: 0
    });
    setEditingClub(null);
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const totalMembers = clubs.reduce((sum, club) => sum + club.memberCount, 0);
  const totalEvents = clubs.reduce((sum, club) => sum + club.pastEvents.length, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-8 transition-all duration-500">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
              Admin <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Dashboard</span>
            </h1>
            <p className="text-gray-600 text-lg">Manage college clubs and their information</p>
          </div>

          <button
            onClick={onLogout}
            className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transform transition-all duration-300 shadow-lg flex items-center gap-3"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 transition-opacity duration-500">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Clubs</p>
                <p className="text-3xl font-bold">{clubs.length}</p>
              </div>
              <Users className="w-12 h-12 text-blue-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-3xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Total Members</p>
                <p className="text-3xl font-bold">{totalMembers}</p>
              </div>
              <TrendingUp className="w-12 h-12 text-purple-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-3xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-indigo-100 text-sm font-medium">Total Events</p>
                <p className="text-3xl font-bold">{totalEvents}</p>
              </div>
              <Calendar className="w-12 h-12 text-indigo-200" />
            </div>
          </div>
        </div>

        {/* Add Club Button */}
        <div className="mb-8 transition-transform duration-500">
          <button
            onClick={openAddModal}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 transform transition-all duration-300 shadow-xl flex items-center gap-3"
          >
            <Plus className="w-6 h-6" />
            Add New Club
          </button>
        </div>

        {/* Clubs Table */}
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 transition-all duration-500">
          <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Clubs Management</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-6 font-bold text-gray-700 text-lg">College</th>
                    <th className="text-left py-4 px-6 font-bold text-gray-700 text-lg">Club Name</th>
                    <th className="text-left py-4 px-6 font-bold text-gray-700 text-lg">Members</th>
                    <th className="text-left py-4 px-6 font-bold text-gray-700 text-lg">Founded</th>
                    <th className="text-left py-4 px-6 font-bold text-gray-700 text-lg">Events</th>
                    <th className="text-left py-4 px-6 font-bold text-gray-700 text-lg">Form Link</th>
                    <th className="text-left py-4 px-6 font-bold text-gray-700 text-lg">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {clubs.map(club => (
                    <tr key={club.id} className="border-b border-gray-100 hover:bg-blue-50 transition-all duration-300">
                      <td className="py-6 px-6">
                        <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                          {club.collegeName}
                        </span>
                      </td>
                      <td className="py-6 px-6">
                        <div>
                          <p className="font-bold text-gray-800 text-lg">{club.clubName}</p>
                          <p className="text-gray-600 text-sm truncate max-w-xs">{club.description}</p>
                        </div>
                      </td>
                      <td className="py-6 px-6">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-blue-600" />
                          <span className="font-semibold text-blue-800">{club.memberCount}</span>
                        </div>
                      </td>
                      <td className="py-6 px-6">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-purple-600" />
                          <span className="font-semibold text-purple-800">{club.startingYear}</span>
                        </div>
                      </td>
                      <td className="py-6 px-6">
                        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {club.pastEvents.length}
                        </span>
                      </td>
                      <td className="py-6 px-6">
                        <a
                          href={club.googleFormLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 flex items-center gap-2 font-medium"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Open Form
                        </a>
                      </td>
                      <td className="py-6 px-6">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleEdit(club)}
                            className="p-3 text-blue-600 hover:bg-blue-100 rounded-xl transition-all duration-200 hover:scale-110"
                            title="Edit Club"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => setShowDeleteConfirm(club.id)}
                            className="p-3 text-red-600 hover:bg-red-100 rounded-xl transition-all duration-200 hover:scale-110"
                            title="Delete Club"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {clubs.length === 0 && (
                <div className="text-center py-16 text-gray-500">
                  <Users className="w-16 h-16 mx-auto mb-6 opacity-50" />
                  <p className="text-xl">No clubs available. Add your first club!</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Add/Edit Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            resetForm();
          }}
          title={editingClub ? 'Edit Club' : 'Add New Club'}
        >
          <form onSubmit={handleSubmit} className="space-y-6 transition-opacity duration-500">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">College Name</label>
                <select
                  value={formData.collegeName}
                  onChange={(e) => setFormData(prev => ({ ...prev, collegeName: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                  required
                >
                  <option value="GGITS">GGITS</option>
                  <option value="GGCT">GGCT</option>
                  <option value="GGCE">GGCE</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Starting Year</label>
                <input
                  type="number"
                  value={formData.startingYear}
                  onChange={(e) => setFormData(prev => ({ ...prev, startingYear: parseInt(e.target.value) }))}
                  min="2000"
                  max={new Date().getFullYear()}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Club Name</label>
                <input
                  type="text"
                  value={formData.clubName}
                  onChange={(e) => setFormData(prev => ({ ...prev, clubName: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                  placeholder="Enter club name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Member Count</label>
                <input
                  type="number"
                  value={formData.memberCount}
                  onChange={(e) => setFormData(prev => ({ ...prev, memberCount: parseInt(e.target.value) || 0 }))}
                  min="0"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                  placeholder="Number of members"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Club Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 resize-none"
                placeholder="Describe the club and its activities"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Google Form Link</label>
              <input
                type="url"
                value={formData.googleFormLink}
                onChange={(e) => setFormData(prev => ({ ...prev, googleFormLink: e.target.value }))}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                placeholder="https://forms.gle/..."
                required
              />
            </div>

            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  resetForm();
                }}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:opacity-90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 font-semibold"
              >
                {isLoading ? (
                  <Loader className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Check className="w-5 h-5" />
                    {editingClub ? 'Update' : 'Add'} Club
                  </>
                )}
              </button>
            </div>
          </form>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={showDeleteConfirm !== null}
          onClose={() => setShowDeleteConfirm(null)}
          title="Confirm Delete"
        >
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
              <Trash2 className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Delete Club</h3>
            <p className="text-gray-600 mb-8 text-lg">
              Are you sure you want to delete this club? This action cannot be undone and will remove all associated data.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => showDeleteConfirm && handleDelete(showDeleteConfirm)}
                disabled={isLoading}
                className="flex-1 bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 font-semibold"
              >
                {isLoading ? (
                  <Loader className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <X className="w-5 h-5" />
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default AdminPanel;
