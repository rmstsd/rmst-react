import { configure, makeAutoObservable, toJS } from 'mobx'
import { rootNode } from './oriData'

import type { NodeItem } from './oriData'
import { contains } from './utils'

configure({ enforceActions: 'never' })

class Store {
  constructor() {
    makeAutoObservable(this)
  }

  rootNode = rootNode

  draggedNode: NodeItem = null
  draggedParentNode: NodeItem = null
  insertBeforeNode: NodeItem = null
  insertedParentNode: NodeItem = null
  appendAfterNode: NodeItem = null

  clear() {
    this.draggedNode = null
    this.draggedParentNode = null
    this.insertBeforeNode = null
    this.appendAfterNode = null
  }

  removeNode(node: NodeItem, parentNode: NodeItem) {
    const index = parentNode.children.indexOf(node)
    if (index !== -1) {
      parentNode.children.splice(index, 1)
    }
  }

  onDropInsertBefore() {
    if (!this.draggedNode || !this.insertBeforeNode) {
      return
    }

    if (contains(this.draggedNode, this.insertBeforeNode)) {
      return
    }

    const draggedParentNode = this.draggedParentNode
    const insertedParentNode = this.insertedParentNode

    const isSameArray = draggedParentNode.children === insertedParentNode.children

    const movedIndex = draggedParentNode.children.findIndex(o => o.id === this.draggedNode.id)
    const insertIndex = insertedParentNode.children.findIndex(o => o.id === this.insertBeforeNode.id)

    this.removeNode(this.draggedNode, draggedParentNode)

    let spIndex
    if (isSameArray) {
      spIndex = insertIndex > movedIndex ? insertIndex - 1 : insertIndex
    } else {
      spIndex = insertIndex
    }

    insertedParentNode.children.splice(spIndex, 0, this.draggedNode)

    this.insertBeforeNode = null
  }

  onDropAppendAfter() {
    if (!this.draggedNode.id || !this.appendAfterNode) {
      return
    }

    if (contains(this.draggedNode, this.appendAfterNode)) {
      return
    }

    const draggedParentNode = this.draggedParentNode
    const appendedParentNode = this.appendAfterNode

    this.removeNode(this.draggedNode, draggedParentNode)

    appendedParentNode.children.push(this.draggedNode)
    this.appendAfterNode = null
  }
}

export const store = new Store()
