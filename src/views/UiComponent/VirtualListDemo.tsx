import VirtualList from '@/components/VirtualList'
import { Button, Radio } from 'antd'
import { useLayoutEffect, useRef, useState } from 'react'

const getData = () =>
  Array.from({ length: 100 }, () => ({
    text: Math.random().toString(36).slice(2)
    // .repeat(Math.floor(Math.random() * 20))
  }))

const VirtualListDemo = () => {
  const estimatedHeight = 40

  const [containerHeight, setContainerHeight] = useState(400)
  const [rowHeight, setRowHeight] = useState(40)
  const [data, setData] = useState(() => getData())

  return (
    <div>
      <Button onClick={() => setData(getData())}>设置新数据</Button>
      <br />
      容器高度:
      <Radio.Group
        value={containerHeight}
        options={[200, 400, 600]}
        optionType="button"
        onChange={evt => setContainerHeight(evt.target.value)}
      />
      <br />
      rowHeight:
      <Radio.Group
        value={rowHeight}
        options={[20, 40, 60]}
        optionType="button"
        onChange={evt => setRowHeight(evt.target.value)}
      />
      <div style={{ display: 'flex', flexDirection: 'column', height: 450, marginTop: 10 }}>
        <Button style={{ marginBottom: 10 }}>ui</Button>

        <VirtualList
          // containerHeight={containerHeight}
          style={{ borderBottom: '1px solid black' }}
          rowHeight={rowHeight}
          dataSource={data}
          renderRow={item => (
            <div
              row-index={item.rowIndex}
              style={{ boxShadow: '0 0 1px 1px red inset', wordBreak: 'break-all' }}
            >
              {item.rowIndex} {item.text}
            </div>
          )}
        />
      </div>
    </div>
  )
}

export default VirtualListDemo
