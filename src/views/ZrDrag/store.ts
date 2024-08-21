import { proxy, useSnapshot } from 'valtio'

import { NodeItem, rootNode } from './oriData'

export const store = proxy({
  rootNode,
  dragItem: null as NodeItem,
  insertBeforeId: null as string,
  appendAfterId: null as string
})

export const useStore = () => useSnapshot(store)
