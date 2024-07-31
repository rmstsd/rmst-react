import { MouseEvent, useRef, useState } from 'react'
import { useEventListener } from 'ahooks'

import cn from '@/utils/cn'
import SingleWord from '../components/SingleWord/SingleWord'
import { SingleWordClass } from '../components/SingleWord/SingleWordClass'
import MeTransition from '../components/MeTransition'

export default function Frame1({ isEnterTv, onClick }) {
  const [style, setStyle] = useState({ x: 0, y: 0, opacity: 0 })

  const singleWordRef = useRef<SingleWordClass>()
  const isEnter = useRef(false)

  const onMouseEnter = (evt: MouseEvent<HTMLDivElement>) => {
    isEnter.current = true
    singleWordRef.current.startRender()
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
    <div
      className="f1 absolute inset-0 flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    >
      <div className="w-full">
        <SingleWord
          word="Redefining"
          className={cn('text-6xl block transition duration-[2s]', isEnterTv && '-translate-x-full')}
          disabledHoverUpdate
        />
        <SingleWord
          word="Entertainment"
          className={cn('text-6xl ml-auto block transition duration-[2s]', isEnterTv && 'translate-x-full')}
          disabledHoverUpdate
        />
      </div>

      {!isEnterTv && (
        <div
          className="absolute inset-5 cursor-pointer"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={onClick}
        />
      )}

      {!isEnterTv && (
        <div
          className="w-[140px] h-[140px] p-2 rounded-full border border-white absolute left-0 top-0 pointer-events-none flex items-center justify-center"
          style={{
            transitionProperty: 'transform opacity',
            transitionDuration: '200ms',
            transitionTimingFunction: 'linear',
            transform: `translate(${style.x}px, ${style.y}px)`,
            opacity: style.opacity
          }}
        >
          <div
            className="w-full h-full rounded-full flex items-center justify-center"
            style={{ backdropFilter: 'blur(10px)', backgroundColor: 'rgba(rgba(255,255,255,.7))' }}
          >
            <SingleWord
              ref={singleWordRef}
              word="Click To Enter"
              className="block mx-auto text-sm"
              disabledHoverUpdate
            />
          </div>
        </div>
      )}

      <div className="absolute left-0 bottom-0 w-[300px]">
        {/* <SingleWord
              word={
                'Join the future of entertainment with STR8FIRE, where IPs, games, and NFTs drive ownership and rewards for all. Play now, collect all, and earn exponentially.'
              }
              className="block"
              disabledHoverUpdate
            /> */}

        <MeTransition visible={!isEnterTv} />
      </div>
    </div>
  )
}
