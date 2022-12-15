import s from './Line.module.css'
import { useEffect, useRef, useState } from 'react'
import { useCursorPosition } from 'shared/hooks/useCursorPosition'
import { toStringTime } from 'shared/lib/toStringTime'

export const Line = ({ audio }) => {

  const [ time, setTime ] = useState(0)
  const [ loadedTime, setLoadedTime ] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(audio.currentTime / audio.duration)
      setLoadedTime(audio.buffered.end(0) / audio.duration)
    }, 100)
    return () => clearInterval(interval)
  }, [])

  const lineRef = useRef(null)

  const [ preTime, setPreTime ] = useState(false)
  const [ drag, setDrag ] = useState(false)

  useEffect(() => {
    const mouseUp = () => {
      if (!drag) return
      setDrag(false)
      audio.currentTime = preTime * audio.duration
      setPreTime(false)
      setTime(preTime)
    }

    window.addEventListener('mouseup', mouseUp)

    return () => window.removeEventListener('mouseup', mouseUp)
  }, [ drag, preTime ])

  const [ x ] = useCursorPosition()

  useEffect(() => {
    if (drag) {
      const { left } = lineRef.current?.getBoundingClientRect()
      let pos = (x - left) / lineRef.current?.clientWidth
      if (pos < 0) pos = 0
      if (pos > 1) pos = 1
      setPreTime(pos)
    }
  }, [ x, drag ])

  return (
    <div className={s.line}>
      <time>{toStringTime((preTime !== false ? preTime : time) * audio.duration)}</time>
      <div ref={lineRef} onMouseDown={() => setDrag(true)} className={s.progressWrapper}>
        <div className={s.progress}>
          <div
            className={s.progressLoaded}
            style={{ transform: 'scaleX(' + loadedTime + ')' }}
          />
          <div
            className={s.progressPlaying}
            style={{ transform: 'scaleX(' + (preTime !== false ? preTime : time) + ')' }}
          />
        </div>
      </div>
      <time>{toStringTime(audio.duration)}</time>
    </div>
  )
}