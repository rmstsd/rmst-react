import { useCallback, useRef, useState } from 'react'
import { useMemo } from 'react'
import ResizeObserver from 'resize-observer-polyfill'


export const useDebounce = (cb: any, delay = 500) => {
  const debounceRef = useRef<{ timer: number, cb: () => void }>({
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
  const [, sb] = useState({})

  const up = useCallback(() => {
    sb({})
  }, [])

  return up
}

export const useEvent = func => {
  const ref = useRef(func)
  ref.current = func

  return useCallback((...args) => {
    return ref.current(...args)
  }, [])
}

export function useResizeObserver(onResize: (entry: ResizeObserverEntry[]) => void) {
  const resizeObserver = useRef<ResizeObserver>()

  const destroyObserver = () => {
    if (resizeObserver.current) {
      resizeObserver.current.disconnect()
      resizeObserver.current = null
    }
  }

  const createObserver = (elem: Element) => {
    if (elem) {
      if (resizeObserver.current) {
        destroyObserver()
      }
      resizeObserver.current = new ResizeObserver(onResize)
      resizeObserver.current.observe(elem)
    }
  }

  return {
    currentOr: resizeObserver.current,
    cor: createObserver,
    dor: destroyObserver
  }
}
