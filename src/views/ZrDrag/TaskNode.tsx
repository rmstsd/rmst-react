import cn from '@/utils/cn'
import { runInAction, toJS } from 'mobx'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { store } from './store'
import { contains, findNode, findParentNode } from './utils'
import type { NodeItem } from './oriData'

interface TaskNodeProps {
  parentNode?: NodeItem
  node: NodeItem
  index?: number
}

const TaskNode = observer(({ parentNode, node, index }: TaskNodeProps) => {
  const isRootNode = node.type === 'root'

  const onDropInsertBefore = () => {
    if (!store.dragItem) {
      return
    }
    console.log('onDropInsertBefore')
    if (!store.dragItem.id || !store.insertBeforeId) {
      return
    }

    const draggedParentNode = findParentNode(store.dragItem.id)
    const insertedParentNode = findParentNode(store.insertBeforeId)

    const isSameArray = draggedParentNode.children === insertedParentNode.children

    const movedIndex = draggedParentNode.children.findIndex(o => o.id === store.dragItem.id)
    const insertIndex = insertedParentNode.children.findIndex(o => o.id === store.insertBeforeId)

    runInAction(() => {
      const [moved] = draggedParentNode.children.splice(movedIndex, 1)

      let spIndex

      if (isSameArray) {
        spIndex = insertIndex > movedIndex ? insertIndex - 1 : insertIndex
      } else {
        spIndex = insertIndex
      }

      insertedParentNode.children.splice(spIndex, 0, moved)

      store.insertBeforeId = null
    })
  }

  const onDropAppendAfter = () => {
    if (!store.dragItem) {
      return
    }

    if (!store.dragItem.id || !store.appendAfterId) {
      return
    }

    const draggedParentNode = findParentNode(store.dragItem.id)
    const appendedParentNode = findNode(store.appendAfterId)

    runInAction(() => {
      const movedIndex = draggedParentNode.children.findIndex(o => o.id === store.dragItem.id)
      const [moved] = draggedParentNode.children.splice(movedIndex, 1)
      appendedParentNode.children.push(moved)
      store.appendAfterId = null
    })
  }

  useEffect(() => {
    document.onpointermove = evt => {
      const target = evt.target as HTMLElement

      const insertBeforeElement = target.closest('#insert-before')
      if (insertBeforeElement) {
        // insertBeforeElement.dispatchEvent(new PointerEvent('pointerenter'))
        return
      }
      const appendAfterElement = target.closest('append-after')

      if (appendAfterElement) {
      }
    }

    document.onpointerup = () => {
      runInAction(() => {
        store.dragItem = null
        store.insertBeforeId = null
        store.appendAfterId = null
      })
    }
  }, [])

  return (
    <div key={node.id} className={cn('task-node-item mt-2 flow-root', isRootNode && 'root-node')}>
      {!isRootNode && (
        <div
          id="insert-before"
          className={cn('min-h-[10px] bg-purple-200', store.insertBeforeId === node.id && 'bg-purple-500')}
          onPointerUp={onDropInsertBefore}
          onPointerEnter={() => {
            if (!store.dragItem) {
              return
            }

            runInAction(() => {
              store.insertBeforeId = node.id
            })
          }}
          onPointerLeave={() => {
            runInAction(() => {
              store.insertBeforeId = null
            })
          }}
        >
          insert-before
        </div>
      )}

      <div
        className="drag-node border p-6"
        onPointerDown={evt => {
          if (isRootNode) {
            return
          }

          evt.stopPropagation()
          runInAction(() => {
            store.dragItem = node
          })
        }}
      >
        {!isRootNode && (
          <div className="node-title flex justify-between">
            <div>
              {node.id} - {node.oriId} - {node.title}
            </div>

            <button
              onClick={() => {
                runInAction(() => {
                  parentNode.children.splice(index, 1)
                })
              }}
            >
              删除
            </button>
          </div>
        )}

        {(isRootNode || node.type === 'if') && (
          <div className="node-body">
            {node.children.map((item, index) => (
              <TaskNode parentNode={node} node={item} index={index} key={item.id} />
            ))}

            <div
              id="append-after"
              className={cn('min-h-[10px] bg-pink-200', store.appendAfterId === node.id && 'bg-pink-400')}
              onPointerUp={onDropAppendAfter}
              onPointerEnter={() => {
                if (!store.dragItem) {
                  return
                }

                runInAction(() => {
                  store.appendAfterId = node.id
                })
              }}
              onPointerLeave={() => {
                runInAction(() => {
                  store.appendAfterId = null
                })
              }}
            >
              append-after
            </div>
          </div>
        )}
      </div>
    </div>
  )
})

export default TaskNode
