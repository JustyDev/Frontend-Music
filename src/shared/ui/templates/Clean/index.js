import { Outlet } from 'react-router'
import { useStore } from 'effector-react'
import { $session } from 'features/auth/store'

import { MainLoader } from 'shared/ui/organisms/MainLoader'
import { initialFx } from 'features/common/store'

export const Clean = () => {

  const loading = useStore(initialFx.pending)
  const session = useStore($session)

  return (
    <div>
      <MainLoader loading={loading} />
      {!loading ? <Outlet/> : null}
    </div>
  )
}