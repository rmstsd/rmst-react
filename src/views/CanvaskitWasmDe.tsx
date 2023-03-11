import { useEffect } from 'react'
import CanvasKitInit from 'canvaskit-wasm'

const CanvaskitWasmDe = () => {
  useEffect(() => {
    effectInit()
  }, [])

  const effectInit = async () => {
    const canvasDom = document.querySelector('canvas')
    const CanvasKit = await CanvasKitInit({ locateFile: file => '/node_modules/canvaskit-wasm/bin/' + file })

    let paint = new CanvasKit.Paint()
    paint.setAntiAlias(true)
    paint.setColor(CanvasKit.Color(0, 200, 0, 1))
    paint.setStyle(CanvasKit.PaintStyle.Stroke)
    paint.setStrokeWidth(2)
    paint.setColor(CanvasKit.Color(0, 200, 200, 1))
    paint.setStyle(CanvasKit.PaintStyle.Fill)

    // 平滑
    paint.setPathEffect(CanvasKit.PathEffect.MakeCorner(50))

    const surface = CanvasKit.MakeSWCanvasSurface(canvasDom)

    console.log(CanvasKit.MakeCanvas(600, 400))

    let path = new CanvasKit.Path()
    path.moveTo(80, 30)
    path.lineTo(80, 40)
    path.lineTo(60, 40)

    surface.requestAnimationFrame(canvas => {
      canvas.clear(CanvasKit.WHITE)

      // canvas.drawPath(path, paint)

      canvas.drawCircle(100, 100, 50, paint)
    })
  }
  return (
    <div>
      <canvas className="border-2" width={600} height={400}></canvas>
    </div>
  )
}

export default CanvaskitWasmDe
