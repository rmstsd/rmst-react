import cn from '@/utils/cn'
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { useDraggable } from '@dnd-kit/core'
import { transitionProperty } from '@dnd-kit/sortable/dist/hooks/defaults'
import { CSS, getEventCoordinates } from '@dnd-kit/utilities'
import { makeAutoObservable } from 'mobx'
import { observer } from 'mobx-react-lite'

import './style.less'
import { CSSProperties } from 'react'

class Store {
  coord = { x: 0, y: 0 }

  constructor() {
    makeAutoObservable(this)
  }
}

const store = new Store()

const DndKitCore = observer(function DndKitCore() {
  return (
    <div style={{ height: 600 }} className="dnd-kit-core border p-10">
      <DndContext
        onDragEnd={({ delta }) => {
          console.log('end')
          store.coord.x += delta.x
          store.coord.y += delta.y
        }}
      >
        <Draggable>dragdragdragdragdragdragdrag</Draggable>
      </DndContext>
    </div>
  )
})

export default DndKitCore

const Draggable = observer(function (props) {
  const { listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: 'draggable'
  })

  const style = {
    '--translate-x': `${transform?.x ?? 0}px`,
    '--translate-y': `${transform?.y ?? 0}px`,
    // left: `${store.coord.x}px`,
    // top: `${store.coord.y}px`
  } as CSSProperties

  return (
    <button ref={setNodeRef} style={style} className={cn('drag-item relative h-50 border', isDragging && 'dragging')}>
      <span>drag-item</span>

      <span className="ml-5 inline-flex h-30 w-40 items-center justify-center border" {...listeners}>
        han
      </span>
    </button>
  )
})
