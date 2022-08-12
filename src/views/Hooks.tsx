import { Button, Input } from 'antd'
import CheckableTag from 'antd/lib/tag/CheckableTag'
import { useCallback, useEffect, useRef, useState, useDeferredValue, useTransition } from 'react'

const useEvent = <T extends (...args: any[]) => any>(func: T) => {
  const ref = useRef(func)
  ref.current = func

  const uc = ((...rest) => {
    const innerFunc = ref.current

    return innerFunc(...rest)
  }) as T

  return useCallback(uc, [])
}

const Hooks = () => {
  console.log('Hooks render')

  const [count, setCount] = useState(0)

  // const deferredCount = useDeferredValue(count)
  // console.log('deferredCount', deferredCount)

  const [isPending, setTransition] = useTransition()

  return (
    <div style={{ height: 500 }} className="border-2">
      {isPending}
      <Button onClick={() => setTransition(() => setCount(1))}>+</Button>
    </div>
  )
}

export default Hooks
