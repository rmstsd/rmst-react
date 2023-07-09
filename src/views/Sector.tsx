import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import ScrollArea from '@/components/ReactScrollbar/js/ScrollArea'
import { useUpdate } from '@/utils/hooks'

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

// export default Sector

const Sector2 = () => {
  const stateRef = useRef({ lock: false, prev: 0, target: 100 })

  const up = useUpdate()

  useEffect(() => {
    const state = stateRef.current

    setInterval(() => {
      up()
    }, 500)

    const container = document.querySelector('.cc') as HTMLDivElement

    document.querySelector('button').onclick = () => {
      container.scrollTo({ top: state.target })

      state.target = state.target + 100
    }

    container.onscroll = () => {
      if (state.lock) {
        return
      }

      container.scrollTo({ top: state.prev })

      state.prev = state.target

      state.lock = true

      setTimeout(() => {
        sleepSync(1000)
        console.log(state.target)
        container.scrollTo({ top: state.target })
        setTimeout(() => {
          state.lock = false
        }, 0)
      }, 0)
    }

    function sleepSync(t) {
      const start = Date.now()
      while (Date.now() - start < t) {}
    }

    function appendDom() {
      const div = Array.from({ length: 100 }, (_, idx) => {
        const dd = document.createElement('main')
        dd.innerText = String(idx)
        return dd
      })

      container.append(...div)
    }

    appendDom()
  }, [])
  return (
    <>
      <button>ss</button>

      <span>{JSON.stringify(stateRef.current, null, 2)}</span>

      <div className="cc h-[300px] border overflow-auto">Sector</div>
    </>
  )
}

export default Sector2
