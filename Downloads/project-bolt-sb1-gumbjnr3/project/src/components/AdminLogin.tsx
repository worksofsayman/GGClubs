import React, { useState } from 'react';
import { Shield, Mail, Lock, Eye, EyeOff, Loader, Key, AlertCircle, CheckCircle, ArrowLeft, Home } from 'lucide-react';
import { adminCredentials } from '../types';

interface AdminLoginProps {
  onLogin: () => void;
  onBack?: () => void; // Optional back button handler
  showBackButton?: boolean; // Control back button visibility
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onBack, showBackButton = true }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const isValidCredentials = adminCredentials.some(
      cred => cred.email === email && cred.password === password
    );

    if (isValidCredentials) {
      setSuccess('Authentication successful! Redirecting...');
      await new Promise(resolve => setTimeout(resolve, 800));
      onLogin();
    } else {
      setError('Invalid email or password. Please try again.');
    }

    setIsLoading(false);
  };

  const handleDemoCredentialClick = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full mx-auto">
        {/* Back Button */}
        {showBackButton && (
          <div className="mb-4">
            <button
              onClick={() => window.location.reload()}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-white/10"
              disabled={isLoading}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </button>

          </div>
        )}

        {/* Security Badge */}
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-r from-green-400 to-cyan-400 text-indigo-900 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 animate-pulse">
            <Shield className="w-4 h-4" />
            Secure Admin Portal
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6 md:p-8 animate-bounceIn">
          <div className="text-center mb-6 md:mb-8">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Key className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Admin Portal</h2>
            <p className="text-white/80 text-sm md:text-base">Secure access to management dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div className="group">
              <label className="block text-sm font-medium text-white/90 mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@college.edu.in"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/30 transition-all duration-200 text-sm md:text-base"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-sm font-medium text-white/90 mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-12 py-3 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/30 transition-all duration-200 text-sm md:text-base"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-white/60 hover:text-white transition-colors duration-200 p-1 rounded-md hover:bg-white/10"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="w-4 h-4 md:w-5 md:h-5" /> : <Eye className="w-4 h-4 md:w-5 md:h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-3 md:p-4 text-red-200 text-xs md:text-sm animate-fadeIn flex items-start gap-2 md:gap-3">
                <AlertCircle className="w-4 h-4 md:w-5 md:h-5 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-3 md:p-4 text-green-200 text-xs md:text-sm animate-fadeIn flex items-start gap-2 md:gap-3">
                <CheckCircle className="w-4 h-4 md:w-5 md:h-5 mt-0.5 flex-shrink-0" />
                <span>{success}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white py-3 md:py-4 px-4 md:px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 md:gap-3 relative overflow-hidden group text-sm md:text-base"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              {isLoading ? (
                <>
                  <Loader className="w-4 h-4 md:w-5 md:h-5 animate-spin z-10" />
                  <span className="z-10">Authenticating...</span>
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4 md:w-5 md:h-5 z-10" />
                  <span className="z-10">Access Dashboard</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 md:mt-8 p-3 md:p-4 bg-white/5 rounded-xl border border-white/10">
            <p className="text-white/80 text-xs md:text-sm mb-2 md:mb-3 font-medium flex items-center gap-2">
              <Key className="w-3 h-3 md:w-4 md:h-4" />
              Demo Credentials:
            </p>
            <div className="space-y-1 md:space-y-2 text-xs md:text-sm text-white/60">
              {adminCredentials.map((cred, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                  onClick={() => handleDemoCredentialClick(cred.email, cred.password)}
                >
                  <span className="truncate mr-2">{cred.email}</span>
                  <span className="text-white/40 shrink-0">admin123</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 md:mt-6 text-center">
            <p className="text-white/50 text-xs">
              For security reasons, please log out after your session
            </p>
          </div>
        </div>

        {/* Mobile bottom navigation */}
        <div className="mt-6 flex justify-center md:hidden">
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-200 p-3 rounded-xl bg-white/5 hover:bg-white/10"
            disabled={isLoading}
          >
            <Home className="w-5 h-5" />
            <span>Return Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;