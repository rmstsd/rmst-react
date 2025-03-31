import React, { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal, unstable_batchedUpdates } from 'react-dom'
import {
  closestCenter,
  pointerWithin,
  rectIntersection,
  CollisionDetection,
  DndContext,
  DragOverlay,
  DropAnimation,
  getFirstCollision,
  UniqueIdentifier,
  MeasuringStrategy,
  defaultDropAnimationSideEffects
} from '@dnd-kit/core'
import {
  AnimateLayoutChanges,
  SortableContext,
  useSortable,
  arrayMove,
  defaultAnimateLayoutChanges,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { createRange } from './utilities'

export type Items = Record<UniqueIdentifier, UniqueIdentifier[]>

export function MultipleContainers(props) {
  const { items: initialItems } = props

  const [items, setItems] = useState<Items>(
    () =>
      initialItems ?? {
        A: createRange(4, index => `A${index + 1}`),
        B: createRange(4, index => `B${index + 1}`),
        C: createRange(4, index => `C${index + 1}`),
        D: createRange(5, index => `D${index + 1}`),
        E: createRange(4, index => `E${index + 1}`),
        F: createRange(6, index => `F${index + 1}`)
      }
  )

  const [containers, setContainers] = useState(Object.keys(items) as UniqueIdentifier[])
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
  const lastOverId = useRef<UniqueIdentifier | null>(null)
  const recentlyMovedToNewContainer = useRef(false)

  const collisionDetectionStrategy: CollisionDetection = useCallback(
    args => {
      if (activeId && activeId in items) {
        return closestCenter({
          ...args,
          droppableContainers: args.droppableContainers.filter(container => container.id in items)
        })
      }

      // Start by finding any intersecting droppable
      const pointerIntersections = pointerWithin(args)
      const intersections =
        pointerIntersections.length > 0
          ? // If there are droppables intersecting with the pointer, return those
            pointerIntersections
          : rectIntersection(args)
      let overId = getFirstCollision(intersections, 'id')

      if (overId != null) {
        if (overId in items) {
          const containerItems = items[overId]

          // If a container is matched and it contains items (columns 'A', 'B', 'C')
          if (containerItems.length > 0) {
            // Return the closest droppable within that container
            overId = closestCenter({
              ...args,
              droppableContainers: args.droppableContainers.filter(
                container => container.id !== overId && containerItems.includes(container.id)
              )
            })[0]?.id
          }
        }

        lastOverId.current = overId

        return [{ id: overId }]
      }

      // When a draggable item moves to a new container, the layout may shift
      // and the `overId` may become `null`. We manually set the cached `lastOverId`
      // to the id of the draggable item that was moved to the new container, otherwise
      // the previous `overId` will be returned which can cause items to incorrectly shift positions
      if (recentlyMovedToNewContainer.current) {
        lastOverId.current = activeId
      }

      // If no droppable is matched, return the last match
      return lastOverId.current ? [{ id: lastOverId.current }] : []
    },
    [activeId, items]
  )

  const [clonedItems, setClonedItems] = useState<Items | null>(null)

  const findContainer = (id: UniqueIdentifier) => {
    if (id in items) {
      return id
    }

    return Object.keys(items).find(key => items[key].includes(id))
  }

  const onDragCancel = () => {
    if (clonedItems) {
      // Reset items to their original state in case items have been
      // Dragged across containers
      setItems(clonedItems)
    }

    setActiveId(null)
    setClonedItems(null)
  }

  // useEffect(() => {
  //   requestAnimationFrame(() => {
  //     recentlyMovedToNewContainer.current = false
  //   })
  // }, [items])

  function handleRemove(containerID: UniqueIdentifier) {
    setContainers(containers => containers.filter(id => id !== containerID))
  }

  console.log('items', items)

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={({ active }) => {
        setActiveId(active.id)
        setClonedItems(items)
      }}
      onDragOver={({ active, over }) => {
        const overId = over?.id

        if (overId == null || active.id in items) {
          return
        }

        const overContainer = findContainer(overId)
        const activeContainer = findContainer(active.id)

        console.log(activeContainer, overContainer)

        if (!overContainer || !activeContainer) {
          return
        }

        if (activeContainer !== overContainer) {
          console.log('move')
          setItems(items => {
            const activeItems = items[activeContainer]
            const overItems = items[overContainer]
            const overIndex = overItems.indexOf(overId)
            const activeIndex = activeItems.indexOf(active.id)

            let newIndex: number

            if (overId in items) {
              newIndex = overItems.length + 1
            } else {
              const isBelowOverItem =
                over &&
                active.rect.current.translated &&
                active.rect.current.translated.top > over.rect.top + over.rect.height

              const modifier = isBelowOverItem ? 1 : 0

              newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1
            }

            recentlyMovedToNewContainer.current = true

            return {
              ...items,
              [activeContainer]: items[activeContainer].filter(item => item !== active.id),
              [overContainer]: [
                ...items[overContainer].slice(0, newIndex),
                items[activeContainer][activeIndex],
                ...items[overContainer].slice(newIndex, items[overContainer].length)
              ]
            }
          })
        }
      }}
      onDragEnd={({ active, over }) => {
        if (active.id in items && over?.id) {
          setContainers(containers => {
            const activeIndex = containers.indexOf(active.id)
            const overIndex = containers.indexOf(over.id)

            return arrayMove(containers, activeIndex, overIndex)
          })
        }

        const activeContainer = findContainer(active.id)

        if (!activeContainer) {
          setActiveId(null)
          return
        }

        const overId = over?.id

        if (overId == null) {
          setActiveId(null)
          return
        }

        const overContainer = findContainer(overId)

        if (overContainer) {
          const activeIndex = items[activeContainer].indexOf(active.id)
          const overIndex = items[overContainer].indexOf(overId)

          if (activeIndex !== overIndex) {
            setItems(items => ({
              ...items,
              [overContainer]: arrayMove(items[overContainer], activeIndex, overIndex)
            }))
          }
        }

        setActiveId(null)
      }}
      onDragCancel={onDragCancel}
    >
      <div style={{ width: 300, flexShrink: 0, padding: 20, overflow: 'auto', height: 600 }}>
        <SortableContext items={[...containers]} strategy={verticalListSortingStrategy}>
          {containers.map(containerId => (
            <DroppableContainer
              key={containerId}
              id={containerId}
              label={`Column ${containerId}`}
              items={items[containerId]}
            >
              <SortableContext items={items[containerId]} strategy={verticalListSortingStrategy}>
                {items[containerId].map((value, index) => {
                  return <SortableItem key={value} id={value} index={index} containerId={containerId} />
                })}
              </SortableContext>
            </DroppableContainer>
          ))}
        </SortableContext>
      </div>

      {createPortal(
        <DragOverlay adjustScale={false} dropAnimation={null}>
          {activeId ? activeId : null}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  )
}
function DroppableContainer(props: { id: UniqueIdentifier; items: UniqueIdentifier[]; children; label }) {
  const { children, id, items, label } = props

  const { active, isDragging, listeners, over, setNodeRef, transition, transform } = useSortable({
    id,
    data: {
      type: 'container',
      children: items
    }
    // animateLayoutChanges
  })

  return (
    <div
      ref={setNodeRef}
      className="m-20 border border-gray-400 p-10"
      style={{
        transition,
        transform: CSS.Translate.toString(transform)
      }}
    >
      <div className="flex justify-between border-b border-gray-400 pb-10">
        {label}

        <span {...listeners} className="cursor-move">
          han
        </span>
      </div>

      <div>
        <ul>{children}</ul>
      </div>
    </div>
  )
}
interface SortableItemProps {
  containerId: UniqueIdentifier
  id: UniqueIdentifier
  index: number
}

function SortableItem(props: SortableItemProps) {
  const { id, index, containerId } = props
  const { setNodeRef, setActivatorNodeRef, listeners, isDragging, isSorting, over, overIndex, transform, transition } =
    useSortable({ id })

  return (
    <li
      className="mt-10 flex justify-between rounded border border-gray-400 p-10"
      style={
        {
          transition: [transition].filter(Boolean).join(', '),
          transform: CSS.Transform.toString(transform)
        } as React.CSSProperties
      }
      ref={setNodeRef}
    >
      {id}

      <span {...listeners} className="cursor-move">
        han
      </span>
    </li>
  )
}

const animateLayoutChanges: AnimateLayoutChanges = args => defaultAnimateLayoutChanges({ ...args, wasDragging: true })

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.5'
      }
    }
  })
}
