import cn from '@/utils/cn'
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { useDraggable } from '@dnd-kit/core'
import { transitionProperty } from '@dnd-kit/sortable/dist/hooks/defaults'
import { CSS, getEventCoordinates } from '@dnd-kit/utilities'
import { makeAutoObservable } from 'mobx'
import { observer } from 'mobx-react-lite'

import './style.less'
import { CSSProperties } from 'react'
import { Button, Grid } from '@arco-design/web-react'
import { startString, stopString } from '../record'

class Store {
  coord = { x: 0, y: 0 }

  constructor() {
    makeAutoObservable(this)
  }
}

const store = new Store()

const startFunc = new Function(startString)
const stopFunc = new Function(stopString)

const DndKitCore = observer(function DndKitCore() {
  return (
    <div>
      <Button onClick={() => startFunc()}>开始录制</Button>
      <Button onClick={() => stopFunc()}>停止录制并下载</Button>
    </div>
  )

  return (
    <div style={{ height: 600 }} className="dnd-kit-core border p-10">
      <DndContext
        onDragEnd={({ delta }) => {
          console.log('end')
          store.coord.x += delta.x
          store.coord.y += delta.y
        }}
      >
        <Draggable>dragdragdragdragdragdragdrag</Draggable>
      </DndContext>
    </div>
  )
})

const Draggable = observer(function (props) {
  const { listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: 'draggable'
  })

  const style = {
    '--translate-x': `${transform?.x ?? 0}px`,
    '--translate-y': `${transform?.y ?? 0}px`
    // left: `${store.coord.x}px`,
    // top: `${store.coord.y}px`
  } as CSSProperties

  return (
    <button ref={setNodeRef} style={style} className={cn('drag-item relative h-50 border', isDragging && 'dragging')}>
      <span>drag-item</span>

      <span className="ml-5 inline-flex h-30 w-40 items-center justify-center border" {...listeners}>
        han
      </span>
    </button>
  )
})

const { Row, Col } = Grid

export default function Tttt() {
  return (
    <div className="tt-daklg border">
      <Row gutter={[8, 8]}>
        <Col xs={{ span: 16 }} xl={{ span: 1 }}>
          <div>mo</div>
        </Col>

        <Col xs={{ span: 8 }} xl={{ span: 4, order: 8 }}>
          <div>[] 向上分离 | del</div>
        </Col>

        <Col xs={{ span: 24 }} sm={{ span: 12 }} xl={{ span: 4 }}>
          <div>标准页面</div>
        </Col>

        <Col xs={{ span: 24 }} sm={{ span: 12 }} xl={{ span: 4 }}>
          <div>库存明细</div>
        </Col>

        <Col xs={{ span: 8 }} sm={{ span: 4 }} xl={{ span: 4 }}>
          <div>
            <span>图标</span>
            <span>value</span>
          </div>
        </Col>

        <Col xs={{ span: 16 }} sm={{ span: 8 }} xl={{ span: 4 }}>
          <div>
            <span>颜色</span>
            <span>value</span>
          </div>
        </Col>

        <Col xs={{ span: 24 }} sm={{ span: 12 }} xl={{ span: 3 }}>
          <div>
            <span>菜单项名称</span>
            <span>value</span>
          </div>
        </Col>
      </Row>
    </div>
  )
}
