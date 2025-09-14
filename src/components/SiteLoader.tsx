import React from 'react';
import { GraduationCap } from 'lucide-react';

interface SiteLoaderProps {
  isLoading: boolean;
}

const SiteLoader: React.FC<SiteLoaderProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="text-center">
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <GraduationCap className="w-8 h-8 text-white animate-pulse" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2 animate-pulse">GGClubs</h2>
        <p className="text-white/80 animate-pulse">Loading your college experience...</p>
        <div className="mt-6 flex justify-center space-x-1">
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export default SiteLoader;