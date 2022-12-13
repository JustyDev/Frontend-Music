import React, { useEffect, useState, useRef } from 'react'
import { Eye, CloseEye } from 'shared/ui/assets'

import s from './Input.module.css'

export const Input = React.forwardRef((
  {
    wrapperStyles,
    disablePadding,
    type,
    max,
    min,
    step,
    placeholder,
    name,
    value,
    onChange,
    error,
    disabled,
    autoComplete,
    subContent,
    className,
    tooltip,
    classNameOverlay,
    classNameWrapper,
    disablePasswordView,
    focusOnMount,
    style,
    defaultViewState = true,
    spellCheck = true
  }, ref) => {

  const [ viewPass, setViewPass ] = useState(defaultViewState)

  const inputEl = useRef(null);

  useEffect(() => {
    if (focusOnMount) inputEl.current.focus()
  }, [focusOnMount, disabled])

  return (
    <div
      className={s.overlay + ' ' + classNameOverlay}
      style={{marginBottom: !disablePadding ? '20px' : '0'}}
    >
      {disabled ? <div className={s.loader}/> : null}
      <div
        className={s.wrapper + ' ' + (error ? s.error : '') + ' ' + classNameWrapper}
        style={wrapperStyles}
      >
        <label>
          <input
            style={style}
            max={max}
            min={min}
            step={step}
            className={s.input + ' ' + className}
            type={viewPass && type === 'password' ? 'text' : type}
            value={value}
            disabled={disabled}
            ref={focusOnMount ? inputEl : ref}
            name={name}
            onChange={onChange}
            spellCheck={spellCheck}
            placeholder={placeholder}
            autoComplete={autoComplete}
          />
          {type === 'password' && !disablePasswordView ?
            <div
              title={viewPass ? 'Скрыть пароль' : 'Показать пароль'}
              className={s.view}
              onClick={() => value ? setViewPass(!viewPass) : null}>
              {viewPass ? <CloseEye /> : <Eye />}
            </div>
            : null}
          {subContent ? <div className={s.wrapperContent}>{subContent}</div> : null}
        </label>
      </div>
      {error || tooltip ? <div className={s.tooltip + ' ' + (error ? s.error : '')}>{error ? error : tooltip}</div> : null}
    </div>
  )
})