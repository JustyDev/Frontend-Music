import { createEffect, createEvent, createStore } from 'effector'
import { requester } from 'shared/lib/requester'

export const getCodeFx = createEffect(async (number) => {
  const req = await requester('auth.registerCode', {
    number: number
  })
  return req.json()
})

export const putCodeFx = createEffect(async ({number, code}) => {
  const req = await requester('auth.registerCode', {
    number: number,
    code: code
  }, 'PUT')
  return req.json()
})

export const registerFx = createEffect(async ({number, code, password, username}) => {
  const req = await requester('auth.register', {
    number: number,
    password: password,
    username: username,
    code: code
  }, 'POST')
  return req.json()
})

export const $codeData = createStore(false)
  .on(getCodeFx.doneData, (_, res) => res)

export const $putCodeData = createStore(false)
  .on(putCodeFx.doneData, (_, res) => res)

export const $registerError = createStore(false)
  .on(registerFx.doneData, (_, res) => res?.error ? res.error : false)

export const nextStep = createEvent()
export const setPassword = createEvent()

export const $password = createStore('')
  .on(setPassword, (_, next) => next)

export const $step = createStore(1)
  .on(nextStep, prev => prev + 1)
  .on(getCodeFx.doneData, (prev, res) => res.type === 'success' ? prev + 1 : prev)
  .on(putCodeFx.doneData, (prev, res) => res.type === 'success' ? prev + 1 : prev)