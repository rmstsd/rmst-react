import { sleep } from '@/utils/utils'
import { Input } from '@arco-design/web-react'
import { memo, useDeferredValue, useState } from 'react'

const Hooks18 = () => {
  const [value, setValue] = useState('a')
  const deferValue = useDeferredValue(value)

  return (
    <div>
      <Input value={value} onChange={setValue} />
      <hr />
      value :{value}
      <hr />
      deferValue:{deferValue}
      <hr />
      <Child dvalue={deferValue} />
    </div>
  )
}

export default Hooks18

const Child = memo<{ dvalue }>(function Child({ dvalue }) {
  sleep(200)

  return <>child {dvalue}</>
})
