import { useEffect } from 'react'
import { genRects } from '../constant'

export default function Native() {
  useEffect(() => {
    const canvas = document.querySelector('canvas')

    canvas.width = canvas.parentElement.clientWidth
    canvas.height = canvas.parentElement.clientHeight

    const ctx = canvas.getContext('2d')

    const rects = genRects(10000, canvas.clientWidth, canvas.clientHeight)

    let dd

    drawCanvas()

    let isPointerDown = false
    let prevX = 0
    let prevY = 0

    canvas.addEventListener('click', () => {})

    canvas.addEventListener('pointerdown', event => {
      event.preventDefault()

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
        {
          // ctx.putImageData(dd, tx, ty)
          // return
        }

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
      const { x, y, width, height } = rect
      ctx.rect(x, y, width, height)
      ctx.fillStyle = rect.fill
      ctx.fill()
    }

    function drawCanvas() {
      rects.forEach(rect => {
        drawRect(rect)
      })

      // dd = ctx.getImageData(0, 0, canvas.width, canvas.height)
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
