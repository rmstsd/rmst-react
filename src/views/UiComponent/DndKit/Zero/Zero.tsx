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
import { arrayMove } from '../demo/utils'

const genUniqueId = () => {
  return Date.now().toString(36)
}

type MainItem = { id: number | string; name: string; nid: number | string }

const Zero = () => {
  const [commandList, setCommandList] = useState([
    { id: 1, name: 'a' },
    { id: 2, name: 'b' }
  ])

  const [mainList, setMainList] = useState<MainItem[]>([
    // { id: 3, name: 'a', nid: 'lj9ypzi1' }
    // { id: 4, name: 'b', nid: 'lj9yq01k' }
  ])

  const [rk, setRk] = useState(0)

  const [activeCommandId, setActiveCommandId] = useState(null)

  const activeCommandItem = (() => {
    if (activeCommandId) {
      const oItem = commandList.find(item => item.id === activeCommandId)
      return { ...oItem, nid: oItem.id }
    }

    return null
  })()

  const [activeMainId, setActiveMainId] = useState(null)

  const activeMainItem = activeMainId ? mainList.find(item => item.id === activeMainId) : null

  const onDragStart = (evt: DragStartEvent) => {
    const { active } = evt

    if (active.data.current.type === 'command') {
      setActiveCommandId(active.id)
    } else {
      setActiveMainId(active.id)
    }
  }

  const onDragOver = (evt: DragOverEvent) => {
    const { active, over } = evt
    if (active.data.current.type === 'command') {
      if (evt.over) {
        if (mainList.find(item => item.nid === activeCommandItem.nid)) {
          return
        }

        const nv = [...mainList, { ...activeCommandItem }]

        setMainList(nv)
      } else {
        setMainList(mainList.filter(item => item.nid !== activeCommandItem.nid))
      }
    } else {
      console.log('over sort')
    }
  }

  const onDragEnd = (evt: DragEndEvent) => {
    const { active, over } = evt

    // 如果是拖拽左侧的 item 放下后
    if (activeCommandId) {
      if (evt.over) {
        const MainList = mainList.map(item => {
          const nvItem = item.nid === activeCommandItem.nid ? { ...item, nid: genUniqueId() } : item
          return nvItem
        })

        setMainList(MainList)
      }

      setActiveCommandId(null)
      setRk(rk + 1)
    } else {
      console.log('end sort')

      const activeIndex = mainList.findIndex(item => item.nid === active.id)
      const overIndex = mainList.findIndex(item => item.nid === over.id)

      if (activeIndex !== overIndex) {
        setMainList(arrayMove(mainList, activeIndex, overIndex))
      }
    }
  }

  const upNid = () => {
    setMainList([{ ...activeCommandItem, nid: genUniqueId() }])
  }

  return (
    <>
      <button onClick={upNid}>up nid</button>

      <div className="flex gap-3 h-[600px]">
        <DndContext onDragStart={onDragStart} onDragOver={onDragOver} onDragEnd={onDragEnd} autoScroll>
          <section className="border w-[140px]" key={rk}>
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
