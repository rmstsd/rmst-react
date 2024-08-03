import { useLayoutEffect, useRef } from 'react'
import { createAnimation } from '../../animation'
import viteSvg from '@/assets/vite.svg'
import gsap from 'gsap'
import Features from './Frame2Com/Features'
import Investors from './Frame2Com/Investors'

export default function Frame2() {
  const container = useRef<HTMLDivElement>()

  const firstSh = 500

  useLayoutEffect(() => {
    const scaleFunc = createAnimation(0, firstSh, 1, 0.5)
    const opacityFunc = createAnimation(0, firstSh, 1, 0)

    const cText = document.querySelector('#c-text') as HTMLDivElement

    const aLeft = document.querySelector('#a-left') as HTMLDivElement
    const aRight = document.querySelector('#a-right') as HTMLDivElement

    const viteSvgImage = document.querySelector('.viteSvg') as HTMLDivElement

    const pContainer = document.querySelector('#pContainer') as HTMLDivElement

    if (!pContainer) {
      return
    }

    const rotate = createAnimation(0, pContainer.getBoundingClientRect().height - window.innerHeight, 0, 360) // playground.rect.height - window.innerHeight

    if (!cText || !aRight) {
      return
    }
    const txFunc = createAnimation(0, firstSh, 100, 0)

    window.onscroll = () => {
      updateStyle()
    }

    const tx = createAnimation(0, 500, 1, 1.3)
    document.addEventListener('mousemove', evt => {
      const rect = viteSvgImage.getBoundingClientRect()
      const center = { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 }
      const dis = Math.hypot(evt.clientX - center.x, evt.clientY - center.y)
      const sc = tx(dis)

      gsap.to(viteSvgImage, { scale: sc })
    })

    updateStyle()
    function updateStyle() {
      const scrollTop = window.scrollY
      // console.log('scrollTop', scrollTop)
      // console.log(scaleFunc(scrollTop), opacityFunc(scrollTop))

      const scale = scaleFunc(scrollTop)
      const opacity = opacityFunc(scrollTop)

      gsap.to(cText, { opacity, scale })

      if (aLeft) {
        gsap.to(aLeft, { xPercent: -txFunc(scrollTop) })
      }
      if (viteSvgImage) {
        gsap.to(viteSvgImage, { rotation: rotate(scrollTop) })
      }

      // gsap.to(aRight, { xPercent: -txFunc(scrollTop) })
      aRight.style.transform = `translateX(${txFunc(scrollTop)}%)`
    }
  }, [])

  return (
    <div ref={container} className="f2 relative" style={{ marginTop: '-100vh' }}>
      <div
        className="box sticky top-0 flex h-screen items-center justify-center text-4xl text-white xl:text-5xl"
        id="c-text"
        style={{ padding: '0 10%' }}
      >
        STR8FIRE redefines the entertainment industry. Original and renowned Web2 IPs are transformed in play-to-earn
        games and NFT collections that unlock ownership and rewards for the Web3 community.
      </div>
      <div id="pContainer" style={{ marginTop: '-100vh' }}>
        <div id="a-left" className="flex-center sticky top-0 flex h-screen w-1/2">
          <img className="viteSvg hidden sm:block" src={viteSvg} width={200} />
        </div>

        <div className="first" style={{ marginTop: '-100vh' }}>
          <div className="pg sticky top-0 overflow-hidden">
            <section id="a-right" className="a-right sticky top-0 ml-auto overflow-hidden sm:w-1/2">
              <ItemPanel />
            </section>
          </div>

          <div style={{ height: firstSh }}></div>
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

      <div className="next h-[1000px] bg-purple-500"></div>
    </div>
  )
}

function ItemPanel({ item = {}, index = 0 }) {
  return (
    <section className="flex h-screen flex-col justify-center border-b border-red-500 bg-[#121422] p-2 text-white">
      <div>/How it works</div>
      <div className="flex border-b border-white">
        <span className="mr-5">{String(index + 1).padStart(2, '0')}</span>
        <span>PLAY</span>
      </div>

      <div className="border-b border-white">
        Play the games, complete the missions, collect your Game Points. Now get rewarded with $STR8X airdrops.
      </div>
    </section>
  )
}
