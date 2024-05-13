import { CommandNode, commandData } from './data'
import { useEffect, useRef, useState } from 'react'
import { useEventListener } from 'ahooks'
import { genOnlyKey, randomString } from './utils'

type RightNode = CommandNode & { onlyKey: number; content: string }
type PosObject = { minY: number; maxY: number; index: number; top; left }

const IndexDndKit = () => {
  const [leftDownNode, setLeftDownNode] = useState<CommandNode>(null)
  const [leftDownNodeCoord, setLeftDownNodeCoord] = useState({ x: 0, y: 0 })

  const [rightList, setRightList] = useState<RightNode[]>([])

  const rightListRef = useRef<HTMLDivElement[]>([])

  const rightContainerRef = useRef<HTMLDivElement>()

  const [insertIndex, setInsertIndex] = useState<number>(null)
  const [insertLineCoord, setInsertLineCoord] = useState({ top: 0, left: 0 })
  const posArrRef = useRef<PosObject[]>([])

  useEffect(() => {
    console.log('eff')
  }, [])

  useEventListener('mousedown', () => {
    updatePosArr()
  })

  useEventListener('mouseup', () => {
    setLeftDownNode(null)
    setInsertIndex(null)
  })

  useEventListener('mousemove', evt => {
    setLeftDownNodeCoord({ x: evt.clientX - 10, y: evt.clientY - 10 })
  })

  function updatePosArr() {
    const posArr: PosObject[] = []

    let prevRect: DOMRect
    rightListRef.current.forEach((item, index) => {
      const itemRect = item.getBoundingClientRect()

      if (index === 0) {
        posArr.push({
          minY: Number.MIN_SAFE_INTEGER,
          maxY: itemRect.top + itemRect.height / 2,
          index,
          top: itemRect.top - 10,
          left: itemRect.left
        })
      } else {
        posArr.push({
          minY: prevRect.top + prevRect.height / 2,
          maxY: itemRect.top + itemRect.height / 2,
          index,
          top: itemRect.top - 10,
          left: itemRect.left
        })
      }

      if (index === rightList.length - 1) {
        posArr.push({
          minY: itemRect.top + itemRect.height / 2,
          maxY: Number.MAX_SAFE_INTEGER,
          index: index + 1,
          top: itemRect.bottom + 10,
          left: itemRect.left
        })
      }

      prevRect = itemRect
    })

    console.log(posArr)

    posArrRef.current = posArr
  }

  return (
    <div className="h-full">
      {leftDownNode && (
        <div
          className="overlay border bg-white rounded-md shadow-lg fixed top-0 left-0 p-3 z-10 pointer-events-none"
          style={{ transform: `translate(${leftDownNodeCoord.x}px, ${leftDownNodeCoord.y}px)` }}
        >
          {leftDownNode.commandName}
        </div>
      )}

      {insertIndex !== null && <div className="h-[2px] fixed bg-orange-500 w-[100px]" style={insertLineCoord}></div>}

      <div className="h-full flex select-none">
        <aside className="border w-[200px] shrink-0">
          {commandData.map(item => (
            <div
              className="p-2 hover:bg-gray-200"
              key={item.id}
              onMouseDown={() => {
                setLeftDownNode(item)
              }}
            >
              {item.commandName}
            </div>
          ))}
        </aside>

        <div
          ref={rightContainerRef}
          className="min-h-[200px] border flex-grow p-3"
          onMouseEnter={evt => {
            // console.log(evt)
          }}
          onMouseLeave={() => {
            setInsertIndex(null)
          }}
          onMouseMove={evt => {
            if (!leftDownNode) {
              return
            }

            if (!rightList.length) {
              return
            }

            let target: PosObject
            for (const item of posArrRef.current) {
              if (item.minY < evt.clientY && evt.clientY < item.maxY) {
                target = item

                break
              }
            }

            setInsertIndex(target.index)

            setInsertLineCoord({ top: target.top, left: target.left })
          }}
          onMouseUp={() => {
            if (!leftDownNode) {
              return
            }

            const insertItem: RightNode = { ...leftDownNode, onlyKey: genOnlyKey(), content: randomString() }
            if (!rightList.length) {
              setRightList([insertItem])
            } else {
              setRightList(rightList.toSpliced(insertIndex, 0, insertItem))
            }
          }}
        >
          {rightList.map((item, index) => (
            <div
              key={item.onlyKey}
              ref={el => {
                rightListRef.current[index] = el
              }}
              className="p-2 border mt-4 flex gap-2"
            >
              <div className="shrink-0">
                {item.onlyKey} -{item.commandName}
              </div>
              <div className="break-all">{item.content}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default IndexDndKit
