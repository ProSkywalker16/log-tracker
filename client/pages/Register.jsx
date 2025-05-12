import React, { useEffect, useState, useRef } from "react";

const Register = () => {
    return (
        <>
            <div className="h-screen flex items-center justify-center">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl flex w-1/2 max-w-full h-7/10">
                {/* Left Side */}
                <div className="w-1/3 bg-white/20 backdrop-blur-md rounded-tl-2xl rounded-bl-2xl flex flex-col items-center justify-center p-6 text-white">
                    <h2 className="text-2xl font-bold mb-2">Welcome Back!</h2>
                    <p className="mb-6 text-sm">Already have an account?</p>
                    <button className="bg-purple-500 hover:bg-purple-600 px-6 py-2 rounded-lg font-semibold transition">
                        Log in
                    </button>
                </div>

                {/* Right Side */}
                <div className="w-2/3 bg-transparent flex flex-col items-center justify-center p-6">
                    <h2 className="text-2xl font-bold text-white mb-4">Create Account</h2>

                    {/* Social Icons */}
                    <div className="flex space-x-4 mb-6">
                        <img
                            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                            alt="Google"
                            className="w-8 h-8 bg-white rounded-full p-1 cursor-pointer"
                        />
                        <img
                            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                            alt="GitHub"
                            className="w-8 h-8 bg-white rounded-full p-1 cursor-pointer"
                        />
                        <img
                            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg"
                            alt="LinkedIn"
                            className="w-8 h-8 bg-white rounded-full p-1 cursor-pointer"
                        />
                    </div>

                    {/* Form */}
                    <div className="w-full max-w-xs">
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full mb-4 px-4 py-2 rounded-full bg-purple-600 text-white placeholder-gray-300 focus:outline-none"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full mb-4 px-4 py-2 rounded-full bg-purple-600 text-white placeholder-gray-300 focus:outline-none"
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="w-full mb-6 px-4 py-2 rounded-full bg-purple-600 text-white placeholder-gray-300 focus:outline-none"
                        />
                        <button className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 rounded-lg transition">
                            Sign up
                        </button>
                    </div>
                </div>
            </div>
            </div>

        </>
    );
};

export default Register;