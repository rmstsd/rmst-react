import cn from '@/utils/cn'
import { DragDropProvider, useDraggable, useDroppable } from '@dnd-kit/react'
import { useState } from 'react'

export default function DndKitReact() {
  const [isDropped, setIsDropped] = useState(false)

  return (
    <div>
      <DragDropProvider
        onDragEnd={event => {
          if (event.canceled) {
            return
          }

          console.log(event.operation)

          const { operation } = event

          const isDropped = operation.target?.id === 'drop'
          setIsDropped(isDropped)
        }}
      >
        {!isDropped && <Draggable />}

        <Droppable>{isDropped ? <Draggable /> : 'Drop here'}</Droppable>
      </DragDropProvider>
    </div>
  )
}

const Draggable = () => {
  const { draggable, ref, handleRef } = useDraggable({ id: 'draggable' })

  return (
    <button ref={ref} className={cn(draggable.isDragging && 'opacity-50')}>
      Draggable
      <span className="mx-4">|</span>
      <span ref={handleRef}>hand</span>
    </button>
  )
}

const Droppable = ({ children }) => {
  const { ref, isDropTarget } = useDroppable({ id: 'drop' })

  return (
    <div className={cn('mt-20 h-[100px] w-[100px] bg-pink-100', isDropTarget && 'bg-pink-400')} ref={ref}>
      {children}
    </div>
  )
}
