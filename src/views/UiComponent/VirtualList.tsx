import { useLayoutEffect, useRef, useState } from 'react'

const data = Array.from({ length: 100 }, (_, index) => ({
  height: Math.floor(40 + Math.random() * 60),
  onlyKey: index
}))

console.log(data)

const VirtualList = () => {
  const containerHeight = 700
  const estimatedHeight = 40

  const mainRef = useRef<HTMLDivElement>(null)

  const [totalHeight, setTotalHeight] = useState(2000)
  const [visibleData, setVisibleData] = useState([])
  const [startIndex, setStartIndex] = useState(0)
  const [top, setTop] = useState(0)

  const onScroll = evt => {
    const { scrollTop } = evt.target as HTMLDivElement

    let top = 0
    let startIndex = 0

    for (let i = 0; i < data.length; i++) {
      const cur = data[i]
      top += cur.height
      if (top >= scrollTop) {
        startIndex = i
        break
      }
    }

    setStartIndex(startIndex)
    setTop(top - data[startIndex].height)

    let count = 0
    let tempHeight = 0
    for (let i = startIndex; i < data.length; i++) {
      const cur = data[i]

      tempHeight += cur.height

      if (tempHeight >= containerHeight) {
        count = i - startIndex + 2

        break
      }
    }

    setVisibleData(data.slice(startIndex, startIndex + count))
  }

  const cacheHeights = useRef<number[]>([])

  useLayoutEffect(() => {
    Array.from(mainRef.current.childNodes).forEach((domItem: HTMLDivElement) => {
      const index = domItem.getAttribute('row-key')
      cacheHeights.current[index] = domItem.getBoundingClientRect().height
    })

    console.log(cacheHeights.current)

    const cacheTotalHeight = cacheHeights.current.reduce((acc, item) => item + acc, 0)

    const totalHeight = cacheTotalHeight + (data.length - cacheHeights.current.length) * estimatedHeight

    setTotalHeight(totalHeight)
  }, [visibleData])

  return (
    <div>
      <div
        className="border-2 relative"
        style={{ height: containerHeight, overflow: 'auto' }}
        onScroll={onScroll}
      >
        <div style={{ height: totalHeight }}></div>

        <main ref={mainRef} className="absolute w-full" style={{ top }}>
          {visibleData.map(item => (
            <div
              row-key={item.onlyKey}
              className="border-2 border-purple-800 box-border text-2xl"
              style={{ height: item.height }}
              key={item.onlyKey}
            >
              {item.onlyKey} --{item.height}
            </div>
          ))}
        </main>
      </div>
    </div>
  )
}

export default VirtualList
