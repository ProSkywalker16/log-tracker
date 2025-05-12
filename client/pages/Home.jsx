import React, { useState, useEffect } from 'react'

function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check localStorage on component mount
  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated')
    if (storedAuth === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = () => {
    localStorage.setItem('isAuthenticated', 'true')
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    setIsAuthenticated(false)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white">
        <img src="/logo.jpg" alt="" className="h-96" />
        <h1 className="text-4xl font-bold mb-4">Welcome to Obi Watch Kenobi</h1>
        <p className="mb-6 text-gray-400">Track logs like never before.</p>
        <button
          onClick={handleLogin}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded"
        >
          Sign In
        </button>
      </div>
    )
  }

  return (
    <div className="w-full text-white min-h-screen">
      <main className="sm:ml-28 p-5 rounded shadow-md">
        <div className="flex justify-between items-center">
          <p className="text-lg">Welcome back, user!</p>
          <button
            onClick={handleLogout}
            className="px-4 py-1 bg-red-600 hover:bg-red-700 rounded"
          >
            Logout
          </button>
        </div>

        <footer className="text-center text-sm text-slate-400 mt-10">
          &copy; 2025 Log Tracker by Peter Sorkar Magi Baji Corporation (Peter Sorkar is Part Time Vigilante in DHORMOTALA - BALLYGUNGE area). All rights reserved. (Peter Sorkar Bou Dorkar).
        </footer>
      </main>
    </div>
  )
}

export default Home
