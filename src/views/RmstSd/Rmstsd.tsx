import { useInterval } from 'ahooks'
import { PointerEvent } from 'react'

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

export default function Rmstsd() {
  const onPointerDown = (downEvt: PointerEvent) => {
    const ab = new AbortController()

    document.addEventListener(
      'pointermove',
      evt => {
        const dis = Math.sqrt((downEvt.clientX - evt.clientX) ** 2 + (downEvt.clientY - evt.clientY) ** 2)
        if (!isDragging) {
          if (dis > 10) {
            downEvt.preventDefault()
            isDragging = true

            console.log('drag start')

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

  return (
    <input
      className="border"
      style={{ zoom: 4 }}
      type="checkbox"
      onPointerDown={onPointerDown}
      onClick={evt => {
        console.log('input click ')
      }}
      onChange={evt => {
        console.log('input change')
      }}
    />
  )
}
