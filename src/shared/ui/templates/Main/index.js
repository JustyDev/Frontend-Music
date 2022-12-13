import { NavLink, Outlet } from 'react-router-dom'

import s from './Main.module.css'
import { Home } from '../../assets'

export const Main = () => {

  const actClassName = ({isActive}) => isActive ? (s.active + ' ' + s.link) : s.link

  return (
    <div className={s.container}>
      <div className={s.overlay}>
        <nav className={s.nav}>
          <h2>Justy Music</h2>
          <NavLink exact className={actClassName} to="/"><Home /> Главная</NavLink>
          <NavLink className={actClassName} to="/library">Медиатека</NavLink>
          <NavLink className={actClassName} to="/search">Поиск</NavLink>
          <NavLink className={actClassName} to="/search">Новинки</NavLink>
          <NavLink className={actClassName} to="/search">Популярное</NavLink>
          <NavLink className={actClassName} to="/search">Плейлисты</NavLink>
          <NavLink className={actClassName} to="/search">Жанры</NavLink>
        </nav>
        <main>
          <Outlet/>
        </main>
      </div>
      <div className={s.player}>

      </div>
    </div>
  )
}