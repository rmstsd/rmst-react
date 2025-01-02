import { sleep } from '@/utils/utils'
import { startTransition, useState, useTransition } from 'react'

let value = ''

export default function RmstSd() {
  const [_, up] = useState([])
  // const [p, startTransition] = useTransition()

  return (
    <div className="">
      <input
        className="border border-gray-400 p-4"
        onChange={e => {
          value = e.target.value
          startTransition(() => {
            up([])
          })
        }}
      />

      <div className="flex flex-wrap gap-10">
        {new Array(500).fill(null).map((_, i) => (
          <Child key={i} />
        ))}
      </div>
    </div>
  )
}

const Child = ({}) => {
  // sleep(1)

  return <div style={{ backgroundColor: colorMap[value.length] }}>{value}</div>
}

const colorMap = {
  1: 'green',
  2: 'blue',
  3: 'purple',
  4: 'orange'
}
