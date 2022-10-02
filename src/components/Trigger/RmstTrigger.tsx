import React, { useState, useEffect, useRef, useLayoutEffect, PureComponent, Component } from 'react'
import { createPortal, findDOMNode } from 'react-dom'
import { CSSTransition } from 'react-transition-group'

import './style.less'

type ITrigger = {
  children: React.ReactElement
  popup: () => React.ReactElement
}

class RmstTrigger extends Component<ITrigger> {
  state = {
    popupVisible: false,
    popupStyle: {} as React.CSSProperties
  }

  constructor(props) {
    super(props)

    this.state = {
      popupVisible: false,
      popupStyle: {}
    }
  }

  componentDidUpdate() {
    console.log('did update')
    if (this.state.popupVisible === false) {
      this.popupContainer?.remove()
      this.popupContainer = null
    }
  }

  popupSpan: HTMLSpanElement = null

  popupContainer: HTMLDivElement = null

  render() {
    const { children, popup } = this.props
    const { popupVisible, popupStyle } = this.state

    const Children = React.cloneElement(children, {
      onClick: () => {
        children.props?.onClick?.()
        console.log('trigger click')

        const nvPopupVisible = !this.state.popupVisible

        this.setState({ popupVisible: nvPopupVisible }, () => {
          if (nvPopupVisible) {
            const child = findDOMNode(this) as HTMLElement
            const popup = findDOMNode(this.popupSpan) as HTMLElement

            const childRect = child.getBoundingClientRect()
            const popupRect = popup.getBoundingClientRect()

            const popupStyle = {
              top: childRect.bottom,
              left: childRect.left + childRect.width / 2 - popupRect.width / 2
            }

            this.setState({ popupStyle })
          }
        })
      }
    })

    if (!this.popupContainer && popupVisible) {
      const popupContainer = document.createElement('div')

      popupContainer.style.width = '100%'
      popupContainer.style.position = 'absolute'
      popupContainer.style.top = '0'
      popupContainer.style.left = '0'

      this.popupContainer = popupContainer
      document.body.appendChild(popupContainer)
    }

    const popupContent = (
      <CSSTransition in={popupVisible} timeout={200} classNames="alert" unmountOnExit appear mountOnEnter>
        <span ref={el => (this.popupSpan = el)} style={{ position: 'absolute', ...popupStyle, zIndex: 100 }}>
          {popup()}
        </span>
      </CSSTransition>
    )

    return (
      <>
        {Children}
        {popupVisible ? createPortal(popupContent, this.popupContainer) : null}
      </>
    )
  }
}

export default RmstTrigger
