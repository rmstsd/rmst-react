import { useEffect } from 'react'

export default function Native() {
  useEffect(() => {
    const canvas = document.querySelector('canvas')

    canvas.width = canvas.parentElement.clientWidth
    canvas.height = canvas.parentElement.clientHeight

    const ctx = canvas.getContext('2d')

    const rects = Array.from({ length: 10000 }, () => {
      const x = Math.ceil(Math.random() * canvas.width)
      const y = Math.ceil(Math.random() * canvas.height)
      const width = Math.ceil(Math.random() * 20)
      const height = Math.ceil(1 + Math.random() * 20)
      const color = `rgb(${Math.ceil(Math.random() * 255)}, ${Math.ceil(Math.random() * 255)}, ${Math.ceil(
        Math.random() * 255
      )})`

      const cachedCanvas = document.createElement('canvas')
      cachedCanvas.width = width
      cachedCanvas.height = height
      const ctx = cachedCanvas.getContext('2d')
      ctx.fillStyle = color
      ctx.rect(0, 0, width, height)
      ctx.fill()

      const path2d = new Path2D()
      path2d.rect(x, y, width, height)

      return { x, y, width, height, color, path2d, cachedCanvas }
    })

    drawCanvas()

    let isPointerDown = false
    let prevX = 0
    let prevY = 0

    canvas.addEventListener('click', () => {
      const dd = ctx.getImageData(0, 0, canvas.width, canvas.height)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      setTimeout(() => {
        ctx.translate(200, 200)
        ctx.putImageData(dd, 0, 0)
      }, 1000)
    })

    canvas.addEventListener('pointerdown', event => {
      return
      isPointerDown = true
      prevX = event.clientX
      prevY = event.clientY
    })

    document.addEventListener('pointermove', event => {
      if (isPointerDown) {
        event.clientX - prevX
        event.clientY - prevY
        tx += event.clientX - prevX
        ty += event.clientY - prevY
        prevX = event.clientX
        prevY = event.clientY

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        ctx.save()
        ctx.translate(tx, ty)
        drawCanvas()
        ctx.restore()
      }
    })

    let tx = 0
    let ty = 0

    document.addEventListener('pointerup', () => {
      isPointerDown = false
    })

    function drawRect(rect) {
      ctx.beginPath()
      // ctx.rect(x, y, width, height)
      ctx.fillStyle = rect.color
      ctx.fill(rect.path2d)
    }

    function drawCanvas() {
      rects.forEach(rect => {
        // ctx.drawImage(rect.cachedCanvas, rect.x, rect.y, rect.cachedCanvas.width, rect.cachedCanvas.height)

        drawRect(rect)
      })
    }

    // 节流函数
    function throttle(fn, delay) {
      let timer = null
      return function (...args) {
        if (!timer) {
          timer = setTimeout(() => {
            fn.apply(this, args)
            timer = null
          }, delay)
        }
      }
    }
  }, [])

  return (
    <div className="h-full">
      <canvas width="400" height="800" className="touch-none"></canvas>
    </div>
  )
}
