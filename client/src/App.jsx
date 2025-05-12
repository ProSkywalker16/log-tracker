import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Register from '../pages/Register'

const appRouter = createBrowserRouter([
	{
		path: '/',
		element: <Dashboard />,
    children: [
      {
        path: '/dashboard',
        element: 
          <>
            <Dashboard />
          </>
      },
    ]
	},
  {
    path: '/register',
    element: <Register />
  }
])


function App() {
  return (
    <>
      <main>
        <RouterProvider router={appRouter} />
      </main>
    </>
  )
}

export default App