import { useEffect, useRef, useState } from 'react'
import frame1 from '@/assets/frame-1.mp4'
import frame2 from '@/assets/frame-2.mp4'
import cn from '@/utils/cn'

import Frame1 from './frame/Frame1'
import Frame2 from './frame/Frame2'

import Video from '../components/Video'

const inFrame2 = true

export default function Home() {
  const [isEnterTv, setIsEnterTv] = useState(inFrame2)
  const [showFrame2, setShowFrame2] = useState(inFrame2)

  const v2Ref = useRef<HTMLVideoElement>()

  const onClick = () => {
    setIsEnterTv(true)
    v2Ref.current.play()
  }

  return (
    <div className="relative flow-root">
      <div className="sticky top-0 h-screen">
        <Video src={frame1} autoPlay loop className={cn('', isEnterTv && 'hidden')} />
        <Video
          ref={v2Ref}
          src={frame2}
          controls
          className={cn('', !isEnterTv && 'hidden')}
          onEnded={() => {
            setShowFrame2(true)
          }}
        />
      </div>

      <Frame1 isEnterTv={isEnterTv} onClick={onClick} />
      {showFrame2 && <Frame2 />}
    </div>
  )
}

function MainBg() {
  return (
    <div className="relative h-screen w-screen">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(90deg, black, #06070d 0%, var(--color-dark) 30%, var(--color-dark) 70%, var(--color-black))'
        }}
      ></div>

      <div
        className="absolute inset-0 opacity-50"
        style={{ mixBlendMode: 'soft-light', backgroundColor: '#0095ff' }}
      ></div>
    </div>
  )
}
