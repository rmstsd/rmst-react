import { InputNumber } from '@arco-design/web-react'
import { $, sharex } from 'helux'
import { useState } from 'react'

const {
  reactive: outer,
  useReactive,
  flush
} = sharex({
  a: 1,
  b: { b1: { b2: 1, ok: true } },

  user: {
    love: 'asdas'
  }
})

export default function Aa() {
  const [count, setCount] = useState(10)
  console.log('render count', count)

  return (
    <InputNumber
      value={count}
      onChange={val => {
        const nv = val ?? 0
        console.log(nv)

        setCount(nv)
      }}
      
    />
  )
}

function Rmstsd() {
  const [reactive] = useReactive()

  const { b, user } = reactive

  return (
    <div>
      <button onClick={() => outer.a++}>{reactive.a}</button>

      <h1
        onClick={() => {
          reactive.a++
        }}
      >
        {b.b1.b2}
      </h1>

      <input
        type="text"
        className="border"
        value={user.love}
        onChange={evt => {
          user.love = evt.target.value
          flush()
        }}
      />
    </div>
  )
}
