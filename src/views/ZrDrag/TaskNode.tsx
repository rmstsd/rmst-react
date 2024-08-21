import cn from '@/utils/cn'
import { NodeItem } from './oriData'
import { store, useStore } from './store'
import { findNode, findParentNode } from './utils'

interface TaskNodeProps {
  parentNode?: NodeItem
  node: NodeItem
}

const TaskNode = ({ node }: TaskNodeProps) => {
  const snap = useStore()

  const isRootNode = node.type === 'root'

  const onDropInsertBefore = () => {
    console.log('onDropInsertBefore')
    const pn = findParentNode(store.dragItem.id)
    const pn2 = findParentNode(store.insertBeforeId)

    const movedIndex = pn.children.findIndex(o => o.id === store.dragItem.id)
    const insertIndex = pn2.children.findIndex(o => o.id === store.insertBeforeId)

    console.log(movedIndex, insertIndex)

    const [moved] = pn.children.slice(movedIndex, movedIndex + 1)
    pn2.children.splice(insertIndex, 0, moved) // 先添加
    pn.children.splice(movedIndex, 1) // 再删除

    store.insertBeforeId = null
  }

  const onDropAppendAfter = () => {
    console.log('onDropAppendAfter')
    const pn = findParentNode(store.dragItem.id)
    const pn2 = findNode(store.appendAfterId)

    const movedIndex = pn.children.findIndex(o => o.id === store.dragItem.id)
    const [moved] = pn.children.splice(movedIndex, 1)

    console.log(pn2)
    pn2.children.push(moved)

    store.appendAfterId = null
  }

  return (
    <div key={node.id} className={cn('task-node flow-root', isRootNode && 'root-node')}>
      {!isRootNode && (
        <div
          id="insert-before"
          className={cn('h-[10px]', snap.insertBeforeId === node.id && 'bg-purple-500')}
          onDrop={onDropInsertBefore}
          onDragEnter={() => (store.insertBeforeId = node.id)}
          onDragLeave={() => (store.insertBeforeId = null)}
          onDragOver={evt => evt.preventDefault()}
        />
      )}

      <div
        className="border p-6"
        draggable={!isRootNode}
        onDragStart={evt => {
          if (isRootNode) {
            return
          }

          evt.stopPropagation()
          store.dragItem = node
        }}
      >
        {!isRootNode && (
          <div className="node-title">
            {node.id} {node.title}
          </div>
        )}

        {(isRootNode || node.type === 'if') && (
          <div className="node-body">
            {node.children.map(item => (
              <TaskNode node={item} key={item.id} />
            ))}
            <div
              id="append-after"
              className={cn('h-[10px]', snap.appendAfterId === node.id && 'bg-pink-400')}
              onDrop={onDropAppendAfter}
              onDragEnter={() => (store.appendAfterId = node.id)}
              onDragLeave={() => (store.appendAfterId = null)}
              onDragOver={evt => evt.preventDefault()}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default TaskNode
