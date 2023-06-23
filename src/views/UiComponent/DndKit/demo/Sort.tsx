import { useState } from 'react'
import classNames from 'classnames'

import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core'
import { SortableContext, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { restrictToWindowEdges } from '@dnd-kit/modifiers'

let onlyKey = 456
function getOnlyKey() {
  return ++onlyKey
}

const normalCommandList = Array.from({ length: 6 }, () => {
  const id = getOnlyKey()
  return { id, type: 'normal', name: 'nor - ' + id }
})

const commandList = [
  ...normalCommandList,
  { id: 2, type: 'if-start', name: 'if 开始' },
  { id: 3, type: 'else-if', name: 'else-if' },
  { id: 4, type: 'else', name: 'else' },
  // { id: 5, type: 'if-end', name: 'if-end' },
  { id: 6, type: 'for-start', name: 'for 循环' },
  // { id: 7, type: 'for-end', name: 'for结束' },
  { id: 8, type: 'break', name: 'break' },
  { id: 9, type: 'continue', name: 'continue' }
]

const Sort = () => {
  const [items, setItems] = useState([])

  const [activeId, setActiveId] = useState(null)

  return (
    <div className="sort-dnd flex gap-4">
      <DndContext
        modifiers={[restrictToWindowEdges]}
        onDragStart={({ active }) => {
          if (!active) {
            return
          }

          setActiveId(active.id)
        }}
        onDragEnd={({ over }) => {
          console.log('onDragEnd over', over)
          setActiveId(null)

          if (over?.id === 'main') {
            const activeItem = commandList.find(item => item.id === activeId)
            console.log(activeItem)

            setItems([...items, { ...activeItem, id: getOnlyKey() }])
            return
          }
        }}
        onDragCancel={() => setActiveId(null)}
      >
        <ul className="border-r">
          {commandList.map(item => (
            <CommandItem key={item.id} item={item} />
          ))}
        </ul>

        <Main items={items} setItems={setItems} />
      </DndContext>
    </div>
  )
}

const Main = ({ items, setItems }) => {
  const { isOver, active, over, setNodeRef } = useDroppable({ id: 'main' })

  const [activeId, setActiveId] = useState(null)
  const activeIndex = activeId ? items.findIndex(item => item.id === activeId) : -1

  return (
    <main ref={setNodeRef} className={classNames('flex-grow border-2', isOver && 'border-orange-400')}>
      <DndContext
        modifiers={[restrictToWindowEdges]}
        onDragStart={({ active }) => {
          if (!active) {
            return
          }

          setActiveId(active.id)
        }}
        onDragEnd={({ over }) => {
          setActiveId(null)

          if (over) {
            const overIndex = items.findIndex(item => item.id === over.id)
            if (activeIndex !== overIndex) {
              const nv = arrayMove(items, activeIndex, overIndex)
              setItems([...nv])
            }
          }
        }}
        onDragCancel={() => setActiveId(null)}
      >
        <SortableContext items={items}>
          {items.map(item => (
            <MainSortableItem key={item.id} item={item} />
          ))}
        </SortableContext>
      </DndContext>
    </main>
  )
}

const CommandItem = ({ item }) => {
  const { listeners, setNodeRef, transform } = useDraggable({ id: item.id })

  const style = transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : undefined

  return (
    <li ref={setNodeRef} {...listeners} style={style} className="py-2 px-3 select-none hover:bg-slate-200">
      id: {item.id} - {item.name}
    </li>
  )
}

const MainSortableItem = ({ item }) => {
  const { listeners, setNodeRef, transform, transition } = useSortable({ id: item.id })

  const style = { transform: CSS.Transform.toString(transform), transition }

  return (
    <div ref={setNodeRef} className="my-2 border p-3" {...listeners} style={style}>
      id: {item.id} - {item.name}
    </div>
  )
}

export default Sort

export function arrayMove<T>(array: T[], from: number, to: number): T[] {
  const newArray = array.slice()
  newArray.splice(to < 0 ? newArray.length + to : to, 0, newArray.splice(from, 1)[0])

  return newArray
}
