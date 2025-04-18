import opentype from 'opentype.js'
import { load } from 'opentype.js'
import { Application, Assets, Graphics, Sprite } from 'pixi.js'
import { useEffect, useState } from 'react'

import jk from '@/assets/jack-load.svg?raw'
import jk1 from '@/assets/jack-load-1.svg?raw'

export default function TestOpen() {
  useEffect(() => {
    init()
  }, [])

  const init = async () => {
    const pixiContainer = document.querySelector('.pixi-c')
    const app = new Application()

    await app.init({
      width: pixiContainer.clientWidth,
      height: pixiContainer.clientHeight,
      backgroundColor: '#fff',
      antialias: true,
      resolution: window.devicePixelRatio,
      autoDensity: true
    })

    pixiContainer.appendChild(app.canvas)

    const robotImg = new Graphics()
    robotImg.svg(jk1)

    robotImg.position.set(100, 100)
    app.stage.addChild(robotImg)

    new Graphics().moveTo(0, 0).lineTo(1, 1).fill({})

    return

    const canvas = document.querySelector('.canvas2d') as HTMLCanvasElement
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const buffer = await fetch('./汉仪中黑S.ttf').then(res => res.arrayBuffer())

    const font = opentype.parse(buffer)

    const x = 10
    const y = 60
    const fontSize = 22
    const text = '哈机器人abcdm46789001234啊四级考试东方故事第五人哦我省得麻烦梵蒂冈放'

    const textPaths = font.getPaths(text, x, y, fontSize)
    console.log('textPaths', textPaths)

    // font.draw(ctx, text, x, y, fontSize)
    // font.drawPoints(ctx, text, x, y, fontSize)

    const textPath = font.getPath(text, x, y, fontSize)
    const pathData = textPath.toPathData(4) // 4 为小数精度

    setD(pathData)
    // console.log(pathData)

    // ${textPath.toSVG(4)}

    const graphics = new Graphics()

    const drawText = fill => {
      graphics.clear()
      graphics.svg(
        `
        <svg xmlns="http://www.w3.org/2000/svg">
          <path d="${pathData}" fill="${fill}" />
        </svg>
        `
      )
    }

    drawText('red')

    app.stage.addChild(graphics)

    setTimeout(() => {
      drawText('blue')

      // app.stage.scale.set(4, 4)
    }, 1000)

    const path2d = new Path2D(pathData)

    ctx.fill(path2d)
  }

  const [d, setD] = useState('')

  return (
    <div>
      <div className="pixi-c border" style={{ height: 400 }}></div>

      <canvas width={600} height={500} className="canvas2d border"></canvas>

      <svg width={600} height={500} className="border">
        <path d={d} />
      </svg>
    </div>
  )
}
