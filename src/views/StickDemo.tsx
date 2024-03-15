import React, { useEffect, useRef, useState } from 'react'

import { useImmer } from 'use-immer'

const tt = [
  {
    id: 'React',
    title: 'Learn React',
    done: true
  },
  {
    id: 'Immer',
    title: 'Try Immer',
    done: false
  }
]

const StickDemo = () => {
  const [todos, setTodos] = useImmer(tt)

  const handleAdd = () => {
    setTodos(draft => {
      draft.push({
        id: 'todo_' + Math.random(),
        title: 'A new todo',
        done: false
      })
    })
  }

  // return (
  //   <>
  //     <button onClick={handleAdd}>handleAdd</button>

  //     <pre>{JSON.stringify(todos, null, 2)}</pre>
  //   </>
  // )

  return (
    <div>
      <h1>阿萨是的11</h1>
      <h1>阿萨是的</h1>
      <h1>阿萨是的</h1>
      <h1>阿萨是的</h1>
      <h1 style={{ margin: '5px 0' }}>阿萨是的</h1>

      <StickTop>
        <h1 style={{ backgroundColor: 'pink' }}>李白</h1>
      </StickTop>

      <h1 style={{ margin: '5px 0' }}>阿萨是的</h1>
      <h1>阿萨是的</h1>
      <h1>阿萨是的</h1>
      <h1>阿萨是的</h1>
      <h1>阿萨是的</h1>
      <h1>阿萨是的</h1>
      <h1>阿萨是的</h1>
      <h1>阿萨是的</h1>
      <h1>阿萨是的</h1>
      <h1>阿萨是的</h1>
      <h1>阿萨是的</h1>
      <h1>阿萨是的</h1>
      <h1>阿萨是的</h1>
      <h1>阿萨是的</h1>
      <h1>阿萨是的</h1>
      <h1>阿萨是的</h1>
      <h1>阿萨是的</h1>
      <h1>阿萨是的</h1>
      <h1>阿萨是的</h1>
      <h1>阿萨是的</h1>
      <h1>阿萨是的</h1>
      <h1>阿萨是的</h1>
      <h1>阿萨是的</h1>
      <h1>阿萨是的</h1>
      <h1>阿萨是的</h1>
      <h1>阿萨是的</h1>
      <h1>阿萨是的</h1>
      <h1>阿萨是的</h1>
      <h1>阿萨是的</h1>
      <h1>阿萨是的</h1>
      <h1>阿萨是的</h1>
      <h1>阿萨是的</h1>
      <h1>阿萨是的</h1>
      <h1>阿萨是的</h1>
      <h1>阿萨是的</h1>
      <h1>阿萨是的</h1>
      <h1>阿萨是的</h1>
    </div>
  )
}

export default StickDemo

function StickTop(props) {
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
