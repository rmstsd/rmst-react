import cn from '@/utils/cn'
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { useDraggable } from '@dnd-kit/core'
import { transitionProperty } from '@dnd-kit/sortable/dist/hooks/defaults'
import { CSS, getEventCoordinates } from '@dnd-kit/utilities'
import { makeAutoObservable } from 'mobx'
import { observer } from 'mobx-react-lite'

import './style.less'

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
    transform: isDragging ? CSS.Transform.toString(transform) : '',
    left: store.coord.x,
    top: store.coord.y
  }

  return (
    <button ref={setNodeRef} style={style} className={cn('h-50 relative border', isDragging && 'ani')}>
      <span>drag-item</span>

      <span className="h-30 ml-5 inline-flex w-40 items-center justify-center border" {...listeners}>
        han
      </span>
    </button>
  )
})
