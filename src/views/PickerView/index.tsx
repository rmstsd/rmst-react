import React from 'react'
import PickerCell from './Pk'

const list = Array.from({ length: 15 }, (_, i) => i)

const itemHeight = 35

const containerHeight = 300
const wrapperHeight = containerHeight
let minY = -(list.length * itemHeight - containerHeight)
console.log('minY', minY)
let maxY = 0

let ty = 0

export default function Mpk() {
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

function PickerView() {
  const ulRef = React.useRef<HTMLUListElement>(null)

  const onPointerDown = (evt: React.PointerEvent) => {
    evt.preventDefault()

    const dEvent = evt

    let _ty = 0

    const onPointerMove = (evt: PointerEvent) => {
      console.log('move')

      const deltaY = evt.clientY - dEvent.clientY

      _ty = ty + deltaY
      console.log(_ty)

      if (_ty < minY) {
        _ty = minY
      }
      if (_ty > maxY) {
        _ty = maxY
      }

      ulRef.current.animate([{ transform: `translateY(${_ty}px)` }], {
        fill: 'forwards'
        // duration: 2000
      })
    }

    const onPointerUp = (evt: PointerEvent) => {
      console.log('up')

      momentum(_ty, ty, 200, wrapperHeight - scrollerHeight, 0)

      ty = _ty

      document.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('pointerup', onPointerUp)
    }

    document.addEventListener('pointermove', onPointerMove)
    document.addEventListener('pointerup', onPointerUp)
  }

  return (
    <div className="m-auto mt-[200px] h-[300px] w-[200px] overflow-hidden border" onPointerDown={onPointerDown}>
      <ul ref={ulRef}>
        {list.map(item => (
          <li key={item} className="border-b text-center" style={{ height: itemHeight, lineHeight: `${itemHeight}px` }}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function momentum(current, start, duration, minY, maxY) {
  const durationMap = {
    noBounce: 400,
    weekBounce: 100,
    strongBounce: 75
  }
  const bezierMap = {
    noBounce: 'cubic-bezier(.17, .89, .45, 1)',
    weekBounce: 'cubic-bezier(.25, .46, .45, .94)',
    strongBounce: 'cubic-bezier(.25, .46, .45, .94)'
  }
  let type = 'noBounce'
  // 惯性滑动加速度
  // @en inertial sliding acceleration
  const deceleration = 0.003
  // 回弹阻力
  // @en rebound resistance
  const bounceRate = 5
  // 强弱回弹的分割值
  // @en Split value of strong and weak rebound
  const bounceThreshold = 300
  // 回弹的最大限度
  // @en maximum rebound
  const maxOverflowY = wrapperHeight / 6
  let overflowY

  const distance = current - start
  const speed = (2 * Math.abs(distance)) / duration
  let destination = current + (speed / deceleration) * (distance < 0 ? -1 : 1)
  if (destination < minY) {
    overflowY = minY - destination
    type = overflowY > bounceThreshold ? 'strongBounce' : 'weekBounce'
    destination = Math.max(minY - maxOverflowY, minY - overflowY / bounceRate)
  } else if (destination > maxY) {
    overflowY = destination - maxY
    type = overflowY > bounceThreshold ? 'strongBounce' : 'weekBounce'
    destination = Math.min(maxY + maxOverflowY, maxY + overflowY / bounceRate)
  }

  return {
    destination,
    duration: durationMap[type],
    bezier: bezierMap[type]
  }
}
