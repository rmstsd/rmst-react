import cn from '@/utils/cn'
import { NodeItem } from './oriData'
import { store, useStore } from './store'

interface TaskNodeProps {
  parentNode: NodeItem
  node: NodeItem
}

const TaskNode = ({ parentNode, node }: TaskNodeProps) => {
  const snap = useStore()

  const onDrop = () => {
    const findParentNode = (n: NodeItem) => {
      if (n.id === parentNode.id) {
        return n
      } else {
        for (const item of n.children ?? []) {
          return findParentNode(item)
        }
      }
    }

    const pn = findParentNode(store.rootNode)

    const movedIndex = pn.children.findIndex(o => o.id === store.dragItem.id)
    const [moved] = pn.children.splice(movedIndex, 1)

    const insertIndex = pn.children.findIndex(o => o.id === store.overId)
    pn.children.splice(insertIndex, 0, moved)

    store.overId = null
  }

  return (
    <div key={node.id}>
      <div
        id="insert-before"
        className={cn('h-[10px]', snap.overId === node.id && 'bg-red-300')}
        onDrop={onDrop}
        onDragEnter={() => (store.overId = node.id)}
        onDragLeave={() => (store.overId = null)}
        onDragOver={evt => evt.preventDefault()}
      />

      <div
        className="border p-6"
        draggable
        onDrag={evt => {
          evt.stopPropagation()
          store.dragItem = node
        }}
      >
        <div>
          {node.id} {node.title}
        </div>

        {node.children &&
          node.children.length > 0 &&
          node.children.map(item => <TaskNode parentNode={node} node={item} key={item.id} />)}

        <div id="append-after" className={cn('h-[10px]', snap.overId === node.id && 'bg-red-300')} />
      </div>
    </div>
  )
}

export default TaskNode
