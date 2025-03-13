import clsx from 'clsx'
import React, { useState } from 'react'

import './dm.less'

const Dm = () => {
  const [dmValue, setDmValue] = useState('')
  const [roll, setRoll] = useState(false)

  const containerRef = React.useRef<HTMLDivElement>()
  const dmDomRef = React.useRef<HTMLDivElement>()

  React.useLayoutEffect(() => {
    if (!dmValue) {
      return
    }

    const containerRect = containerRef.current.getBoundingClientRect()
    const dmRect = dmDomRef.current.getBoundingClientRect()

    containerRef.current.style.setProperty('--container-width', `${containerRect.width}px`)
    dmDomRef.current.style.setProperty('--dm-width', `${dmRect.width}px`)

    setRoll(true)
  }, [dmValue])

  React.useEffect(() => {
    const ob = new ResizeObserver(() => {
      const containerRect = containerRef.current.getBoundingClientRect()
      containerRef.current.style.setProperty('--container-width', `${containerRect.width}px`)
    })

    ob.observe(containerRef.current)

    setTimeout(() => {
      setDmValue('你好')
    }, 1000)

    return () => {
      ob.disconnect()
    }
  }, [])

  return (
    <div>
      <button onClick={() => setRoll(true)}>滚动</button>
      <button onClick={() => setRoll(false)}>暂停</button>

      <div ref={containerRef} className="video relative h-[400px] w-[600px] resize overflow-hidden border-2">
        <div
          ref={dmDomRef}
          onAnimationEnd={() => {
            console.log('end 移除dom')
          }}
          className={clsx(
            'absolute left-0 top-0',
            //
            'dm',
            'dmAni',
            'animation-b',
            roll ? 'dm-running' : 'dm-paused'
          )}
        >
          {dmValue}
        </div>
      </div>
    </div>
  )
}

export default Dm
