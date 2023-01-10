import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { CSSProperties } from 'react'

export function SortableItem(props) {
  const { index } = props

  const { attributes, listeners, setNodeRef, transform, transition, active } = useSortable({
    id: props.id
  })

  const style: CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition
  }

  return (
    <div
      className="border bg-white"
      ref={setNodeRef}
      style={{ ...style, height: 20 * (index + 1), marginTop: 10 * (index + 1) }}
      // {...attributes}
      {...listeners}
    >
      {props.index}
    </div>
  )
}
