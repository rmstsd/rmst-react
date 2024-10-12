import cn from '@/utils/cn'
import { Button, Tag } from '@arco-design/web-react'
import { observer } from 'mobx-react-lite'
import { store } from './store/store'
import type { NodeItem } from '../shared/oriData'
import { allowAppend, isRootNode } from './v2_utils'
import { DataNodeAttrName } from './store/moveHelper'

interface TaskNodeProps {
  node: NodeItem
}

const TaskNode = observer(({ node }: TaskNodeProps) => {
  const { moveHelper } = store

  const isRoot = isRootNode(node)
  const isAllowAppend = allowAppend(node)

  return (
    <div
      {...{ [DataNodeAttrName]: node.id }}
      data-is-root={isRoot}
      className={cn(
        'task-node-item mb-20 flow-root border border-gray-500 p-6',
        isRoot && 'mb-0 min-h-full border-red-400',
        moveHelper.isDragging && moveHelper.draggedNode === node && 'opacity-50'
      )}
    >
      {!isRoot && (
        <div className="node-title flex justify-between">
          <div>
            {node.id}-{node.oriId}-{node.title}
          </div>

          <div>
            {isAllowAppend && (
              <>
                <Tag className="mr-4">childrenCount: {node.children.length}</Tag>
                <Button type="text" size="mini" onClick={() => (node.expanded = !node.expanded)}>
                  {node.expanded ? '收起' : '展开'}
                </Button>
              </>
            )}

            <Button
              type="text"
              size="mini"
              onClick={(evt) => {
                console.log(evt)
                if (moveHelper.isDragging) {
                  return
                }
                moveHelper.removeNode(node)
              }}
            >
              删除
            </Button>
          </div>
        </div>
      )}

      {isAllowAppend && node.expanded && (
        <section className={cn('node-body mt-20', !isRoot && 'pl-20')}>
          {node.children.map(item => (
            <TaskNode node={item} key={item.id} />
          ))}
        </section>
      )}
    </div>
  )
})

export default TaskNode
