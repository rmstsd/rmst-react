import React, { PropsWithChildren, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'

type MeTransitionProps = PropsWithChildren<{ visible: boolean }>

export default function MeTransition(props: MeTransitionProps) {
  const { visible = true, children } = props

  const nodeRef = useRef<HTMLDivElement>()

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={visible}
      appear={true}
      // mountOnEnter
      unmountOnExit
      classNames="my-node"
      onEntered={isAppearing => {}}
      addEndListener={done => {
        nodeRef.current.addEventListener(
          'transitionend',
          () => {
            console.log('transitionend')

            done()
          },
          { once: true }
        )
      }}
    >
      {React.cloneElement(children as React.ReactElement, { ref: nodeRef })}
    </CSSTransition>
  )
}
