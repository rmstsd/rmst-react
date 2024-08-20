import cn from '@/utils/cn'
import { NodeItem } from './oriData'
import useStore from './store'

interface TaskNodeProps {
  parentNode: NodeItem;
  node: NodeItem;
}

const TaskNode = ({ parentNode, node }: TaskNodeProps) => {
  const { state, setState } = useStore()

  console.log(state.dragItem)

  return (
    <div key={node.id}>
      <div
        id="insert-before"
        className={cn('h-[10px]', state.overId === node.id && 'bg-red-300')}
        onDrop={evt => {
          setState(d => {
            const findParentNode = (n: NodeItem) => {
              if (n.id === parentNode.id) {
                return n
              } else {
                for (const item of n.children ?? []) {
                  return findParentNode(item)
                }
              }
            }

            const pn = findParentNode(d.rootNode)

            const movedIndex = pn.children.findIndex(o => o.id === d.dragItem.id)
            const [moved] = pn.children.splice(movedIndex, 1)

            const insertIndex = pn.children.findIndex(o => o.id === d.overId)
            pn.children.splice(insertIndex, 0, moved)

            d.overId = null
          })
        }}
        onDragEnter={() =>
          setState(d => {
            d.overId = node.id
          })
        }
        onDragLeave={() =>
          setState(d => {
            d.overId = null
          })
        }
        onDragOver={evt => evt.preventDefault()}
      />

      <div
        className="border p-6"
        draggable
        onDrag={evt => {
          evt.stopPropagation()

          setState(d => {
            d.dragItem = node
          })
        }}
      >
        <div>
          {node.id} {node.title}
        </div>

        {node.children &&
          node.children.length > 0 &&
          node.children.map(item => <TaskNode parentNode={node} node={item} key={item.id} />)}

        <div className="append-after" />
      </div>
    </div>
  )
}

export default TaskNode
