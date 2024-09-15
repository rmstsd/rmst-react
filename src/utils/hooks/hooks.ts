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

export function useMergeProps<PropsType>(
  componentProps: PropsType,
  defaultProps: Partial<PropsType>,
  globalComponentConfig: Partial<PropsType> = {}
): PropsType {
  const _defaultProps = useMemo(() => {
    return { ...defaultProps, ...globalComponentConfig }
  }, [defaultProps, globalComponentConfig])

  const props = useMemo(() => {
    const mProps = { ...componentProps }

    // https://github.com/facebook/react/blob/cae635054e17a6f107a39d328649137b83f25972/packages/react/src/ReactElement.js#L312
    for (const propName in _defaultProps) {
      if (mProps[propName] === undefined) {
        mProps[propName] = _defaultProps[propName]
      } else if (
        mProps[propName] &&
        _defaultProps[propName] &&
        typeof mProps[propName] === 'object' &&
        typeof _defaultProps[propName] === 'object' &&
        !Array.isArray(mProps[propName]) &&
        !Array.isArray(_defaultProps[propName])
      ) {
        mProps[propName] = { ..._defaultProps[propName], ...mProps[propName] }
      }
    }

    return mProps
  }, [componentProps, _defaultProps])

  return props
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
