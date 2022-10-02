import { Divider } from '@arco-design/web-react'
import { useEffect, useRef, useState } from 'react'

const useLatestState = <S,>(value: S) => {
  const [v, setV] = useState(value)
  const ref = useRef(v)
  ref.current = v

  return [ref, setV] as const
}

const VCardList = () => {
  const totalList = Array.from({ length: 99 }, (_, idx) => idx)

  const containerHeight = 500

  const cardWidth = 150
  const cardHeight = 100

  const gridColumnGap = 0
  const gridRowGap = 0

  const rowCountRef = useRef(1)
  const visibleRow = Math.ceil(containerHeight / cardHeight)
  const totalRow = Math.ceil(totalList.length / rowCountRef.current)

  const containerRef = useRef<HTMLDivElement>(null)
  const [visibleList, setVisibleList] = useState([])

  const [startRowRef, setStartRow] = useLatestState(0)

  const onScroll = () => {
    const { scrollTop } = containerRef.current

    const startRow = Math.floor(scrollTop / cardHeight)

    setStartRow(startRow)

    const startIdx = startRow * rowCountRef.current
    const endIdx = (startRow + visibleRow + 1) * rowCountRef.current

    setVisibleList(totalList.slice(startIdx, endIdx))
  }

  useEffect(() => {
    const ob = new ResizeObserver(() => {
      const { scrollTop, clientWidth } = containerRef.current
      const nvRowCount = Math.floor((clientWidth + gridColumnGap) / (cardWidth + gridColumnGap))

      console.log(nvRowCount)

      rowCountRef.current = nvRowCount

      handleView()
    })
    ob.observe(containerRef.current)
    return () => ob.disconnect()
  }, [])

  const handleView = () => {
    const startIdx = startRowRef.current * rowCountRef.current
    const endIdx = (startRowRef.current + visibleRow + 1) * rowCountRef.current

    setVisibleList(totalList.slice(startIdx, endIdx))
  }

  return (
    <div>
      <div
        ref={containerRef}
        style={{ height: containerHeight, overflow: 'auto', position: 'relative' }}
        onScroll={onScroll}
      >
        <section style={{ height: totalRow * cardHeight }} />

        <main
          style={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: `repeat(auto-fill, minmax(${cardWidth}px, 1fr))`,
            gridColumnGap,
            gridRowGap,
            alignContent: 'flex-start',
            position: 'absolute',
            top: 0,
            transform: `translateY(${startRowRef.current * cardHeight}px)`
          }}
        >
          {visibleList.map(item => (
            <div className="v-c-item" key={item} style={{ height: cardHeight }}>
              {item}
            </div>
          ))}
        </main>
      </div>

      <Divider />

      <div>
        <main
          style={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: `repeat(auto-fill, minmax(${cardWidth}px, 1fr))`,
            alignContent: 'flex-start',
            height: 400,
            overflow: 'auto'
          }}
        >
          {totalList.map(item => (
            <div className="v-c-item" key={item} style={{ height: cardHeight }}>
              {item}
            </div>
          ))}
        </main>
      </div>
    </div>
  )
}

export default VCardList

// --------------------------------------------------------------------------------------------------------------------

type func = (a: number, b: boolean) => string
type Parameter<T> = T extends (...args: infer P) => infer R ? P : any
type s = Parameter<func>

type arr = boolean[]
type sin<T extends unknown[]> = T extends (infer U)[] ? U : never
type res = sin<arr>

type pro = string
type inner = pro extends Promise<infer R> ? R : 6

const tut = ['a', 'b'] as const
type uni = typeof tut[number]
