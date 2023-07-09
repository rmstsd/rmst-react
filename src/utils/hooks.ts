import { useRef, useState } from 'react'

export const useDebounce = (cb: any, delay: number = 500) => {
  const debounceRef = useRef<{ timer: NodeJS.Timeout; cb: () => void }>({
    timer: null,
    cb
  })
  debounceRef.current.cb = cb

  return () => {
    if (debounceRef.current.timer) clearTimeout(debounceRef.current.timer)

    debounceRef.current.timer = setTimeout(() => {
      debounceRef.current.cb()
    }, delay)
  }
}

export const useUpdate = () => {
  const [, sb] = useState(true)

  return () => {
    sb(v => !v)
  }
}
