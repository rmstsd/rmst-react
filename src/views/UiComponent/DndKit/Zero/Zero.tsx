import { DndContext, DragOverEvent, DragOverlay, DragStartEvent, useDroppable } from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import classNames from 'classnames'
import { useState, useRef } from 'react'
import SortableItem, { CommandItem } from './SortableItem'

const Zero = () => {
  const commandList = [
    { id: 1, name: 'a' },
    { id: 2, name: 'b' }
  ]

  const addedMainItemRef = useRef(null)

  const [mainList, setMainList] = useState([
    { id: 3, name: 'a', nid: 'right-lj9ypzi1' },
    { id: 4, name: 'b', nid: 'right-lj9yq01k' }
  ])

  console.log(mainList)

  const [activeCommandId, setActiveCommandId] = useState(null)

  const activeCommandItem = activeCommandId ? commandList.find(item => item.id === activeCommandId) : null

  const onDragStart = (evt: DragStartEvent) => {
    console.log(evt)

    setActiveCommandId(evt.active.id)
  }

  const onDragOver = (evt: DragOverEvent) => {
    console.log(evt)

    if (evt.active.data.current.type === 'command') {
      if (evt.over) {
        if (mainList.find(item => item.nid === addedMainItemRef.current?.nid)) {
          return
        }

        if (evt.over.id === 'container') {
          addedMainItemRef.current ??= { ...activeCommandItem, nid: 'right-' + Date.now().toString(36) }

          // 这里需要自己计算位置

          setMainList([...mainList, addedMainItemRef.current])
        }
      } else {
        console.log('r')
        setMainList(mainList.filter(item => item.nid !== addedMainItemRef.current.nid))
      }
    }
  }

  const onDragEnd = (evt: DragEvent) => {
    addedMainItemRef.current = null
  }

  return (
    <div className="flex gap-3 h-[600px]">
      <DndContext onDragStart={onDragStart} onDragOver={onDragOver} onDragEnd={onDragEnd}>
        <section className="border w-[140px]">
          {commandList.map(item => (
            <CommandItem key={item.id} id={item.id} item={item} />
          ))}
        </section>

        <SortableContext items={mainList.map(item => item.nid)}>
          <RightMain mainList={mainList} />
        </SortableContext>

        <DragOverlay dropAnimation={null}>
          {activeCommandItem ? (
            <CommandItem id={activeCommandItem.id} item={activeCommandItem} isOver />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  )
}

const RightMain = props => {
  const { mainList } = props

  const { isOver, over, active, setNodeRef } = useDroppable({ id: 'container' })

  const finalIsOver = (() => {
    const isRightActive = (active?.id as string)?.startsWith?.('right-')

    if (isRightActive) return false

    return isOver || (over?.id as string)?.startsWith?.('right-')
  })()

  return (
    <main
      className={classNames('border-2 flex-grow p-3', finalIsOver && 'border-orange-400')}
      ref={setNodeRef}
    >
      {mainList.map(item => (
        <SortableItem key={item.nid} item={item} />
      ))}
    </main>
  )
}

export default Zero
