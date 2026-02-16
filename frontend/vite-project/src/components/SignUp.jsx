import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your sign-up logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="flex h-screen overflow-hidden font-sans">
      {/* Left Side - Branding & Spiderman Image */}
      <div className="w-1/2 bg-[#410200] flex flex-col items-center justify-center text-white overflow-hidden">
        {/* Added the Spiderman Image here */}
        <img 
          src="/Gwen-removebg-preview.png" 
          alt="Gwen" 
          className="absolute top-0 left-50 w-[380px] h-auto" 
        />
      </div>
      {/* Right Section - Sign Up Form */}
      <div className="flex-1 flex items-center justify-center p-10 overflow-y-auto" style={{ background: '#FFF1CF' }}>
        <div className="w-full max-w-[400px]">
          <h1 className="text-5xl font-semibold mb-10" style={{ color: '#2d1810' }}>
            Create Account
          </h1>

          <form onSubmit={handleSubmit}>
            {/* Name Fields */}
            <div className="flex gap-4 mb-0">
              <div className="flex-1 mb-6">
                <label className="block text-base font-medium mb-2" style={{ color: '#2d1810' }}>
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter first name"
                  className="w-full px-4 py-3.5 text-[15px] border-2 rounded-lg bg-white outline-none transition-all focus:shadow-lg"
                  style={{ 
                    borderColor: '#d4c5a9',
                    color: '#2d1810'
                  }}
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

              <div className="flex-1 mb-6">
                <label className="block text-base font-medium mb-2" style={{ color: '#2d1810' }}>
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter last name"
                  className="w-full px-4 py-3.5 text-[15px] border-2 rounded-lg bg-white outline-none transition-all focus:shadow-lg"
                  style={{ 
                    borderColor: '#d4c5a9',
                    color: '#2d1810'
                  }}
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
            </div>

            {/* Email */}
            <div className="mb-6">
              <label className="block text-base font-medium mb-2" style={{ color: '#2d1810' }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="w-full px-4 py-3.5 text-[15px] border-2 rounded-lg bg-white outline-none transition-all focus:shadow-lg"
                style={{ 
                  borderColor: '#d4c5a9',
                  color: '#2d1810'
                }}
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

            {/* Username */}
            <div className="mb-6">
              <label className="block text-base font-medium mb-2" style={{ color: '#2d1810' }}>
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter username"
                className="w-full px-4 py-3.5 text-[15px] border-2 rounded-lg bg-white outline-none transition-all focus:shadow-lg"
                style={{ 
                  borderColor: '#d4c5a9',
                  color: '#2d1810'
                }}
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

            {/* Password */}
            <div className="mb-6">
              <label className="block text-base font-medium mb-2" style={{ color: '#2d1810' }}>
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full px-4 py-3.5 text-[15px] border-2 rounded-lg bg-white outline-none transition-all focus:shadow-lg"
                style={{ 
                  borderColor: '#d4c5a9',
                  color: '#2d1810'
                }}
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

            {/* Confirm Password */}
            <div className="mb-6">
              <label className="block text-base font-medium mb-2" style={{ color: '#2d1810' }}>
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className="w-full px-4 py-3.5 text-[15px] border-2 rounded-lg bg-white outline-none transition-all focus:shadow-lg"
                style={{ 
                  borderColor: '#d4c5a9',
                  color: '#2d1810'
                }}
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

            {/* Sign Up Button */}
            <button 
              type="submit" 
              className="w-full py-4 text-base font-semibold text-white border-none rounded-lg cursor-pointer transition-all mt-2 hover:opacity-90"
              style={{ background: '#410200' }}
            >
              Sign Up
            </button>

            {/* Login Link */}
            <div className="text-center mt-6 text-[15px]" style={{ color: '#5c5c5c' }}>
              Already have an account?{' '}
              <span 
                onClick={() => navigate('/login')} 
                className="font-semibold underline cursor-pointer hover:opacity-80"
                style={{ color: '#2d1810' }}
              >
                Log In
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}