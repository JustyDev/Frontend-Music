import { Input } from 'shared/ui/atoms/Input'
import { useState } from 'react'
import { BigButton } from 'shared/ui/atoms/BigButton'
import { useEvent } from 'effector-react'
import { nextStep, setPassword as setPasswordEvent } from 'features/register/store'

export const Step3 = () => {

  const [ password, setPassword] = useState('')
  const [ confirm, setConfirm] = useState('')
  const [ errored, setErrored] = useState('')

  const next = useEvent(nextStep)
  const setPassEvent = useEvent(setPasswordEvent)

  const validatePasswords = () => {
    const regExp = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.{8,64})/

    if (password !== confirm) {
      setErrored('Пароли не совпадают');
      return;
    }

    if (!password) {
      setErrored('Вы не заполнили это поле');
      return;
    }

    if (!regExp.test(password)) {
      setErrored('Должны быть цифры, буквы нижнего и верхнего регистра, минимум 8 символов');
      return;
    }

    setPassEvent(password)
    next()

  }

  return (
    <>
      <h3>Нотка безопасности</h3>
      <p>Придумайте пароль, он должен содержать цифры и буквы всех регистров</p>

      <Input
        focusOnMount={true}
        defaultViewState={false}
        value={password}
        onChange={e => {
          setPassword(e.target.value)
          setErrored('')
        }}
        error={errored}
        placeholder="Придумайте пароль"
        type="password"
      />

      <Input
        defaultViewState={false}
        disablePasswordView={true}
        value={confirm}
        onChange={e => {
          setConfirm(e.target.value)
          setErrored('')
        }}
        placeholder="Подтвердите пароль"
        type="password"
      />

      <BigButton
        onClick={validatePasswords}
        disabled={!confirm || !password || errored}
        disabledText={errored ? 'Исправьте введённые данные' : 'Заполните все поля'}
      >
        Продолжить
      </BigButton>
    </>
  )
}