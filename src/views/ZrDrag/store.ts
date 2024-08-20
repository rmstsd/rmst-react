import { useImmer } from 'use-immer'

import { createContainer } from 'unstated-next'
import { rootNode } from './oriData'

function useStoreHook() {
  const [state, setState] = useImmer({ rootNode, dragItem: null, overId: null, count: 1, countObj: { count: 10 } })

  return { state, setState }
}

export const Store = createContainer(useStoreHook)

const useStore = () => Store.useContainer()

export default useStore
