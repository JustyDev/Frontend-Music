import { createEffect } from 'effector'
import { requester } from 'shared/lib/requester'

export const initialFx = createEffect(async () => {
  const req = await requester('common.init')
  return req.json()
})