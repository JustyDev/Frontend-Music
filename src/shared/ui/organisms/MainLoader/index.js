import s from './MainLoader.module.css'
import note from '../../assets/png/note.png'

import { useTransition, animated } from 'react-spring'

export const MainLoader = ({loading = false}) => {

  const transitions = useTransition(loading, {
    from: { opacity: 1, transform: 'scale(1)', background: 'linear-gradient( 135deg, #201a26 5%, #121212 90%)' },
    leave: { opacity: 0, transform: 'scale(2.5)', pointerEvents: 'none', background: 'linear-gradient( 135deg, #121212 5%, #201a26 90%)' },
    delay: 250
  })

  return transitions(
    (styles, item) => item && (
      <animated.div className={s.container} style={styles}>
        <div className={s.block}>
          <img src={note} alt={'Note img'}/>
        </div>
      </animated.div>
    )
  )
}