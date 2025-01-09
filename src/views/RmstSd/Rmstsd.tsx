import { useInterval } from 'ahooks'
import { PointerEvent, useEffect, useLayoutEffect, useState } from 'react'
import DndKitDd from './DndKit'

import './style.less'
import { makeAutoObservable } from 'mobx'
import { observer, useLocalObservable } from 'mobx-react-lite'

let isDragging = false

document.addEventListener(
  'click',
  evt => {
    if (isDragging) {
      evt.preventDefault()
      evt.stopPropagation()
    }
  },
  { capture: true }
)

function Rmstsd() {
  const onPointerDown = (downEvt: PointerEvent) => {
    const ab = new AbortController()

    document.addEventListener(
      'pointermove',
      evt => {
        const dis = Math.sqrt((downEvt.clientX - evt.clientX) ** 2 + (downEvt.clientY - evt.clientY) ** 2)
        if (!isDragging) {
          if (dis > 20) {
            downEvt.preventDefault()
            isDragging = true

            console.log('drag start')

            document.getSelection().removeAllRanges()

            // drag start
          }
          return
        }

        // move
      },
      {
        signal: ab.signal
      }
    )
    document.addEventListener(
      'pointerup',
      evt => {
        setTimeout(() => {
          isDragging = false
        })

        ab.abort()
      },
      {
        signal: ab.signal
      }
    )
  }

  // return <DndKitDd />

  return (
    <div>
      <div onPointerDown={onPointerDown}>asdasasdasdas</div>
      <div>999</div>
      <div>999</div>
      <div>999</div>
    </div>
  )
}

export default function Aff() {
  const [bool, setBool] = useState(false)

  return (
    <div>
      <button className="border" onClick={() => setBool(!bool)}>
        dd
      </button>
      {bool && <Child></Child>}
    </div>
  )
}

class Store {
  constructor() {
    makeAutoObservable(this)
  }
  tableWidth = 0
  widths = []

  init(columns) {
    this.widths = columns.map(() => 100)
    this.tableWidth = columns.length * 100
  }
}
const columns = [{ dataIndex: 'name' }, { dataIndex: 'age' }, { dataIndex: 'aa' }, { dataIndex: 'bb' }]
const data = Array.from({ length: 100 }, (_, index) => ({ name: index, age: index, aa: index, bb: index }))

const Child = observer(function () {
  const store = useLocalObservable(() => new Store())

  const { tableWidth, widths } = store

  useLayoutEffect(() => {
    store.init(columns)
  }, [])

  return (
    <table style={{ width: tableWidth + 'px', tableLayout: 'fixed' }} className="rr-table">
      <thead>
        <tr>
          {columns.map((item, index) => {
            return (
              <th key={item.dataIndex} className="border-spacing-0" style={{ width: widths[index] + 'px' }}>
                {item.dataIndex}
              </th>
            )
          })}
        </tr>
      </thead>

      <tbody>
        {data.map(item => {
          return (
            <tr key={item.name}>
              {columns.map((item, index) => {
                return (
                  <td key={item.dataIndex} className="border-spacing-0" style={{ width: widths[index] + 'px' }}>
                    {item.dataIndex}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
})
