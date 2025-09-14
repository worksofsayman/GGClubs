import React, { useState, useEffect } from 'react';
import StudentForm from './components/StudentForm';
import AdminPanel from './components/AdminPanel';
import AdminLogin from './components/AdminLogin';
import SiteLoader from './components/SiteLoader';
import { UserCheck, Shield, Menu, X } from 'lucide-react';

function App() {
  const [currentView, setCurrentView] = useState<'student' | 'admin'>('student');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleAdminLogin = () => {
    setIsAdminAuthenticated(true);
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    setCurrentView('student');
  };

  const handleViewChange = (view: 'student' | 'admin') => {
    if (view === 'admin' && !isAdminAuthenticated) {
      // Don't change view, admin needs to login first
      return;
    }
    setCurrentView(view);
    setIsMobileMenuOpen(false);
  };

  if (isLoading) {
    return <SiteLoader isLoading={isLoading} />;
  }

  // Show admin login if trying to access admin panel without authentication
  if (currentView === 'admin' && !isAdminAuthenticated) {
    return <AdminLogin onLogin={handleAdminLogin} />;
  }

  return (
    <div className="min-h-screen">
      {/* Navigation Header */}
      <nav className="bg-white/95 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                  <UserCheck className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">GGClubs</h1>
                  <p className="text-sm text-gray-600">Your Gateway to College Clubs</p>
                </div>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-6">
                <button
                  onClick={() => handleViewChange('student')}
                  className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-105 ${
                    currentView === 'student'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100/80 backdrop-blur-sm'
                  }`}
                >
                  <UserCheck className="w-5 h-5" />
                  Student Portal
                </button>
                <button
                  onClick={() => setCurrentView('admin')}
                  className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-105 ${
                    currentView === 'admin'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100/80 backdrop-blur-sm'
                  }`}
                >
                  <Shield className="w-5 h-5" />
                  Admin Panel
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-3 rounded-2xl text-gray-600 hover:text-gray-800 hover:bg-gray-100/80 backdrop-blur-sm transition-all duration-300"
              >
                {isMobileMenuOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200/50 bg-white/95 backdrop-blur-lg animate-slideDown">
              <div className="px-2 pt-2 pb-3 space-y-2">
                <button
                  onClick={() => handleViewChange('student')}
                  className={`block w-full text-left px-4 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-3 ${
                    currentView === 'student'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100/80'
                  }`}
                >
                  <UserCheck className="w-5 h-5" />
                  Student Portal
                </button>
                <button
                  onClick={() => setCurrentView('admin')}
                  className={`block w-full text-left px-4 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-3 ${
                    currentView === 'admin'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100/80'
                  }`}
                >
                  <Shield className="w-5 h-5" />
                  Admin Panel
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {currentView === 'student' ? (
          <StudentForm />
        ) : (
          <AdminPanel onLogout={handleAdminLogout} />
        )}
      </main>
    </div>
  );
}

export default App;