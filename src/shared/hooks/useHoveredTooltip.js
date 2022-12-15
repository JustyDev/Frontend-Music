import { useEffect, useState } from 'react'

export const useHoveredTooltip = (addedClasses) => {
  const [ active, setActive ] = useState(false)
  const [ classes, setAddClasses ] = useState('')

  let timeout

  const onClose = () => {
    timeout = setTimeout(() => {
      setActive(false)
      setAddClasses('')
    }, 100)
  }

  const onOpen = () => {
    clearTimeout(timeout)
    setActive(true)
  }

  useEffect(() => {
    if (active) {
      setTimeout(() => {
        setAddClasses(addedClasses)
      }, 10)
    }
  }, [ active ])

  return { active, onOpen, onClose, classes }
}