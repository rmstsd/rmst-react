import { Button, Select } from '@arco-design/web-react'
import React, { useEffect, useRef, useState } from 'react'

const Visible: React.FC = props => {
  const [bool, setBool] = useState(false)
  const [value, setValue] = useState('false')

  const C = props => {
    return <input value={props.value} onChange={props.onChange} />
  }

  return (
    <div className="v-v">
      <Button onClick={() => setBool(!bool)}>setBool {String(bool)}</Button>
      <ViewVisible visible={bool}>哈哈哈</ViewVisible>

      <C key="a" value={value} onChange={evt => setValue(evt.target.value)} />

      <hr />
    </div>
  )
}

const ViewVisible: React.FC<{ visible: boolean; children: React.ReactNode }> = ({ visible, children }) => {
  const initRef = useRef(false)
  if (visible) initRef.current = true

  return initRef.current ? (
    <div className="wrapper" style={{ display: visible ? 'block' : 'none' }}>
      {children}
    </div>
  ) : null
}

export default Visible
