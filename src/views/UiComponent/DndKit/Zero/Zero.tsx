import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  useDroppable
} from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import classNames from 'classnames'
import { useState, useRef, useEffect } from 'react'
import SortableItem, { CommandItem } from './SortableItem'
import { useUpdate } from '@/utils/hooks'

const genUniqueId = () => {
  return Date.now().toString(36)
}

type MainItem = { id: number | string; name: string; nid: number | string }

const Zero = () => {
  const [commandList, setCommandList] = useState([
    { id: 1, name: 'a' }
    // { id: 2, name: 'b' }
  ])

  const [mainList, setMainList] = useState<MainItem[]>([
    { id: 3, name: 'a', nid: 'lj9ypzi1' }
    // { id: 4, name: 'b', nid: 'lj9yq01k' }
  ])

  const [activeCommandId, setActiveCommandId] = useState(null)

  const activeCommandItem = activeCommandId
    ? { ...commandList.find(item => item.id === activeCommandId), nid: 1 }
    : null

  const onDragStart = (evt: DragStartEvent) => {
    console.log('onDragStart')
    setActiveCommandId(evt.active.id)
  }

  const onDragOver = (evt: DragOverEvent) => {
    if (evt.over) {
      if (mainList.find(item => item.nid === activeCommandItem.nid)) {
        return
      }

      console.log(activeCommandItem)
      const nv = [{ ...activeCommandItem }]

      setMainList(nv)
    } else {
      setMainList(mainList.filter(item => item.nid !== activeCommandItem.nid))
    }
  }

  const onDragEnd = (evt: DragEndEvent) => {
    if (evt.over) {
      // const nv = mainList.map(item => {
      //   const nvItem = item.nid === activeCommandItem.nid ? { ...item, nid: genUniqueId() } : item
      //   return nvItem
      // })
      // setMainList([{ ...activeCommandItem, nid: genUniqueId() }])
      // setActiveCommandId(null)
    }
  }

  const upNid = () => {
    setMainList([{ ...activeCommandItem, nid: genUniqueId() }])
  }

  return (
    <>
      <button onClick={upNid}>up nid</button>

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
    </>
  )
}

const RightMain = props => {
  const { mainList } = props

  const { isOver, over, active, setNodeRef } = useDroppable({ id: 'container' })

  return (
    <main className={classNames('border-2 flex-grow p-3', isOver && 'border-orange-400')} ref={setNodeRef}>
      {mainList.map(item => (
        <SortableItem key={item.nid} item={item} />
      ))}
    </main>
  )
}

export default Zero
