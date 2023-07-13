import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { useMergeProps } from '@/utils/hooks'
import Thumb from './thumb'
import { BarProps, ScrollbarBarHandle } from './interface'
import { GAP } from './utils'

const defaultProps: BarProps = {
  always: false,
  ratioX: 1,
  ratioY: 1
}

function Bar(baseProps: BarProps, ref) {
  const props = useMergeProps<BarProps>(baseProps, defaultProps)
  const { always, width, height, ratioX, ratioY } = props

  const [moveX, setMoveX] = useState<number>(0)
  const [moveY, setMoveY] = useState<number>(0)

  useImperativeHandle<any, ScrollbarBarHandle>(ref, () => ({
    handleScroll: wrap => {
      if (wrap) {
        const offsetHeight = wrap.offsetHeight - GAP
        const offsetWidth = wrap.offsetWidth - GAP
        setMoveX(((wrap.scrollLeft * 100) / offsetWidth) * ratioX || 0)
        setMoveY(((wrap.scrollTop * 100) / offsetHeight) * ratioY || 0)
      }
    }
  }))

  return (
    <>
      <Thumb move={moveX} ratio={ratioX} size={width} always={always} />
      <Thumb move={moveY} ratio={ratioY} size={height} vertical always={always} />
    </>
  )
}

const BarComponent = forwardRef<ScrollbarBarHandle, BarProps>(Bar)

BarComponent.displayName = 'Bar'

export default BarComponent
