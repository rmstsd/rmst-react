import { proxy, useSnapshot } from 'valtio'

import { rootNode } from './oriData'

export const store = proxy({
  rootNode,
  dragItem: null,
  overId: null
})

export const useStore = () => useSnapshot(store)
