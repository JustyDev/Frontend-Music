import { createBrowserRouter } from 'react-router-dom'
import { Clean } from '../shared/ui/templates/Clean'
import { Register } from '../pages/Register'
import { Login } from '../pages/Login'
import { Auth } from '../shared/ui/templates/Auth'
import { Main as MainTemplate } from '../shared/ui/templates/Main'
import { Main } from '../pages/Main'
import { Library } from '../pages/Library'

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <Clean/>,
    children: [

      {
        path: '/',
        element: <MainTemplate/>,
        children: [
          {
            path: '/',
            element: <Main/>
          },
          {
            path: '/library',
            element: <Library/>
          }
        ]
      },
      {
        path: '/',
        element: <Auth/>,
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
    ]
  }
])