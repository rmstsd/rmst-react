import { useEffect } from 'react'
import { drawByWebGL } from './nice/nice'

export default function Webgl() {
  useEffect(() => {
    const canvas = document.querySelector('canvas')
    canvas.width = canvas.parentElement.clientWidth
    canvas.height = canvas.parentElement.clientHeight

    drawByWebGL(canvas)
  }, [])

  return (
    <div className="h-full touch-none border">
      <canvas />
    </div>
  )
}
