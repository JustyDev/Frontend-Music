import { Input } from 'shared/ui/atoms/Input'
import { useState } from 'react'
import { BigButton } from 'shared/ui/atoms/BigButton'
import { useEvent, useStore } from 'effector-react'
import { $password, $putCodeData, $registerError, registerFx } from 'features/register/store'

export const Step4 = () => {

  const register = useEvent(registerFx)
  const loading = useStore(registerFx.pending)
  const error = useStore($registerError)
  const st1 = useStore($putCodeData)
  const password = useStore($password)

  const [username, setUsername] = useState('')
  const [errored, setErrored] = useState('')

  const validate = val => {
    if (val.length < 5) {
      setErrored('Минимум 5 символов')
      return;
    }

    let exp = /^[a-z]+([-_]?[a-z0-9]+){0,2}$/i

    if (!exp.test(val)) {
      setErrored('Может содержать только цифры и латинские буквы, а также - и _')
    }
  }
  
  const createAccount = () => {
    validate(username)
    if (errored) return

    register({
      username: username,
      code: st1?.code,
      password: password,
      number: st1?.number
    })

  }

  return (
    <>
      <h3>Немного креативности</h3>
      <p>Придумайте уникальный логин, вы сможете поменять его позже в личном кабинете</p>

      <Input
        error={error ? error.message : false}
        disabled={loading}
        focusOnMount={true}
        value={username}
        onChange={e => {
          let val = e.target.value
          setUsername(val)
          setErrored('')
          validate(val)
        }}
        placeholder="Придумайте уникальный логин"
        type="text"
      />

      <BigButton
        loading={loading}
        onClick={createAccount}
        disabled={!username || errored}
        disabledText={errored ? errored : 'Введите логин'}
      >
        Завершить и войти
      </BigButton>
    </>
  )
}