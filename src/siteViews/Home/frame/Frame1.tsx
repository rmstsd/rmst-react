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
          <SingleWord word="Redefining" className={cn('block text-6xl')} disabledHoverUpdate />
        </div>

        <div ref={rightTextRef} className="ml-auto w-fit">
          <SingleWord word="Entertainment" className={cn('block text-6xl')} disabledHoverUpdate />
        </div>
      </div>

      <MeTransition visible={!isEnterTv}>
        <div className="absolute bottom-0 left-0 flex w-full flex-col p-4 sm:flex-row">
          <SingleWord
            word={
              'Join the future of entertainment with STR8FIRE, where IPs, games, and NFTs drive ownership and rewards for all. Play now, collect all, and earn exponentially.'
            }
            className="block w-[400px]"
            disabledHoverUpdate
          />

          <SingleWord word="Skip intro →" className="ml-auto mt-auto" />
        </div>
      </MeTransition>

      {!isEnterTv && <FloatCircle onClick={_onClick} />}
    </div>
  )
}
