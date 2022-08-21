import { Button } from 'antd'
import React, { useEffect, useRef, useState } from 'react'

const Visible: React.FC = props => {
  const [bool, setBool] = useState(false)

  useEffect(() => {
    return
    const func = async () => {
      console.log('a')
      const count = await new Promise(resolve => {
        setTimeout(() => {
          resolve(1)
        }, 2000)
      })

      return count > 10 ? Promise.resolve() : Promise.reject()
    }

    func().then(() => {
      console.log('then')
    })
  }, [])

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
