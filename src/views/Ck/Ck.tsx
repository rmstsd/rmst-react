import { AreaMapViewStore } from '@/mapView/store'
import InitCanvasKit, { Canvas, Surface } from 'canvaskit-wasm/bin/canvaskit.js'
import { useEffect, useMemo, useRef } from 'react'

import mapData from '@/mapView/mapData.json'

const baseMmPerPx = 25

// https://github.com/blvd20/skia/blob/mine/modules/canvaskit/htmlcanvas/canvas2dcontext.js

export default function Ck() {
  const canvasContainerRef = useRef<HTMLDivElement>(null)
  const store = useMemo(() => new AreaMapViewStore(mapData as any), [])

  console.log(store.mapRuntime)

  useEffect(() => {
    init()
  }, [])

  const init = async () => {
    const { clientWidth, clientHeight } = canvasContainerRef.current
    const { canvasElement, dpr } = createCanvas(clientWidth, clientHeight)

    canvasContainerRef.current.appendChild(canvasElement)

    store.canvasMain = canvasContainerRef.current || null
    store.zoomAll()

    const init_scale = store.getScale()

    const loadFont = fetch('https://storage.googleapis.com/skia-cdn/misc/Roboto-Regular.ttf').then(response =>
      response.arrayBuffer()
    )
    const robotoData = await loadFont
    const CanvasKit = await InitCanvasKit()
    const surface = CanvasKit.MakeWebGLCanvasSurface(canvasElement)
    const roboto = CanvasKit.Typeface.MakeFreeTypeFaceFromData(robotoData)

    console.log(surface)

    const randomRects = Array.from({ length: 5000 }, () => {
      const x = randomNumber(clientWidth - 20)
      const y = randomNumber(clientHeight - 20)
      const width = randomNumber(20)
      const height = randomNumber(20)

      const r = randomNumber(255)
      const g = randomNumber(255)
      const b = randomNumber(255)

      const paint = new CanvasKit.Paint()
      paint.setAntiAlias(true)
      paint.setColor(CanvasKit.Color(r, g, b, 1))
      paint.setStyle(CanvasKit.PaintStyle.Fill)

      paint.setStrokeWidth(2)

      const rect = CanvasKit.XYWHRect(x, y, width, height)

      return { rect, paint }
    })

    const mapPaths = store.mapRuntime.paths.map(pathParams => {
      const path = pathParams.path1
      // 显示方向
      const daStart = 0.4
      const daShortSite = 1
      const daLongSite = 2.4

      const directionData = pathParams.dual
        ? `M${daStart},${-daShortSite} L${daStart},${daShortSite} L${daLongSite},0 L${daStart},${-daShortSite}`
        : `M${daStart},${-daShortSite} L${daStart},${daShortSite} L${daLongSite},0 L${daStart},${-daShortSite} 
         M${-daStart},${-daShortSite} L${-daStart},${daShortSite} L${-daLongSite},0 L${-daStart},${-daShortSite}`

      let directionTransform = ''

      let middleX, middleY, middleDirDeg: number
      if (path.middlePoint) {
        middleDirDeg = ((path.middlePoint.tangent || 0) / Math.PI) * 180
        middleX = (path.middlePoint.x * 1000) / baseMmPerPx
        middleY = (-path.middlePoint.y * 1000) / baseMmPerPx
        directionTransform = `translate(${middleX}, ${middleY}) rotate(${middleDirDeg})`
      }

      const paint = new CanvasKit.Paint()
      paint.setAntiAlias(true)
      paint.setColor(CanvasKit.parseColorString('#666'))
      paint.setStyle(CanvasKit.PaintStyle.Stroke)
      paint.setStrokeWidth(3)
      const path_main = CanvasKit.Path.MakeFromSVGString(pathParams.d)

      const paint_2 = new CanvasKit.Paint()
      paint_2.setAntiAlias(true)
      paint_2.setColor(CanvasKit.RED)
      paint_2.setStyle(CanvasKit.PaintStyle.Stroke)
      paint_2.setStrokeWidth(3)
      const path_direction = CanvasKit.Path.MakeFromSVGString(directionData)

      return { line: { path_main, paint, tx: 0, ty: 0 }, arrow: { path_direction, paint_2, tx: middleX, ty: middleY } }
    })

    // 点位
    const boundW = 8
    const boundWH = boundW / 2

    const pointsShapes = store.mapRuntime.points
      .map(pointParams => {
        const point = pointParams.point
        if (point.x == null || point.y == null) {
          return null
        }

        const transform = `translate(${(point.x * 1000) / baseMmPerPx}, ${(-point.y * 1000) / baseMmPerPx})`
        const label = point.name || `${Math.round(point.x * 1000)},${Math.round(point.y * 1000)}`

        const paint = new CanvasKit.Paint()
        paint.setAntiAlias(true)
        paint.setColor(CanvasKit.parseColorString('#3466e6'))
        paint.setStyle(CanvasKit.PaintStyle.Fill)
        paint.setStrokeWidth(2)
        const pointMain = CanvasKit.XYWHRect(-boundWH, -boundWH, boundW, boundW)

        const text = {
          x: (point.x * 1000) / baseMmPerPx,
          y: (-point.y * 1000) / baseMmPerPx + 880 / baseMmPerPx,
          text: label,
          // transform: 'scale(0.25)',
          fill: 'rgba(68, 68, 68, 0.8)'
        }

        const gItem = {
          tx: (point.x * 1000) / baseMmPerPx,
          ty: (-point.y * 1000) / baseMmPerPx,
          pointMain,
          paint,
          text
        }

        return gItem
      })
      .filter(Boolean)

    const textFont = new CanvasKit.Font(roboto, 14)
    const textPaint = new CanvasKit.Paint()
    textPaint.setColor(CanvasKit.RED)
    textPaint.setAntiAlias(true)

    console.log('init')

    function drawMap(canvas: Canvas) {
      canvas.drawText('Try Clicking!', 10, 280, textPaint, textFont)

      mapPaths.forEach(item => {
        canvas.drawPath(item.line.path_main, item.line.paint)

        // canvas.save()
        // canvas.translate(item.arrow.tx, item.arrow.ty)
        canvas.drawPath(item.arrow.path_direction, item.arrow.paint_2)
        // canvas.restore()
      })

      pointsShapes.forEach(item => {
        // canvas.save()
        // canvas.translate(item.tx, item.ty)

        canvas.drawRect(item.pointMain, item.paint)
        canvas.drawText(item.text.text, item.text.x, item.text.y, item.paint, textFont)

        // canvas.restore()
      })
    }

    function drawFrame(canvas: Canvas) {
      // console.log('drawFrame')

      canvas.clear(CanvasKit.TRANSPARENT)

      // canvas.scale
      canvas.save()

      canvas.scale(dpr, dpr)
      canvas.translate(store.offsetX, store.offsetY)
      canvas.scale(init_scale, init_scale)
      drawMap(canvas)

      // canvas.scale(dpr, dpr)
      // canvas.translate(tx, ty)
      // randomRects.forEach(item => {
      //   canvas.drawRect(item.rect, item.paint)
      // })

      canvas.restore()
    }

    document.addEventListener('contextmenu', evt => {
      evt.preventDefault()
    })

    surface.requestAnimationFrame(drawFrame)

    let prevX = 0
    let prevY = 0
    let tx = 0
    let ty = 0
    let count = 1
    canvasElement.onpointerdown = evt => {
      if (evt.buttons === 1) {
        evt.preventDefault()

        prevX = evt.clientX
        prevY = evt.clientY
      }
    }
    canvasElement.onpointermove = evt => {
      evt.preventDefault()

      if (evt.buttons === 1 && evt.pressure) {
        evt.clientX - prevX
        evt.clientY - prevY

        tx += evt.clientX - prevX
        ty += evt.clientY - prevY

        store.offsetX += evt.clientX - prevX
        store.offsetY += evt.clientY - prevY

        prevX = evt.clientX
        prevY = evt.clientY

        surface.requestAnimationFrame(drawFrame)
      }
    }
  }

  return <div className="canvas-container h-full touch-none border" ref={canvasContainerRef}></div>
}

export function createCanvas(containerWidth, containerHeight) {
  const canvasElement = document.createElement('canvas')
  const dpr = window.devicePixelRatio || 1
  const canvasWidth = containerWidth * dpr
  const canvasHeight = containerHeight * dpr

  canvasElement.width = canvasWidth
  canvasElement.height = canvasHeight
  canvasElement.style.width = '100%'
  canvasElement.style.height = '100%'

  return { canvasElement, dpr }
}

function randomNumber(end: number) {
  return Math.ceil(Math.random() * end)
}
