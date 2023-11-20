import { useContext, useEffect, useLayoutEffect, useRef } from 'react'
import { PortalContext } from './Host'

const Portal = props => {
  const { children } = props
  const { mount, update, unmount } = useContext(PortalContext)

  const onlyKeyRef = useRef(0)

  const firstRenderRef = useRef(true)

  useLayoutEffect(() => {
    if (firstRenderRef.current) {
      onlyKeyRef.current = mount(children)
      firstRenderRef.current = false

      return
    }

    update(onlyKeyRef.current, children)
  }, [children])

  useLayoutEffect(() => {
    return unmount(onlyKeyRef.current)
  }, [])

  return null
}

export default Portal
