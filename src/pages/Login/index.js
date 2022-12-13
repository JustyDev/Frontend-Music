import s from './Login.module.css'
import note from 'shared/ui/assets/png/note.png'
import { InputPhone } from 'shared/ui/atoms/InputPhone'
import { useState } from 'react'
import { Input } from 'shared/ui/atoms/Input'
import { BigButton } from 'shared/ui/atoms/BigButton'
import { Link } from 'react-router-dom'
import { useEvent, useStore } from 'effector-react'
import { loginFx } from 'features/auth/store'

export const Login = () => {

  const [ phone, setPhone ] = useState('+7 ')
  const [ password, setPassword ] = useState('')

  const loginRequest = useEvent(loginFx)
  const pending = useStore(loginFx.pending)

  const login = () => loginRequest({
    phone: phone,
    password: password
  })

  return (
    <div className={s.container}>
      <div className={s.top}>
        <h1>Эмоции начинаются с музыки,<br/>
          которую ты слушаешь ежедневно</h1>
      </div>
      <div className={s.overlay}>
        <form className={s.block} onSubmit={e => e.preventDefault()}>
          <img src={note} alt={'Note img'}/>
          <h3>На одной волне!</h3>
          <p>С возвращением, введите данные для входа в аккаунт, что бы продолжить</p>

          <InputPhone
            focusOnMount={true}
            value={phone}
            setValue={setPhone}
            disabled={pending}
            // error={st1?.error ? (st1.error?.message) : false}
          />

          <Input
            disabled={pending}
            defaultViewState={false}
            value={password}
            onChange={e => setPassword(e.target.value)}
            classNameOverlay={s.inp}
            placeholder="Введите ваш пароль"
            type="password"
          />

          <BigButton
            loading={pending}
            onClick={login}
            disabled={phone.length !== 18 || !password || password.length < 8}
            disabledText="Заполните все поля"
          >
            Войти в аккаунт
          </BigButton>

          <p className={s.register}>Впервые у нас? <Link to="/register">Зарегистрироваться</Link></p>


        </form>
      </div>
    </div>
  )
}