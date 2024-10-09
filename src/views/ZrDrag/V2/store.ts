import { configure, makeAutoObservable, toJS } from 'mobx'
import { createNodeItem, createRootNode, getOriDataById, type NodeItem, oriData, rootNode } from '../shared/oriData'
import { contains, findNode, findParentNode, uuId } from '../shared/utils'
import React from 'react'
import {
  allowAppend,
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

enum Flow_Type {
  Main_Flow = 'Main_Flow',
  Sub_Flow = 'Sub-Flow'
}
interface IFlow {
  id: string
  title: string
  type: Flow_Type
  rootNode: NodeItem
}

class Store {
  constructor() {
    makeAutoObservable(this)
  }

  draggedNode: NodeItem | null = null

  flowList: IFlow[] = [{ id: 'asdasd', title: '主流程', type: Flow_Type.Main_Flow, rootNode: createRootNode() }]

  pos = { x: 0, y: 0 }

  closestNode: NodeItem | null = null

  indicatorStyle: React.CSSProperties = { left: 0, top: 0, width: 0, height: Indicator_Height }

  closestPosition: ClosestPosition

  activeFlow: IFlow | null = null

  isStartMove = false
  init() {
    this.activeFlow = this.flowList[0]

    const onPointerMove = (evt: PointerEvent) => {
      if (Math.hypot(evt.clientX - anPosition.x, evt.clientY - anPosition.y) < 5) {
        return
      }

      if (!this.isStartMove) {
        this.isStartMove = true
        this.dragStart(evt)
      }

      if (this.draggedNode) {
        this.dragMove(evt)
      }
    }

    const onPointerUp = (evt: PointerEvent) => {
      this.dragStop(evt)

      document.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('pointerup', onPointerUp)
    }

    let anPosition = { x: 0, y: 0 }
    const onPointerDown = (evt: PointerEvent) => {
      anPosition.x = evt.clientX
      anPosition.y = evt.clientY

      document.addEventListener('pointermove', onPointerMove)
      document.addEventListener('pointerup', onPointerUp)
    }

    document.addEventListener('pointerdown', onPointerDown)
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

  dragStart(evt: PointerEvent) {
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
      const node = findNode(nodeId, this.activeFlow.rootNode)

      if (isRootNode(node)) {
        return
      }

      this.draggedNode = node

      this.pos.x = evt.clientX
      this.pos.y = evt.clientY
    }
  }

  dragMove(evt: PointerEvent) {
    const target = evt.target as HTMLElement

    const point = { x: evt.clientX, y: evt.clientY }
    this.pos = point
    // const t = document.elementFromPoint(point.x, point.y)

    const touchNodeElement = target.closest(`[${DataNodeAttrName}]`)
    if (!touchNodeElement) {
      this.clearTouch()
      return
    }

    const closestNode = this.calcClosestNode(point, this.findNodeByElement(touchNodeElement))

    this.closestNode = closestNode
    console.log('closestNode', closestNode.title)

    this.closestPosition = this.calcClosestPosition(point)
    console.log(this.closestPosition)

    this.calcIndicatorStyle()
  }

  dragStop(evt: PointerEvent) {
    this.isStartMove = false
    if (
      this.draggedNode &&
      this.closestNode &&
      this.draggedNode !== this.closestNode &&
      !contains(this.draggedNode, this.closestNode)
    ) {
      const draggedNodeParent = findParentNode(this.draggedNode.id, this.activeFlow.rootNode)
      if (draggedNodeParent) {
        draggedNodeParent.children.splice(draggedNodeParent.children.indexOf(this.draggedNode), 1)
      }

      const closestParent = findParentNode(this.closestNode.id, this.activeFlow.rootNode)
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
    const node = findNode(nodeId, this.activeFlow.rootNode)
    return node
  }

  addFlow() {
    const newFlow = {
      id: uuId(),
      title: `流程 ${this.flowList.length}`,
      type: Flow_Type.Sub_Flow,
      rootNode: createRootNode()
    }

    this.flowList.push(newFlow)
    store.activeFlow = this.flowList.at(-1)

    return newFlow
  }

  removeFlow(key) {
    this.flowList = this.flowList.filter(flow => flow.id !== key)
    store.activeFlow = this.flowList[0]
  }

  removeNode(node: NodeItem) {
    const parentNode = findParentNode(node.id, this.activeFlow.rootNode)
    parentNode.children.splice(parentNode.children.indexOf(node), 1)
  }
}

export const store = new Store()
