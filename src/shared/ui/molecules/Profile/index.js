import s from './Profile.module.css'
import { Link } from 'react-router-dom'
import { Logout, Note, Settings } from '../../assets'
import { useHoveredTooltip } from '../../../hooks/useHoveredTooltip'
import { useEvent } from 'effector-react'
import { logoutFx } from '../../../../features/auth/store'

export const Profile = ({session}) => {

  const { active, onOpen, onClose, classes } = useHoveredTooltip(s.enterToAnimation)

  const logout = useEvent(logoutFx)

  return (
    <div className={s.profile}>
      <div
        onMouseEnter={onOpen}
        onMouseLeave={onClose}
        className={s.avatar}
        style={{ backgroundImage: 'url(https://avatars.mds.yandex.net/get-yapic/43978/st1zOZWFa43FcvUWt6Diqk1yznM-1/islands-200)' }}
      />

      <div
        onMouseEnter={onOpen}
        onMouseLeave={onClose}
        className={s.accountMenu + ' ' + (active ? (s.enterAnimation + ' ' + classes) : '')}
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
              <p className={s.number}>{session.number}</p>
            </div>
          </div>

          <Link to='/library' className={s.link}><Note /> Медиатека</Link>
          <Link to='/settings' className={s.link}><Settings /> Настройки</Link>
          <p className={s.link + ' ' + s.logout} onClick={logout}><Logout /> Выйти</p>
        </div>
      </div>
    </div>
  )
}