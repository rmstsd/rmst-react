import cn from '@/utils/cn'
import { Button } from '@arco-design/web-react'
import { observer } from 'mobx-react-lite'
import { DataNodeAttrName, isRootNode, store } from './store'
import type { NodeItem } from '../shared/oriData'
import { allowAppend } from './v2_utils'

interface TaskNodeProps {
  node: NodeItem
}

const TaskNode = observer(({ node }: TaskNodeProps) => {
  const isRoot = isRootNode(node)

  return (
    <div
      {...{ [DataNodeAttrName]: node.id }}
      className={cn(
        'task-node-item mb-20 flow-root border border-gray-500 p-6 last:mb-0',
        isRoot && 'root-node min-h-80 border-red-400'
      )}
    >
      {!isRoot && (
        <div className="node-title flex justify-between">
          <div>
            {node.id}-{node.oriId}-{node.title}
          </div>

          <Button type="text" size="mini" onClick={() => store.removeNode(node)}>
            删除
          </Button>
        </div>
      )}

      {allowAppend(node) && (
        <section className={cn('node-body mt-4', !isRoot && 'pl-20')}>
          {node.children.map(item => (
            <TaskNode node={item} key={item.id} />
          ))}
        </section>
      )}
    </div>
  )
})

export default TaskNode
