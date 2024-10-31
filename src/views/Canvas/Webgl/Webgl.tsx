import { useEffect } from 'react'
import { glDraw } from './gl-draw'

export default function Webgl() {
  useEffect(() => {
    const canvas = document.querySelector('canvas')
    canvas.width = canvas.parentElement.clientWidth
    canvas.height = canvas.parentElement.clientHeight

    glDraw(canvas)
  }, [])

  return (
    <div className="h-full border touch-none">
      <canvas />
    </div>
  )
}
