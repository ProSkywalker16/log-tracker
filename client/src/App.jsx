import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'

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