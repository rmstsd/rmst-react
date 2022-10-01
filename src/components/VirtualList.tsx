import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'

type extraDataItem = { rowIndex: number }
type IVirtualListProps<T> = {
  containerHeight?: number
  rowHeight: number
  dataSource: T[]

  renderRow: (item: T & extraDataItem) => React.ReactElement<any, 'div'>

  isFixedHeight?: boolean

  className?: string
  style?: React.CSSProperties
}

const useEvent = <T extends (...args: any[]) => any>(func: T) => {
  const ref = useRef(func)
  ref.current = func

  return useCallback(
    (() => {
      ref.current()
    }) as T,
    []
  )
}

const VirtualList = <T extends object>(props: IVirtualListProps<T>) => {
  console.log('VirtualList render')
  const { containerHeight, rowHeight, dataSource, renderRow, isFixedHeight = true, className, style } = props

  const innerDataSource = useMemo(
    () => dataSource.map((o, index) => ({ ...o, rowIndex: index })),
    [dataSource]
  )

  const containerRef = useRef<HTMLDivElement>(null)
  const [startIndex, setStartIndex] = useState(0)
  const [count, setCount] = useState(0)

  const handleOb = useEvent(() => {
    const { clientHeight } = containerRef.current

    setCount(Math.ceil(clientHeight / rowHeight) + 1)
  })

  useEffect(() => {
    const ob = new ResizeObserver(handleOb)
    ob.observe(containerRef.current)

    return () => {
      ob.disconnect()
    }
  }, [])

  useEffect(() => {
    setCount(Math.ceil(containerRef.current.clientHeight / rowHeight) + 1)
  }, [rowHeight])

  const onScroll = () => {
    const { scrollTop } = containerRef.current

    const startIndex = Math.floor(scrollTop / rowHeight)

    setStartIndex(startIndex)
  }

  const visibleData = innerDataSource.slice(startIndex, startIndex + count)

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ ...style, height: containerHeight, overflow: 'auto', position: 'relative' }}
      onScroll={onScroll}
    >
      <div style={{ height: innerDataSource.length * rowHeight }} />

      <main
        style={{
          position: 'absolute',
          top: startIndex * rowHeight,
          width: '100%'
        }}
      >
        {visibleData.map(item => {
          const ele = renderRow(item)

          return React.cloneElement(ele, {
            key: item.rowIndex,
            style: { ...ele.props.style, height: rowHeight }
          })
        })}
      </main>
    </div>
  )
}

export default VirtualList
