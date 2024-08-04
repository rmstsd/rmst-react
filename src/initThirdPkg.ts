// import 'lenis/dist/lenis.css'

import { gsap, ScrollTrigger, Draggable, Flip, Observer, MotionPathPlugin, ScrollToPlugin, TextPlugin } from 'gsap/all'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, Draggable, Flip, Observer, MotionPathPlugin, ScrollToPlugin, TextPlugin, useGSAP)

gsap.defaults({ ease: 'power3', duration: 1 })
