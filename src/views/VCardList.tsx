import { useEffect, useRef, useState } from 'react'

const useLatestState = <S,>(value: S) => {
  const [v, setV] = useState(value)
  const ref = useRef(v)
  ref.current = v

  return [ref, setV] as const
}

const VCardList = () => {
  const totalList = Array.from({ length: 100 }, (_, idx) => idx)

  const containerHeight = 500

  const cardWidth = 150
  const cardHeight = 100

  const rowCountRef = useRef(3)
  const visibleRow = Math.ceil(containerHeight / cardHeight)
  console.log(visibleRow)

  const totalRow = Math.floor(totalList.length / rowCountRef.current)

  const containerRef = useRef<HTMLDivElement>(null)
  const [visibleList, setVisibleList] = useState(totalList)

  const [startRowRef, setStartRow] = useLatestState(0)

  const onScroll = () => {
    const { scrollTop } = containerRef.current

    const startRow = Math.floor(scrollTop / cardHeight)

    setStartRow(startRow)

    const startIdx = startRow * rowCountRef.current
    const endIdx = (startRow + visibleRow + 1) * rowCountRef.current
    console.log(startIdx, endIdx)

    setVisibleList(totalList.slice(startIdx, endIdx))
  }

  useEffect(() => {
    const ob = new ResizeObserver(() => {
      const { scrollTop, clientWidth } = containerRef.current
      const nvRowCount = Math.floor(clientWidth / cardWidth)

      rowCountRef.current = nvRowCount

      handleView()
    })
    ob.observe(containerRef.current)
    return () => ob.disconnect()
  }, [])

  const handleView = () => {
    const startIdx = startRowRef.current * rowCountRef.current
    const endIdx = (startRowRef.current + visibleRow + 1) * rowCountRef.current
    console.log(startIdx, endIdx)

    setVisibleList(totalList.slice(startIdx, endIdx))
  }

  return (
    <div
      ref={containerRef}
      style={{ height: containerHeight, overflow: 'auto', position: 'relative' }}
      onScroll={onScroll}
    >
      <section style={{ height: totalRow * cardHeight }}>
        <main
          style={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: `repeat(auto-fill, minmax(${cardWidth}px, 1fr))`,
            alignContent: 'flex-start',
            position: 'absolute',
            top: startRowRef.current * cardHeight
          }}
        >
          {visibleList.map(item => (
            <div className="v-c-item" key={item} style={{ height: cardHeight }}>
              {item}
            </div>
          ))}
        </main>
      </section>
    </div>
  )
}

export default VCardList
