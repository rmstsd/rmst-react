import { Button } from 'antd'
import React, { useRef, useState } from 'react'

const Visible: React.FC = props => {
  const [bool, setBool] = useState(false)

  return (
    <div className="v-v">
      <Button onClick={() => setBool(!bool)}>setBool {String(bool)}</Button>
      <ViewVisible visible={bool}>哈哈哈</ViewVisible>
    </div>
  )
}

const ViewVisible: React.FC<{ visible: boolean }> = ({ visible, children }) => {
  const initRef = useRef(false)
  if (visible) initRef.current = true

  return initRef.current ? (
    <div className="wrapper" style={{ display: visible ? 'block' : 'none' }}>
      {children}
    </div>
  ) : null
}

export default Visible
