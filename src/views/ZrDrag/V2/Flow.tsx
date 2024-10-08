import { observer } from 'mobx-react-lite'

import { store } from './store'
import TaskNode from './TaskNode'
import type { NodeItem } from '../shared/oriData'

function Flow() {
  return (
    <main className="flex grow select-none flex-col p-6 touch-none">
      <TaskNode node={store.rootNode as NodeItem} />
    </main>
  )
}

export default observer(Flow)
