import { useEvent } from '@/utils/hooks'
import React, { useLayoutEffect, useMemo, useRef, useState } from 'react'

export const PortalContext = React.createContext(null)

interface PortalItem {
  key: number
  jsx: React.ReactNode
}

const Host = props => {
  const [list, setList] = useState<PortalItem[]>([])
  const queueRef = useRef<PortalItem[]>([])
  const nextKeyRef = useRef(10000)

  useLayoutEffect(() => {
    if (queueRef.current.length) {
      setList(queueRef.current)

      queueRef.current = []
    }
  }, [])

  const mount = useEvent((jsx, onlyKey?) => {
    nextKeyRef.current += 1

    const item = { key: onlyKey || nextKeyRef.current, jsx }

    if (!ref.current) {
      queueRef.current.push(item)
    } else {
      setList(list.concat(item))
    }

    return nextKeyRef.current
  })

  const update = useEvent((key, jsx) => {
    setList(state => state.map(item => (item.key === key ? { ...item, jsx } : item)))
  })

  const unmount = useEvent(key => {
    setList(state => state.filter(item => item.key !== key))
  })

  const ref = useRef()

  const value = useMemo(() => ({ mount, update, unmount }), [])

  return (
    <PortalContext.Provider value={value}>
      {props.children}

      <div className="portal-host-loc" ref={ref}>
        {list.map(item => (
          <React.Fragment key={item.key}>{item.jsx}</React.Fragment>
        ))}
      </div>
    </PortalContext.Provider>
  )
}

export default Host
