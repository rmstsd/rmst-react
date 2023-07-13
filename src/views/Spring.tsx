import { useEffect, useRef, useState } from 'react'

import { useSpring, animated, config, easings } from '@react-spring/web'

export default function Spring() {
  const [top, setTop] = useState(0)

  const ref = useRef(top)

  const props = useSpring({
    transform: `translateY(${-top}px)`,
    config: {
      easing: easings.steps(30)
    }
  })

  useEffect(() => {
    const dom = document.querySelector('#c')
    dom.addEventListener('wheel', evt => {
      evt.preventDefault()

      setTop((ref.current += evt.deltaY / 2))
    })
  }, [])

  return (
    <div>
      <div id="c" className="border" style={{ height: 400, overflow: 'hidden' }}>
        <animated.div style={{ ...props }}>
          {Array(100)
            .fill(0)
            .map((_, i) => (
              <div key={i} style={{ height: 40 }}>
                {i}
              </div>
            ))}
        </animated.div>
      </div>
    </div>
  )
}
