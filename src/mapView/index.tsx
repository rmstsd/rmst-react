import { useEffect, useMemo, useRef } from 'react'
import { Group, Image, Leafer, Path, Rect, Text } from 'leafer-ui'
import { AreaMapViewStore } from './store'

import mapData from './mapData.json'

const baseMmPerPx = 25

export default function MapView() {
  const store = useMemo(() => new AreaMapViewStore(mapData as any), [])

  console.log(store.mapRuntime)

  const containerRef = useRef<HTMLDivElement>()

  useEffect(() => {
    store.canvasMain = containerRef.current || null
    store.zoomAll()

    const canvas = new Leafer({
      view: containerRef.current,
      width: containerRef.current?.clientWidth,
      height: containerRef.current?.clientHeight
    })

    canvas.app.config.move.drag = true
    canvas.app.config.wheel.zoomMode = true

    const rootGroup = new Group({})

    // 环境点云
    // {
    //   const pc = store.map.envPointCloud
    //   if (pc) {
    //     const href = filePathToAbsolutePath(pc.imagePath) || ''
    //     const width = (pc.width * 1000) / baseMmPerPx
    //     const height = (pc.height * 1000) / baseMmPerPx
    //     const originX = ((pc.imageOriginX / pc.scale) * 1000) / baseMmPerPx
    //     const originY = ((pc.imageOriginY / pc.scale) * 1000) / baseMmPerPx
    //     const envPointCloudNode = new Group({})
    //     envPointCloudNode.move(originX, originY)
    //     const img = new Image({ width, height, url: href })
    //     envPointCloudNode.add(img)
    //     // rootGroup.add(envPointCloudNode)
    //   }
    // }

    {
      // 路径
      const pathGroup = new Group({})
      const pathList = store.mapRuntime.paths.map(pathParams => {
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

        const gItem = new Group()

        const path_main = new Path({ path: pathParams.d, fill: 'none', stroke: '#666', strokeWidth: 3 })
        const path_direction = new Path({ path: directionData, fill: { type: 'solid', color: 'transparent' } })
        path_direction.move(middleX, middleY)
        path_direction.rotation = middleDirDeg
        gItem.addMany(path_main, path_direction)

        return gItem
      })
      pathGroup.addMany(...pathList)
      rootGroup.add(pathGroup)
    }

    {
      // 点位
      const pointsGroup = new Group({})

      const boundW = 8
      const boundWH = boundW / 2
      const borderRadius = 4

      const pointsShapes = store.mapRuntime.points
        .map(pointParams => {
          const point = pointParams.point
          if (point.x == null || point.y == null) {
            return null
          }

          const transform = `translate(${(point.x * 1000) / baseMmPerPx}, ${(-point.y * 1000) / baseMmPerPx})`
          const label = point.name || `${Math.round(point.x * 1000)},${Math.round(point.y * 1000)}`

          const gItem = new Group({})
          gItem.move((point.x * 1000) / baseMmPerPx, (-point.y * 1000) / baseMmPerPx)
          const pointMain = new Rect({
            width: boundW,
            height: boundW,
            x: -boundWH,
            y: -boundWH,
            // radius: borderRadius,
            fill: '#3466e6'
          })

          const text = new Text({
            x: 0,
            y: 880 / baseMmPerPx,
            text: label,
            // transform: 'scale(0.25)',
            fill: 'rgba(68, 68, 68, 0.8)',
            fontSize: 20,
            textAlign: 'center',
            scale: 0.25
          })

          gItem.addMany(pointMain)

          return gItem
        })
        .filter(Boolean)

      pointsGroup.addMany(...(pointsShapes as Group[]))
      rootGroup.addMany(pointsGroup)
    }

    canvas.addMany(rootGroup)
  }, [])

  return <div className="h-full" ref={containerRef}></div>
}
