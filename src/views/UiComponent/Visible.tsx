import { Button, Select } from 'antd'
import React, { useEffect, useRef, useState } from 'react'

const Visible: React.FC = props => {
  const [bool, setBool] = useState(false)

  const [bool_1, setBool_1] = useState(false)

  const [list, setList] = useState([{ key: 'akk', leftValue: 'a' }])

  return (
    <div className="v-v">
      <Button onClick={() => setBool(!bool)}>setBool {String(bool)}</Button>
      <ViewVisible visible={bool}>哈哈哈</ViewVisible>

      <hr />

      {list.map((item, idx) => {
        return (
          <Item
            item={item}
            key={item.key}
            onChange={newItem => {
              list[idx] = newItem
              setList([...list])
            }}
          />
        )
      })}
    </div>
  )
}

const Item = ({ item, onChange }) => {
  const c1 = () => <Select style={{ width: 100 }} options={[{ label: 'aa', value: 'aa' }]} />
  const c2 = () => (
    <Select
      style={{ width: 100 }}
      options={Array.from({ length: 5 }, (_, idx) => ({ value: idx + 1, label: idx + 1 }))}
    />
  )

  const getJsx = () => {
    return item.leftValue === 'a' ? c1() : c2()
  }

  return (
    <div>
      <Select
        value={item.leftValue}
        onChange={value => {
          onChange({ ...item, leftValue: value })
        }}
        style={{ width: 100 }}
        options={[
          { label: 'a', value: 'a' },
          { label: 'b', value: 'b' },
          { label: 'c', value: 'c' }
        ]}
      />

      {getJsx()}
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
