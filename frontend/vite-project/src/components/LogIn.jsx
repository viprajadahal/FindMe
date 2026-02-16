import React, { useState } from 'react';

export default function FindMeLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Login attempt:', { username, password });
  };

  return (
    <div className="flex h-screen">
      {/* Left Side - Branding & Spiderman Image */}
      <div className="w-1/2 bg-[#410200] flex flex-col items-center justify-center text-white overflow-hidden">
        {/* Added the Spiderman Image here */}
        <img 
          src="/Spiderman-removebg-preview.png" 
          alt="Spiderman" 
          className="max-w-[70%] h-auto shadow-2xl rounded-2xl" 
        />
      </div>
       

      {/* Right Side - Login Form */}
      <div className="w-1/2 bg-[#FFF1CF] flex flex-col items-center justify-center px-16">
        <div className="w-full max-w-md">
          <h2 className="text-5xl font-bold text-[#410200] mb-12">Welcome Back</h2>
          
          {/* Username Field */}
          <div className="mb-6">
            <label className="block text-[#410200] text-lg font-semibold mb-3">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full px-6 py-4 rounded-xl border-2 border-gray-300 bg-white text-gray-600 placeholder-gray-400 focus:outline-none focus:border-[#410200] transition-colors"
            />
          </div>

          {/* Password Field */}
          <div className="mb-8">
            <label className="block text-[#410200] text-lg font-semibold mb-3">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-6 py-4 rounded-xl border-2 border-gray-300 bg-white text-gray-600 placeholder-gray-400 focus:outline-none focus:border-[#410200] transition-colors"
            />
          </div>

          {/* Log In Button */}
          <button
            onClick={handleLogin}
            className="w-full bg-[#410200] text-white text-xl font-semibold py-4 rounded-xl hover:bg-[#2D0100] transition-colors mb-8"
          >
            Log In
          </button>

          {/* Create Account Link */}
          <p className="text-center text-lg text-gray-700">
            New here?{' '}
            <a href="#" className="text-[#410200] font-bold underline hover:text-[#2D0100]">
              Create Account
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}