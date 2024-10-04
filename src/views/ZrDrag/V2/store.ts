import { configure, makeAutoObservable, toJS } from 'mobx'
import { createNodeItem, getOriDataById, type NodeItem, rootNode } from '../shared/oriData'
import { contains, findNode, findParentNode } from '../shared/utils'
import React from 'react'
import {
  calcDistanceOfPointToRect,
  calcDistancePointToEdge,
  ClosestPosition,
  getNodeRectById,
  IPoint,
  isNearAfter,
  isPointInRect
} from './v2_utils'

configure({ enforceActions: 'never' })

export const DataSourceAttrName = 'data-source-id'
export const DataNodeAttrName = 'data-node-id'

export const isRootNode = (node: NodeItem) => node.type === 'root'

const Indicator_Height = 4
const Indicator_BgColor = 'rgb(24, 144, 255)'
const Indicator_Inner_BgColor = 'rgba(24, 144, 255, 0.6)'

class Store {
  constructor() {
    makeAutoObservable(this)
  }

  draggedNode: NodeItem | null = null

  rootNode = rootNode

  pos = { x: 0, y: 0 }

  closestNode: NodeItem | null = null

  indicatorStyle: React.CSSProperties = { left: 0, top: 0, width: 0, height: Indicator_Height }

  closestPosition: ClosestPosition

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
      if (
        this.draggedNode &&
        this.closestNode &&
        this.draggedNode !== this.closestNode &&
        !contains(this.draggedNode, this.closestNode)
      ) {
        const parent = findParentNode(this.draggedNode.id, this.rootNode)
        if (parent) {
          parent.children.splice(parent.children.indexOf(this.draggedNode), 1)
        }

        const closestParent = findParentNode(this.closestNode.id, this.rootNode)
        const index = closestParent.children.indexOf(this.closestNode)

        if (this.closestPosition === ClosestPosition.Beforebegin) {
          closestParent.children.splice(index, 0, this.draggedNode)
        } else if (this.closestPosition === ClosestPosition.Afterend) {
          closestParent.children.splice(index + 1, 0, this.draggedNode)
        } else if (this.closestPosition === ClosestPosition.Inner) {
          this.closestNode.children.push(this.draggedNode)
        }
      }

      this.clear()
    })
  }

  clear() {
    this.draggedNode = null

    this.clearTouch()
  }

  clearTouch() {
    this.closestNode = null
    this.closestPosition = null

    this.indicatorStyle.left = 0
    this.indicatorStyle.top = 0
    this.indicatorStyle.width = 0
  }

  pointerDrag(evt: PointerEvent) {
    const target = evt.target as HTMLElement

    const point = { x: evt.clientX, y: evt.clientY }
    this.pos = point

    const touchNodeElement = target.closest(`[${DataNodeAttrName}]`)
    if (!touchNodeElement) {
      this.clearTouch()
      return
    }

    const closestNode = this.calcClosestNode(point, this.findNodeByElement(touchNodeElement))
    this.closestNode = closestNode
    console.log('closestNode', closestNode.title)

    const closestPosition = this.calcClosestPosition(point)
    this.closestPosition = closestPosition
    console.log(closestPosition)

    const closestRect = getNodeRectById(this.closestNode.id)
    this.indicatorStyle.width = closestRect.width
    this.indicatorStyle.left = closestRect.left
    this.indicatorStyle.height = Indicator_Height
    this.indicatorStyle.backgroundColor = Indicator_BgColor

    if (closestPosition === ClosestPosition.Beforebegin) {
      this.indicatorStyle.top = closestRect.y - Indicator_Height
    } else if (closestPosition === ClosestPosition.Afterend) {
      this.indicatorStyle.top = closestRect.y + closestRect.height
    } else if (closestPosition === ClosestPosition.Inner) {
      this.indicatorStyle.top = closestRect.y
      this.indicatorStyle.height = closestRect.height
      this.indicatorStyle.backgroundColor = Indicator_Inner_BgColor
    }
  }

  calcClosestNode(point: IPoint, touchNode: NodeItem) {
    if (touchNode.children.length > 0) {
      let closestNode: NodeItem | null = touchNode
      const touchNodeRect = getNodeRectById(touchNode.id)
      const touchDistance = calcDistancePointToEdge(point, touchNodeRect)
      let minDistance = touchDistance

      touchNode.children.forEach(child => {
        const rect = getNodeRectById(child.id)

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
    const rect = getNodeRectById(this.closestNode.id)
    const isAfter = isNearAfter(point, rect)

    let closestPosition: ClosestPosition

    if (isPointInRect(point, rect)) {
      if (allowAppend(this.closestNode)) {
        if (this.closestNode.children.length > 0) {
          closestPosition = isAfter ? ClosestPosition.Afterend : ClosestPosition.Beforebegin
        } else {
          closestPosition = ClosestPosition.Inner
        }
      } else {
        closestPosition = isAfter ? ClosestPosition.Afterend : ClosestPosition.Beforebegin
      }
    } else {
      closestPosition = isAfter ? ClosestPosition.Afterend : ClosestPosition.Beforebegin
    }

    return closestPosition
  }

  findNodeByElement(element: Element) {
    const nodeId = element.getAttribute(DataNodeAttrName)
    const node = findNode(nodeId, this.rootNode)
    return node
  }
}

export const store = new Store()

function allowAppend(node: NodeItem) {
  if (node.type === 'if') {
    return true
  }

  return false
}
