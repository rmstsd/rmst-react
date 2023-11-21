import { useContext, useLayoutEffect, useRef } from 'react'
import { PortalContext } from './Host'

interface PortalProps {
  children?: React.ReactNode
}

const Portal = (props: PortalProps) => {
  const { children } = props
  const { mount, update, unmount } = useContext(PortalContext)

  const onlyKeyRef = useRef<number>()

  const firstRenderRef = useRef(true)

  useLayoutEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false

      onlyKeyRef.current = mount(children)

      return
    }

    update(onlyKeyRef.current, children)
  })

  useLayoutEffect(() => {
    return () => {
      unmount(onlyKeyRef.current)
    }
  }, [])

  return null
}

export default Portal
