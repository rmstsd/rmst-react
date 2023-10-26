import { getCommandTreeData } from '@/request/command'
import { useState } from 'react'

const Cc = () => {
  console.log('Cc render')

  return <>cc</>
}

const Parent = props => {
  const [, u] = useState(0)

  console.log('Parent render')

  return (
    <div>
      <button onClick={() => u(Math.random())}>Pp</button>

      {props.cc}
    </div>
  )
}

const Sec = () => {
  // return <Parent cc={<Cc></Cc>}></Parent>

  return (
    <button
      onClick={() => {
        getCommandTreeData()
      }}
    >
      111
    </button>
  )
}

export default Sec
