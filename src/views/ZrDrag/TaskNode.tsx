import cn from '@/utils/cn'
import { NodeItem } from './oriData'
import { store, useStore } from './store'

interface TaskNodeProps {
  parentNode?: NodeItem
  node: NodeItem
}

const findParentNode = (id: NodeItem['id']): NodeItem => {
  return dfs(store.rootNode)

  function dfs(node: NodeItem, parent = null) {
    if (id === node.id) {
      return parent
    }

    for (const item of node.children ?? []) {
      const res = dfs(item, node)
      if (res) {
        return res
      }
    }
  }
}

const findNode = (id: NodeItem['id']): NodeItem => {
  return dfs(store.rootNode)

  function dfs(node: NodeItem) {
    if (id === node.id) {
      return node
    }

    for (const item of node.children ?? []) {
      const res = dfs(item)
      if (res) {
        return res
      }
    }
  }
}

const TaskNode = ({ node }: TaskNodeProps) => {
  const snap = useStore()

  const isRootNode = node.type === 'root'

  const onDrop = () => {
    const pn = findParentNode(store.dragItem.id)

    const movedIndex = pn.children.findIndex(o => o.id === store.dragItem.id)
    const [moved] = pn.children.splice(movedIndex, 1)

    const insertIndex = pn.children.findIndex(o => o.id === store.insertBeforeId)
    pn.children.splice(insertIndex, 0, moved)

    store.insertBeforeId = null
  }

  const onDropAppendAfter = () => {
    const pn = findParentNode(store.dragItem.id)
    const pn2 = findNode(store.appendAfterId)

    const movedIndex = pn.children.findIndex(o => o.id === store.dragItem.id)
    const [moved] = pn.children.splice(movedIndex, 1)

    pn2.children.push(moved)

    store.appendAfterId = null
  }

  return (
    <div key={node.id} className={cn('task-node flow-root', isRootNode && 'root-node')}>
      {!isRootNode && (
        <div
          id="insert-before"
          className={cn('h-[10px]', snap.insertBeforeId === node.id && 'bg-red-300')}
          onDrop={onDrop}
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
              className={cn('h-[10px]', snap.appendAfterId === node.id && 'bg-red-300')}
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
