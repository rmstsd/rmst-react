import type { NodeItem } from './oriData'

import { useStore } from './store'
import TaskNode from './TaskNode'

export default function Flow() {
  const snap = useStore()

  return (
    <main className="flex grow select-none flex-col p-6">
      <TaskNode node={snap.rootNode as NodeItem} parentNode={null} />
    </main>
  )
}
