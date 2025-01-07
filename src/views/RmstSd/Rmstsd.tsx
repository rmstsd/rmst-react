import { DndContext, MouseSensor, useDraggable, useSensor, useSensors } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { useEffect } from 'react'

export default function Rmstsd() {
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 5 }
    })
  )

  return (
    <div>
      <DndContext sensors={sensors}>
        <Draggable />
      </DndContext>
    </div>
  )
}

function Draggable() {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: 'draggable'
  })
  const style = {
    transform: CSS.Translate.toString(transform)
  }

  useEffect(() => {
    document.addEventListener(
      'change',
      evt => {
        console.log('change capture', evt.target)
        evt.stopPropagation()
      },
      { capture: true }
    )
  }, [])

  return (
    <label
      className="inline-block"
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      style={style}
      onClick={evt => {
        console.log('click', evt.target)
      }}
    >
      <input
        type="checkbox"
        onChange={evt => {
          console.log('change', evt.target.checked)
        }}
        onClick={() => {
          console.log('input click ')
        }}
        onClickCapture={() => {
          console.log('input click capture')
        }}
      />
      <span>aa</span>
    </label>
  )
}
