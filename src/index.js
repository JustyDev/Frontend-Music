import React from 'react'
import ReactDOM from 'react-dom/client'
import './app/styles/index.css'
import reportWebVitals from './reportWebVitals'
import { RouterProvider } from 'react-router'
import { routes } from './app/Routes'
import { initialFx } from './features/common/store'

const root = ReactDOM.createRoot(document.getElementById('root'))

initialFx(undefined).then(r => null)

root.render(
  <RouterProvider router={routes}/>
)

reportWebVitals()
