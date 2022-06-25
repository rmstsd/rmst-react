import { useDebounce } from '@/utils/hooks'
import { Button, Input } from 'antd'
import { useEffect, useState } from 'react'

const Hooks = () => {
  const [value, setValue] = useState(1)
  const [bool, setBool] = useState(false)

  useEffect(() => {
    if (bool) {
      console.log(value)
    }
  }, [bool])

  return (
    <div
      style={{ height: 500 }}
      className="border-2"
      onMouseMove={() => {
        // setValue(value + 1)
        // func()
      }}
    >
      Hooks {value}
      <Button onClick={() => setValue(value + 1)}>++</Button>
      <Button onClick={() => setBool(!bool)}>set bool</Button>
    </div>
  )
}

export default Hooks
