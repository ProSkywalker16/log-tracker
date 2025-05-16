import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleDummyLogin = async () =>{
    localStorage.setItem("isAuthenticated", "true");
    const formData = new FormData();
    formData.append("email", email);
    formData.append("pwd", password);
    response = axios.post(
      "http://192.168.0.170:5000/login",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "Accept": "application/json",
        },
      }
    ).then((res) => {
      const data = res.data;
      if (data.access_token){
        localStorage.setItem("access_token", data.access_token);
        alert('Login successful.');
        navigate("/");
      }
      else{
        alert("Unidentified error");
      }
    }).catch((error) => {
      if (error.response) {
        alert(`${error.response.status}: ${error.response.data.msg}`);
      } 
      else if (error.request) {
        alert('No Responsor From Server')
      } 
      else {
        alert('Error in request')
      }
    });
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
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-full bg-purple-600 text-white placeholder-gray-300 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
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
