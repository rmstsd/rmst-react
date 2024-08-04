import { useEffect, useRef, useState } from 'react'
import frame1 from '@/assets/frame-1.mp4'
import frame2 from '@/assets/frame-2.mp4'
import cn from '@/utils/cn'

import Frame1 from './frame/Frame1'
import Frame2 from './frame/Frame2'

import Video from '../components/Video'
import gsap from 'gsap'

const inFrame2 = true

export default function Home() {
  const [isEnterTv, setIsEnterTv] = useState(inFrame2)
  const [showFrame2, setShowFrame2] = useState(inFrame2)

  const v1Ref = useRef<HTMLVideoElement>()
  const v2Ref = useRef<HTMLVideoElement>()

  const onClick = () => {
    gsap.to(v1Ref.current, { display: 'none' })
    gsap.to(v2Ref.current, { display: 'unset' })

    setIsEnterTv(true)
    v2Ref.current.play()
  }

  return (
    <div className="relative flow-root">
      <div className="sticky top-0 h-screen">
        <MainBg />

        <Video ref={v1Ref} src={frame1} autoPlay loop className={cn('absolute inset-0')} />
        <Video
          ref={v2Ref}
          src={frame2}
          className={cn('absolute inset-0 hidden')}
          onEnded={() => {
            gsap.to(v2Ref.current, { display: 'none' })
          }}
          onPlay={() => {
            setTimeout(() => {
              setShowFrame2(true)
            }, 4000)
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
    <div className="h-full">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(90deg, black, #06070d 0%, var(--color-dark) 30%, var(--color-dark) 70%, var(--color-black))'
        }}
      />

      <div className="absolute inset-0" style={{ mixBlendMode: 'soft-light', backgroundColor: '#0095ff' }}></div>
    </div>
  )
}
