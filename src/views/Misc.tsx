import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import VirtualList from '@/components/virtual-scroll-list'
import { Form, Button, Input, Tag, Checkbox, TimePicker } from '@arco-design/web-react'

const TOTAL_COUNT = 1000

const dataSources = []
let count = TOTAL_COUNT
while (count--) {
  const index = TOTAL_COUNT - count
  dataSources.push({
    index,
    name: index + '-name',
    id: index
  })
}

const Misc = () => {
  return (
    <div>
      <VirtualList
        className="list"
        style={{ height: 600, overflow: 'auto', border: '2px solid #333' }}
        dataKey="id"
        dataSources={dataSources}
        dataComponent={ItemComponent}
        keeps={50}
        estimateSize={30}
        // header={<div style={{ height: 100 }}>header</div>}
        // footer={<div style={{ height: 80 }}>footer</div>}
      />
    </div>
  )
}

const ItemComponent = item => {
  return (
    <div
      className="item-inner"
      style={{
        display: 'flex',
        alignItems: 'center',
        height: 30,
        overflow: 'hidden',
        borderBottom: '1px solid #aaa'
      }}
    >
      <Tag># {item.index}</Tag>
      <NameComponent index={item.index} name={item.source.name}></NameComponent>
    </div>
  )
}

const NameComponent = ({ index, name }) => {
  if (index % 3 === 0) return null

  let date = Date.now()

  while (Date.now() - date < 10) {}

  return (
    <>
      <Button>{name}</Button>
    </>
  )
}

export default Misc
