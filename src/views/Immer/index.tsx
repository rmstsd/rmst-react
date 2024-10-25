import Trigger from '@/components/Trigger/Trigger'
import { Checkbox, Select } from '@arco-design/web-react'
import React, { useState, ReactNode, useContext } from 'react'

const Context = React.createContext(1)
export default function Tt() {
  const [flag, setFlag] = useState(false)

  console.log('render')

  return (
    <Context.Provider value={2}>
      <Child></Child>
    </Context.Provider>
  )
}

function Child() {
  console.log(Context)
  const v = useContext(Context)
  console.log(v)

  return <div>2</div>
}
