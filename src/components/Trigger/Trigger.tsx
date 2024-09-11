import type { PropsWithChildren, RefObject } from 'react'

import classnames from 'clsx'
import React, { useLayoutEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
interface Props {
  c?: string
  style?: React.CSSProperties
  close: () => void
  triggerElementRef?: RefObject<HTMLElement>
}

const windowPadding = 16
const offset = 8 // trigger 元素 与 popup 之间的距离

type Placement = 'top' | 'bottom'

/**
 *  后续将优化成
 *   <DropDown popup={<div>popup content</div>}>
 *     <button>click me</button>
 *   </DropDown>
 *  的使用方式, 而无需传递 triggerElementRef 属性
 */
export default function Trigger(props: PropsWithChildren<Props>) {
  const { triggerElementRef } = props
  const rootRef = useRef<HTMLDivElement>(null)

  const closeRef = useRef(props.close) // 避免闭包问题
  closeRef.current = props.close

  const placementRef = useRef<Placement>('bottom') // 初始方向

  useLayoutEffect(() => {
    if (triggerElementRef?.current && rootRef.current) {
      placementRef.current = getPlacement(triggerElementRef.current, rootRef.current)
    }

    const ob = new ResizeObserver(() => {
      updatePosition()
    })

    ob.observe(rootRef.current!)
    if (triggerElementRef) {
      ob.observe(triggerElementRef.current!)
    }

    document.addEventListener('pointerdown', onGlobalClick, true)

    return () => {
      ob.disconnect()
      document.removeEventListener('pointerdown', onGlobalClick, true)
    }
  }, [])

  // 更新位置的时候, 面板位置始终在一个方向
  const updatePosition = () => {
    const triggerElement = triggerElementRef?.current
    const popupElement = rootRef.current!

    if (!triggerElement || !popupElement) {
      return
    }

    const { top, left } = getPopupPosition(triggerElement, popupElement, placementRef.current)

    popupElement.style.top = `${top}px`
    popupElement.style.left = `${left}px`
  }

  function onGlobalClick(e: MouseEvent) {
    const root = rootRef.current
    if (!root) return

    const triggerElement = props.triggerElementRef?.current
    if (triggerElement?.contains(e.target as HTMLElement)) {
      return
    }
    if (!root.contains(e.target as HTMLElement)) {
      closeRef.current?.()
    }
  }

  return ReactDOM.createPortal(
    <div className={classnames('rui-dropdown fixed bottom-auto right-auto z-50', props.c)} ref={rootRef} style={{ ...props.style }}>
      {props.children}
    </div>,
    document.body
  )
}

const getPopupPosition = (triggerElement: HTMLElement, popupElement: HTMLElement, placement: Placement) => {
  if (!triggerElement || !popupElement) {
    return { top: 0, left: 0 }
  }

  const triggerRect = triggerElement.getBoundingClientRect()
  const popupRect = popupElement.getBoundingClientRect()

  let top = 0
  switch (placement) {
    case 'top': {
      top = Math.max(triggerRect.top - popupRect.height - offset, windowPadding)
      break
    }
    case 'bottom': {
      const maxTop = window.innerHeight - popupRect.height - windowPadding
      top = Math.min(triggerRect.bottom + offset, maxTop)
      break
    }
  }

  const left = Math.min(triggerRect.left, window.innerWidth - popupRect.width - windowPadding)

  return { top, left }
}

const getPlacement = (triggerElement: HTMLElement, popupElement: HTMLElement): Placement => {
  if (!triggerElement || !popupElement) {
    return 'bottom'
  }

  const triggerRect = triggerElement.getBoundingClientRect()
  const popupRect = popupElement.getBoundingClientRect()

  let plc: Placement = 'bottom'

  const top = triggerRect.bottom + offset
  if (top + popupRect.height > window.innerHeight - windowPadding) {
    plc = 'top'
  }

  return plc
}
