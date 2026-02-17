import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProfileSetup() {
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [profileData, setProfileData] = useState({
    // Basic Info
    birthdate: '',
    gender: '',
    location: '',
    bio: '',
    
    // Photos
    profilePhoto: null,
    additionalPhotos: [],
    
    // Interests/Passions
    passions: [],
    lookingFor: [],
  });

  const [photoPreview, setPhotoPreview] = useState(null);
  const [additionalPreviews, setAdditionalPreviews] = useState([]);
  const [selectedPassions, setSelectedPassions] = useState([]);

  // Predefined passions
  const availablePassions = [
    'Music', 'Art', 'Photography', 'Travel', 'Fitness', 'Cooking',
    'Reading', 'Gaming', 'Sports', 'Technology', 'Fashion', 'Movies',
    'Writing', 'Dancing', 'Nature', 'Pets', 'Food', 'Coffee',
    'Wine', 'Hiking', 'Yoga', 'Meditation', 'Volunteering', 'Activism'
  ];

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileData({ ...profileData, profilePhoto: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdditionalPhotos = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = [];
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result);
        if (newPreviews.length === files.length) {
          setAdditionalPreviews([...additionalPreviews, ...newPreviews]);
        }
      };
      reader.readAsDataURL(file);
    });

    setProfileData({
      ...profileData,
      additionalPhotos: [...profileData.additionalPhotos, ...files]
    });
  };

  const removeAdditionalPhoto = (index) => {
    const newPhotos = profileData.additionalPhotos.filter((_, i) => i !== index);
    const newPreviews = additionalPreviews.filter((_, i) => i !== index);
    setProfileData({ ...profileData, additionalPhotos: newPhotos });
    setAdditionalPreviews(newPreviews);
  };

  const togglePassion = (passion) => {
    if (selectedPassions.includes(passion)) {
      setSelectedPassions(selectedPassions.filter(p => p !== passion));
    } else if (selectedPassions.length < 10) {
      setSelectedPassions([...selectedPassions, passion]);
    }
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile data:', { ...profileData, passions: selectedPassions });
    // Navigate to main app or home page
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
                className={`flex-1 h-2 rounded-full mx-1 transition-all ${
                  step <= currentStep ? 'opacity-100' : 'opacity-30'
                }`}
                style={{ background: '#410200' }}
              />
            ))}
          </div>
          <p className="text-sm text-center mt-2" style={{ color: '#2d1810' }}>
            Step {currentStep} of 3
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit}>
            
            {/* STEP 1: Basic Info */}
            {currentStep === 1 && (
              <div>
                <h2 className="text-3xl font-bold mb-2" style={{ color: '#410200' }}>
                  Tell us about yourself
                </h2>
                <p className="text-sm mb-6" style={{ color: '#5c5c5c' }}>
                  Let's start with the basics
                </p>

                {/* Birthdate */}
                <div className="mb-5">
                  <label className="block text-sm font-medium mb-2" style={{ color: '#2d1810' }}>
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="birthdate"
                    value={profileData.birthdate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-sm border-2 rounded-lg bg-white outline-none transition-all"
                    style={{ borderColor: '#d4c5a9', color: '#2d1810' }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#410200';
                      e.target.style.boxShadow = '0 0 0 3px rgba(65, 2, 0, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#d4c5a9';
                      e.target.style.boxShadow = 'none';
                    }}
                    required
                  />
                </div>

                {/* Gender */}
                <div className="mb-5">
                  <label className="block text-sm font-medium mb-2" style={{ color: '#2d1810' }}>
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={profileData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-sm border-2 rounded-lg bg-white outline-none transition-all"
                    style={{ borderColor: '#d4c5a9', color: '#2d1810' }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#410200';
                      e.target.style.boxShadow = '0 0 0 3px rgba(65, 2, 0, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#d4c5a9';
                      e.target.style.boxShadow = 'none';
                    }}
                    required
                  >
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
                  <label className="block text-sm font-medium mb-2" style={{ color: '#2d1810' }}>
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={profileData.location}
                    onChange={handleChange}
                    placeholder="City, Country"
                    className="w-full px-4 py-3 text-sm border-2 rounded-lg bg-white outline-none transition-all"
                    style={{ borderColor: '#d4c5a9', color: '#2d1810' }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#410200';
                      e.target.style.boxShadow = '0 0 0 3px rgba(65, 2, 0, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#d4c5a9';
                      e.target.style.boxShadow = 'none';
                    }}
                    required
                  />
                </div>

                {/* Bio */}
                <div className="mb-5">
                  <label className="block text-sm font-medium mb-2" style={{ color: '#2d1810' }}>
                    About You
                  </label>
                  <textarea
                    name="bio"
                    value={profileData.bio}
                    onChange={handleChange}
                    placeholder="Tell us a bit about yourself..."
                    rows="4"
                    className="w-full px-4 py-3 text-sm border-2 rounded-lg bg-white outline-none transition-all resize-none"
                    style={{ borderColor: '#d4c5a9', color: '#2d1810' }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#410200';
                      e.target.style.boxShadow = '0 0 0 3px rgba(65, 2, 0, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#d4c5a9';
                      e.target.style.boxShadow = 'none';
                    }}
                    required
                  />
                  <p className="text-xs mt-1" style={{ color: '#5c5c5c' }}>
                    {profileData.bio.length}/500 characters
                  </p>
                </div>
              </div>
            )}

            {/* STEP 2: Photos */}
            {currentStep === 2 && (
              <div>
                <h2 className="text-3xl font-bold mb-2" style={{ color: '#410200' }}>
                  Add your photos
                </h2>
                <p className="text-sm mb-6" style={{ color: '#5c5c5c' }}>
                  Show the world who you are
                </p>

                {/* Profile Photo */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-3" style={{ color: '#2d1810' }}>
                    Profile Photo
                  </label>
                  <div className="flex items-center gap-4">
                    {photoPreview ? (
                      <div className="relative">
                        <img
                          src={photoPreview}
                          alt="Profile preview"
                          className="w-32 h-32 rounded-full object-cover border-4"
                          style={{ borderColor: '#410200' }}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setPhotoPreview(null);
                            setProfileData({ ...profileData, profilePhoto: null });
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <div 
                        className="w-32 h-32 rounded-full border-4 border-dashed flex items-center justify-center cursor-pointer hover:opacity-80"
                        style={{ borderColor: '#410200' }}
                        onClick={() => document.getElementById('profilePhoto').click()}
                      >
                        <span className="text-4xl" style={{ color: '#410200' }}>+</span>
                      </div>
                    )}
                    <input
                      id="profilePhoto"
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePhotoChange}
                      className="hidden"
                    />
                    <div>
                      <button
                        type="button"
                        onClick={() => document.getElementById('profilePhoto').click()}
                        className="px-6 py-2 rounded-lg font-medium text-white transition-all hover:opacity-90"
                        style={{ background: '#410200' }}
                      >
                        {photoPreview ? 'Change Photo' : 'Upload Photo'}
                      </button>
                      <p className="text-xs mt-2" style={{ color: '#5c5c5c' }}>
                        JPG, PNG or GIF (Max 5MB)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Additional Photos */}
                <div className="mb-5">
                  <label className="block text-sm font-medium mb-3" style={{ color: '#2d1810' }}>
                    More Photos (Optional)
                  </label>
                  <div className="grid grid-cols-4 gap-3 mb-3">
                    {additionalPreviews.map((preview, index) => (
                      <div key={index} className="relative">
                        <img
                          src={preview}
                          alt={`Additional ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeAdditionalPhoto(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    {additionalPreviews.length < 5 && (
                      <div
                        className="w-full h-24 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:opacity-80"
                        style={{ borderColor: '#410200' }}
                        onClick={() => document.getElementById('additionalPhotos').click()}
                      >
                        <span className="text-2xl" style={{ color: '#410200' }}>+</span>
                      </div>
                    )}
                  </div>
                  <input
                    id="additionalPhotos"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleAdditionalPhotos}
                    className="hidden"
                  />
                  <p className="text-xs" style={{ color: '#5c5c5c' }}>
                    Add up to 5 photos
                  </p>
                </div>
              </div>
            )}

            {/* STEP 3: Passions */}
            {currentStep === 3 && (
              <div>
                <h2 className="text-3xl font-bold mb-2" style={{ color: '#410200' }}>
                  What are you passionate about?
                </h2>
                <p className="text-sm mb-6" style={{ color: '#5c5c5c' }}>
                  Select up to 10 interests to connect with like-minded people
                </p>

                <div className="mb-5">
                  <div className="flex flex-wrap gap-2">
                    {availablePassions.map((passion) => (
                      <button
                        key={passion}
                        type="button"
                        onClick={() => togglePassion(passion)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          selectedPassions.includes(passion)
                            ? 'text-white'
                            : 'bg-white text-gray-700 hover:opacity-80'
                        }`}
                        style={{
                          background: selectedPassions.includes(passion) ? '#410200' : 'white',
                          border: `2px solid ${selectedPassions.includes(passion) ? '#410200' : '#d4c5a9'}`,
                        }}
                      >
                        {passion}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs mt-3" style={{ color: '#5c5c5c' }}>
                    {selectedPassions.length}/10 selected
                  </p>
                </div>

                {/* What are you looking for */}
                <div className="mb-5 mt-8">
                  <label className="block text-sm font-medium mb-2" style={{ color: '#2d1810' }}>
                    What are you looking for?
                  </label>
                  <textarea
                    name="lookingFor"
                    value={profileData.lookingFor}
                    onChange={handleChange}
                    placeholder="I'm looking to connect with people who..."
                    rows="3"
                    className="w-full px-4 py-3 text-sm border-2 rounded-lg bg-white outline-none transition-all resize-none"
                    style={{ borderColor: '#d4c5a9', color: '#2d1810' }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#410200';
                      e.target.style.boxShadow = '0 0 0 3px rgba(65, 2, 0, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#d4c5a9';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-3 mt-8">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex-1 py-3 rounded-lg font-medium border-2 transition-all hover:opacity-80"
                  style={{ 
                    borderColor: '#410200',
                    color: '#410200',
                    background: 'white'
                  }}
                >
                  Back
                </button>
              )}
              
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 py-3 rounded-lg font-medium text-white transition-all hover:opacity-90"
                  style={{ background: '#410200' }}
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-lg font-medium text-white transition-all hover:opacity-90"
                  style={{ background: '#410200' }}
                >
                  Complete Profile
                </button>
              )}
            </div>

            {/* Skip for now */}
            {currentStep < 3 && (
              <button
                type="button"
                onClick={() => navigate('/home')}
                className="w-full mt-4 text-sm underline hover:opacity-80"
                style={{ color: '#5c5c5c' }}
              >
                Skip for now
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}