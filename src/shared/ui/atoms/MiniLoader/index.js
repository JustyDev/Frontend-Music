import s from './MiniLoader.module.css'

export const MiniLoader = ({error}) => {
  return (
    <div className={s.loader + ' ' + (error ? s.error : error)} />
  )
}