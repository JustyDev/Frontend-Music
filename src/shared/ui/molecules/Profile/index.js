import s from './Profile.module.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Logout, Note } from '../../assets'

export const Profile = () => {

  const [ active, setActive ] = useState(false)
  const [ addClasses, setAddClasses ] = useState('')

  let timeout

  const closeTooltip = () => {
    timeout = setTimeout(() => {
      setActive(false)
      setAddClasses('')
    }, 100)
  }

  const openTooltip = () => {
    clearTimeout(timeout)
    setActive(true)
  }

  useEffect(() => {
    if (active) {
      setTimeout(() => {
        setAddClasses(s.enterToAnimation)
      }, 10)
    }
  }, [ active ])

  return (
    <div className={s.profile}>
      <div
        onMouseEnter={openTooltip}
        onMouseLeave={closeTooltip}
        className={s.avatar}
        style={{ backgroundImage: 'url(https://avatars.mds.yandex.net/get-yapic/43978/st1zOZWFa43FcvUWt6Diqk1yznM-1/islands-200)' }}
      />

      <div
        onMouseEnter={openTooltip}
        onMouseLeave={closeTooltip}
        className={s.accountMenu + ' ' + (active ? (s.enterAnimation + ' ' + addClasses) : '')}
        style={{ display: (active ? 'block' : 'none') }}
      >
        <div className={s.contentAccountMenu}>
          <div className={s.miniProfile}>
            <div
              className={s.miniAvatar}
              style={{ backgroundImage: 'url(https://avatars.mds.yandex.net/get-yapic/43978/st1zOZWFa43FcvUWt6Diqk1yznM-1/islands-200)' }}
            />
            <div>
              <h3 className={s.username}>Dmitry Sidorov</h3>
              <p className={s.number}>+7 (920) 085 39-75</p>
            </div>
          </div>

          <Link to='/library' className={s.link}><Note /> Медиатека</Link>
          <p className={s.link + ' ' + s.logout}><Logout /> Выйти</p>
        </div>
      </div>
    </div>
  )
}