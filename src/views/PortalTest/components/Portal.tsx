import { useContext, useEffect, useLayoutEffect, useRef, memo } from 'react'
import { PortalContext } from './Host'

interface PortalProps {
  children: React.ReactNode
  onlyKey?: number | string
}

const Portal = (props: PortalProps) => {
  const { children, onlyKey } = props
  const { mount, update, unmount } = useContext(PortalContext)

  const onlyKeyRef = useRef<PortalProps['onlyKey']>(onlyKey)
  if (onlyKey !== undefined) {
    onlyKeyRef.current = onlyKey
  }

  const firstRenderRef = useRef(true)

  useLayoutEffect(() => {
    if (firstRenderRef.current) {
      const hostedOnlyKey = mount(children, onlyKey)
      if (onlyKey === undefined) {
        onlyKeyRef.current = hostedOnlyKey
      }
      firstRenderRef.current = false

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
