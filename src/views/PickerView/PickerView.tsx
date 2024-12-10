import { useLayoutEffect, useRef, useState } from 'react'
import { momentum } from './util'
import { clamp } from 'es-toolkit'

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

export default function PickerView(props: Props) {
  const { onChange } = props

  const { data, itemHeight, containerHeight, rows } = config
  const containerPaddingTop = itemHeight * Math.floor(rows / 2)

  const minTy = containerHeight - itemHeight * data.length // -itemHeight * (data.length - 1)
  console.log(minTy)
  const maxTy = 0

  const [ul, setUl] = useState<HTMLUListElement>()
  const tyRef = useRef(0)
  const isTriggerDragRef = useRef(false)

  useLayoutEffect(() => {
    if (!ul) {
      return
    }

    // scrollToIndex(data.length - 2)
  }, [ul])

  function scrollToTy(ty: number, duration: number = 0, easing: string = 'ease-out') {
    const aniInstance = ul.animate([{ transform: `translateY(${ty}px)` }], {
      fill: 'forwards',
      duration,
      easing
    })

    if (duration !== 0) {
      aniInstance.onfinish = () => {
        console.log('onfinish')
        if (ty < minTy) {
          tyRef.current = minTy
          scrollToTy(minTy, duration, easing)
        }
        if (ty > maxTy) {
          tyRef.current = maxTy
          scrollToTy(maxTy, duration, easing)
        }
      }
    }
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
    scrollToTy(tyRef.current, 200)

    console.log('index', index)
    // const item = data[index]
    // onChange(item.value)
  }

  const onPointerDown = (downEvt: React.PointerEvent) => {
    downEvt.preventDefault()

    let _ty = 0

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

      console.log('_ty', _ty)
      scrollToTy(_ty)
    }

    const onPointerUp = (upEvt: PointerEvent) => {
      console.log('up', upEvt.type)

      if (isTriggerDragRef.current) {
        const duration = upEvt.timeStamp - downEvt.timeStamp
        const absDistY = Math.abs(upEvt.clientY - downEvt.clientY)

        const isMomentum = duration < 300 && absDistY > 30

        if (isMomentum) {
          console.log('惯性', minTy, maxTy, containerHeight)
          const mu = momentum(_ty, tyRef.current, duration, minTy, maxTy, containerHeight)
          console.log('mu', mu)

          const idx = Math.abs(Math.round(mu.destination / itemHeight))
          console.log(idx)

          const ty = -itemHeight * idx

          tyRef.current = ty //  mu.destination
          scrollToTy(ty, 200)
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
              scrollToTy(maxTy, 200)
            }

            if (_ty < minTy) {
              tyRef.current = minTy
              scrollToTy(minTy, 200)
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
      <ul ref={setUl} style={{}}>
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
