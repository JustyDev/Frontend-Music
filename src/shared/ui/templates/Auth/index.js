import { Outlet, useNavigate } from 'react-router'
import { useStore } from 'effector-react'
import { $session } from 'features/auth/store'
import { useEffect } from 'react'

export const Auth = () => {

  const session = useStore($session)

  const navigate = useNavigate()

  useEffect(() => {
    if (session) navigate('/')
  }, [ session ])

  return <Outlet />
}