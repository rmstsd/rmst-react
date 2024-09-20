import { makeAutoObservable } from 'mobx'
import { rootNode } from './oriData'

import type { NodeItem } from './oriData'

class Store {
  constructor() {
    makeAutoObservable(this)
  }

  rootNode = rootNode

  dragItem = null as NodeItem
  insertBeforeId = ''
  appendAfterId = ''

  up() {
    this.rootNode.id = 'asdgg'
  }
}

export const store = new Store()
