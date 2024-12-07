import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import PickerCell from './Pk'

function Mpk() {
  return (
    <PickerCell
      prefixCls="rmst"
      data={Array.from({ length: 30 }, (_, i) => ({ value: i, label: `Item ${i}` }))}
      clickable
      disabled={false}
      itemHeight={50}
      wrapperHeight={300}
      onValueChange={value => {
        console.log(value)
      }}
    />
  )
}

const config = {
  rows: 7,
  itemHeight: 50,
  containerHeight: 250,
  data: Array.from({ length: 15 }, (_, i) => ({ label: `Item ${i}`, value: i }))
}

type Item = {
  label: string | number
  value: string | number
}

config.containerHeight = config.rows * config.itemHeight

export default function PickerView(props) {
  const { data, itemHeight, containerHeight, rows } = config
  const containerPaddingTop = itemHeight * Math.floor(rows / 2)

  const minTy = -itemHeight * (data.length - 1)
  const maxTy = 0

  const [ul, setUl] = useState<HTMLUListElement>()

  const tyRef = useRef(0)

  useLayoutEffect(() => {
    if (!ul) {
      return
    }

    tyRef.current = minTy
    scrollToTy(tyRef.current, 0)
  }, [ul])

  function scrollToTy(ty: number, duration: number = 0) {
    ul.animate([{ transform: `translateY(${ty}px)` }], {
      fill: 'forwards',
      duration
    })
  }

  const onClick = (item: Item, index: number) => {
    tyRef.current = -itemHeight * index
    scrollToTy(tyRef.current, 200)
  }

  const onPointerDown = (downEvent: React.PointerEvent) => {
    downEvent.preventDefault()

    let isDrag = false
    let _ty = 0

    const onPointerMove = (evt: PointerEvent) => {
      console.log('move')

      const deltaY = evt.clientY - downEvent.clientY
      if (Math.abs(deltaY) < 5) {
        return
      }

      isDrag = true

      _ty = tyRef.current + deltaY

      if (_ty < minTy) {
        _ty = minTy
      }
      if (_ty > maxTy) {
        _ty = maxTy
      }

      scrollToTy(_ty)
    }

    const onPointerUp = (evt: PointerEvent) => {
      console.log('up', evt.type)

      if (isDrag) {
        const idx = Math.round(_ty / itemHeight)

        console.log(idx)

        tyRef.current = idx * itemHeight
        scrollToTy(tyRef.current, 200)
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
      style={{ height: containerHeight, paddingTop: containerPaddingTop }}
    >
      <ul ref={setUl}>
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

      <div className="absolute inset-0 my-auto h-[1px] bg-gray-300"></div>
    </div>
  )
}
