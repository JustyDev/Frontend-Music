import { Outlet } from 'react-router'
import { useStore } from 'effector-react'
import { $session, loginFx } from 'features/auth/store'

import { MainLoader } from '../../organisms/MainLoader'

export const Clean = () => {

  const loading = useStore(loginFx.pending)
  const session = useStore($session)

  return (
    <div>
      <MainLoader loading={loading} />
      {!loading ? <Outlet/> : null}
    </div>
  )
}