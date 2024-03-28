import { animated, useSpring } from '@react-spring/web'
import { useEventListener } from 'ahooks'
import React, { useEffect, useRef, useState } from 'react'

import { useImmer } from 'use-immer'

const detectNear = (tickCount: number, offsetVal: number) => {
  const offsetRatio = tickCount - Math.floor(tickCount)

  if (offsetRatio < offsetVal || offsetRatio > 1 - offsetVal) {
    return { isNear: true, nearValue: Math.round(tickCount) }
  }

  return { isNear: false }
}

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

  const [props, api] = useSpring(
    () => ({
      from: { left: 0 },
      to: { left: 1 },
      onChange(v) {
        // console.log(v.value.left)
      }
    }),
    []
  )

  useEventListener('mousemove', evt => {
    return
    const intval = 200
    const neared = detectNear(evt.clientX / intval, 0.5)

    if (neared.isNear) {
      api.start({ left: intval * neared.nearValue })
    } else {
    }
  })

  return (
    <>
      <button
        onClick={() => {
          // api.start({ opacity: 0 })
        }}
      >
        click
      </button>
      <animated.div style={props} className="absolute">
        Hello World
      </animated.div>
    </>
  )

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

function Diff() {
  const [bool, setBool] = useState(true)

  const Tag = bool ? 'div' : 'main'

  return (
    <>
      <button onClick={() => setBool(!bool)}>set</button>

      {bool ? (
        <div>
          <KaSo />
        </div>
      ) : (
        <div>
          <SoKa />
        </div>
      )}

      <Tag>
        <span>1</span>
      </Tag>

      <div>
        <span>2</span>
      </div>
    </>
  )
}

export default Diff

function KaSo() {
  useEffect(() => {
    console.log(2)
  }, [])
  return (
    <>
      <p key="ka">
        <span>ka</span>
      </p>
      <h3 key="song">
        <span>song</span>
      </h3>
    </>
  )
}

function SoKa() {
  return (
    <>
      <h3 key="song">
        <span>song</span>
      </h3>
      <p key="ka">
        <span>ka</span>
      </p>
    </>
  )
}
