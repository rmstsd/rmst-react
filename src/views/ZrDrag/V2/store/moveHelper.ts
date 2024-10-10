import { makeAutoObservable } from 'mobx'
import { createNodeItem, getOriDataById, NodeItem } from '../../shared/oriData'
import { contains, findNode, findParentNode } from '../../shared/utils'
import {
  allowAppend,
  calcDistancePointToEdge,
  ClosestPosition,
  getNodeRectById,
  IPoint,
  isNearAfter,
  isPointInRect,
  isRootNode
} from '../v2_utils'

export const Indicator_Height = 4
export const Indicator_BgColor = 'rgb(24, 144, 255)'
export const Indicator_Inner_BgColor = 'rgba(24, 144, 255, 0.6)'

export const DataSourceAttrName = 'data-source-id'
export const DataNodeAttrName = 'data-node-id'

class MoveHelper {
  constructor() {
    makeAutoObservable(this)

    this.init()
  }

  rootNode: NodeItem | null = null

  point = { x: 0, y: 0 }
  isDragging = false
  draggedNode: NodeItem | null = null
  closestNode: NodeItem | null = null
  closestPosition: ClosestPosition
  indicatorStyle: React.CSSProperties = { left: 0, top: 0, width: 0, height: Indicator_Height }

  private init() {
    const anPosition = { x: 0, y: 0 }

    const onPointerMove = (evt: PointerEvent) => {
      if (this.draggedNode) {
        if (!this.isDragging) {
          if (Math.hypot(evt.clientX - anPosition.x, evt.clientY - anPosition.y) < 5) {
            return
          }

          this.isDragging = true
          this.dragStart(evt)
        }

        this.dragMove(evt)
      }
    }

    const onPointerUp = (evt: PointerEvent) => {
      if (this.draggedNode && this.isDragging) {
        this.isDragging = false
        this.dragStop(evt)
      }

      if (!this.isDragging) {
        this.clear()
      }

      document.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('pointerup', onPointerUp)
    }

    const onPointerDown = (evt: PointerEvent) => {
      this.setDraggedNodeNode(evt)

      anPosition.x = evt.clientX
      anPosition.y = evt.clientY

      document.addEventListener('pointermove', onPointerMove)
      document.addEventListener('pointerup', onPointerUp)
    }

    document.addEventListener('pointerdown', onPointerDown)
  }

  setDraggedNodeNode = (evt: PointerEvent) => {
    const target = evt.target as HTMLElement

    const sourceElement = target.closest(`[${DataSourceAttrName}]`)
    const nodeElement = target.closest(`[${DataNodeAttrName}]`)

    if (sourceElement) {
      const sourceId = sourceElement.getAttribute(DataSourceAttrName)
      this.draggedNode = createNodeItem(getOriDataById(sourceId))
    } else if (nodeElement) {
      const nodeId = nodeElement.getAttribute(DataNodeAttrName)
      const node = findNode(nodeId, this.rootNode)

      if (isRootNode(node)) {
        return
      }

      this.draggedNode = node
    }
  }

  dragStart(evt: PointerEvent) {
    console.log('dragStart')
  }

  dragMove(evt: PointerEvent) {
    console.log('dragMove')

    const point = { x: evt.clientX, y: evt.clientY }
    this.point = point
    const target = document.elementFromPoint(point.x, point.y)

    if (!target) {
      this.clearTouch()
      return
    }

    const touchNodeElement = target.closest(`[${DataNodeAttrName}]`)
    if (!touchNodeElement) {
      this.clearTouch()
      return
    }

    const closestNode = this.calcClosestNode(point, this.findNodeByElement(touchNodeElement))

    this.closestNode = closestNode
    this.closestPosition = this.calcClosestPosition(point)

    this.calcIndicatorStyle()
  }

  dragStop(evt: PointerEvent) {
    console.log('dragStop')

    if (this.closestNode && this.draggedNode !== this.closestNode && !contains(this.draggedNode, this.closestNode)) {
      const draggedNodeParent = findParentNode(this.draggedNode.id, this.rootNode)
      if (draggedNodeParent) {
        draggedNodeParent.children.splice(draggedNodeParent.children.indexOf(this.draggedNode), 1)
      }

      const closestParent = findParentNode(this.closestNode.id, this.rootNode)
      let index = 0
      if (closestParent) {
        index = closestParent.children.indexOf(this.closestNode)
      }

      if (this.closestPosition === ClosestPosition.Beforebegin) {
        closestParent.children.splice(index, 0, this.draggedNode)
      } else if (this.closestPosition === ClosestPosition.Afterend) {
        closestParent.children.splice(index + 1, 0, this.draggedNode)
      } else if (this.closestPosition === ClosestPosition.Inner) {
        this.closestNode.children.push(this.draggedNode)
      }
    }

    this.clear()
  }

  calcClosestNode(point: IPoint, touchNode: NodeItem) {
    if (touchNode.children.length > 0) {
      let closestNode: NodeItem | null = touchNode
      const touchNodeRect = getNodeRectById(touchNode.id)
      const touchDistance = calcDistancePointToEdge(point, touchNodeRect)
      let minDistance = touchDistance

      touchNode.children.forEach(child => {
        const rect = getNodeRectById(child.id)
        const distance = isPointInRect(point, rect) ? 0 : calcDistancePointToEdge(point, rect)

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
    if (isRootNode(this.closestNode)) {
      return ClosestPosition.Inner
    }

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

  calcIndicatorStyle() {
    const closestRect = getNodeRectById(this.closestNode.id)
    this.indicatorStyle.width = closestRect.width
    this.indicatorStyle.left = closestRect.left
    this.indicatorStyle.height = Indicator_Height
    this.indicatorStyle.backgroundColor = Indicator_BgColor

    const { closestPosition } = this
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

  findNodeByElement(element: Element) {
    const nodeId = element.getAttribute(DataNodeAttrName)
    const node = findNode(nodeId, this.rootNode)
    return node
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
}

export default MoveHelper
