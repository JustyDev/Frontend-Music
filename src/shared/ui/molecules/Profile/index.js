import s from './Profile.module.css'
import { Link, NavLink } from 'react-router-dom'
import { Logout, Note, Settings } from '../../assets'
import { useHoveredTooltip } from '../../../hooks/useHoveredTooltip'
import { useEvent } from 'effector-react'
import { logoutFx } from '../../../../features/auth/store'

export const Profile = ({session}) => {

  const { active, onOpen, onClose, classes } = useHoveredTooltip(s.enterToAnimation)

  const logout = useEvent(logoutFx)

  const activeClassName = ({ isActive }) => isActive ? (s.link + ' ' + s.active) : s.link


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
              <h3 className={s.username}>{session.name && session.surname ? (session.name + ' ' + session.surname) : session.username}</h3>
              <p className={s.number}>{session.number}</p>
            </div>
          </div>

          <NavLink className={activeClassName} to='/library' ><Note /> Медиатека</NavLink>
          <NavLink className={activeClassName} to='/settings'><Settings /> Настройки</NavLink>
          <p className={s.link + ' ' + s.logout} onClick={logout}><Logout /> Выйти</p>
        </div>
      </div>
    </div>
  )
}