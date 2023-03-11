import { Button } from '@arco-design/web-react'
import { useRef, useState, CSSProperties } from 'react'
import { Transition, CSSTransition } from 'react-transition-group'
import './cssTransitionDe.less'

const duration = 500

const defaultStyle = {
  transition: `all ${duration}ms ease-in-out`
}

const transitionStyles = {
  entering: {} as CSSProperties,
  entered: {} as CSSProperties,

  exiting: { transform: 'translateX(100px)' } as CSSProperties,
  exited: { transform: 'translateX(100px)' } as CSSProperties
}

const CssTransitionDe = () => {
  const [inProp, setInProp] = useState(false)

  const nodeRef = useRef(null)
  return (
    <div>
      <Button onClick={() => setInProp(!inProp)}>sss</Button>

      <Transition in={inProp} timeout={duration}>
        {state => {
          console.log(state)
          return (
            <div
              ref={nodeRef}
              style={{
                ...defaultStyle,
                ...transitionStyles[state]
              }}
            >
              I'm a fade Transition!
            </div>
          )
        }}
      </Transition>
    </div>
  )
}

export default CssTransitionDe
