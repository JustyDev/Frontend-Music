import { createBrowserRouter, Route, createRoutesFromElements } from 'react-router-dom'
import { Register } from '../pages/Register'
import { Login } from '../pages/Login'
import { Auth } from '../shared/ui/templates/Auth'
import { Main as MainTemplate } from '../shared/ui/templates/Main'
import { Main } from '../pages/Main'
import { Library } from '../pages/Library'
import { Settings } from '../pages/Settings'
import { Clean } from '../shared/ui/templates/Clean'

export const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Clean/>}>
      <Route path="/" element={<MainTemplate/>}>
          <Route index element={<Main/>}/>
          <Route path="/library" element={<Library/>}/>
          <Route path="/settings" element={<Settings/>}/>
        </Route>
        <Route path="/" element={<Auth/>}>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
        </Route>
    </Route>
  )
)