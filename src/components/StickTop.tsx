import React, { useEffect, useRef, useState } from 'react'

export default function StickTop(props) {
  const { offsetTop = 10 } = props

  const [state, setState] = useState({
    affix: false,
    fixedStyle: {} as React.CSSProperties,
    placeholderStyle: {} as React.CSSProperties
  })

  const stateRef = useRef(state)
  stateRef.current = state

  const root = useRef<HTMLDivElement>(null)
  const point = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const rect = root.current.getBoundingClientRect()

      if (rect.top < 0 + offsetTop) {
        state.fixedStyle = { position: 'fixed', top: offsetTop, width: rect.width }
        state.placeholderStyle = { height: point.current.offsetHeight }
        state.affix = true

        setState({ ...state })
      } else {
        state.fixedStyle = null
        state.placeholderStyle = {}
        state.affix = false

        setState({ ...state })
      }
    }

    window.addEventListener('scroll', handleScroll)

    const handleResize = () => {
      if (stateRef.current.affix) {
        const rect = root.current.getBoundingClientRect()

        state.fixedStyle.width = rect.width

        setState({ ...state })
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div ref={root}>
      <div ref={point} style={{ zIndex: 2, ...state.fixedStyle }}>
        {props.children}
      </div>

      {state.affix && <div style={state.placeholderStyle}></div>}
    </div>
  )
}
