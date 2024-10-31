import { Leafer, Rect } from 'leafer-ui'
import { useEffect } from 'react'

export default function LeaferDemo() {
  useEffect(() => {
    var leafer = new Leafer({ view: document.querySelector('.ll-aa') })
    leafer.config.move.drag = true

    const randomRects = Array.from({ length: 4000 }, () => {
      const x = Math.floor(Math.random() * window.innerWidth)
      const y = Math.floor(Math.random() * window.innerHeight)
      const width = Math.floor(Math.random() * 30)
      const height = Math.floor(Math.random() * 30)
      const fill = '#' + Math.floor(Math.random() * 16777215).toString(16)
      return new Rect({ x, y, width, height, fill })
    })

    randomRects.forEach(rect => {
      leafer.add(rect)
    })
  }, [])
  return <div className='h-full ll-aa' ></div>
}
