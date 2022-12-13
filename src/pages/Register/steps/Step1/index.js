import s from './Step1.module.css'
import { InputPhone } from 'shared/ui/atoms/InputPhone'
import { BigButton } from 'shared/ui/atoms/BigButton'
import { useState } from 'react'
import { useEvent, useStore } from 'effector-react'
import { $codeData, getCodeFx } from 'features/register/store'
import { Link } from 'react-router-dom'

export const Step1 = () => {

  const [ value, setValue ] = useState('+7 ')

  const getCode = useEvent(getCodeFx)
  const pending = useStore(getCodeFx.pending)
  const submit = () => getCode(value)

  const st1 = useStore($codeData)

  return (
    <>
      <h3>В шаге от эмоций</h3>
      <p>Что бы начать пользоваться сервисом, необходимо ввести номер телефона</p>
      <InputPhone
        disabled={pending}
        focusOnMount={true}
        value={value}
        setValue={setValue}
        error={st1?.error ? (st1.error?.message) : false}
      />
      <BigButton
        className={s.button}
        onClick={submit}
        loading={pending}
        disabled={value.length !== 18}
        disabledText='Введите номер'
      >
        Войти
      </BigButton>

      <p className={s.login}>Уже есть аккаунт? <Link to='/login'>Войти</Link></p>
    </>
  )
}