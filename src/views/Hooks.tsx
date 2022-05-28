import { useDebounce } from '@/utils/hooks'
import { Input } from 'antd'
import { useState } from 'react'

const Hooks = () => {
  const [value, setValue] = useState(1)

  const func = useDebounce(() => {
    console.log(value)
  })

  return (
    <div
      style={{ height: 500 }}
      className="border-2"
      onMouseMove={() => {
        // setValue(value + 1)
        // func()
      }}
    >
      Hooks
      <Input
        value={value}
        onChange={evt => {
          setValue(evt.target.value)
          func()
        }}
      />
    </div>
  )
}

export default Hooks
