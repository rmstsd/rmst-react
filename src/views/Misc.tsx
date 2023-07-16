import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import VirtualList from '@/components/virtual-scroll-list'
import { Form, Button, Input, Tag, Checkbox, TimePicker, Radio } from '@arco-design/web-react'
import { sleep } from '@/utils/utils'
import Scrollbar from '@/components/Scrollbar'
import CustomScrollbar from '@/components/CustomScrollbar/CustomScrollbar'

const TOTAL_COUNT = 100

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

console.log(dataSources.length)

const Misc = () => {
  const ref = useRef<HTMLDivElement>()

  return (
    <div ref={ref}>
      <CustomScrollbarDemo />

      <hr />

      <VirtualList
        className="list"
        style={{ border: '2px solid #333' }}
        dataKey="id"
        dataSources={dataSources}
        dataComponent={ItemComponent}
        keeps={14}
        buffer={0}
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

      <Form autoComplete="off" style={{ width: '50%' }}>
        <Form.Item label="Layout">
          <Radio.Group type="button" name="layout">
            <Radio value="horizontal">horizontal</Radio>
            <Radio value="vertical">vertical</Radio>
            <Radio value="inline">inline</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Username" field="username" rules={[{ required: true }]}>
          <Input style={{ width: 270 }} placeholder="please enter your name" />
        </Form.Item>
        <Form.Item label="Post">
          <Input style={{ width: 270 }} placeholder="please enter your post" />
        </Form.Item>
        <Form.Item>
          <Checkbox>I have read the manual</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Misc

const CustomScrollbarDemo = () => {
  return (
    <CustomScrollbar style={{ height: 300 }} className="border" onSyncScroll={scrollTop => {}}>
      {dataSources.map(item => (
        <div key={item.name}>{item.name}</div>
      ))}
    </CustomScrollbar>
  )
}
