import { configure, makeAutoObservable } from 'mobx'
import { createNodeItem, getOriDataById, type NodeItem, rootNode } from '../shared/oriData'
import { findNode } from '../shared/utils'

configure({ enforceActions: 'never' })

export const DataSourceAttrName = 'data-source-id'
export const DataNodeAttrName = 'data-node-id'

export const isRootNode = (node: NodeItem) => node.type === 'root'

class Store {
  constructor() {
    makeAutoObservable(this)
  }

  draggedNode: NodeItem | null = null

  rootNode = rootNode

  pos = { x: 0, y: 0 }

  init() {
    document.addEventListener('pointerdown', evt => {
      const target = evt.target as HTMLElement

      const sourceELement = target.closest(`[${DataSourceAttrName}]`)
      const nodeELement = target.closest(`[${DataNodeAttrName}]`)

      if (sourceELement) {
        const sourceId = sourceELement.getAttribute(DataSourceAttrName)
        this.draggedNode = createNodeItem(getOriDataById(sourceId))

        this.pos.x = evt.clientX
        this.pos.y = evt.clientY
      } else if (nodeELement) {
        const nodeId = nodeELement.getAttribute(DataNodeAttrName)
        const node = findNode(nodeId, this.rootNode)

        if (isRootNode(node)) {
          return
        }

        this.draggedNode = node

        this.pos.x = evt.clientX
        this.pos.y = evt.clientY
      }
    })
    document.addEventListener('pointermove', evt => {
      if (this.draggedNode) {
        this.pointerDrag(evt)
      }
    })
    document.addEventListener('pointerup', evt => {
      this.draggedNode = null
      this.indicator.x = 0
      this.indicator.y = 0
      this.indicator.width = 0
    })
  }

  closestNode: NodeItem | null = null

  indicator = { x: 0, y: 0, width: 0 }

  pointerDrag(evt: PointerEvent) {
    const target = evt.target as HTMLElement

    const x = evt.clientX
    const y = evt.clientY

    const point = { x, y }

    this.pos.x = evt.clientX
    this.pos.y = evt.clientY

    const touchElement = target.closest(`[${DataNodeAttrName}]`)

    // console.log('touchElement', touchElement)

    const touchNode = this.findNodeByElement(touchElement)
    const closestNode = this.findClosestNode(point, touchNode)

    this.closestNode = closestNode
    console.log('closestNode', closestNode.title)

    const closestPosition = this.calcClosestPosition(point)
    console.log(closestPosition)

    const closestRect = this.getELementByNodeId(this.closestNode.id).getBoundingClientRect()
    this.indicator.width = closestRect.width
    this.indicator.x = closestRect.left

    if (closestPosition === ClosestPosition.beforebegin) {
      this.indicator.y = closestRect.y
    } else if (closestPosition === ClosestPosition.afterend) {
      this.indicator.y = closestRect.y + closestRect.height
    }
  }

  findNodeByElement(element: Element) {
    const nodeId = element.getAttribute(DataNodeAttrName)
    const node = findNode(nodeId, this.rootNode)
    return node
  }

  findClosestNode(point: IPoint, touchNode: NodeItem) {
    if (touchNode.children.length > 0) {
      let closestNode: NodeItem | null = null
      let minDistance = Infinity

      touchNode.children.forEach(child => {
        const element = this.getELementByNodeId(child.id)
        const rect = element.getBoundingClientRect()

        const distance = isPointInRect(point, rect) ? 0 : calcDistanceOfPointToRect(point, rect)

        if (distance < minDistance) {
          minDistance = distance
          closestNode = child
        }
      })

      return closestNode
    }

    return touchNode
  }

  calcClosestPosition(point: IPoint): ClosestPosition {
    const element = this.getELementByNodeId(this.closestNode.id)
    const rect = element.getBoundingClientRect()

    if (isPointInRect(point, rect)) {
      // 鼠标在矩形内

      const centerY = rect.y + rect.height / 2

      if (point.y < centerY) {
        return ClosestPosition.beforebegin
      } else {
        return ClosestPosition.afterend
      }
    } else {
      const isAfter = isNearAfter(point, rect)

      return isAfter ? ClosestPosition.afterend : ClosestPosition.beforebegin
    }
  }

  getELementByNodeId(nodeId: string) {
    return document.querySelector(`[${DataNodeAttrName}="${nodeId}"]`)
  }
}

export const store = new Store()

export interface IPoint {
  x: number
  y: number
}

// export function isPointInRect(point: IPoint, rect: IRect, sensitive = true) {
//   const boundSensor = (value: number) => {
//     if (!sensitive) return 0
//     const sensor = value * 0.1
//     if (sensor > 20) return 20
//     if (sensor < 10) return 10
//     return sensor
//   }

//   return (
//     point.x >= rect.x + boundSensor(rect.width) &&
//     point.x <= rect.x + rect.width - boundSensor(rect.width) &&
//     point.y >= rect.y + boundSensor(rect.height) &&
//     point.y <= rect.y + rect.height - boundSensor(rect.height)
//   )
// }
export function isPointInRect(point: IPoint, rect: IRect, sensitive = true) {
  return point.x >= rect.x && point.x <= rect.x + rect.width && point.y >= rect.y && point.y <= rect.y + rect.height
}

export function isNearAfter(point: IPoint, rect: IRect, inline = false) {
  if (inline) {
    return (
      Math.abs(point.x - rect.x) + Math.abs(point.y - rect.y) >
      Math.abs(point.x - (rect.x + rect.width)) + Math.abs(point.y - (rect.y + rect.height))
    )
  }
  return Math.abs(point.y - rect.y) > Math.abs(point.y - (rect.y + rect.height))
}

export function calcDistanceOfPointToRect(point: IPoint, rect: IRect) {
  let minX = Math.min(Math.abs(point.x - rect.x), Math.abs(point.x - (rect.x + rect.width)))
  let minY = Math.min(Math.abs(point.y - rect.y), Math.abs(point.y - (rect.y + rect.height)))
  if (point.x >= rect.x && point.x <= rect.x + rect.width) {
    minX = 0
  }
  if (point.y >= rect.y && point.y <= rect.y + rect.height) {
    minY = 0
  }

  return Math.sqrt(minX ** 2 + minY ** 2)
}

export enum ClosestPosition {
  // Before = 'Before',
  // ForbidBefore = 'ForbidBefore',
  // After = 'After',
  // ForbidAfter = 'ForbidAfter',
  // Upper = 'Upper',
  // ForbidUpper = 'ForbidUpper',
  // Under = 'Under',
  // ForbidUnder = 'ForbidUnder',
  // Inner = 'Inner',
  // ForbidInner = 'ForbidInner',
  // InnerAfter = 'InnerAfter',
  // ForbidInnerAfter = 'ForbidInnerAfter',
  // InnerBefore = 'InnerBefore',
  // ForbidInnerBefore = 'ForbidInnerBefore',
  // Forbid = 'Forbid'

  beforebegin = 'beforebegin', // targetElement 之前。
  afterend = 'afterend' // targetElement 之后。
}
