import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check localStorage on mount
  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    if (auth === 'true') setIsAuthenticated(true);
  }, []);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#0a0a23] to-[#1c1c3c] text-white">
      {/* Logo */}
      <img src="public/logo.jpg" alt="Obi‑Watch‑Kenobi Logo" className="w-50 h-50 mb-6" />

      {/* Header / Title */}
      <h1 className="text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
        Obi‑Watch‑Kenobi
      </h1>
      <p className="text-xl text-gray-300 max-w-xl text-center mb-10">
        A modern SIEM system powered by AI‑driven detection, live visualization, and threat intelligence.
      </p>

      {/* Action Buttons */}
      {!isAuthenticated ? (
        <button
          onClick={handleLogin}
          className="flex items-center px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-medium transition"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h14M12 5l7 7-7 7"
            />
          </svg>
          Sign In to Get Started
        </button>
      ) : (
        <div className="flex space-x-4">
          <Link
            to="/dashboard"
            className="inline-flex items-center px-8 py-3 bg-green-600 hover:bg-green-700 rounded-lg text-lg font-medium transition"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 17v-6h6v6m2 4H7a2 2 0 01-2-2V7a2 2 0 012-2h5l2 2h5a2 2 0 012 2v10a2 2 0 01-2 2z"
              />
            </svg>
            Go to Dashboard
          </Link>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-lg font-medium transition"
          >
            Logout
          </button>
        </div>
      )}

      {/* Footer */}
      <footer className="absolute bottom-4 text-sm text-gray-500 text-center w-full">
        © 2025 Obi‑Watch‑Kenobi by Proskywalker, Honurag Hottacharjee, and Holy Father Riyal Pope.
      </footer>
    </div>
  );
}

export default Home;
