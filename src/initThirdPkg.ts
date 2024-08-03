import Lenis from 'lenis'
// import 'lenis/dist/lenis.css'

const lenis = new Lenis({})
// lenis.on('scroll', e => {})
function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

import { gsap, ScrollTrigger, Draggable, Flip, Observer, MotionPathPlugin, ScrollToPlugin, TextPlugin } from 'gsap/all'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, Draggable, Flip, Observer, MotionPathPlugin, ScrollToPlugin, TextPlugin, useGSAP)

gsap.defaults({ ease: 'power3', duration: 1 })
