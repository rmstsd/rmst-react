import { cloneElement, Fragment, isValidElement, useEffect, useRef, useState } from 'react'
import { createPortal, unmountComponentAtNode } from 'react-dom'
import { Button, Tooltip as AntdTooltip } from '@arco-design/web-react'

const longText = '长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本'
const shortText = '短文本'

const TooltipEg = () => {
  // 短文本容器宽度
  const [width, setWidth] = useState(100)

  return (
    <div>
      <br />
      <br />
      <br />
      <br />

      <div className="ellipsis ellipsis-2" style={{ width: 100 }}>
        谁都可以谁都可以谁都可以谁都可以谁都可以
      </div>

      <Tooltip content={longText}>
        <div
          className="ellipsis"
          style={{ width: 200, height: 30, border: '1px solid red', padding: '0 10px' }}
        >
          {longText}
        </div>
      </Tooltip>
      <Tooltip content={shortText}>
        <div className="ellipsis" style={{ width, height: 30, border: '1px solid red' }}>
          {shortText}
        </div>
      </Tooltip>
      <Button onClick={() => setWidth(30)}>修改为30</Button>

      <br />
      <br />
      <br />
      <AntdTooltip title="咣咣咣">112333</AntdTooltip>
      <AntdTooltip title="咣咣咣">
        <Button>2</Button>
      </AntdTooltip>
    </div>
  )
}

export default TooltipEg

const Tooltip = ({ children, content }) => {
  const [visible, setVisible] = useState(false)
  const [position, setPosition] = useState({ left: 0, top: 0 })

  const mountContainerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const childrenRef = useRef<HTMLElement>(null)

  const timer = useRef<NodeJS.Timeout>(null)
  const initRef = useRef(false)
  if (visible) initRef.current = true

  const [isUseTooltip, setIsUseTooltip] = useState(false)

  useEffect(() => {
    return () => {
      mountContainerRef.current && unmountComponentAtNode(mountContainerRef.current)
      mountContainerRef.current?.remove()
    }
  }, [])

  const cloned = cloneElement(children, {
    ref: childrenRef,
    onMouseEnter: evt => {
      // 如果没出现...，就不显示 toolTip
      if (!childrenRef.current) return
      const range = document.createRange()
      range.setStart(childrenRef.current, 0)
      range.setEnd(childrenRef.current, childrenRef.current.childNodes.length)
      const rangeWidth = range.getBoundingClientRect().width
      const containerWidth = childrenRef.current.getBoundingClientRect().width

      if (rangeWidth > containerWidth) setIsUseTooltip(true)

      return
      if (rangeWidth <= containerWidth) return

      if (!mountContainerRef.current) {
        mountContainerRef.current = document.createElement('div')
        document.body.appendChild(mountContainerRef.current)
      }

      if (visible) {
        clearTimeout(timer.current)
        return
      }
      setVisible(true)

      Promise.resolve().then(() => {
        const rect = (evt.target as HTMLElement).getBoundingClientRect()
        const tooltipRect = tooltipRef.current.getBoundingClientRect()

        const left = rect.left + rect.width / 2 - tooltipRect.width / 2
        const top = rect.top - tooltipRect.height - 8

        setPosition({ left, top })
      })
    },
    onMouseLeave: evt => {
      console.log('leave')
      delayHide()
    }
  })

  const delayHide = () => {
    timer.current = setTimeout(() => {
      setIsUseTooltip(false)
      setVisible(false)
    }, 200)
  }

  return isUseTooltip ? (
    <AntdTooltip title="444" visible={isUseTooltip}>
      {cloned}
    </AntdTooltip>
  ) : (
    <>{cloned}</>
  )

  return (
    <>
      {cloned}

      {initRef.current &&
        createPortal(
          <div
            ref={tooltipRef}
            className="ant-tooltip-inner t-tooltip"
            style={{
              position: 'fixed',
              left: position.left,
              top: position.top,
              display: visible ? 'initial' : 'none'
            }}
            onMouseEnter={() => clearTimeout(timer.current)}
            onMouseLeave={delayHide}
          >
            {content}
          </div>,
          mountContainerRef.current
        )}
    </>
  )
}
