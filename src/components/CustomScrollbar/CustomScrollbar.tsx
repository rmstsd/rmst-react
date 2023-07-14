import classNames from 'classnames'
import React, { useLayoutEffect, useRef, useState } from 'react'

type CustomScrollbarProps = React.HtmlHTMLAttributes<HTMLDivElement> & {}

const CustomScrollbar = (props: CustomScrollbarProps) => {
  const { children, className, style, ...HTMLAttr } = props

  const [thumbHeight, setThumbHeight] = useState(0)

  // const [track] = useState(0)

  const rootDomRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const rootDom = rootDomRef.current

    setThumbHeight(rootDom.clientHeight ** 2 / rootDom.scrollHeight)
  }, [])

  return (
    <div className="flex">
      <div
        className={classNames('grow shrink-0', className)}
        style={{ overflow: 'hidden', position: 'relative', ...style }}
        {...HTMLAttr}
        ref={rootDomRef}
      >
        {children}

        <div className="absolute right-0 top-0 bottom-0 bg-gray-100 w-[30px] ">
          <div className="w-full bg-purple-400 h-[20px]" style={{ height: thumbHeight }}></div>
        </div>
      </div>

      <div className="overflow-auto grow" style={{ ...style }}>
        {children}
      </div>
    </div>
  )
}

export default CustomScrollbar
