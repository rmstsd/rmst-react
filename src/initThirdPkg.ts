import { useGSAP } from '@gsap/react'
import { Draggable, Flip, gsap, MotionPathPlugin, Observer, ScrollToPlugin, ScrollTrigger, TextPlugin } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger, Draggable, Flip, Observer, MotionPathPlugin, ScrollToPlugin, TextPlugin, useGSAP)

gsap.defaults({ ease: 'power3', duration: 1 })
