import { useStore } from 'effector-react'
import { $session } from '../../features/auth/store'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'

export const useAuth = (redirect = '/login') => {

  const session = useStore($session)
  const navigate = useNavigate()
  
  useEffect(() => {
    if (!session) navigate(redirect)
  }, [navigate, redirect, session])

  return session
}