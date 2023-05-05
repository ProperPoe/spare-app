
import './App.css';
import { createBrowserRouter, Navigate, Outlet, RouterProvider, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query"
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Notifications from './components/Notifications/Notifications';

function App() {

  const { currentUser } = useContext(AuthContext)
  
  const client = new QueryClient()

  const ProtectedRoute = ({children}) => {
    if(!currentUser){
      return <Navigate to="/login" />
    }
    return children
  }

  const Layout = () => {
    return (
      <QueryClientProvider client={client}>
        <div>
          <Navbar />
          <Outlet />
        </div>
      </QueryClientProvider>
    )
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute><Layout /></ProtectedRoute>,
      children:[
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
        {
          path: "/notifications/:id",
          element: <Notifications />,
        }
      ]
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/register",
      element: <Register />
    },
  ])
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
