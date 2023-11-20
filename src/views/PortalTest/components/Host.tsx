import React, { useLayoutEffect, useEffect, useRef, useState } from 'react'

export const PortalContext = React.createContext(null)

const Host = props => {
  const [list, setList] = useState([])
  const queueRef = useRef([])

  const nextKeyRef = useRef(0)

  useLayoutEffect(() => {
    if (queueRef.current.length) {
      setList(queueRef.current)

      queueRef.current = []
    }
  }, [])

  const mount = jsx => {
    nextKeyRef.current += 1

    if (!ref.current) {
      queueRef.current.push(jsx)
    } else {
      const ans = list.concat(jsx)
      setList(ans)
    }

    return nextKeyRef.current
  }

  const update = (key, jsx) => {}

  const unmount = key => {}

  const ref = useRef()

  return (
    <PortalContext.Provider value={{ mount, update, unmount }}>
      {props.children}

      <div className="portal-host-loc" ref={ref}>
        {list}
      </div>
    </PortalContext.Provider>
  )
}

export default Host
