import React, { useState } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'

import { SortableItem } from '../DndKit/SortableItem'
import { css } from '@emotion/css'
import classNames from 'classnames'

const dndKitEmo = css({
  label: 'dndKitEmo'
})

const DndKit = () => {
  const [items, setItems] = useState([1, 2, 3, 4, 5, 6, 7])
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  const handleDragEnd = event => {
    const { active, over } = event

    console.log(active.id, over.id)

    if (active.id !== over.id) {
      setItems(items => {
        const oldIndex = items.indexOf(active.id)
        const newIndex = items.indexOf(over.id)

        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  return (
    <div className={classNames(dndKitEmo, 'border')}>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.map((id, index) => (
            <SortableItem key={id} id={id} index={index} />
          ))}
        </SortableContext>

        <DragOverlay>
          <button>zz</button>
        </DragOverlay>
      </DndContext>
    </div>
  )
}

export default DndKit
