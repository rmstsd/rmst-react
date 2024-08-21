import cn from '@/utils/cn'
import { NodeItem } from './oriData'
import { store, useStore } from './store'
import { findNode, findParentNode } from './utils'

interface TaskNodeProps {
  parentNode?: NodeItem
  node: NodeItem
  index?: number
}

const TaskNode = ({ node, index }: TaskNodeProps) => {
  const snap = useStore()

  const isRootNode = node.type === 'root'

  const onDropInsertBefore = () => {
    console.log('onDropInsertBefore')
    const draggedParentNode = findParentNode(store.dragItem.id)
    const insertedParentNode = findParentNode(store.insertBeforeId)

    const isSameArray = draggedParentNode.children === insertedParentNode.children

    const movedIndex = draggedParentNode.children.findIndex(o => o.id === store.dragItem.id)
    const insertIndex = insertedParentNode.children.findIndex(o => o.id === store.insertBeforeId)

    console.log(movedIndex, insertIndex)

    const [moved] = draggedParentNode.children.splice(movedIndex, 1)

    let spIndex

    if (isSameArray) {
      spIndex = insertIndex > movedIndex ? insertIndex - 1 : insertIndex
    } else {
      spIndex = insertIndex
    }

    insertedParentNode.children.splice(spIndex, 0, moved)

    store.insertBeforeId = null
  }

  const onDropAppendAfter = () => {
    console.log('onDropAppendAfter')
    const draggedParentNode = findParentNode(store.dragItem.id)
    const appendedParentNode = findNode(store.appendAfterId)

    const movedIndex = draggedParentNode.children.findIndex(o => o.id === store.dragItem.id)
    const [moved] = draggedParentNode.children.splice(movedIndex, 1)
    appendedParentNode.children.push(moved)

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
          <div className="node-title flex justify-between">
            <div>
              {node.id} - {node.oriId} {node.title}
            </div>

            <button
              onClick={() => {
                findParentNode(node.id).children.splice(index, 1)
              }}
            >
              删除
            </button>
          </div>
        )}

        {(isRootNode || node.type === 'if') && (
          <div className="node-body">
            {node.children.map((item, index) => (
              <TaskNode node={item} index={index} key={item.id} />
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
