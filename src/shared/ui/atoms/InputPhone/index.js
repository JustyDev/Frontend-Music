import s from './InputPhone.module.css'
import { forwardRef, useEffect, useRef, useState } from 'react'

export const InputPhone = forwardRef(({ value, setValue, className, focusOnMount, disabled, error }, ref) => {

  const inputEl = useRef(null)
  const [ errorSt, setError ] = useState(error)

  useEffect(() => {
    setError(error)
  }, [error])

  useEffect(() => {
    if (focusOnMount) inputEl.current.focus()
  }, [ focusOnMount, disabled ])

  const change = e => {
    setError(false)
    let val = String(e.target.value)
    let char = val.substring(val.length - 1)

    if (val.length > 18) return

    if ((val.length - value.length) > 8) {
      val = val.replace('+', '')
      let f_char = val.substring(0, 1)
      if (f_char === '7' || f_char === '8') {
        val = val.substring(1, val.length)
      }
      setValue(val.replace(/^(\d{3})(\d{3})(\d{2})(\d{2})$/, '+7 ($1) $2 $3-$4'))
      return
    }

    if (val.length > value.length) {

      if (val.length === 4) {
        setValue('+7 (' + char)
        return
      }

      if (val.length === 7) {
        setValue(val + ') ')
        return
      }

      if (val.length === 13) {
        setValue(value + ' ' + char)
        return
      }

      if (val.length === 16) {
        setValue(value + '-' + char)
        return
      }

      if (!value) {
        if (val === '+' || val === '7' || val === '8') {
          setValue('+7 ')
        } else {
          setValue('+7 (' + char)
        }
        return
      }
    } else {

      if (val.length === 16 || val.length === 13 || val.length === 4) {
        setValue(val.substring(0, val.length - 1))
        return
      }

      if (val.length === 8) {
        setValue(val.substring(0, val.length - 2))
        return
      }

      if (val.length === 2) {
        setValue('')
        return
      }

    }

    setValue(val)

  }

  return (
    <div>
      <div className={s.overlay}>
        {disabled ? <div className={s.disabled} /> : null}
        {!value || value === '+7 ' ? <div className={s.placeholder + ' ' + s.inp_text}>+7 (999) 000 00-00</div> : null}
        <input
          disabled={disabled}
          ref={focusOnMount ? inputEl : ref}
          onChange={change}
          value={value}
          inputMode="tel"
          className={s.input + ' ' + s.inp_text + ' ' + className}
          spellCheck={false}
          autoComplete="number"
        />
      </div>
      {errorSt ? <p className={s.error}>{errorSt}</p> : null}
    </div>
  )
})