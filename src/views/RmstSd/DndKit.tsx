import { DndContext, PointerSensor, useDraggable, useSensor, useSensors } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'

export default function DndKitDd() {
  const sen = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 20 }
    })
  )

  return (
    <div>
      <DndContext sensors={sen}>
        <Dv />
      </DndContext>
    </div>
  )
}

function Dv() {
  const { setNodeRef, listeners, transform } = useDraggable({ id: 1 })

  const style = {
    transform: CSS.Translate.toString(transform)
  }

  return (
    <div ref={setNodeRef} {...listeners} style={style}>
      asdasdasd
    </div>
  )
}
