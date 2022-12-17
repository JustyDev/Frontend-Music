import { createEffect, createStore } from 'effector'
import { requester } from 'shared/lib/requester'
import { initialFx } from '../common/store'
import { registerFx } from '../register/store'

export const loginFx = createEffect(async (payload = false) => {
  const req = await requester('auth.login', {
    number: payload?.phone,
    password: payload?.password
  })
  return req.json()
})

export const logoutFx = createEffect(async () => {
  const req = await requester('auth.logout')
  return req.json()
})

export const $session = createStore(false)
  .on(loginFx.doneData, (_, res) => res?.session ?? false)
  .on(logoutFx.doneData, () => false)
  .on(initialFx.doneData, (_, res) => res?.session ?? false)
  .on(registerFx.doneData, (_, res) => res?.session ?? false)

export const $sessionError = createStore(false)
  .on(loginFx.doneData, (_, res) => res.error ?? false)