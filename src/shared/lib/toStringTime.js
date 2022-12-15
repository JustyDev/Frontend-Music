export const toStringTime = t => {
  if (t === 0) return '0:00'
  let min = Math.floor(t / 60) ?? '0'
  let sec = Math.round(t % 60) ?? '00'
  if (sec < 10) {
    sec = '0' + sec
  }
  return min + ':' + sec
}