import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleDummyLogin = () => {
    localStorage.setItem("isAuthenticated", "true");
    navigate("/");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0a23] to-[#1c1c3c] p-6">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl flex w-full max-w-md flex-col items-center p-8 space-y-6">
        {/* Logo */}
        <img src="/logo.jpg" alt="Obi‑Watch‑Kenobi Logo" className="w-35 h-35 mb-4" />

        {/* Login Form */}
        <h2 className="text-3xl font-bold text-white">Login</h2>
        <div className="w-full space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 rounded-full bg-purple-600 text-white placeholder-gray-300 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 rounded-full bg-purple-600 text-white placeholder-gray-300 focus:outline-none"
          />
          <button
            onClick={handleDummyLogin}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 rounded-full transition"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
