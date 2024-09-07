import { useEventListener } from 'ahooks'
import { useEffect, useRef, useState } from 'react'

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

type Matrix = { tx: number, ty: number, scaleX: number, scaleY: number }
function offsetToSvg(ox: number, oy: number, matrix: Matrix) {
  const x = (ox - matrix.tx) / matrix.scaleX
  const y = (oy - matrix.ty) / matrix.scaleY

  return { x, y }
}

export default function Svg() {
  const width = 650
  const height = 600

  const [translate, setTranslate] = useState({ tx: 111, ty: 200 })
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

  const svgRef = useRef<SVGSVGElement>()

  useEventListener(
    'wheel',
    (evt: WheelEvent) => {
      const { x: canvasCoordX, y: canvasCoordY } = offsetToSvg(evt.offsetX, evt.offsetY, {
        tx: translate.tx,
        ty: translate.ty,
        scaleX: scale,
        scaleY: scale
      })

      const newScale = evt.deltaY < 0 ? scale * 1.1 : scale * 0.9

      const dx = -canvasCoordX * (newScale - scale)
      const dy = -canvasCoordY * (newScale - scale)

      setTranslate(state => ({ tx: state.tx + dx, ty: state.ty + dy }))

      setScale(newScale)
    },
    { target: svgRef }
  )

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
      <svg ref={svgRef} width={width} height={height} style={{ boxShadow: '0 0 0 1px gray' }}>
        <defs>
          <rect id="shape" x="50" y="50" width="50" height="50" />
        </defs>

        <symbol id="shape2" x={100} y={100}>
          <rect x={0} y={0} width={100} height={100} fill="pink" />
          <circle cx="50" cy="55" r="25" fill="firebrick" />
        </symbol>

        <g transform={`translate(${tx} ${ty}) scale(${scale})`}>
          {/* <use xlinkHref="#shape2" x={200} /> */}

          <svg x={100} y={100}>
            <rect x={0} y={0} width={100} height={100} fill="pink" />
            <circle cx="50" cy="55" r="25" fill="firebrick" stroke="red" strokeWidth={4} />
          </svg>

          {/* <rect x={0} y={0} width={100} height={100} fill="pink" />
          <rect
            x={100}
            y={100}
            width={50}
            height={50}
            fill="red"
            transform="translate(100 100) scale(2 1) translate(-100 -100)"
          />

          <a className="border" href="https://developer.mozilla.org/en-US/docs/SVG" target="_blank">
            <rect x="10" y="10" width="120" height="80" fill="green" />

            <rect x="50" y="50" width="120" height="80" fill="orange" />
          </a> */}
        </g>

        <g className="axis">
          <g className="x-axis">
            {cp_xTicks.map(item => (
              <g key={item.text}>
                <line x1={item.coord} y1={0} x2={item.coord} y2={20} stroke="red" strokeWidth={strokeWidth} />
                <text x={item.coord + 9} y={20} textAnchor="middle" fontSize={14}>
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

        {/* <rect x={0} y={0} width={9} height={9} fill="#eee" /> */}
      </svg>
    </div>
  )
}
