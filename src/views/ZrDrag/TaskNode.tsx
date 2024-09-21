import cn from '@/utils/cn'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { store } from './store'
import { type NodeItem } from './oriData'
import { Button } from '@arco-design/web-react'

interface TaskNodeProps {
  parentNode?: NodeItem
  node: NodeItem
}

const TaskNode = observer(({ parentNode, node }: TaskNodeProps) => {
  console.log('render TaskNode')
  const isRootNode = node.type === 'root'

  useEffect(() => {
    document.onpointerup = () => {
      store.clear()
    }
  }, [])

  return (
    <div className={cn('task-node-item flow-root', isRootNode && 'root-node')}>
      {!isRootNode && (
        <div
          id="insert-before"
          className={cn('min-h-[10px]', store.insertBeforeNode?.id === node.id && 'bg-purple-500')}
          onPointerUp={() => store.onDropInsertBefore()}
          onPointerEnter={() => {
            if (!store.draggedNode) {
              return
            }
            store.insertBeforeNode = node
            store.insertedParentNode = parentNode
          }}
          onPointerLeave={() => {
            store.insertBeforeNode = null
            store.insertedParentNode = null
          }}
        ></div>
      )}

      <div
        className="drag-node rounded-md border border-gray-500 p-6"
        onPointerDown={evt => store.startDrag(evt, node, parentNode)}
      >
        {!isRootNode && (
          <div className="node-title flex justify-between">
            <div>
              {node.id} - {node.oriId} - {node.title}
            </div>

            <Button type="text" size="mini" onClick={() => store.removeNode(node, parentNode)}>
              删除
            </Button>
          </div>
        )}

        {(isRootNode || node.type === 'if') && (
          <section className={cn('node-body', !isRootNode && 'pl-20')}>
            {node.children.map(item => (
              <TaskNode parentNode={node} node={item} key={item.id} />
            ))}

            <div
              id="append-after"
              className={cn('min-h-[10px]', store.appendAfterNode?.id === node.id && 'bg-pink-400')}
              onPointerUp={() => store.onDropAppendAfter()}
              onPointerEnter={() => {
                if (store.draggedNode) {
                  store.appendAfterNode = node
                }
              }}
              onPointerLeave={() => {
                store.appendAfterNode = null
              }}
            ></div>
          </section>
        )}
      </div>
    </div>
  )
})

export default TaskNode
