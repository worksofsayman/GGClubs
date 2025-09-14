import React, { useState } from 'react';
import { College, branches, StudentFormData, collegeImages } from '../types';
import { clubsData } from '../data';
import ClubCard from './ClubCard';
import { User, Mail, Phone, GraduationCap, Users, ArrowRight, MapPin, Star, Calendar, Award } from 'lucide-react';

const GAS_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzwbZGtncTtt11JbsEynw8sTqVAP73dZmonVvv203SgdFsqItkZl9IkC5TdWjipG7gR/exec';

const StudentForm: React.FC = () => {
  const [selectedCollege, setSelectedCollege] = useState<College>('GGITS');
  const [formData, setFormData] = useState<StudentFormData>({
    fullName: '',
    email: '',
    phoneNumber: '',
    branch: '',
    selectedClub: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const filteredClubs = clubsData.filter(club => club.collegeName === selectedCollege);
  const selectedClubData = clubsData.find(club => club.id === formData.selectedClub);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedClubData) {
      alert('Please select a valid club before submitting.');
      return;
    }

    setIsLoading(true);

    const postData = {
      fullName: formData.fullName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      branch: formData.branch,
      selectedCollege,
      selectedClub: selectedClubData.clubName
    };

    try {
      const response = await fetch(GAS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      });

      const result = await response.json();

      if (result.status === 'success') {
        window.open(selectedClubData.googleFormLink, '_blank');
        setFormData({ fullName: '', email: '', phoneNumber: '', branch: '', selectedClub: '' });
      } else {
        alert('Submission failed: ' + (result.message || 'Unknown error'));
      }
    } catch (err) {
      console.error('Submission failed:', err);
      alert('Failed to submit. Check console for details.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCollegeChange = (college: College) => {
    setSelectedCollege(college);
    setFormData(prev => ({ ...prev, selectedClub: '' }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-slideDown">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-sm mb-6">
            <MapPin className="w-5 h-5 text-blue-600" />
            <span className="text-gray-700 font-medium">Jabalpur, Madhya Pradesh, IN</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Discover Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">College Community</span>
          </h1>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto">
            Connect with like-minded students, explore your passions, and grow beyond the classroom
          </p>
        </div>

        {/* College Selection */}
        <div className="mb-12 animate-slideDown" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Select Your College</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(['GGITS', 'GGCT', 'GGCE'] as College[]).map((college) => (
              <div
                key={college}
                onClick={() => handleCollegeChange(college)}
                className={`relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-500 transform ${selectedCollege === college
                  ? 'ring-4 ring-blue-500 shadow-2xl scale-[1.02]'
                  : 'hover:shadow-xl hover:scale-[1.02]'
                  }`}
              >
                <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300">
                  <img
                    src={collegeImages[college]}
                    alt={`${college} Campus`}
                    className="w-full h-full object-cover transition-transform duration-700 scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  {selectedCollege === college && (
                    <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <Star className="w-4 h-4 fill-white" />
                      Selected
                    </div>
                  )}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{college}</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-white/90 text-sm">{filteredClubs.length} Active Clubs</p>
                    <span className="text-blue-200 text-sm font-medium flex items-center gap-1">
                      <Award className="w-4 h-4" />
                      Premium
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form + Club Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Form */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 animate-bounceIn" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Club Registration</h2>
            <p className="text-gray-600 mb-8">Join a community that matches your interests and aspirations</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <User className="w-4 h-4" /> Full Name
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                  placeholder="Enter your full name"
                  className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-gray-50/50 text-lg"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Mail className="w-4 h-4" /> Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="your.email@example.com"
                  className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-gray-50/50 text-lg"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Phone className="w-4 h-4" /> Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                  placeholder="+91 98765 43210"
                  className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-gray-50/50 text-lg"
                  required
                />
              </div>

              {/* Branch */}
              <div>
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" /> Branch
                </label>
                <select
                  value={formData.branch}
                  onChange={(e) => setFormData(prev => ({ ...prev, branch: e.target.value }))}
                  className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-gray-50/50 text-lg appearance-none"
                  required
                >
                  <option value="">Select Your Branch</option>
                  {branches.map(branch => <option key={branch} value={branch}>{branch}</option>)}
                </select>
              </div>

              {/* Club */}
              <div>
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Users className="w-4 h-4" /> Preferred Club
                </label>
                <select
                  value={formData.selectedClub}
                  onChange={(e) => setFormData(prev => ({ ...prev, selectedClub: e.target.value }))}
                  className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-gray-50/50 text-lg appearance-none"
                  required
                >
                  <option value="">Choose Your Club</option>
                  {filteredClubs.map(club => <option key={club.id} value={club.id}>{club.clubName}</option>)}
                </select>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading || !selectedClubData}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-5 px-8 rounded-2xl font-bold text-xl transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-4"
              >
                {isLoading ? 'Processing...' : <>
                  Join Now
                  <ArrowRight className="w-6 h-6" />
                </>}
              </button>
            </form>
          </div>

          {/* Club Card */}
          <div className="animate-fadeIn" style={{ animationDelay: '0.6s' }}>
            {selectedClubData ? <ClubCard club={selectedClubData} /> :
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 h-full flex flex-col justify-center text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-12 h-12 text-blue-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Explore Club Opportunities</h3>
                <p className="text-gray-600 mb-6">Select a club from the dropdown to discover its activities, events, and member benefits.</p>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>Regular events & workshops</span>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentForm;
