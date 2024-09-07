import type { PropsWithChildren } from 'react'

export default function Show(props: PropsWithChildren<{ when: boolean }>) {
  if (props.when) {
    return props.children
  }

  return null
}
