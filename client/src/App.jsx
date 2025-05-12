import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Register from '../pages/Register'
import Home from '../pages/Home';
import MainLayout from '../layout/MainLayout';
import Database from '../pages/Database';
import Settings from '../pages/Settings';
import React from 'react';

// Route guard component
const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/dashboard',
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        )
      },
      {
        path: '/database',
        element: (
          <PrivateRoute>
            <Database />
          </PrivateRoute>
        )
      },
      {
        path: '/settings',
        element: (
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        )
      }
    ]
	},
  {
    path: '/register',
    element: <Register />
  }
]);


function App() {
  return (
    <main>
      <RouterProvider router={appRouter} />
    </main>
  );
}

export default App;
