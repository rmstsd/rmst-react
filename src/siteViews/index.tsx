import { MouseEvent, useEffect, useMemo, useRef, useState } from 'react'

import frame1 from '@/assets/frame-1.mp4'
import Video from './components/Video'
import { SingleWord } from './components/SingleWord/SingleWord'
import { useEventListener } from 'ahooks'

export default function Home() {
  const [style, setStyle] = useState({ x: 0, y: 0, opacity: 0 })
  const isEnter = useRef(false)

  const onMouseEnter = (evt: MouseEvent<HTMLDivElement>) => {
    isEnter.current = true
  }
  const onMouseLeave = (evt: MouseEvent<HTMLDivElement>) => {
    isEnter.current = false
    setStyle({ ...style, opacity: 0 })
  }

  useEventListener('mousemove', evt => {
    if (isEnter.current) {
      setStyle({ x: evt.clientX - 60, y: evt.clientY - 60, opacity: 1 })
    }
  })

  return (
    <div className="flow-root h-full relative">
      <Video url={frame1} />

      <div
        className="absolute inset-0 flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      >
        <div className="w-full">
          <SingleWord word="Redefining" className="text-6xl" disabledHoverUpdate />
          <SingleWord word="Entertainment" className="text-6xl ml-auto" disabledHoverUpdate />
        </div>

        <div className="absolute inset-5 cursor-pointer" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}></div>

        <div
          className="w-[120px] h-[120px] rounded-full border border-white absolute left-0 top-0 content-center pointer-events-none"
          style={{
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(rgba(255,255,255,.5))',
            transitionProperty: 'transform opacity',
            transitionDuration: '200ms',
            transitionTimingFunction: 'linear',
            transform: `translate(${style.x}px, ${style.y}px)`,
            opacity: style.opacity
          }}
        >
          <SingleWord word="Click To Enter" className="mx-auto text-sm" disabledHoverUpdate />
        </div>
      </div>
    </div>
  )
}
