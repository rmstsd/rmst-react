import { Leafer, App, Rect, Box } from 'leafer-ui'
import '@leafer-in/editor'
import '@leafer-in/state'
import '@leafer-in/animate'

import { useEffect } from 'react'

export default function LeaferDemo() {
  useEffect(() => {
    var leafer = new App({
      view: document.querySelector('.ll-aa'),
      editor: {}
    })
    // leafer.config.move.drag = true

    const randomRects = Array.from({ length: 40 }, () => {
      const x = Math.floor(Math.random() * window.innerWidth)
      const y = Math.floor(Math.random() * window.innerHeight)
      const width = Math.floor(Math.random() * 30)
      const height = Math.floor(Math.random() * 30)
      const fill = '#' + Math.floor(Math.random() * 16777215).toString(16)
      return new Rect({
        editable: true,
        draggable: true,
        x,
        y,
        width,
        height,
        fill,
        cursor: 'pointer',
        hoverStyle: {
          fill: '#FF4B4B',
          cornerRadius: 20
        },
        pressStyle: {
          fill: 'pink',
          transitionOut: 'bounce-out'
        }
      })
    })

    randomRects.forEach(rect => {
      leafer.tree.add(rect)
    })

    const box = new Box({
      editable: true,
      x: 100,
      y: 100,
      width: 200,
      height: 200,
      fill: 'rgba(255, 0, 0, 0.5)',
      cursor: 'pointer',
      children: [
        new Rect({
          editable: true,
          x: 50,
          y: 50,
          width: 20,
          height: 30,
          fill: 'rgba(0, 255, 0, 0.5)'
        })
      ]
    })

    leafer.tree.add(box)
  }, [])
  return <div className="ll-aa h-full"></div>
}
