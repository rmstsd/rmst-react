import { Application, Assets, Container, Graphics, GraphicsPath, Sprite, Text, Matrix } from 'pixi.js'
import { useEffect, useRef, useState } from 'react'

import mapData from './smallData.json'
import { SceneAreaMapRuntime } from '../mapView/store'
import { genRects } from '../constant'
import randomColor from 'randomcolor'

import logoJpg from '@/assets/logo.jpg'

const siteSize = 0.5

export default function Pixi() {
  const [container, setContainer] = useState<HTMLDivElement>()
  const appRef = useRef<Application>()

  useEffect(() => {
    if (!container) {
      return
    }

    init()

    return () => {
      appRef.current?.destroy(true)
    }
  }, [container])

  const init = async () => {
    const app = new Application()
    appRef.current = app

    await app.init({ width: container.clientWidth, height: container.clientHeight, backgroundColor: '#fff' })

    const rectItem = new Graphics().rect(100, 100, 300, 200).fill('red')
    rectItem.eventMode = 'static'
    rectItem.cursor = 'pointer'

    const mt = new Matrix()
    mt.translate(100, 100).scale(2, 2)
    rectItem.setFromMatrix(mt)

    app.stage.addChild(rectItem)

    container.appendChild(app.canvas)

    return

    // app.stage.position.set(100, 100)
    // app.stage.scale.set(25)

    const gh = new Graphics()
    // const rects = mapData.sites.map(item => {
    //   const rect = gh.rect(item.x - siteSize / 2, item.y - siteSize / 2, siteSize, siteSize).fill('red')

    //   rect.eventMode = 'static'
    //   rect.cursor = 'pointer'

    //   return rect
    // })
    // app.stage.addChild(...rects)

    // const mapRuntime = new SceneAreaMapRuntime(mapData as any)
    // {
    //   mapRuntime.paths.map(pathParams => {
    //     const path = pathParams.path1
    //     // 显示方向
    //     const daStart = 0.4
    //     const daShortSite = 1
    //     const daLongSite = 2.4

    //     const directionData = pathParams.dual
    //       ? `M${daStart},${-daShortSite} L${daStart},${daShortSite} L${daLongSite},0 L${daStart},${-daShortSite}`
    //       : `M${daStart},${-daShortSite} L${daStart},${daShortSite} L${daLongSite},0 L${daStart},${-daShortSite}
    //        M${-daStart},${-daShortSite} L${-daStart},${daShortSite} L${-daLongSite},0 L${-daStart},${-daShortSite}`

    //     let directionTransform = ''

    //     let middleX, middleY, middleDirDeg: number
    //     if (path.middlePoint) {
    //       middleDirDeg = ((path.middlePoint.tangent || 0) / Math.PI) * 180
    //       middleX = path.middlePoint.x
    //       middleY = -path.middlePoint.y
    //       directionTransform = `translate(${middleX}, ${middleY}) rotate(${middleDirDeg})`
    //     }

    //     const gItem = new Container()

    //     const path_main = new GraphicsPath(pathParams.d) // , fill: 'none', stroke: '#666', strokeWidth: 3 }

    //     // const path_direction = new Path({ path: directionData, fill: { type: 'solid', color: 'transparent' } })
    //     // path_direction.move(middleX, middleY)
    //     // path_direction.rotation = middleDirDeg
    //     gItem.addChild(
    //       gh.path(path_main)
    //       // path_direction
    //     )

    //     return gItem
    //   })
    // }

    // const g = new Container()
    // const rects2 = genRects(10, 500, 500, 60).map(rect => {
    //   const rectItem = new Graphics().rect(rect.x, rect.y, rect.width, rect.height).fill(rect.fill)
    //   rectItem.eventMode = 'static'
    //   rectItem.cursor = 'pointer'

    //   rectItem.onclick = () => {
    //     console.log('aaa')

    //     gh.clear()

    //     rects2.forEach(item => {
    //       item.rect(rect.x, rect.y, rect.width, rect.height).fill(rect.fill)
    //     })

    //     gh.rect(rect.x, rect.y, rect.width, rect.height).fill(randomColor()).stroke('red')
    //   }

    //   g.addChild(rectItem)

    //   return gh
    // })

    // app.stage.addChild(g)

    // {
    //   let count = 0
    //   // Let's create a moving shape
    //   const thing = new Graphics()
    //   app.stage.addChild(thing)

    //   // Animate the moving shape
    //   app.ticker.add(() => {
    //     count += 1

    //     thing.clear()

    //     thing.rect(count, 100, 100, 100).fill(randomColor())

    //     // thing
    //     //   .moveTo(-120 + Math.sin(count) * 20, -100 + Math.cos(count) * 20)
    //     //   .lineTo(120 + Math.cos(count) * 20, -100 + Math.sin(count) * 20)
    //     //   .lineTo(120 + Math.sin(count) * 20, 100 + Math.cos(count) * 20)
    //     //   .lineTo(-120 + Math.cos(count) * 20, 100 + Math.sin(count) * 20)
    //     //   .lineTo(-120 + Math.sin(count) * 20, -100 + Math.cos(count) * 20)
    //     //   .fill({ color: 0xffff00, alpha: 0.5 })
    //     //   .stroke({ width: 10, color: 0xff0000 })

    //     // thing.rotation = count * 0.1
    //   })
    // }

    // const path_main = new GraphicsPath(
    //   'M4.99989 13.9999L4.99976 5L6.99976 4.99997L6.99986 11.9999L17.1717 12L13.222 8.05024L14.6362 6.63603L21.0001 13L14.6362 19.364L13.222 17.9497L17.1717 14L4.99989 13.9999Z'
    // )
    // const pathShape = gh.path(path_main).fill('pink')
    // app.stage.addChild(pathShape)

    // const basicText = new Text({ text: 'Basic text in pixi' })
    // basicText.x = 50
    // basicText.y = 100

    // basicText.eventMode = 'static'
    // basicText.cursor = 'pointer'

    // basicText.onclick = () => {
    //   basicText.text = randomColor()
    // }

    // app.stage.addChild(basicText)

    // // Load the bunny texture
    // const texture = await Assets.load(logoJpg)
    // const bunny = new Sprite(texture)

    // bunny.eventMode = 'static'
    // bunny.cursor = 'move'

    // // Center the sprite's anchor point
    // bunny.anchor.set(0.5)

    // // Move the sprite to the center of the screen
    // bunny.x = app.screen.width / 2
    // bunny.y = app.screen.height / 2
    // bunny.width = 200
    // bunny.height = 200
    // bunny.alpha = 0.5

    // app.stage.addChild(bunny)
  }

  return <div className="pixi h-full" ref={setContainer}></div>
}
