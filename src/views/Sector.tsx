import { css } from '@emotion/css'
import { useEffect, useMemo, useState } from 'react'

const pathEmo = css({
  label: 'pathStyle',
  cursor: 'pointer',
  transition: 'all .3s',
  '&:hover': {
    fill: 'red'
  }
})

const Sector = () => {
  const [list] = useState(['#f6d365', '#fbc2eb', '#8fd3f4'])

  const [count, setCount] = useState(1)

  const svgWidth = 300
  const svgHeight = 300

  const perAngle = 360 / list.length
  const pathsJsx = list.map((item, index) => {
    const startAngle = index * perAngle
    const endAngle = startAngle + perAngle

    const d = calcD(100, startAngle, endAngle, svgWidth / 2, svgHeight / 2)
    return <path fill={item} d={d} key={index} className={pathEmo}></path>
  })

  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        baseProfile="full"
        width={svgWidth}
        height={svgHeight}
        style={{ border: '1px solid red' }}
      >
        <g>{pathsJsx}</g>
      </svg>
    </div>
  )
}

export default Sector

// 返回 path 的 d属性
function calcD(radius: number, startAngle: number, endAngle: number, cx: number, cy: number) {
  //角度转弧度
  function d2a(angle: number) {
    return (angle * Math.PI) / 180
  }

  //根据角度求坐标
  function point(angle: number) {
    return {
      x: cx + radius * Math.sin(d2a(angle)),
      y: cy - radius * Math.cos(d2a(angle))
    }
  }

  const arr = []

  const { x: x1, y: y1 } = point(startAngle)
  arr.push(`M ${cx} ${cy} L ${x1} ${y1}`)

  const { x: x2, y: y2 } = point(endAngle)
  arr.push(`A ${radius} ${radius} 0 ${endAngle - startAngle > 180 ? 1 : 0} 1 ${x2} ${y2}`) //画弧
  arr.push('Z')

  const d = arr.join(' ')

  return d
}
