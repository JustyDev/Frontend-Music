import { createEffect, createStore } from 'effector'
import { requester } from 'shared/lib/requester'

export const loginFx = createEffect(async (payload = false) => {
  const req = await requester('auth.login', {
    number: payload?.phone,
    password: payload?.password
  })
  return req.json()
})

export const $session = createStore(false)
  .on(loginFx.doneData, (_, res) => res.session ?? false)

export const $sessionError = createStore(false)
  .on(loginFx.doneData, (_, res) => res.error ?? false)