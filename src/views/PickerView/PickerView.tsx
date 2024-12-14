import { useLayoutEffect, useRef, useState } from 'react'
import { momentum } from './util'
import { clamp, timeout } from 'es-toolkit'

const config = {
  rows: 7,
  itemHeight: 50,
  containerHeight: 250,
  data: Array.from({ length: 30 }, (_, i) => ({ label: `Item ${i}`, value: i }))
}

type Item = {
  label: string | number
  value: string | number
}

config.containerHeight = config.rows * config.itemHeight

interface Props {
  onChange?: (value: string | number) => void
}

const defaultDuration = 200

export default function PickerView(props: Props) {
  const { onChange } = props

  const { data, itemHeight, containerHeight, rows } = config
  const containerPaddingTop = itemHeight * Math.floor(rows / 2)

  const minTy = containerHeight - itemHeight * data.length - containerPaddingTop * 2 // -itemHeight * (data.length - 1)
  console.log(minTy)
  const maxTy = 0

  const [wrapperDom, setWrapperDom] = useState<HTMLUListElement>()
  const tyRef = useRef(0)
  const isTriggerDragRef = useRef(false)

  useLayoutEffect(() => {
    if (!wrapperDom) {
      return
    }

    // scrollToIndex(data.length - 2)
  }, [wrapperDom])

  function scrollToTy(ty: number, duration: number = 0, easing: string = 'ease-out') {
    const aniInstance = wrapperDom.animate([{ transform: `translateY(${ty}px)` }], {
      fill: 'forwards',
      duration,
      easing
    })

    return aniInstance
  }

  const onClick = (item: Item, index: number) => {
    if (isTriggerDragRef.current) {
      return
    }
    // console.log('未触发 drag')
    // scrollToIndex(index)
  }

  function scrollToIndex(index: number) {
    tyRef.current = -itemHeight * index
    scrollToTy(tyRef.current, defaultDuration)

    console.log('index', index)
    // const item = data[index]
    // onChange(item.value)
  }

  const onPointerDown = (downEvt: React.PointerEvent) => {
    downEvt.preventDefault()

    let startTime = downEvt.timeStamp
    let startClientY = downEvt.clientY

    let _ty = 0
    let stay = false
    let timer = null

    const onPointerMove = (moveEvt: PointerEvent) => {
      let deltaY = moveEvt.clientY - downEvt.clientY

      if (!(isTriggerDragRef.current || Math.abs(deltaY) > 5)) {
        return
      }

      isTriggerDragRef.current = true

      _ty = tyRef.current + deltaY

      if (_ty < minTy) {
        const asd = Math.abs(tyRef.current - minTy)
        _ty = minTy + (deltaY + asd) / 3
      }
      if (_ty > maxTy) {
        const asd = Math.abs(tyRef.current - maxTy)
        _ty = maxTy + (deltaY - asd) / 3
      }

      // console.log('_ty', _ty)
      scrollToTy(_ty)

      if (moveEvt.timeStamp - startTime > 300) {
        startTime = moveEvt.timeStamp
        startClientY = moveEvt.clientY
      }

      stay = false
      clearTimeout(timer)
      timer = setTimeout(() => {
        stay = true
      }, 10)
    }

    const onPointerUp = (upEvt: PointerEvent) => {
      console.log('up', upEvt.type)

      if (isTriggerDragRef.current) {
        const duration = upEvt.timeStamp - startTime
        const absDistY = Math.abs(upEvt.clientY - startClientY)

        const isMomentum = duration < 300 && absDistY > 30

        if (!stay && isMomentum) {
          console.log('惯性', minTy, maxTy, containerHeight)
          const mu = momentum(_ty, tyRef.current, duration, minTy, maxTy, containerHeight)

          const idx = Math.round(-mu.destination / itemHeight)
          const ansIdx = clamp(idx, 0, data.length - 1)

          if (mu.destination < minTy || mu.destination > maxTy) {
            tyRef.current = clamp(mu.destination, minTy, maxTy)
            const ani = scrollToTy(tyRef.current, defaultDuration)

            // ani.onfinish = () => {
            //   console.log('onfinish')

            //   if (mu.destination < minTy) {
            //     tyRef.current = minTy
            //     scrollToTy(minTy, duration)
            //   }
            //   if (mu.destination > maxTy) {
            //     tyRef.current = maxTy
            //     scrollToTy(maxTy, duration)
            //   }
            // }
          } else {
            scrollToIndex(ansIdx)
          }
        } else {
          // 如果越界
          if (_ty > maxTy || _ty < minTy) {
            // 长拉住边界 回弹
            backBounce()
          } else {
            // 慢拉 松手时
            tyRef.current = _ty
            const idx = Math.abs(Math.round(_ty / itemHeight))
            scrollToIndex(idx)
          }

          function backBounce() {
            if (_ty > maxTy) {
              tyRef.current = maxTy
              scrollToTy(maxTy, defaultDuration)
            }

            if (_ty < minTy) {
              tyRef.current = minTy
              scrollToTy(minTy, defaultDuration)
            }
          }
        }

        setTimeout(() => {
          isTriggerDragRef.current = false
        })
      }

      document.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('pointerup', onPointerUp)
    }

    document.addEventListener('pointermove', onPointerMove)
    document.addEventListener('pointerup', onPointerUp)
    document.addEventListener('pointercancel', onPointerUp)
  }

  return (
    <div
      className="relative m-auto mt-[200px] w-[200px] touch-none select-none overflow-hidden border"
      onPointerDown={onPointerDown}
      onContextMenu={evt => evt.preventDefault()}
      style={{ height: containerHeight }}
    >
      <ul ref={setWrapperDom} style={{ paddingTop: containerPaddingTop }}>
        {data.map((item, index) => (
          <li
            key={item.value}
            className="border-b text-center"
            style={{ height: itemHeight, lineHeight: `${itemHeight}px` }}
            onClick={() => onClick(item, index)}
          >
            {item.label}
          </li>
        ))}
      </ul>

      <div className="absolute inset-0 my-auto h-[1px] bg-red-400"></div>
    </div>
  )
}
