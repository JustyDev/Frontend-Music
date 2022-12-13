import React from 'react'
import ReactDOM from 'react-dom/client'
import './app/styles/index.css'
import reportWebVitals from './reportWebVitals'
import { RouterProvider } from 'react-router'
import { routes } from './app/Routes'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <RouterProvider router={routes}/>
)

reportWebVitals()
