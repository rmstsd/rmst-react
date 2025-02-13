import { useEffect } from 'react'
import './style.less'
import { sleepAsync, sleepSync } from '@/utils/utils'
import { splitRange } from './splitRange'
import platform from 'platform'
import { Grid } from '@arco-design/web-react'
import GridSys from './GridSys'
import FlexboxGrid from './FlexboxGrid'
import {
  DndContext,
  DragOverlay,
  MeasuringStrategy,
  PointerSensor,
  useDndContext,
  useDraggable,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { SortableContext, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
const Row = Grid.Row
const Col = Grid.Col

function Rmstsd() {
  console.log(platform)
  useEffect(() => {
    const div = document.querySelector('div')
    const overlay = document.querySelector('.overlay')

    const sel = window.getSelection()

    div.onpointerdown = evt => {
      requestAnimationFrame(() => {
        console.log(sel.rangeCount)

        const range = sel.getRangeAt(0).cloneRange()
        range.selectNodeContents(range.startContainer)

        console.log(isHitText(evt.clientX, evt.clientY, range.getBoundingClientRect()))
      })
    }

    div.onclick = async evt => {
      return
      const range = sel.getRangeAt(0)

      console.log(range)

      const node = range.startContainer

      const aa = splitRange(node, range.startOffset, range.endOffset)

      for (const item of aa) {
        await sleepAsync(2000)
        console.log(item)

        sel.removeAllRanges()

        sel.addRange(item)
      }

      console.log(aa)

      return
    }

    const isHitText = (x, y, rangeRect) => {
      const width = 30
      const height = 20

      const halfWidth = width / 2
      const halfHeight = height / 2

      const points = [
        { x, y },
        { x: x - halfWidth, y: y - halfHeight },
        { x, y: y - halfHeight },
        { x: x + halfWidth, y: y - halfHeight },
        { x: x + halfWidth, y },
        { x: x + halfWidth, y: y + halfHeight },
        { x, y: y + halfHeight },
        { x: x - halfWidth, y: y + halfHeight },
        { x: x - halfWidth, y }
      ]

      overlay.style.left = x - halfWidth + 'px'
      overlay.style.top = y - halfHeight + 'px'
      overlay.style.width = width + 'px'
      overlay.style.height = height + 'px'

      for (const point of points) {
        const { x, y } = point
        const isInRect = x > rangeRect.left && x < rangeRect.right && y > rangeRect.top && y < rangeRect.bottom

        if (isInRect) {
          return true
        }
      }

      return false
    }
  }, [])

  return (
    <div className="rmstsd">
      <Plt />
      <div className="content">君不见黄河之水天上来，奔流到海不复回</div>

      <div className="overlay"></div>
      <div className="img-cont"></div>

      <hr />

      <div style={{ margin: '10px 0' }}>
        <Row gutter={[16, 50]} justify="end">
          <Col span={10}>
            <div className="sgcontent">moveIcon</div>
          </Col>
          <Col span={4} offset={1}>
            <div className="sgcontent">分离label</div>
          </Col>
          <Col span={4}>
            <div className="sgcontent">删除icon</div>
          </Col>

          {/* <Col span={24}>
            <div className="sgcontent">页面类型</div>
          </Col>
          <Col span={24}>
            <div className="sgcontent">页面内容</div>
          </Col>

          <Col span={2}>
            <div className="sgcontent">图标</div>
          </Col>
          <Col span={20} offset={2}>
            <div className="sgcontent">颜色</div>
          </Col>

          <Col span={24}>
            <div className="sgcontent">菜单项名称</div>
          </Col> */}
        </Row>
      </div>

      <hr />

      <GridSys />

      <hr />

      <FlexboxGrid />
    </div>
  )
}

function Plt() {
  return (
    <div>
      <div>{navigator.platform}</div>
      <div>{navigator.userAgent}</div>
    </div>
  )
}

//

const list = [
  {
    id: 'a',
    gName: 'a',
    children: [
      {
        id: 'b',
        cName: 'b'
      },
      {
        id: 'c',
        cName: 'c'
      },
      {
        id: 'q',
        cName: 'q'
      },
      {
        id: 'w',
        cName: 'w'
      }
    ]
  },
  {
    id: 'd',
    gName: 'd',
    children: [
      {
        id: 'e',
        cName: 'e'
      },
      {
        id: 'f',
        cName: 'f'
      }
    ]
  }
]

const measuring: MeasuringConfiguration = {
  droppable: {
    strategy: MeasuringStrategy.Always
  }
}

import Demo from './DndKit/Demo'

export default Demo

function Dd() {
  const sensors = useSensors(useSensor(PointerSensor))

  return (
    <div>
      <DndContext
        onDragStart={evt => {
          console.log('onDragStart', evt.active.id)
        }}
        onDragOver={evt => {
          console.log('onDragOver', evt)
        }}
        onDragMove={evt => {
          // console.log('onDragMove', evt)
        }}
        onDragEnd={evt => {
          console.log('onDragEnd', evt)
        }}
        sensors={sensors}
        collisionDetection={closestCenter}
        measuring={measuring}
      >
        <SortableContext items={list.map(item => item.id)}>
          {list.map(item => (
            <Gitem item={item} key={item.id} />
          ))}
        </SortableContext>

        <DragOverlay dropAnimation={null}>
          <div>hello</div>
        </DragOverlay>
      </DndContext>
    </div>
  )
}

const Gitem = ({ item }) => {
  const { setNodeRef, listeners, transform, transition } = useSortable({ id: item.id })

  return (
    <div
      className="m-20 border"
      style={
        {
          // transform: CSS.Translate.toString(transform), transition
        }
      }
    >
      <div className="m-10 flex gap-6 border-b">
        {item.gName}

        <button {...listeners} ref={setNodeRef}>
          handle
        </button>
      </div>

      <div>
        <SortableContext items={item.children.map(cItem => cItem.id)}>
          {item.children.map(cItem => (
            <CItem key={cItem.id} item={cItem} />
          ))}
        </SortableContext>
      </div>
    </div>
  )
}

const CItem = ({ item }) => {
  const { setNodeRef, listeners, transform, transition, index } = useSortable({ id: item.id })
  // console.log(index, item.id)

  const { active, activatorEvent, over } = useDndContext()

  // console.log(index)
  // console.log('active', JSON.parse(JSON.stringify(active)))
  // console.log('over', over)

  // if (activatorEvent) {
  //   console.log(activatorEvent.clientX)
  // }

  const activeIndex = (() => {
    if (active) {
      return active.data.current.sortable.items.indexOf(active.id)
    }
  })()

  // const pos = over?.id === item.id ? (index > activeIndex ? 'After' : 'Before') : undefined

  return (
    <div
      className="m-10 flex gap-8 border p-4"
      style={
        {
          // transform: CSS.Translate.toString(transform),
          // transition,
          // borderTop: pos === 'Before' ? '1px solid red' : '',
          // borderBottom: pos === 'After' ? '1px solid red' : ''
        }
      }
    >
      {item.cName}

      <button {...listeners} ref={setNodeRef}>
        handle
      </button>
    </div>
  )
}

import type { Coordinates, ClientRect } from '../../types'

import type { CollisionDescriptor, CollisionDetection } from './types'
export function sortCollisionsAsc(
  { data: { value: a } }: CollisionDescriptor,
  { data: { value: b } }: CollisionDescriptor
) {
  return a - b
}
export function distanceBetween(p1: Coordinates, p2: Coordinates) {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2))
}

/**
 * Returns the coordinates of the center of a given ClientRect
 */
function centerOfRectangle(rect: ClientRect, left = rect.left, top = rect.top): Coordinates {
  return {
    x: left + rect.width * 0.5,
    y: top + rect.height * 0.5
  }
}

/**
 * Returns the closest rectangles from an array of rectangles to the center of a given
 * rectangle.
 */
export const closestCenter: CollisionDetection = ({ collisionRect, droppableRects, droppableContainers }) => {
  const centerRect = centerOfRectangle(collisionRect, collisionRect.left, collisionRect.top)
  const collisions: CollisionDescriptor[] = []

  for (const droppableContainer of droppableContainers) {
    const { id } = droppableContainer
    const rect = droppableRects.get(id)

    if (rect) {
      const distBetween = distanceBetween(centerOfRectangle(rect), centerRect)

      collisions.push({ id, data: { droppableContainer, value: distBetween } })
    }
  }

  return collisions.sort(sortCollisionsAsc)
}
