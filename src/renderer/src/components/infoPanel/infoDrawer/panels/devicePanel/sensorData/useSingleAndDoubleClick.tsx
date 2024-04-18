import { MouseEvent, MouseEventHandler, useCallback, useEffect, useRef, useState } from 'react'

const useSingleAndDoubleClick = <T,>(
  onClick: MouseEventHandler<T>,
  onDoubleClick?: MouseEventHandler<T>,
  delay = 250
): MouseEventHandler<T> => {
  const eventRef = useRef<MouseEvent<T> | undefined>(undefined)
  const [clickCount, setClickCount] = useState<number>(0)

  useEffect(() => {
    let singleClickTimer
    if (clickCount === 1) {
      singleClickTimer = setTimeout(function () {
        if (eventRef.current) {
          onClick?.(eventRef.current)
        }
        setClickCount(0)
        eventRef.current = undefined
      }, delay)
    } else if (clickCount === 2) {
      if (eventRef.current) {
        onDoubleClick?.(eventRef.current)
      }
      eventRef.current = undefined
      setClickCount(0)
    }
    return () => clearTimeout(singleClickTimer)
  }, [clickCount])
  return useCallback(
    (e) => {
      e.stopPropagation()
      eventRef.current = e
      setClickCount(clickCount + 1)
    },
    [clickCount]
  )
}

export default useSingleAndDoubleClick
