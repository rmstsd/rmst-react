import { Input, Tabs } from '@arco-design/web-react'
import React, { memo, useDeferredValue, useEffect, useRef, useState, useSyncExternalStore, useTransition } from 'react'
import { sleep } from '../utils/utils'

const Hooks18 = () => {
  return (
    <div>
      <Tabs defaultActiveTab="1">
        <Tabs.TabPane title="useTransition useDeferredValue" key="1">
          <Tr1 />
        </Tabs.TabPane>

        <Tabs.TabPane title="useSyncExternalStore" key="2">
          <SyncExternalStore />
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}

export default Hooks18

function Tr1() {
  const [value, setValue] = useState('a')
  const [isPending, startTransition] = useTransition()

  console.log('p')

  const deferValue = useDeferredValue(value)

  return (
    <>
      <button
        onClick={() => {
          startTransition(() => {})
        }}
      >
        st
      </button>
      <Input
        value={value}
        onChange={v => {
          setValue(v)
          // startTransition(() => {
          //   setTrValue(v)
          // })
        }}
        suffix={isPending ? 'input...' : 'end'}
      />
      <hr />

      <>value :{value}</>

      <hr />

      {/* <> deferValue:{deferValue}</> */}

      <hr />

      <ul className="flex flex-wrap gap-[20px]">
        {Array.from({ length: 100 }, (_, idx) => (
          <Child dvalue={deferValue} key={idx} />
        ))}
      </ul>

      {/* <Child dvalue={trValue} /> */}
    </>
  )
}

const Child = memo<{ dvalue }>(function Child({ dvalue }) {
  console.log('child')
  sleep(20)

  return <li>child {dvalue}</li>
})

let data = []
const upListeners = new Set<Function>()

function upRender() {
  for (const iterator of upListeners) {
    iterator()
  }
}

let nextItem = 0

const todoStore = {
  add() {
    data = [...data, ++nextItem]

    upRender()
  },
  delete(idx: number) {
    data = data.toSpliced(idx, 1)

    upRender()
  },
  subscribe(callback) {
    upListeners.add(callback)

    return () => {
      upListeners.delete(callback)

      console.log('un sub')
    }
  },
  getSnapshot() {
    return data
  }
}

let pos = { x: 0, y: 0 }

function sub(cb) {
  console.log('subscribe')

  function ler(evt: DocumentEventMap['mousemove']) {
    pos = { x: evt.clientX, y: evt.clientY }

    cb()
  }

  document.addEventListener('mousemove', ler)

  return () => {
    document.removeEventListener('mousemove', ler)
  }
}

function getState() {
  return pos
}

const usePos = () => {
  const store = useSyncExternalStore(sub, getState)

  return store
}

function SyncExternalStore() {
  return (
    <>
      <Cc idx={1} />
      <Cc idx={2} />
    </>
  )
}

function Cc({ idx }) {
  const pos = usePos()

  return (
    <>
      <h1>c {idx}</h1>

      <div>x: {pos.x}</div>
      <div>y: {pos.y}</div>
    </>
  )
}

function UList() {
  const store = useSyncExternalStore(todoStore.subscribe, todoStore.getSnapshot)

  return (
    <ul>
      {store.map((item, idx) => (
        <li key={item} className="my-1">
          {item} <button onClick={() => todoStore.delete(idx)}>x</button>
        </li>
      ))}
    </ul>
  )
}
