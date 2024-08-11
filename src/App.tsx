import { useRoutes } from 'react-router-dom'
import { createContext, useContext, useEffect, useState } from 'react'
import Lenis from 'lenis'

import { siteRoutes } from './routes/siteRoutes'

import './initThirdPkg'

export const useScroll = (callback: Function, deps = []) => {
  const lenis = useContext(LenisContext)

  useEffect(() => {
    if (!lenis) {
      return
    }

    lenis.on('scroll', callback)

    return () => {
      lenis.off('scroll', callback)
    }
  }, [lenis, callback, ...deps])
}

const LenisContext = createContext<Lenis>(null)

const App = () => {
  const element = useRoutes(siteRoutes)

  const [lenis] = useState<Lenis>(() => {
    const lenisIns = new Lenis({})

    function raf(time) {
      lenisIns.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return lenisIns
  })

  return <LenisContext.Provider value={lenis}>{element}</LenisContext.Provider>
}

export default App
