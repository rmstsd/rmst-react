import { useRef } from 'react'
import { Transition } from 'react-transition-group'

export default function MeTransition({ visible = true }) {
  const nodeRef = useRef()

  const duration = 1000

  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0
  }

  const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 }
  }
  return (
    <Transition nodeRef={nodeRef} in={visible} timeout={duration} unmountOnExit appear>
      {state => (
        <div ref={nodeRef} className="text-red-500" style={{ ...defaultStyle, ...transitionStyles[state] }}>
          I'm a fade Transition!
        </div>
      )}
    </Transition>
  )
}
