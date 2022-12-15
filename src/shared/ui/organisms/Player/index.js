import s from './Player.module.css'
import { useEffect, useRef, useState } from 'react'
import { Play, Pause, Speaker } from '../../assets'
import { useDidUpdate } from '../../../hooks/useDidUpdate'
import { Line } from './ui/Line'
import { createEqFilters } from '../../../lib/createEqFilters'
import { useHoveredTooltip } from '../../../hooks/useHoveredTooltip'

export const Player = () => {

  const src = './media.mp3'
  const [ context, setContext ] = useState(false)
  const [ filters, setFilters ] = useState([])

  const audioRef = useRef(new Audio(src))

  useEffect(() => {
    audioRef.current.addEventListener('ended', () => {
      audioRef.current.currentTime = 0
      setIsPlaying(false)
    })
  }, [])

  useEffect(() => {
    if (context && filters.length === 0) {
      const source = context.createMediaElementSource(audioRef.current)

      const eq = createEqFilters(context)
      source.connect(eq[0])
      eq[eq.length - 1].connect(context.destination)

      setFilters(eq)
    }
  }, [ context, filters.length ])

  const [ isPlaying, setIsPlaying ] = useState(false)

  useDidUpdate(() => {
    if (!isPlaying) {

      new Promise((resolve) => {
        const interval = setInterval(() => {
          if (audioRef.current.volume <= 0) {
            clearInterval(interval)
            resolve()
          } else {
            audioRef.current.volume = Math.floor((audioRef.current.volume - 0.01) * 100) / 100
          }
        }, 3)
      }).then(() => audioRef.current.pause())

    } else {
      if (!context) setContext(new AudioContext())
      audioRef.current.volume = 0
      audioRef.current.currentTime = audioRef.current.currentTime - 0.1

      new Promise((resolve) => {
        audioRef.current.play().then(() => {
          const interval = setInterval(() => {
            if (audioRef.current.volume >= 1) {
              resolve(interval)
            } else {
              audioRef.current.volume = Math.ceil((audioRef.current.volume + 0.01) * 100) / 100
            }
          }, 3)
        })
      }).then(clearInterval)
    }
  }, [ isPlaying ])

  const { active, onOpen, onClose, classes } = useHoveredTooltip(s.enterToAnimation)

  const [ volume, setVolume ] = useState(1)
  useEffect(() => {
    audioRef.current.volume = volume
  }, [volume])

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
        <Line audio={audioRef.current} />
      </div>
      <div>
        <div
          onMouseEnter={onOpen}
          onMouseLeave={onClose}
          className={s.volume}
        >
          <Speaker />
        </div>

        <div
          className={s.volumeTooltip + ' ' + (active ? (s.enterAnimation + ' ' + classes) : '')}
          style={{ display: (active ? 'block' : 'none') }}
          onMouseEnter={onOpen}
          onMouseLeave={onClose}
        >
          <div className={s.tooltipContent}>
            <input
              style={{backgroundSize: (volume * 100) + '% 100%'}}
              className={s.volumeRange}
              type='range'
              onChange={e => setVolume(Number(e.target.value))}
              value={volume}
              min={0}
              step={0.01}
              max={1}
            />
          </div>
        </div>

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