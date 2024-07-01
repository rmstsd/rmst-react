import { useEffect, useRef } from 'react'
import { NodeItem, genNodeItem, oriData } from './oriData'
import { useImmer } from 'use-immer'
import { useEventListener } from 'ahooks'

const size = { width: 120, height: 40 }

export default function ZrDragIndex() {
  const [nodes, setNodes] = useImmer<NodeItem[]>([
    // { id: 'aasdas', title: 'asdasd', type: 'dfsdf' },
    // { id: 'asds', title: 'asdasd', type: 'dfsdf' },
    // { id: 'ddd', title: 'asdasd', type: 'dfsdf' }
  ])

  const mainFlowContainerRef = useRef<HTMLElement>()

  const listDomRef = useRef<HTMLElement[]>([])

  const [dragState, setDragState] = useImmer({
    isMouseDown: false,
    inDownMouseMoveInMain: false,
    isDragSnapshot: false,
    pos: { left: 0, top: 0 },
    oriDataItem: null,
    dropIndex: null
  })

  useEventListener(
    'mousemove',
    evt => {
      if (!dragState.isMouseDown) {
        return
      }

      const isInMain = isInContainer(evt.clientX, evt.clientY, mainFlowContainerRef.current)
      setDragState(draft => {
        draft.isDragSnapshot = true
        draft.pos = { left: evt.clientX - size.width / 2, top: evt.clientY - size.height / 2 }
        draft.inDownMouseMoveInMain = isInMain
      })

      if (nodes.length !== 0) {
        const domList = listDomRef.current
        const y = evt.clientY

        const getAnsIndex = () => {
          const collisionRects = domList.map((item, index) => {
            const minY = -99999
            const y = index === 0 ? minY : getRectCenterY(domList[index - 1])
            const height =
              index === 0 ? getRectCenterY(item) - minY : getRectCenterY(item) - getRectCenterY(domList[index - 1])

            const rect = { y, height }

            return { ansIndex: index, rect }
          })
          collisionRects.push({
            ansIndex: domList.length,
            rect: {
              y: getRectCenterY(domList.at(-1)),
              height: Number.MAX_SAFE_INTEGER - getRectCenterY(domList.at(-1))
            }
          })

          const ans = collisionRects.find(item => item.rect.y < y && y < item.rect.y + item.rect.height)
          if (!ans) {
            debugger
          }

          return ans?.ansIndex
        }

        const ansIndex = getAnsIndex()

        setDragState(draft => {
          draft.dropIndex = ansIndex
        })
      }
    },
    { target: document }
  )

  useEventListener(
    'mouseup',
    evt => {
      console.log(dragState.inDownMouseMoveInMain)

      if (dragState.inDownMouseMoveInMain) {
        if (nodes.length === 0) {
          setNodes(draft => {
            draft.push(genNodeItem(dragState.oriDataItem))
          })
        } else {
          setNodes(draft => {
            draft.splice(dragState.dropIndex, 0, genNodeItem(dragState.oriDataItem))
          })
        }
      }

      setDragState(draft => {
        draft.isMouseDown = false
        draft.isDragSnapshot = false
        draft.inDownMouseMoveInMain = false
      })
    },
    { target: document }
  )

  const onMouseDown = item => {
    setDragState(d => {
      d.isMouseDown = true
      d.oriDataItem = item
    })
  }

  return (
    <div className="flex h-full">
      <aside className="select-none border-r">
        {oriData.map(item => (
          <div
            key={item.id}
            data-source-id={item.id}
            className="p-2 hover:bg-gray-100"
            onMouseDown={() => onMouseDown(item)}
          >
            {item.id} {item.title}
          </div>
        ))}
      </aside>

      <main
        ref={mainFlowContainerRef}
        data-flow-id="flow-1"
        className="grow p-2 select-none gap-2 flex flex-col"
        style={{
          backgroundColor: dragState.inDownMouseMoveInMain ? '#eee' : ''
        }}
      >
        {nodes.map((item, index) => (
          <div
            key={item.id}
            ref={el => {
              listDomRef.current[index] = el
            }}
            className="hover:bg-gray-100 p-2 border"
          >
            {item.id} {item.title}
          </div>
        ))}
      </main>

      {dragState.isDragSnapshot && <div style={{ ...dragState.pos, ...size }} className="bg-red-100 fixed"></div>}
    </div>
  )
}

function isInContainer(x, y, container: HTMLElement) {
  const rect = container.getBoundingClientRect()

  return rect.left < x && x < rect.right && rect.top < y && y < rect.bottom
}

const getRectCenterY = (dom: HTMLElement) => {
  const rect = dom.getBoundingClientRect()
  return rect.top + rect.height / 2
}
