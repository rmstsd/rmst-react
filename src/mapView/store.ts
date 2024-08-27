import { MapPath, MapPoint, SceneAreaMap } from './type/scene-types'
import { Rect } from './type/geo-types'

import React from 'react'

type MapToTyped<T> = { [name: string]: T }

export const baseMmPerPx = 25

export class AreaMapViewStore {
  mapRuntime: SceneAreaMapRuntime

  canvasMain: HTMLElement | null = null

  mmPerPx = baseMmPerPx
  offsetX = 0
  offsetY = 0

  downClientX = 0
  downClientY = 0
  initOffsetX = 0
  initOffsetY = 0

  constructor(public map: SceneAreaMap) {
    this.mapRuntime = new SceneAreaMapRuntime(map)
  }

  getScale() {
    return baseMmPerPx / this.mmPerPx
  }

  onPointerDown = (e: React.PointerEvent) => {
    e.preventDefault()
    e.stopPropagation()

    this.canvasMain?.focus()

    this.downClientX = e.clientX
    this.downClientY = e.clientY

    this.initOffsetX = this.offsetX
    this.initOffsetY = this.offsetY
  }

  zoomAll = () => {
    const canvasMain = this.canvasMain
    if (!canvasMain) return

    const bound = this.map.bound
    const ps = getZoomAllParams(bound, canvasMain)
    console.log('getZoomAllParams', ps)
    if (!ps) return

    this.mmPerPx = ps.mmPerPx
    this.offsetX = ps.offsetX
    this.offsetY = ps.offsetY
  }

  changeZoomTo = (mmPerPx1: number) => {
    const canvasMain = this.canvasMain
    if (!canvasMain) return
    const rect = canvasMain.getBoundingClientRect()

    const mmPerPx0 = this.mmPerPx
    console.log(`change zoom from ${mmPerPx0} to ${mmPerPx1}`)
    this.offsetX = rect.width / 2 - ((rect.width / 2 - this.offsetX) * mmPerPx0) / mmPerPx1
    this.offsetY = rect.height / 2 - ((rect.height / 2 - this.offsetY) * mmPerPx0) / mmPerPx1
    this.mmPerPx = mmPerPx1
  }

  zoomIn = () => {
    if (this.mmPerPx < 2) {
      this.changeZoomTo(1)
    } else {
      this.changeZoomTo(this.mmPerPx / 1.2)
    }
  }

  zoomOut = () => {
    if (this.mmPerPx > 1000 * 100) return
    this.changeZoomTo(this.mmPerPx * 1.2)
  }

  updateMap = (map: SceneAreaMap) => {
    this.map = map
    this.mapRuntime = new SceneAreaMapRuntime(map)
    this.zoomAll()
  }
}

class SceneAreaMapRuntime {
  points: UiPointParams[] = []

  paths: UiPathParams[] = []
  pathByKey: MapToTyped<UiPathParams> = {} // 对于双向路，两个路径的 key 指向同一个 UiPathParams 对象

  constructor(areaMap: SceneAreaMap) {
    for (const point of areaMap.points) {
      if (point.disabled) continue
      this.points.push({ id: point.id, point })
    }
    for (const path of areaMap.paths) {
      if (path.disabled) continue
      const reversedKey = getPathKey(path.toPointName, path.fromPointName) // 反向路径
      const reversedPath = this.pathByKey[reversedKey]
      if (reversedPath != null) {
        // console.log("dual path")
        reversedPath.path2 = path
        reversedPath.dual = true
      } else {
        let d = ''
        if (path.tracePoints.length) {
          const p1 = path.tracePoints[0]
          d = `M${(p1.x * 1000) / baseMmPerPx},${(-p1.y * 1000) / baseMmPerPx}`
          for (const tp of path.tracePoints) {
            d += ` L${(tp.x * 1000) / baseMmPerPx},${(-tp.y * 1000) / baseMmPerPx}`
          }
        }
        const pp: UiPathParams = { id: path.id, path1: path, dual: false, d }
        this.paths.push(pp)
        this.pathByKey[getPathKey(path.fromPointName, path.toPointName)] = pp
        this.pathByKey[reversedKey] = pp
      }
    }
  }
}

/**
 * UI 需要的点位参数。
 */
interface UiPointParams {
  id: number
  point: MapPoint
}

/**
 * UI 需要的路径参数。
 * 双向路合并为一条。
 */
interface UiPathParams {
  id: number
  path1: MapPath // 主路径
  path2?: MapPath | null // 对于双向路，反向路径
  dual: boolean // 双向路
  d: string
}

/**
 * 路径的 key
 */
function getPathKey(fromPointName: string, toPointName: string) {
  return `${fromPointName}->${toPointName}`
}

/**
 * 如果未初始化，搞个默认矩形区域
 */
function getZoomAllParams(bound: Rect | null, canvasMain: HTMLElement) {
  if (!bound || bound.width <= 0 || bound.height <= 0) return null

  const minX = bound.cx - bound.width / 2
  const minY = bound.cy - bound.height / 2
  const maxX = bound.cx + bound.width / 2
  const maxY = bound.cy + bound.height / 2

  const rect = canvasMain.getBoundingClientRect()
  if (!(rect.width && rect.height)) return null

  // 加 4 米余量，最小宽度 5 米
  const width = Math.max(bound.width + 4, 5)
  const height = Math.max(bound.height + 4, 5)

  // 地图中心点，以毫米
  const cxMm = (1000 * (maxX! + minX!)) / 2
  const cyMm = (1000 * (maxY! + minY!)) / 2

  let mmPerPx = Math.max((width * 1000) / rect.width, (height * 1000) / rect.height)
  mmPerPx = Math.round(mmPerPx)
  if (mmPerPx < 1) mmPerPx = 1

  const offsetX = Math.round(rect.width / 2 - cxMm / mmPerPx)
  const offsetY = Math.round(rect.height / 2 + cyMm / mmPerPx)

  return { mmPerPx, offsetX, offsetY }
}
