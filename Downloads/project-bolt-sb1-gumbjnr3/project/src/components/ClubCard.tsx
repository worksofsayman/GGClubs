import React from 'react';
import { Club } from '../types';
import { Users, ExternalLink, Calendar, Trophy, TrendingUp } from 'lucide-react';

interface ClubCardProps {
  club: Club;
}

const ClubCard: React.FC<ClubCardProps> = ({ club }) => {
  const currentYear = new Date().getFullYear();
  const clubAge = currentYear - club.startingYear;

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 transform transition-all duration-500 hover:scale-105 hover:shadow-3xl animate-fadeIn">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg">
          <Users className="w-8 h-8 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-800">{club.clubName}</h3>
          <p className="text-gray-600 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Est. {club.startingYear} • {clubAge} years strong
          </p>
        </div>
      </div>

      <p className="text-gray-700 leading-relaxed mb-6 text-lg">{club.description}</p>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-100">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Active Members</span>
          </div>
          <p className="text-2xl font-bold text-blue-900">{club.memberCount}</p>
        </div>
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-100">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-purple-800">Events Held</span>
          </div>
          <p className="text-2xl font-bold text-purple-900">{club.pastEvents.length}</p>
        </div>
      </div>

      {club.pastEvents.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-600" />
            Recent Events
          </h4>
          <div className="space-y-3">
            {club.pastEvents.slice(0, 2).map((event) => (
              <div key={event.id} className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-semibold text-gray-800">{event.title}</h5>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {new Date(event.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-2">{event.description}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Users className="w-3 h-3" />
                  {event.participants} participants
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center text-sm text-blue-600">
          <ExternalLink className="w-4 h-4 mr-2" />
          <span>Ready to join? Click "Join Now" above!</span>
        </div>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClubCard;