import cn from '@/utils/cn'
import SingleWord from '../../components/SingleWord/SingleWord'
import MeTransition from '../../components/MeTransition'
import FloatCircle from '../../components/FloatCircle'
import gsap from 'gsap'
import { useRef } from 'react'

export default function Frame1({ isEnterTv, onClick }) {
  const leftTextRef = useRef()
  const rightTextRef = useRef()

  const _onClick = () => {
    gsap.to(leftTextRef.current, { x: '-100%' })
    gsap.to(rightTextRef.current, { x: '100%' })

    onClick()
  }

  return (
    <div
      className="f1 absolute inset-0 flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
    >
      <div className="w-full">
        <div ref={leftTextRef} className="w-fit">
          <SingleWord word="Redefining" className={cn('text-6xl block')} disabledHoverUpdate />
        </div>

        <div ref={rightTextRef} className="w-fit ml-auto">
          <SingleWord word="Entertainment" className={cn('text-6xl block')} disabledHoverUpdate />
        </div>
      </div>

      <MeTransition visible={!isEnterTv}>
        <div className="absolute left-0 bottom-0 w-full flex justify-between items-end p-4">
          <SingleWord
            word={
              'Join the future of entertainment with STR8FIRE, where IPs, games, and NFTs drive ownership and rewards for all. Play now, collect all, and earn exponentially.'
            }
            className="block w-[400px]"
            disabledHoverUpdate
          />

          <SingleWord word="Skip intro →" className="block" />
        </div>
      </MeTransition>

      {!isEnterTv && <FloatCircle onClick={_onClick} />}
    </div>
  )
}
