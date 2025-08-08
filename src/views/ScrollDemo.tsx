import CustomScrollbar from '@/components/CustomScrollbar/CustomScrollbar'
import { Button } from '@arco-design/web-react'
import { useState } from 'react'

const arr = Array.from({ length: 14 }, (_, index) => index + 1)

const ScrollDemo = () => {
  const [data, setData] = useState(arr)

  return (
    <div>
      <Button
        onClick={() => {
          setData(data.concat(Array.from({ length: 1 }, (_, index) => data.length + index + 1)))
        }}
      >
        +
      </Button>
      <Button
        onClick={() => {
          data.pop()
          setData([...data])
        }}
      >
        -
      </Button>

      <CustomScrollbar style={{ height: 400, display: 'flow-root' }} className="border">
        {data.map(item => (
          <h1 key={item}>{item}</h1>
        ))}
      </CustomScrollbar>
    </div>
  )
}

export default ScrollDemo
