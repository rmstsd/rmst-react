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

  const viewportDomRef = useRef<HTMLDivElement>(null)
  const contentDomRef = useRef<HTMLDivElement>(null)

  const thumbDomRef = useRef<HTMLDivElement>(null)
  const trackDomRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const viewportDom = viewportDomRef.current

    const ob = new ResizeObserver(() => {
      const h = (viewportDom.offsetHeight / contentDomRef.current.offsetHeight) * trackDomRef.current.offsetHeight
      setThumbHeight(h)
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

      setDomThumbY(thumbY)

      const scrollTop =
        (thumbY / (trackDomRect.height - thumbDomRect.height)) * (contentDomRect.height - viewportDomRect.height)

      viewportDomRef.current.scrollTo(0, scrollTop)
      // setDomScrollTop(scrollTop)
    }

    const onDocumentMouseup = () => {
      document.removeEventListener('mousemove', onDocumentMousemove)
      document.removeEventListener('mouseup', onDocumentMouseup)
    }

    document.addEventListener('mousemove', onDocumentMousemove)
    document.addEventListener('mouseup', onDocumentMouseup)
  }

  return (
    <main
      {...htmlAttr}
      className={clsx('scroll-container grow shrink-0', htmlAttr.className)}
      style={{ position: 'relative', ...htmlAttr.style }}
    >
      <section className="scrollbar-view h-full overflow-hidden" ref={viewportDomRef}>
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

      <div className="absolute right-0 top-[100px] h-[100px] bg-gray-200 w-[30px]" ref={trackDomRef}>
        <div
          ref={thumbDomRef}
          className="w-full bg-purple-400 h-[20px]"
          style={{ height: thumbHeight }}
          onMouseDown={onThumbMouseDown}
        ></div>
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
