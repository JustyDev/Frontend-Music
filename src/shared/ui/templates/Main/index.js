import { NavLink, Outlet } from 'react-router-dom'

import s from './Main.module.css'
import { Home, Note, Playlist, Search, Magic, Star, Collections } from '../../assets'
import { Profile } from '../../molecules/Profile'
import { Player } from '../../organisms/Player'
import { useAuth } from '../../../hooks/useAuth'

export const Main = () => {

  const session = useAuth()

  const actClassName = ({isActive}) => isActive ? (s.active + ' ' + s.link) : s.link

  return (
    <div className={s.container}>
      <div className={s.overlay}>
        <nav className={s.nav}>
          <h2>Justy Music</h2>
          <NavLink exact='true' className={actClassName} to="/"><Home /> Главная</NavLink>
          <NavLink className={actClassName} to="/library"><Note /> Медиатека</NavLink>
          <NavLink className={actClassName} to="/search"><Search /> Поиск</NavLink>
          <NavLink className={actClassName} to="/search"><Star /> Новинки</NavLink>
          <NavLink className={actClassName} to="/search"><Magic /> Популярное</NavLink>
          <NavLink className={actClassName} to="/search"><Playlist /> Плейлисты</NavLink>
          <NavLink className={actClassName} to="/search"><Collections /> Жанры</NavLink>
        </nav>
        <main className={s.main}>
          <Profile session={session} />
          <Outlet/>
        </main>
      </div>
      <Player />
    </div>
  )
}