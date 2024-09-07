import { useEventListener } from 'ahooks'
import gsap from 'gsap'
import { useEffect, useLayoutEffect, useRef } from 'react'

import type { SingleWordClass } from '../components/SingleWord/SingleWordClass'

import SingleWord from '../components/SingleWord/SingleWord'

export default function FloatCircle({ onClick }) {
  const singleWordRef = useRef<SingleWordClass>()
  const controlRef = useRef()

  const qtFuncRef = useRef<{ xTo: gsap.QuickToFunc, yTo: gsap.QuickToFunc }>({ xTo: null, yTo: null })

  useLayoutEffect(() => {
    gsap.to(controlRef.current, { opacity: 0, duration: 0 })
  }, [])

  useEffect(() => {
    qtFuncRef.current.xTo = gsap.quickTo(controlRef.current, 'x', { duration: 0.6 })
    qtFuncRef.current.yTo = gsap.quickTo(controlRef.current, 'y', { duration: 0.6 })
  }, [])

  useEventListener('mousemove', evt => {
    qtFuncRef.current.xTo(evt.clientX - 70)
    qtFuncRef.current.yTo(evt.clientY - 70)
  })

  const onMouseEnter = () => {
    gsap.to(controlRef.current, { opacity: 1 })
    singleWordRef.current.startRender()
  }
  const onMouseLeave = () => {
    gsap.to(controlRef.current, { opacity: 0 })
  }

  return (
    <>
      <div
        className="absolute inset-5 cursor-pointer"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
      />
      <div
        ref={controlRef}
        className="pointer-events-none absolute left-0 top-0 flex h-[140px] w-[140px] items-center justify-center rounded-full border border-white p-2"
      >
        <div
          className="flex h-full w-full items-center justify-center rounded-full"
          style={{ backdropFilter: 'blur(10px)', backgroundColor: 'rgba(rgba(255,255,255,.7))' }}
        >
          <SingleWord ref={singleWordRef} word="Click To Enter" className="mx-auto block text-sm" disabledHoverUpdate />
        </div>
      </div>
    </>
  )
}
