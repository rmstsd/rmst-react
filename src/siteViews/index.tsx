import { useRef, useState } from 'react'

import frame1 from '@/assets/frame-1.mp4'
import frame2 from '@/assets/frame-2.mp4'
import Video from './components/Video'
import cn from '@/utils/cn'

import Frame1 from './frame/Frame1'
import Frame2 from './frame/Frame2'

export default function Home() {
  const [isEnterTv, setIsEnterTv] = useState(false)
  const [showFrame2, setShowFrame2] = useState(false)

  const v2Ref = useRef<HTMLVideoElement>()

  const onClick = () => {
    setIsEnterTv(true)
    v2Ref.current.play()
  }

  return (
    <div className="flow-root h-full relative">
      <Video src={frame1} autoPlay loop className={cn('absolute inset-0', isEnterTv && 'hidden')} />
      <Video
        ref={v2Ref}
        src={frame2}
        controls
        className={cn('absolute inset-0', !isEnterTv && 'hidden')}
        onEnded={() => {
          setShowFrame2(true)
        }}
      />

      <Frame1 isEnterTv={isEnterTv} onClick={onClick} />

      {showFrame2 && <Frame2 />}
    </div>
  )
}
