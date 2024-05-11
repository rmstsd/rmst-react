import { produce } from 'immer'
import immer from './immer'
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import clsx from 'clsx'

const state = {
  phone: '123',
  website: 'rmst.com',
  company: {
    name: 'rmst',
    bs: 'bs',
    uuu: {
      oo: 1,
      pp: 2,
      ss: {
        v: 3,
        tt: {
          g: '',
          ww: {
            f: 'd'
          }
        }
      }
    }
  },
  addr: {
    one: 'aa',
    two: 'bb'
  },
  list: [1, 2, 3],
  objArray: [{ name: 1 }, { name: 2 }]
}

const nextState = immer(state, draft => {
  // draft.phone = '456'
  // draft.company.name = 'leiLei'
  // draft.company.uuu.pp = 77

  // draft.list.push(4)

  // draft.objArray[0].name = 3

  draft.company.uuu.ss.tt.ww.f = 'rtrtrtrt'
})

// console.log('stringify ', JSON.stringify(nextState) === JSON.stringify(state))
// console.log(state)
// console.log(nextState)
// console.log(nextState === state)
// console.log(nextState.company === state.company)
// console.log(nextState.company.uuu === state.company.uuu)
// console.log(nextState.addr === state.addr)

// // console.log(nextState.list === state.list)
// console.log(nextState.objArray === state.objArray)
// console.log(nextState.objArray[0] === state.objArray[0])\

// console.log(nextState.company.uuu.ss.tt.ww.f === state.company.uuu.ss.tt.ww.f)
// console.log(nextState.company.uuu.ss.tt.ww === state.company.uuu.ss.tt.ww)
// console.log(nextState.company.uuu.ss.tt === state.company.uuu.ss.tt)
// console.log(nextState.company.uuu.ss === state.company.uuu.ss)
// console.log(nextState.company.uuu === state.company.uuu)
// console.log(nextState.company === state.company)

const Immer = () => {
  return <div>Immer</div>
}

// export default Immer

const useStableCallback = fn => {
  const fnRef = useRef(fn)
  fnRef.current = fn

  return useCallback((...args) => {
    fnRef.current(...args)
  }, [])
}

export default function index() {
  const [list, setCount] = useState(Array.from({ length: 100 }, (_, index) => index))
  const [activeId, setActiveId] = useState(0)

  return (
    <div>
      <>index</>

      <button onClick={() => setActiveId(activeId + 1)}>up</button>
      {list.map(item => (
        <Child key={item} item={item} active={activeId === item} />
      ))}
    </div>
  )
}

const Child = memo(({ item, active }) => {
  console.log('child render ', item)

  return <div className={clsx(active && 'bg-pink-200')}>{item}</div>
})
