import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

import { mapRange } from '../../animation'
import viteSvg from '@/assets/vite.svg'

import Features from './Frame2Com/Features'
import Investors from './Frame2Com/Investors'
import TeamCredits from './Frame2Com/TeamCredits'
import { useEventListener } from 'ahooks'
import { useScroll } from '@/App'

export default function Frame2() {
  const container = useRef<HTMLDivElement>()
  const viteSvgImageRef = useRef<HTMLImageElement>()

  const cTextRef = useRef<HTMLDivElement>()
  const pContainerRef = useRef<HTMLDivElement>()
  const aLeftRef = useRef<HTMLDivElement>()
  const aRightRef = useRef<HTMLDivElement>()

  const firstSh = 500

  useEventListener('mousemove', evt => {
    const rect = viteSvgImageRef.current.getBoundingClientRect()
    const center = { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 }
    const dis = Math.hypot(evt.clientX - center.x, evt.clientY - center.y)
    const scale = mapRange(0, 500, dis, 1, 1.3)

    gsap.to(viteSvgImageRef.current, { scale })
  })

  useLayoutEffect(() => {
    updateStyle(window.scrollY, true)
  }, [])

  useScroll(({ scroll }) => {
    updateStyle(scroll)
  })

  function updateStyle(scroll: number, init = false) {
    const scrollTop = scroll

    const duCfg = init ? { duration: 0 } : {}

    const opacity = mapRange(0, firstSh, scrollTop, 1, 0)
    const scale = mapRange(0, firstSh, scrollTop, 1, 0.5)
    gsap.to(cTextRef.current, { opacity, scale, ...duCfg })

    const xPercent = mapRange(0, firstSh, scrollTop, 100, 0)
    gsap.to(aLeftRef.current, { xPercent: -xPercent, ...duCfg })
    gsap.to(aRightRef.current, { xPercent, duration: 0 })

    const rotatePlaygroundInMax = pContainerRef.current.getBoundingClientRect().height - window.innerHeight
    const rotate = mapRange(0, rotatePlaygroundInMax, scrollTop, 0, 360)
    gsap.to(viteSvgImageRef.current, { rotation: rotate, ...duCfg })
  }

  return (
    <div ref={container} className="f2 relative" style={{ marginTop: '-100vh' }}>
      <div
        ref={cTextRef}
        className="c-text box sticky top-0 flex h-screen items-center justify-center text-4xl text-white xl:text-5xl"
        style={{ padding: '0 10%' }}
      >
        STR8FIRE redefines the entertainment industry. Original and renowned Web2 IPs are transformed in play-to-earn
        games and NFT collections that unlock ownership and rewards for the Web3 community.
      </div>

      <div ref={pContainerRef} className="p-container" style={{ marginTop: '-100vh' }}>
        <div ref={aLeftRef} className="a-left flex-center sticky top-0 flex h-screen w-1/2">
          <img ref={viteSvgImageRef} className="hidden sm:block" src={viteSvg} width={200} />
        </div>

        <div className="first" style={{ marginTop: '-100vh' }}>
          <div className="pg sticky top-0 overflow-hidden">
            <section ref={aRightRef} className="a-right sticky top-0 ml-auto overflow-hidden sm:w-1/2">
              <ItemPanel />
            </section>
          </div>

          <div style={{ height: firstSh }} />
        </div>

        <section className="ml-auto sm:w-1/2">
          <ItemPanel index={1} />
          <ItemPanel index={2} />
          <ItemPanel index={3} />
          <ItemPanel index={4} />
        </section>
      </div>

      <Features />

      <Investors />

      <TeamCredits />

      <div className="next h-[1000px] bg-purple-500" />
    </div>
  )
}

function ItemPanel({ item = {}, index = 0 }) {
  return (
    <section className="flex h-screen flex-col justify-center border-b border-red-500 bg-[#121422] p-4 text-white">
      <div>/How it works</div>
      <div className="flex border-b border-white py-4 text-4xl">
        <span className="mr-5">{String(index + 1).padStart(2, '0')}</span>
        <span>PLAY</span>
      </div>

      <div className="border-b border-white">
        Play the games, complete the missions, collect your Game Points. Now get rewarded with $STR8X airdrops.
      </div>
    </section>
  )
}
