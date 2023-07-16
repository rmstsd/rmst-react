import classNames from 'classnames'
import React, { forwardRef, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react'

type CustomScrollbarProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
  onSyncScroll?: (scrollTop: number) => void
}

export type CustomScrollbarRef = React.RefObject<{
  scrollTo: (scrollTop: number) => void
}>

const CustomScrollbar = forwardRef((props: CustomScrollbarProps, ref: CustomScrollbarRef) => {
  const { children, onSyncScroll, ...htmlAttr } = props

  const [thumbHeight, setThumbHeight] = useState(0)

  const rootDomRef = useRef<HTMLDivElement>(null)
  const contentDomRef = useRef<HTMLDivElement>(null)
  const thumbDomRef = useRef<HTMLDivElement>(null)

  useImperativeHandle(ref, () => ({
    scrollTo
  }))

  const scrollTo = (scrollTop: number) => {
    contentDomRef.current.style.setProperty('transform', `translateY(${-scrollTop}px)`)

    const thumbY = (scrollTop / getContentHeight()) * rootDomRef.current.clientHeight
    thumbDomRef.current.style.setProperty('transform', `translateY(${thumbY}px)`)
  }

  const contentYRef = useRef(0)

  const getContentHeight = () => contentDomRef.current?.offsetHeight || 0

  useLayoutEffect(() => {
    const rootDom = rootDomRef.current

    const contentHeight = getContentHeight()
    setThumbHeight(contentHeight === 0 ? 0 : rootDom.clientHeight ** 2 / contentHeight)

    rootDomRef.current.addEventListener('wheel', (evt: WheelEvent) => {
      evt.preventDefault()

      const contentHeight = getContentHeight()

      let nvContentY = contentYRef.current + evt.deltaY
      const max = contentHeight - rootDomRef.current.clientHeight
      if (nvContentY <= 0) nvContentY = 0
      if (nvContentY >= max) nvContentY = max

      contentYRef.current = nvContentY

      // scrollTo(nvContentY)

      onSyncScroll(nvContentY)
    })

    const ob = new ResizeObserver(() => {
      const contentHeight = getContentHeight()
      if (contentHeight === 0) {
        return
      }

      setThumbHeight(rootDom.clientHeight ** 2 / contentHeight)
    })
    ob.observe(contentDomRef.current)
  }, [])

  return (
    <div className="flex">
      <main
        {...htmlAttr}
        className={classNames('scroll-container grow shrink-0', htmlAttr.className)}
        style={{ position: 'relative', ...htmlAttr.style }}
      >
        <section className="scrollbar-view h-full overflow-hidden" ref={rootDomRef}>
          <div ref={contentDomRef} className="content">
            {children}
          </div>
        </section>

        <div className="absolute right-0 top-0 bottom-0 bg-gray-100 w-[30px] ">
          <div
            ref={thumbDomRef}
            className="w-full bg-purple-400 h-[20px]"
            style={{ height: thumbHeight }}
          ></div>
        </div>
      </main>

      {/* <div className="overflow-auto grow" style={{ ...htmlAttr.style }}>
        <div>{children}</div>
      </div> */}
    </div>
  )
})

export default CustomScrollbar
