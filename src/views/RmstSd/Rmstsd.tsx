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
document.addEventListener(
  'change',
  evt => {
    // if (isDragging) {
    //   evt.stopPropagation()
    // }
    // evt.stopPropagation()
  },
  { capture: true }
)

export default function Rmstsd() {
  const onPointerDown = (downEvt: PointerEvent) => {
    downEvt.preventDefault()

    const ab = new AbortController()

    document.addEventListener(
      'pointermove',
      evt => {
        const dis = Math.sqrt((downEvt.clientX - evt.clientX) ** 2 + (downEvt.clientY - evt.clientY) ** 2)
        if (!isDragging) {
          if (dis > 10) {
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

  useInterval(() => {
    // console.log(document.querySelector('input').checked)
  }, 1000)

  return (
    <label className="inline-block" onPointerDown={onPointerDown}>
      <input
        style={{ zoom: 4 }}
        type="checkbox"
        onClick={evt => {
          console.log('input click ')
        }}
        onChange={evt => {
          console.log('input change')
        }}
      />
      <span>发过火华工科技电风扇</span>
    </label>
  )
}
