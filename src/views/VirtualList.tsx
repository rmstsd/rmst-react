import { useState } from 'react'

const data = Array.from({ length: 100 }, (_, index) => ({
  height: Math.floor(40 + Math.random() * 60),
  onlyKey: index
}))

console.log(data)

const VirtualList = () => {
  const containerHeight = 700

  const totalHeight = data.reduce((acc, cur) => acc + cur.height, 0)

  const [visibleData, setVisibleData] = useState(data)
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

  return (
    <div>
      <div
        className="border-2 relative"
        style={{ height: containerHeight, overflow: 'auto' }}
        onScroll={onScroll}
      >
        <div style={{ height: totalHeight }}></div>

        <main className="absolute w-full" style={{ top }}>
          {visibleData.map(item => (
            <div
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
