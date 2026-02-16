import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LogIn() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Login submitted:', formData);
  };

  return (
    <div className="flex h-screen">
       {/* Left Side - Branding & Spiderman Image */}
      <div className="w-1/2 bg-[#410200] flex flex-col items-center justify-center text-white overflow-hidden">
        {/* Added the Spiderman Image here */}
        <img 
          src="/Spiderman-removebg-preview.png" 
          alt="Spiderman" 
          className="absolute top-0 left-144 w-[380px] h-auto"  
        />
      </div>

      {/* Right Section - Login Form */}
      <div className="flex-1 flex items-center justify-center p-10" style={{ background: '#FFF1CF' }}>
        <div className="w-full max-w-[400px]">
          <h1 className="text-5xl font-semibold mb-10" style={{ color: '#2d1810' }}>
            Welcome Back
          </h1>

          <form onSubmit={handleSubmit}>
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

            {/* Log In Button */}
            <button 
              type="submit" 
              className="w-full py-4 text-base font-semibold text-white border-none rounded-lg cursor-pointer transition-all mt-2 hover:opacity-90"
              style={{ background: '#410200' }}
            >
              Log In
            </button>

            {/* Sign Up Link */}
            <div className="text-center mt-6 text-[15px]" style={{ color: '#5c5c5c' }}>
              New here?{' '}
              <span 
                onClick={() => navigate('/signup')} 
                className="font-semibold underline cursor-pointer hover:opacity-80"
                style={{ color: '#2d1810' }}
              >
                Create Account
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}