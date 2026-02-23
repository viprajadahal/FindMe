import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your password reset logic here
    console.log('Reset requested for:', email);
    setResetSent(true);
  };

  const inputFocus = (e) => {
    e.target.style.borderColor = '#410200';
    e.target.style.boxShadow = '0 0 0 3px rgba(65, 2, 0, 0.1)';
  };

  const inputBlur = (e) => {
    e.target.style.borderColor = '#d4c5a9';
    e.target.style.boxShadow = 'none';
  };

  return (
    <div className="flex h-screen">
      {/* Left Side - Branding & Spiderman Image */}
      <div className="w-1/2 bg-[#410200] flex flex-col items-center justify-center text-white overflow-hidden">
      </div>

      {/* Right Section */}
      <div className="flex-1 flex items-center justify-center p-10" style={{ background: '#FFF1CF' }}>
        <div className="w-full max-w-[400px]">

          {!resetSent ? (
            <>
              {/* Back to Login */}
              <button
                onClick={() => navigate('/login')}
                className="flex items-center gap-2 text-sm font-medium mb-8 hover:opacity-70 transition-opacity"
                style={{ color: '#410200', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                ← Back to Login
              </button>

              <h1 className="text-5xl font-semibold mb-3" style={{ color: '#2d1810' }}>
                Forgot Password?
              </h1>
              <p className="text-sm mb-10" style={{ color: '#5c5c5c' }}>
                No worries! Enter your email address below and we'll send you a link to reset your password.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-base font-medium mb-2" style={{ color: '#2d1810' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3.5 text-[15px] border-2 rounded-lg bg-white outline-none transition-all"
                    style={{ borderColor: '#d4c5a9', color: '#2d1810' }}
                    onFocus={inputFocus}
                    onBlur={inputBlur}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 text-base font-semibold text-white border-none rounded-lg cursor-pointer transition-all hover:opacity-90"
                  style={{ background: '#410200' }}
                >
                  Send Reset Link
                </button>
              </form>
            </>
          ) : (
            /* Success State */
            <>
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-8 text-3xl"
                style={{ background: 'rgba(65,2,0,0.1)', color: '#410200' }}
              >
                ✉
              </div>

              <h1 className="text-5xl font-semibold mb-3" style={{ color: '#2d1810' }}>
                Check Your Email
              </h1>
              <p className="text-sm mb-10" style={{ color: '#5c5c5c' }}>
                We've sent a password reset link to{' '}
                <span className="font-semibold" style={{ color: '#2d1810' }}>{email}</span>.
                Check your inbox and follow the instructions.
              </p>

              <button
                onClick={() => navigate('/login')}
                className="w-full py-4 text-base font-semibold text-white border-none rounded-lg cursor-pointer transition-all hover:opacity-90"
                style={{ background: '#410200' }}
              >
                Back to Login
              </button>

              <p className="text-center mt-6 text-sm" style={{ color: '#5c5c5c' }}>
                Didn't receive the email?{' '}
                <span
                  onClick={() => setResetSent(false)}
                  className="font-semibold underline cursor-pointer hover:opacity-80"
                  style={{ color: '#2d1810' }}
                >
                  Try again
                </span>
              </p>
            </>
          )}

        </div>
      </div>
    </div>
  );
}