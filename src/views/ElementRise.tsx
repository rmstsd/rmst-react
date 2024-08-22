import Show from '@/components/Show'
import React, { cloneElement, useLayoutEffect, useRef, useState } from 'react'

const count = 10
export default function ElementRise() {
  const [number, setNumber] = useState(10)
  const [bool, setBool] = useState(false)

  return (
    <div className="h-full overflow-hidden">
      <button onClick={() => setBool(!bool)}>{String(bool)}</button>
      <button onClick={() => setNumber(number + 1)}>{number}</button>

      {bool && (
        <RiseView>{bool && <div style={{ backgroundColor: randomColor(), height: 200, marginTop: 20 }} />}</RiseView>
      )}

      {/* {Array.from({ length: count }, (_, i) => (
        <RiseView key={i}>
          {bool && <div style={{ backgroundColor: randomColor(), height: 200, marginTop: 20 }} />}
        </RiseView>
      ))} */}
    </div>
  )
}

// 排除白色
function randomColor() {
  return `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`
}

const map = new WeakMap<Element, Animation>()
const ob = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      map.get(entry.target)?.play()
      ob.unobserve(entry.target)
    }
  })
})

const distance = 100
function isInViewport(el: Element) {
  const rect = el.getBoundingClientRect()
  return rect.top - distance > window.innerHeight
}

function RiseView(props: { children: React.ReactElement }) {
  if (!props.children) {
    return null
  }

  return <RiseInner>{props.children}</RiseInner>
}

function RiseInner(props: { children: React.ReactElement }) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    console.log('useLayoutEffect')
    const el = ref.current
    console.log(el)

    if (!el) {
      return
    }

    if (!isInViewport(el)) {
      return
    }

    ob.observe(el)
    const ani = el.animate(
      [
        { transform: `translateY(${distance}px)`, opacity: 0 },
        { transform: 'translateY(0)', opacity: 1 }
      ],
      { duration: 300, fill: 'forwards' }
    )

    ani.pause()
    map.set(el, ani)

    return () => {
      ob.unobserve(el)
      map.delete(el)
    }
  }, [ref.current])

  if (!props.children) {
    return null
  }

  return cloneElement(props.children, { ref })
}
