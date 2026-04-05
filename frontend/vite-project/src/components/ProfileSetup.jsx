import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Generates a consistent color from a number
const getAvatarColor = (num) => {
  const colors = ['#410200', '#7B2D00', '#1A3A4A', '#2D4A1A', '#3A1A4A'];
  return colors[num % colors.length];
};

export default function ProfileSetup() {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [avatarNumber, setAvatarNumber] = useState(null);
  const [profileData, setProfileData] = useState({
    birthdate: '',
    gender: '',
    location: '',
    bio: '',
    passions: [],
    lookingFor: '',
  });

  const [selectedPassions, setSelectedPassions] = useState([]);

  // Assign a random anonymous number on mount
  useEffect(() => {
    const num = Math.floor(Math.random() * 9999) + 1;
    setAvatarNumber(num);
  }, []);

  const availablePassions = [
    'Music', 'Art', 'Photography', 'Travel', 'Fitness', 'Cooking',
    'Reading', 'Gaming', 'Sports', 'Technology', 'Fashion', 'Movies',
    'Writing', 'Dancing', 'Nature', 'Pets', 'Food', 'Coffee',
    'Wine', 'Hiking', 'Yoga', 'Meditation', 'Volunteering', 'Activism'
  ];

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const togglePassion = (passion) => {
    if (selectedPassions.includes(passion)) {
      setSelectedPassions(selectedPassions.filter(p => p !== passion));
    } else if (selectedPassions.length < 10) {
      setSelectedPassions([...selectedPassions, passion]);
    }
  };

  const handleNext = () => { if (currentStep < 3) setCurrentStep(currentStep + 1); };
  const handleBack = () => { if (currentStep > 1) setCurrentStep(currentStep - 1); };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile:', { ...profileData, passions: selectedPassions, avatarNumber });
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: '#FFF1CF' }}>
      <div className="w-full max-w-2xl">

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`flex-1 h-2 rounded-full mx-1 transition-all ${step <= currentStep ? 'opacity-100' : 'opacity-30'}`}
                style={{ background: '#410200' }}
              />
            ))}
          </div>
          <p className="text-sm text-center mt-2" style={{ color: '#2d1810' }}>
            Step {currentStep} of 3
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit}>

            {/* STEP 1: Basic Info */}
            {currentStep === 1 && (
              <div>
                <h2 className="text-3xl font-bold mb-2" style={{ color: '#410200' }}>
                  Tell us about yourself
                </h2>
                <p className="text-sm mb-6" style={{ color: '#5c5c5c' }}>Let's start with the basics</p>

                {/* Birthdate */}
                <div className="mb-5">
                  <label className="block text-sm font-medium mb-2" style={{ color: '#2d1810' }}>Date of Birth</label>
                  <input type="date" name="birthdate" value={profileData.birthdate} onChange={handleChange}
                    className="w-full px-4 py-3 text-sm border-2 rounded-lg bg-white outline-none"
                    style={{ borderColor: '#d4c5a9', color: '#2d1810' }} required />
                </div>

                {/* Gender */}
                <div className="mb-5">
                  <label className="block text-sm font-medium mb-2" style={{ color: '#2d1810' }}>Gender</label>
                  <select name="gender" value={profileData.gender} onChange={handleChange}
                    className="w-full px-4 py-3 text-sm border-2 rounded-lg bg-white outline-none"
                    style={{ borderColor: '#d4c5a9', color: '#2d1810' }} required>
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="non-binary">Non-binary</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>

                {/* Location */}
                <div className="mb-5">
                  <label className="block text-sm font-medium mb-2" style={{ color: '#2d1810' }}>Location</label>
                  <input type="text" name="location" value={profileData.location} onChange={handleChange}
                    placeholder="City, Country"
                    className="w-full px-4 py-3 text-sm border-2 rounded-lg bg-white outline-none"
                    style={{ borderColor: '#d4c5a9', color: '#2d1810' }} required />
                </div>

                {/* Bio */}
                <div className="mb-5">
                  <label className="block text-sm font-medium mb-2" style={{ color: '#2d1810' }}>About You</label>
                  <textarea name="bio" value={profileData.bio} onChange={handleChange}
                    placeholder="Tell us a bit about yourself..." rows="4"
                    className="w-full px-4 py-3 text-sm border-2 rounded-lg bg-white outline-none resize-none"
                    style={{ borderColor: '#d4c5a9', color: '#2d1810' }} required />
                  <p className="text-xs mt-1" style={{ color: '#5c5c5c' }}>{profileData.bio.length}/500 characters</p>
                </div>
              </div>
            )}

            {/* STEP 2: Anonymous Avatar */}
            {currentStep === 2 && (
              <div>
                <h2 className="text-3xl font-bold mb-2" style={{ color: '#410200' }}>
                  Your anonymous identity
                </h2>
                <p className="text-sm mb-6" style={{ color: '#5c5c5c' }}>
                  No photos needed — you get a unique avatar automatically
                </p>

                <div className="flex flex-col items-center gap-4 p-6 rounded-xl mb-4"
                  style={{ background: '#fff8ee', border: '1px solid #e0d5c0' }}>

                  {/* Avatar Circle */}
                  <div
                    className="w-24 h-24 rounded-full flex items-center justify-center text-white text-2xl font-bold"
                    style={{ background: getAvatarColor(avatarNumber) }}
                  >
                    #{avatarNumber}
                  </div>

                  <p className="text-sm text-center" style={{ color: '#5c5c5c' }}>
                    This is your anonymous avatar. Your identity stays private.<br />
                    No one will see your real name or photo.
                  </p>
                </div>

                <p className="text-xs text-center" style={{ color: '#5c5c5c' }}>
                  Your number is assigned randomly and cannot be changed.
                </p>
              </div>
            )}

            {/* STEP 3: Passions */}
            {currentStep === 3 && (
              <div>
                <h2 className="text-3xl font-bold mb-2" style={{ color: '#410200' }}>
                  What are you passionate about?
                </h2>
                <p className="text-sm mb-6" style={{ color: '#5c5c5c' }}>
                  Select up to 10 interests
                </p>

                <div className="flex flex-wrap gap-2 mb-3">
                  {availablePassions.map((passion) => (
                    <button
                      key={passion}
                      type="button"
                      onClick={() => togglePassion(passion)}
                      className="px-4 py-2 rounded-full text-sm font-medium transition-all"
                      style={{
                        background: selectedPassions.includes(passion) ? '#410200' : 'white',
                        color: selectedPassions.includes(passion) ? 'white' : '#2d1810',
                        border: `2px solid ${selectedPassions.includes(passion) ? '#410200' : '#d4c5a9'}`,
                      }}
                    >
                      {passion}
                    </button>
                  ))}
                </div>
                <p className="text-xs mb-8" style={{ color: '#5c5c5c' }}>{selectedPassions.length}/10 selected</p>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#2d1810' }}>
                    What are you looking for?
                  </label>
                  <textarea name="lookingFor" value={profileData.lookingFor} onChange={handleChange}
                    placeholder="I'm looking to connect with people who..." rows="3"
                    className="w-full px-4 py-3 text-sm border-2 rounded-lg bg-white outline-none resize-none"
                    style={{ borderColor: '#d4c5a9', color: '#2d1810' }} />
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex gap-3 mt-8">
              {currentStep > 1 && (
                <button type="button" onClick={handleBack}
                  className="flex-1 py-3 rounded-lg font-medium border-2 transition-all"
                  style={{ borderColor: '#410200', color: '#410200', background: 'white' }}>
                  Back
                </button>
              )}
              {currentStep < 3 ? (
                <button type="button" onClick={handleNext}
                  className="flex-1 py-3 rounded-lg font-medium text-white"
                  style={{ background: '#410200' }}>
                  Continue
                </button>
              ) : (
                <button type="submit"
                  className="flex-1 py-3 rounded-lg font-medium text-white"
                  style={{ background: '#410200' }}>
                  Complete Profile
                </button>
              )}
            </div>

            {currentStep < 3 && (
              <button type="button" onClick={() => navigate('/home')}
                className="w-full mt-4 text-sm underline"
                style={{ color: '#5c5c5c' }}>
                Skip for now
              </button>
            )}

          </form>
        </div>
      </div>
    </div>
  );
}