import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import { Virtuoso } from 'react-virtuoso'

const data = Array.from({ length: 100 }, (_, idx) => ({ id: 'asd' + idx, idx }))

const VSelect = () => {
  const ref = useRef(null)

  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const [bxStyle, setBxStyle] = useState({ left: 0, top: 0, width: 0, height: 0 })

  useEffect(() => {
    const container = ref.current as HTMLDivElement

    let downCoord = { x: 0, y: 0 }
    let isAn = false

    let anAxisYIndex = { top: 0, center: 0, bottom: 0 }

    container.addEventListener('mousedown', evt => {
      setSelectedIds([])

      isAn = true

      downCoord = getMouseCoordInContainer(evt.clientX, evt.clientY, container)

      upDoms()

      const ladder = getRectLadder(downCoord.y)
      const tt = ladder.find(item => item.con())
      console.log(tt.ans)
      anAxisYIndex = tt.ans
    })

    document.addEventListener('mouseup', () => {
      isAn = false

      setBxStyle({ left: 0, top: 0, width: 0, height: 0 })
    })

    document.addEventListener('mousemove', evt => {
      if (!isAn) {
        return
      }

      evt.preventDefault()
      upDoms()

      const { x, y } = getMouseCoordInContainer(evt.clientX, evt.clientY, container)

      const lt = { x: Math.min(downCoord.x, x), y: Math.min(downCoord.y, y) }
      const rb = { x: Math.max(downCoord.x, x), y: Math.max(downCoord.y, y) }

      setBxStyle({ left: lt.x, top: lt.y, width: rb.x - lt.x, height: rb.y - lt.y })

      //

      const ladder = getRectLadder(y)
      const tt = ladder.find(item => item.con())

      if (!tt) {
        return
      }

      const selIds_InDocumentView = doms
        .filter(item => {
          const rect = getBoundingContainerRect(item, container)

          const overlap = {
            lt: { x: Math.max(lt.x, rect.x), y: Math.max(lt.y, rect.y) },
            rb: { x: Math.min(rb.x, rect.x + rect.width), y: Math.min(rb.y, rect.y + rect.height) }
          }

          const width = overlap.rb.x - overlap.lt.x
          const height = overlap.rb.y - overlap.lt.y

          return width > 0 && height > 0
        })
        .map(item => item.getAttribute('data-node'))

      if (selIds_InDocumentView.length === 0) {
        setSelectedIds([])
        return
      }

      const [min, max] = [anAxisYIndex, tt.ans].toSorted((a, b) => {
        let _a = a.center ?? a.top
        let _b = b.center ?? b.top
        return _a - _b
      })

      const minIndex = min.center ?? min.bottom
      const maxIndex = max.center ?? max.top

      const selIds = data.slice(minIndex, maxIndex + 1).map(item => item.id)
      setSelectedIds(selIds)
    })

    let doms: HTMLDivElement[] = []

    function upDoms() {
      doms = Array.from(container.querySelectorAll('[data-node]'))
    }

    function getRectLadder(y: number) {
      const ladder = []

      doms.forEach((item, index) => {
        const rect = getBoundingContainerRect(item, container)

        const dataIndex = Number(item.getAttribute('data-index'))

        if (index === 0) {
          ladder.push({
            con: () => y < rect.y,
            ans: { bottom: dataIndex }
          })
        }

        ladder.push({
          con: () => rect.y < y && y < rect.y + rect.height,
          ans: { center: dataIndex }
        })

        if (index !== doms.length - 1) {
          const nextRect = getBoundingContainerRect(doms[index + 1], container)

          ladder.push({
            con: () => rect.y + rect.height < y && y < nextRect.y,
            ans: { top: dataIndex, bottom: dataIndex + 1 }
          })
        }
      })

      return ladder
    }
  }, [])

  return (
    <>
      <Virtuoso
        scrollerRef={el => {
          ref.current = el
        }}
        className="border"
        style={{ height: 800 }}
        data={data}
        components={{
          Header: () => <div className="h-[20px]"></div>,
          Footer: () => {
            return (
              <>
                <div className="absolute border border-gray-500 z-10 bg-blue-50 opacity-30" style={bxStyle}></div>
              </>
            )
          }
        }}
        itemContent={(index, item) => {
          return (
            <div className="p-2 mx-6">
              <div
                data-node={item.id}
                data-index={item.idx}
                className={classNames('border-2 box-border bg-white p-2', {
                  'border-red-400': selectedIds.includes(item.id)
                })}
              >
                id: {item.id} - index: {item.idx}
              </div>
            </div>
          )
        }}
      />
    </>
  )
}

export default VSelect

export function getMouseCoordInContainer(clientX: number, clientY: number, outerContainer: HTMLElement) {
  const containerRect = outerContainer.getBoundingClientRect()

  const x = clientX - containerRect.left + outerContainer.scrollLeft
  const y = clientY - containerRect.top + outerContainer.scrollTop

  return { x, y }
}

// 计算容器内元素在该容器内的坐标 (基于滚动条左上角的坐标)
export function getBoundingContainerRect(target: HTMLElement, outerContainer: HTMLElement) {
  const containerRect = outerContainer.getBoundingClientRect()
  const divRect = target.getBoundingClientRect()

  const leftOffset = divRect.left - containerRect.left + outerContainer.scrollLeft
  const topOffset = divRect.top - containerRect.top + outerContainer.scrollTop

  return { x: leftOffset, y: topOffset, width: divRect.width, height: divRect.height }
}
