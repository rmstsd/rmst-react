import { DndContext, useDroppable, useDraggable, closestCenter } from '@dnd-kit/core'
import { useState } from 'react'

const DndKit = () => {
  const [isDropped, setIsDropped] = useState(false)
  const draggableMarkup = <Draggable>Drag me</Draggable>

  function handleDragEnd(event) {
    console.log(event)
    if (event.over && event.over.id === 'droppable') {
      setIsDropped(true)
    } else {
      setIsDropped(false)
    }
  }

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      onDragOver={evt => {
        console.log('over', evt)
      }}
    >
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
    <button ref={setNodeRef} style={style} {...listeners} className="w-[140px] h-[50px]">
      {props.children}
    </button>
  )
}

export function Droppable(props) {
  const { isOver, setNodeRef } = useDroppable({ id: 'droppable' })

  const style = { color: isOver ? 'green' : undefined }

  return (
    <div ref={setNodeRef} style={style} className="border-2 h-[400px] mt-[10px]">
      {props.children}
    </div>
  )
}
