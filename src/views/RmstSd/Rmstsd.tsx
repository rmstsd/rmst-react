import { useEffect, useState } from 'react'
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

// import Demo from './DndKit/Demo'
// export default Demo

import { EditorProvider, FloatingMenu, BubbleMenu, useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Jodit from './RickText/Jodit'
import Ckeditor from './RickText/Ckeditor'

// define your extension array
const extensions = [StarterKit]

const content = '<p>Hello World!</p>'

import { isMobile, isDesktop, isAndroid, isTablet } from 'react-device-detect'

function TapTip() {
  const rects = [
    { x: 0, y: 0, width: 100, height: 100 },
    { x: -800, y: 0, width: 100, height: 100 },
    { x: 0, y: 400, width: 100, height: 100 },
    { x: 55, y: -676, width: 1050, height: 100 }
  ]

  const x1s = rects.map(r => r.x)
  const y1s = rects.map(r => r.y)

  const x2s = rects.map(r => r.x + r.width)
  const y2s = rects.map(r => r.y + r.height)

  const bounds = {
    x1: Math.min(...rects.map(r => r.x)),
    y1: Math.min(...rects.map(r => r.y)),
    x2: Math.max(...rects.map(r => r.x + r.width)),
    y2: Math.max(...rects.map(r => r.y + r.height))
  }

  const bouRect = { x: bounds.x1, y: bounds.y1, width: bounds.x2 - bounds.x1, height: bounds.y2 - bounds.y1 }

  const size = 500 - 20

  const s1 = size / 2 / Math.abs(bounds.x1)
  const s2 = size / 2 / Math.abs(bounds.y1)
  const s3 = size / 2 / Math.abs(bounds.x2)
  const s4 = size / 2 / Math.abs(bounds.y2)

  const ss = Math.min(s1, s2, s3, s4)

  const mt = new DOMMatrix().translate(250, 250).scale(ss, ss, 1)

  const transform = `translate(${mt.e} ${mt.f}) scale(${mt.a})`

  return (
    <div>
      <svg className="border" width={500} height={500}>
        <g transform={transform}>
          <rect x={bouRect.x} y={bouRect.y} width={bouRect.width} height={bouRect.height} fill="none" stroke="blue" />

          <circle cx="0" cy="0" r="10" fill="red" />
          {rects.map((p, idx) => (
            <rect key={idx} x={p.x} y={p.y} width={p.width} height={p.height} />
          ))}
        </g>
      </svg>
    </div>
  )
  return <Ckeditor />

  return <Jodit />
}

import opentype from 'opentype.js'
import { load } from 'opentype.js'
import { Application, Graphics } from 'pixi.js'

export default function TestOpen() {
  useEffect(() => {
    init()
  }, [])

  const init = async () => {
    const pixiContainer = document.querySelector('.pixi-c')
    const app = new Application()

    await app.init({
      width: pixiContainer.clientWidth,
      height: pixiContainer.clientHeight,
      backgroundColor: '#fff',
      antialias: true,
      resolution: window.devicePixelRatio + 1 || 1
    })
    app.canvas.style.setProperty('width', '100%')
    app.canvas.style.setProperty('height', '100%')
    pixiContainer.appendChild(app.canvas)

    const canvas = document.querySelector('.canvas2d') as HTMLCanvasElement
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const buffer = await fetch('./汉仪中黑S.ttf').then(res => res.arrayBuffer())

    const font = opentype.parse(buffer)

    const x = 10
    const y = 60
    const fontSize = 22
    const text = '哈机器人abcdm46789001234啊四级考试东方故事第五人哦我省得麻烦梵蒂冈放'

    const textPaths = font.getPaths(text, x, y, fontSize)
    console.log('textPaths', textPaths)

    // font.draw(ctx, text, x, y, fontSize)
    // font.drawPoints(ctx, text, x, y, fontSize)

    const textPath = font.getPath(text, x, y, fontSize)
    const pathData = textPath.toPathData(4) // 4 为小数精度

    setD(pathData)
    // console.log(pathData)

    // ${textPath.toSVG(4)}

    const graphics = new Graphics()

    const drawText = fill => {
      graphics.clear()
      graphics.svg(
        `
        <svg xmlns="http://www.w3.org/2000/svg">
          <path d="${pathData}" fill="${fill}" />
        </svg>
        `
      )
    }

    drawText('red')

    app.stage.addChild(graphics)

    setTimeout(() => {
      drawText('blue')

      // app.stage.scale.set(4, 4)
    }, 1000)

    const path2d = new Path2D(pathData)

    ctx.fill(path2d)
  }

  const [d, setD] = useState('')

  return (
    <div>
      <div className="pixi-c border" style={{ height: 400 }}></div>

      <canvas width={600} height={500} className="canvas2d border"></canvas>

      <svg width={600} height={500} className="border">
        <path d={d} />
      </svg>
    </div>
  )
}
