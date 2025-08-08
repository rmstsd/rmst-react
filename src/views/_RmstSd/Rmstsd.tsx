import { InputNumber, Select } from '@arco-design/web-react'
import { $, sharex } from 'helux'
import React, { useState } from 'react'

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
  return (
    <div className="h-[500px]">
      <div></div>
    </div>
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
