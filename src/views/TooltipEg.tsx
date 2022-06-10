import { cloneElement, useState } from 'react'
import { createPortal } from 'react-dom'
import { Button, Tooltip as AntdTooltip } from 'antd'

const TooltipEg = () => {
  return (
    <div>
      <Tooltip>
        <div>666</div>
      </Tooltip>

      <AntdTooltip title="咣咣咣">
        <Button>1</Button>
      </AntdTooltip>
      <AntdTooltip title="咣咣咣">
        <Button>2</Button>
      </AntdTooltip>
    </div>
  )
}

export default TooltipEg

const Tooltip = ({ children }) => {
  let divDom = document.querySelector('.t-tooltip')
  console.log('render')
  if (!divDom) {
    divDom = document.createElement('div')
    divDom.classList.add('t-tooltip')

    document.body.appendChild(divDom)
  }

  const [visible, setVisible] = useState(false)

  const cloned = cloneElement(children, {
    onClick: () => {
      setVisible(!visible)
    },
    onMouseEnter: evt => {},
    onMouseLeave: evt => {}
  })

  return (
    <>
      {cloned}

      {createPortal(
        <h1 style={{ display: visible ? 'initial' : 'none', position: 'fixed', right: 0, top: 0 }}>
          哈哈哈
        </h1>,
        divDom
      )}
    </>
  )
}
