import { useEventListener } from 'ahooks'
import { useEffect, useState } from 'react'

const strokeWidth = 1

function getGap(zoom: number) {
  const zooms = [0.02, 0.03, 0.05, 0.1, 0.2, 0.5, 1, 2, 5]
  const gaps = [5000, 2500, 1000, 500, 200, 100, 50, 20, 10]

  let i = 0
  while (i < zooms.length && zooms[i] < zoom) {
    i++
  }
  return gaps[i - 1] || 10000
}

export default function Svg() {
  const width = 600
  const height = 600

  const [translate, setTranslate] = useState({ tx: 0, ty: 0 })
  const [scale, setScale] = useState(1)

  const { tx, ty } = translate

  const gap = getGap(scale)

  const xTickCount = Math.ceil(width / scale / gap)
  const xStartRealTick = -(tx / scale)
  const xStartValue = Math.floor(xStartRealTick / gap) * gap
  const xTicks = [xStartValue]
  for (let i = 0; i < xTickCount; i++) {
    const cur = xTicks.at(-1) + gap
    xTicks.push(cur)
  }

  const yTickCount = Math.ceil(height / scale / gap)
  const yStartRealTick = -(ty / scale)
  const yStartValue = Math.floor(yStartRealTick / gap) * gap
  const yTicks = [yStartValue]
  for (let i = 0; i < yTickCount; i++) {
    const cur = yTicks.at(-1) + gap
    yTicks.push(cur)
  }

  const cp_xTicks = xTicks.map(item => ({ coord: item * scale + tx, text: item }))
  const cp_yTicks = yTicks.map(item => ({ coord: item * scale + ty, text: item }))

  useEventListener('wheel', evt => {
    if (evt.deltaY < 0) {
      // 放大
      setScale(scale * 1.1)
    } else {
      setScale(scale * 0.9)
    }
  })

  useEffect(() => {
    let down = false
    const downPos = { x: 0, y: 0 }
    document.onmousedown = evt => {
      evt.preventDefault()

      downPos.x = evt.clientX
      downPos.y = evt.clientY

      down = true
    }

    document.onmousemove = evt => {
      evt.preventDefault()

      if (down) {
        const dx = evt.clientX - downPos.x
        const dy = evt.clientY - downPos.y

        downPos.x = evt.clientX
        downPos.y = evt.clientY

        setTranslate(state => ({ tx: state.tx + dx, ty: state.ty + dy }))
      }
    }

    document.onmouseup = () => {
      down = false
    }
  }, [])

  return (
    <div className="p-3">
      <svg width={width} height={height} style={{ boxShadow: '0 0 0 1px gray' }}>
        <g transform={`translate(${tx} ${ty}) scale(${scale})`}>
          <rect x={0} y={0} width={100} height={100} fill="pink" />
        </g>

        <g className="axis">
          <g className="x-axis">
            {cp_xTicks.map(item => (
              <g key={item.text}>
                <line x1={item.coord} y1={0} x2={item.coord} y2={20} stroke="red" strokeWidth={strokeWidth} />
                <text x={item.coord} y={20} textAnchor="middle" fontSize={14}>
                  {item.text}
                </text>
              </g>
            ))}
          </g>

          <g className="y-axis">
            {cp_yTicks.map((item, index) => (
              <g key={index}>
                <line x1={0} y1={item.coord} x2={20} y2={item.coord} stroke="orange" strokeWidth={strokeWidth} />
                <text x={0} y={item.coord} fontSize={14} dominantBaseline="middle">
                  {item.text}
                </text>
              </g>
            ))}
          </g>
        </g>

        <rect x={0} y={0} width={9} height={9} fill="#eee" />
      </svg>
    </div>
  )
}
