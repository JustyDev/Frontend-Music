import { createBrowserRouter } from 'react-router-dom'
import { Clean } from '../shared/ui/templates/Clean'
import { Register } from '../pages/Register'
import { Login } from '../pages/Login'

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <Clean/>,
    children: [
      {
        path: 'register',
        element: <Register/>
      },
      {
        path: 'login',
        element: <Login/>
      }
    ]
  }
])