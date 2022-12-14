import s from './Player.module.css'
import { useEffect, useRef, useState } from 'react'
import { Play, Pause } from '../../assets'
import { useDidUpdate } from '../../../hooks/useDidUpdate'

export const Player = () => {

  const src = './media.mp3'
  const [ context, setContext ] = useState(false)
  const [ filters, setFilters ] = useState([])

  const audioRef = useRef(new Audio(src))

  const createFilters = (context) => {
    let frequencies = [ 60, 170, 310, 600, 1000, 3000, 6000, 12000, 14000, 16000 ],
      filters = frequencies.map((frequency) => {
        let filter = context.createBiquadFilter()

        filter.type = 'peaking' // тип фильтра
        filter.frequency.value = frequency // частота
        filter.Q.value = 1 // Q-factor
        filter.gain.value = 0

        return filter
      })

    filters.reduce(function (prev, curr) {
      prev.connect(curr)
      return curr
    })

    return filters
  }

  const [ time, setTime ] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(audioRef.current.currentTime)
    }, 100)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (context && filters.length === 0) {
      const source = context.createMediaElementSource(audioRef.current)

      const eq = createFilters(context)
      source.connect(eq[0])
      eq[eq.length - 1].connect(context.destination)

      setFilters(eq)
    }
  }, [ context, filters.length ])

  const [ isPlaying, setIsPlaying ] = useState(false)

  const toTime = (t) => {
    if (t === 0) return '0:00'
    let min = Math.floor(t / 60) ?? '0'
    let sec = Math.round(t % 60) ?? '00'
    if (sec < 10) {
      sec = '0' + sec
    }
    return min + ':' + sec
  }

  useDidUpdate(() => {
    if (!isPlaying) {
      audioRef.current.pause()
    } else {
      if (!context) setContext(new AudioContext())
      audioRef.current.play()
    }
  }, [ isPlaying ])

  return (
    <div className={s.player}>
      <div className={s.info}>
        <div className={s.cover}
             style={{ backgroundImage: 'url(https://avatars.yandex.net/get-music-content/113160/cc0ecc13.a.7363574-1/100x100)' }}/>
        <div className={s.artist}>
          <h3>Нирвана</h3>
          <p>Ганвест</p>
        </div>
      </div>
      <div className={s.manage}>
        <div className={s.buttons}>
          {!isPlaying ? (
            <div className={s.play} onClick={() => setIsPlaying(true)}>
              <Play/>
            </div>
          ) : null}

          {isPlaying ? (
            <div className={s.pause} onClick={() => setIsPlaying(false)}>
              <Pause/>
            </div>
          ) : null}
        </div>
        <div className={s.line}>
          <time>{toTime(time)}</time>
          <div className={s.progress}>
            <div className={s.progressLoaded} style={{ width: '30%' }}/>
            <div className={s.progressPlaying} style={{ width: (time / audioRef.current.duration * 100) + '%' }}/>
          </div>
          <time>{toTime(audioRef.current.duration)}</time>
        </div>
      </div>
      <div>
        {/*{[...Array(10)].map((_, i) => <input*/}
        {/*  key={i}*/}
        {/*  style={{height: '10px'}}*/}
        {/*  type='range'*/}
        {/*  max={15}*/}
        {/*  onChange={e => {*/}
        {/*    filters[i].gain.value = Number(e.target.value)*/}
        {/*  }}*/}
        {/*  value={filters[i]?.gain?.value ?? 0}*/}
        {/*  min={-15}*/}
        {/*/>)}*/}
      </div>
    </div>
  )
}