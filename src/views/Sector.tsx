import { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import ScrollArea from '@/components/ReactScrollbar/js/ScrollArea'

const data = Array.from({ length: 20 }, () => 1)

const Sector = () => {
  return (
    <ScrollArea speed={0.8} style={{ height: 400 }} smoothScrolling={true} horizontal={false}>
      {data.map((_, idx) => (
        <h1 key={idx}>{idx}</h1>
      ))}
    </ScrollArea>
  )
}

export default Sector
