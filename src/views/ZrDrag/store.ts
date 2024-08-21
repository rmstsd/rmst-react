import { proxy, useSnapshot } from 'valtio'

import { NodeItem, rootNode } from './oriData'

export const store = proxy({
  rootNode,
  dragItem: null as NodeItem,
  insertBeforeId: '',
  appendAfterId: ''
})

export const useStore = () => useSnapshot(store)
