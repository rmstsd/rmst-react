import ReactFiberReconciler from 'react-reconciler'

import * as HostConfig from './hostConfig'
import React, { PropsWithChildren, useLayoutEffect, useRef } from 'react'
import { useContextBridge, FiberProvider } from 'its-fine'
import { Stage } from '../rmst-render'
import { LegacyRoot } from 'react-reconciler/constants'

export const RmstRenderer = ReactFiberReconciler(HostConfig as any)

export const RmstView = 'RmstView' as unknown as React.FC<PropsWithChildren & { style?: React.CSSProperties }>
export const RmstText = 'RmstText' as unknown as React.FC<{ children?: string, style?: React.CSSProperties }>

function Wrapper(props) {
  const Bridge = useContextBridge()
  const stageRef = useRef<Stage>()
  const fiberRef = React.useRef()

  useLayoutEffect(() => {
    stageRef.current = new Stage(document.querySelector('.rmst-canvas'), props.style)

    // @ts-ignore
    fiberRef.current = RmstRenderer.createContainer(stageRef.current, LegacyRoot, false, null)
    const jsx = <Bridge>{props.children}</Bridge>
    RmstRenderer.updateContainer(jsx, fiberRef.current)

    return () => {
      RmstRenderer.updateContainer(null, fiberRef.current, null)
    }
  }, [])

  // useLayoutEffect(() => {
  //   const jsx = <Bridge>{props.children}</Bridge>

  //   RmstRenderer.updateContainer(jsx, fiberRef.current, null)
  // })

  return <canvas className="rmst-canvas border" width={800} height={400} />
}

export default function RmstStage(props: PropsWithChildren<{ style?: React.CSSProperties }>) {
  return (
    <FiberProvider>
      <Wrapper {...props} />
    </FiberProvider>
  )
}
