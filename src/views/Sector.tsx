import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import ScrollArea from '@/components/ReactScrollbar/js/ScrollArea'

const data = Array.from({ length: 20 }, () => 1)

const Sector = () => {
  const ref = useRef<ScrollArea>()

  return (
    <>
      <button
        onClick={() => {
          ref.current?.scrollYTo(100)
        }}
      >
        g
      </button>

      <ScrollArea ref={ref} speed={1} style={{ height: 400 }} smoothScrolling={true} horizontal={false}>
        {data.map((_, idx) => (
          <h1 key={idx}>{idx}</h1>
        ))}
      </ScrollArea>
    </>
  )
}

export default Sector
