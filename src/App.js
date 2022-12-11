import { useCallback, useEffect, useRef, useState } from 'react'

function App() {

  const [ isPaused, setIsPaused ] = useState(false)
  const [ dataWS, setDataWS ] = useState(false)
  const [ left, setLeft ] = useState(0)
  const [ status, setStatus ] = useState('')

  const [ context ] = useState(new AudioContext())
  const [ chunks, setChunks ] = useState([])

  const ws = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      let t = context.currentTime.toFixed(2)
      setLeft(Number(t))
    }, 200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (dataWS) {
      let soundSource = context.createBufferSource()
      context.decodeAudioData(dataWS).then(buff => {
        soundSource.buffer = buff
        soundSource.connect(context.destination)
      })
      setChunks([ ...chunks, soundSource ])
    }
  }, [ dataWS, setChunks ])

  useEffect(() => {
    if (chunks.length > 1) {
      chunks[chunks.length - 2].onended = () => {
        chunks[chunks.length - 2].stop()
        chunks[chunks.length - 1].start(0)
      }
    }
  }, [chunks])

  useEffect(() => {
    if (!isPaused) {
      ws.current = new WebSocket('ws://localhost:8080/media')
      ws.current.binaryType = 'arraybuffer'
      ws.current.onopen = () => {
        setStatus('Соединение открыто')
        ws.current.send('{"media":""}')
      }
      ws.current.onclose = () => setStatus('Соединение закрыто')

      gettingData()
    }

    return () => ws.current.close()
  }, [ ws, isPaused ])

  const gettingData = useCallback(() => {
    if (!ws.current) return

    ws.current.onmessage = e => {
      setDataWS(e.data)
    }
  }, [ isPaused, setDataWS ])

  return (
    <div className="App">
      <h1>Впечатления начинаются с Frosty</h1>
      <p>Статус: {status}</p>
      <button onClick={() => {
        chunks[0].start(0)
      }}>
        Play
      </button>
      <p>Current Time: {left}</p>
    </div>
  )
}

export default App
