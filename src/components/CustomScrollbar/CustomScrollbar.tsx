import clsx from 'clsx'
import React, { forwardRef, useLayoutEffect, useRef, useState } from 'react'

type CustomScrollbarProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
  onSyncScroll?: (scrollTop: number) => void
}

export type CustomScrollbarRef = React.RefObject<{
  scrollTo: (scrollTop: number) => void
}>

const CustomScrollbar = forwardRef((props: CustomScrollbarProps, ref: CustomScrollbarRef) => {
  const { children, onSyncScroll, ...htmlAttr } = props

  const [thumbHeight, setThumbHeight] = useState(0)
  const [visible, setVisible] = useState(false)

  const viewportDomRef = useRef<HTMLDivElement>(null)
  const contentDomRef = useRef<HTMLDivElement>(null)

  const thumbDomRef = useRef<HTMLDivElement>(null)
  const trackDomRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const viewportDom = viewportDomRef.current

    const ob = new ResizeObserver(() => {
      const ratio = viewportDom.offsetHeight / contentDomRef.current.offsetHeight

      setVisible(ratio < 1)
      requestAnimationFrame(() => {
        const h = ratio * trackDomRef.current.offsetHeight
        setThumbHeight(h)
      })
    })
    ob.observe(contentDomRef.current)

    return () => {
      ob.disconnect()
    }
  }, [])

  const setDomScrollTop = (scrollTop: number) => {
    contentDomRef.current.style.setProperty('transform', `translate3d(0px, ${-scrollTop}px, 0px)`)
  }

  const setDomThumbY = (thumbY: number) => {
    thumbDomRef.current.style.setProperty('transform', `translateY(${thumbY}px)`)
  }

  const onThumbMouseDown = (evt: React.MouseEvent) => {
    evt.preventDefault()

    const thumbDomDownOffsetY = evt.clientY - thumbDomRef.current.getBoundingClientRect().top
    const viewportDomRect = viewportDomRef.current.getBoundingClientRect()
    const contentDomRect = contentDomRef.current.getBoundingClientRect()
    const trackDomRect = trackDomRef.current.getBoundingClientRect()
    const thumbDomRect = thumbDomRef.current.getBoundingClientRect()

    const onDocumentMousemove = (evt: MouseEvent) => {
      let thumbY = evt.clientY - trackDomRect.top - thumbDomDownOffsetY
      thumbY = getNumberInRange(thumbY, 0, trackDomRect.height - thumbDomRect.height)

      // setDomThumbY(thumbY)

      const scrollTop =
        (thumbY / (trackDomRect.height - thumbDomRect.height)) * (contentDomRect.height - viewportDomRect.height)

      viewportDomRef.current.scrollTo(0, scrollTop)
      // setDomScrollTop(scrollTop)
    }

    const onDocumentMouseup = () => {
      document.removeEventListener('pointermove', onDocumentMousemove)
      document.removeEventListener('pointerup', onDocumentMouseup)
    }

    document.addEventListener('pointermove', onDocumentMousemove)
    document.addEventListener('pointerup', onDocumentMouseup)
  }

  return (
    <main
      {...htmlAttr}
      className={clsx('scroll-container shrink-0 grow', htmlAttr.className)}
      style={{ position: 'relative', ...htmlAttr.style }}
    >
      <section
        className="scrollbar-view h-full overflow-auto"
        style={{ scrollbarWidth: 'none' }}
        ref={viewportDomRef}
        onScroll={() => {
          const r =
            viewportDomRef.current.scrollTop /
            (viewportDomRef.current.scrollHeight - viewportDomRef.current.clientHeight) // 可滚动的高度

          const y = r * (trackDomRef.current.clientHeight - thumbDomRef.current.clientHeight)

          setDomThumbY(y)
        }}
      >
        <div
          ref={contentDomRef}
          className="content"
          style={
            {
              // overflow: 'hidden',
              // pointerEvents: 'none'
              // contain: 'strict'
            }
          }
        >
          {children}
        </div>
      </section>

      <div
        className="absolute right-[20px] top-[100px] h-[100px] w-[30px] bg-gray-200"
        ref={trackDomRef}
        style={{ display: visible ? 'block' : 'none' }}
      >
        <div
          ref={thumbDomRef}
          className="h-[20px] w-full touch-none bg-purple-400"
          style={{ height: thumbHeight }}
          onPointerDown={onThumbMouseDown}
        />
      </div>
    </main>
  )
})

export default CustomScrollbar

const getNumberInRange = (nv: number, min: number, max: number) => {
  nv = Math.min(nv, max)
  nv = Math.max(nv, min)

  return nv
}
