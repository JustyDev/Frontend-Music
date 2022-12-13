import s from './BigButton.module.css'
import { MiniLoader } from '../MiniLoader'

export const BigButton = ({className, type, disabled, disabledText, children, onClick, loading}) => {
  return (
    <div>
      <button
        onClick={!disabled ? onClick : () => null}
        type={type}
        className={s.btn + ' ' + (disabled || loading ? s.disabled : '') + ' ' + className}
      >
        {loading ? <MiniLoader /> : (disabled ? disabledText : children)}
      </button>
    </div>
  )
}