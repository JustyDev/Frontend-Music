import s from './Login.module.css'
import note from 'shared/ui/assets/png/note.png'
import { InputPhone } from 'shared/ui/atoms/InputPhone'
import { useState } from 'react'
import { Input } from 'shared/ui/atoms/Input'
import { BigButton } from 'shared/ui/atoms/BigButton'
import { Link } from 'react-router-dom'

export const Login = () => {

  const [ phone, setPhone ] = useState('+7 ')
  const [ password, setPassword ] = useState('')

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
            // disabled={pending}
            focusOnMount={true}
            value={phone}
            setValue={setPhone}
            // error={st1?.error ? (st1.error?.message) : false}
          />

          <Input
            defaultViewState={false}
            value={password}
            onChange={e => setPassword(e.target.value)}
            classNameOverlay={s.inp}
            placeholder='Введите ваш пароль'
            type='password'
          />

          <BigButton
            className={s.button}
            onClick={() => null}
            disabled={phone.length !== 18 || !password}
            disabledText='Заполните все поля'
          >
            Продолжить
          </BigButton>

          <p className={s.register}>Впервые у нас? <Link to='/register'>Зарегистрироваться</Link></p>


        </form>
      </div>
    </div>
  )
}