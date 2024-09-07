// import 'lenis/dist/lenis.css'

import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger, Draggable, Flip, Observer, MotionPathPlugin, ScrollToPlugin, TextPlugin } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger, Draggable, Flip, Observer, MotionPathPlugin, ScrollToPlugin, TextPlugin, useGSAP)

gsap.defaults({ ease: 'power3', duration: 1 })
