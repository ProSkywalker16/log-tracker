import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextHoverEffect } from '../components/ui/text-hover-effect';
import { WavyBackground } from '../components/ui/wavy-background';
import { TypewriterEffectSmooth } from '../components/ui/typewriter-effect';

function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const words = [
    { text: "A" }, { text: "modern" }, { text: "SIEM" },
    { text: "system" }, { text: "powered" }, { text: "by" },
    { text: "AI-Driver" }, { text: "detection" }, { text: "live" },
    { text: "visualization" }, { text: "and" }, { text: "threat" },
    { text: "intelligence" }
  ];

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(auth === 'true');
  }, []);

  const handleLogin = () => navigate('/login');
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center p-6 bg-black text-white overflow-hidden">
      {isAuthenticated ? (
        // ============ LOGGED IN PAGE ============
        <div className="flex flex-col items-center w-full">
            <div className="flex flex-col items-center">
              <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
              <div className="flex space-x-4">
                <Link
                  to="/dashboard"
                  className="px-8 py-3 bg-green-600 hover:bg-green-700 rounded-lg text-lg font-medium"
                >
                  Go to Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg text-lg font-medium"
                >
                  Logout
                </button>
              </div>
            </div>


          <footer className="absolute bottom-4 text-sm text-gray-500 text-center w-full">
            <TextHoverEffect text="OBI WATCH KENOBI" />
            <p>© 2025 Obi‑Watch‑Kenobi by Proskywalker, Honurag Hottacharjee, and Holy Father Riyal Pope.</p>
          </footer>
        </div>
      ) : (
        // ============ LOGGED OUT PAGE ============
        <div className="flex flex-col items-center w-full">
          <WavyBackground className="max-w-4xl mx-auto pb-40">
            <div className="flex flex-col items-center">
              <img src="public/logo.png" alt="Obi‑Watch‑Kenobi Logo" className="w-40 h-40 mb-6" />
              <div className="w-full mb-6">
                <TypewriterEffectSmooth words={words} />
              </div>
              <button
                onClick={handleLogin}
                className="flex items-center px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-medium"
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
            </div>
          </WavyBackground>

          <footer className="absolute bottom-4 text-sm text-gray-500 text-center w-full">
            <TextHoverEffect text="OBI WATCH KENOBI" />
            <p>© 2025 Obi‑Watch‑Kenobi by Proskywalker, Honurag Hottacharjee, and Holy Father Riyal Pope.</p>
          </footer>
        </div>
      )}
    </div>
  );
}

export default Home;
