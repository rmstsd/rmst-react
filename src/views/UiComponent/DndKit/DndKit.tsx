import { DndContext, useDroppable, useDraggable } from '@dnd-kit/core'
import { useState } from 'react'

const DndKit = () => {
  const [isDropped, setIsDropped] = useState(false)
  const draggableMarkup = <Draggable>Drag me</Draggable>

  function handleDragEnd(event) {
    console.log(event)
    if (event.over && event.over.id === 'droppable') {
      setIsDropped(true)
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {!isDropped ? draggableMarkup : null}

      <Droppable>{isDropped ? draggableMarkup : 'Drop here'}</Droppable>
    </DndContext>
  )
}

export default DndKit

export function Draggable(props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: 'draggable' })

  const style = transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : undefined

  return (
    <button ref={setNodeRef} style={style} {...listeners}>
      {props.children}
    </button>
  )
}

export function Droppable(props) {
  const { isOver, setNodeRef } = useDroppable({
    id: 'droppable'
  })

  const style = { color: isOver ? 'green' : undefined }

  return (
    <div ref={setNodeRef} style={style} className="border-2 h-[400px] mt-[10px]">
      {props.children}
    </div>
  )
}
