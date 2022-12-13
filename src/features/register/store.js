import { createEffect, createStore } from 'effector'
import { requester } from 'shared/lib/requester'

export const getCodeFx = createEffect(async number => {
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

export const $codeData = createStore(false)
  .on(getCodeFx.doneData, (_, res) => res)

export const $putCodeData = createStore(false)
  .on(putCodeFx.doneData, (_, res) => res)