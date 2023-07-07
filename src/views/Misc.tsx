import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import VirtualList from '@/components/virtual-scroll-list'
import { Form, Button, Input, Tag, Checkbox, TimePicker, Radio } from '@arco-design/web-react'
import { sleep } from '@/utils/utils'

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
  const ref = useRef<HTMLDivElement>()

  return (
    <div ref={ref} className="">
      {/* {data.map((item, index) => (
        <h2 key={item}>{item}</h2>
      ))} */}

      <VirtualList
        className="list"
        style={{ height: 600, overflow: 'auto', border: '2px solid #333' }}
        dataKey="id"
        dataSources={dataSources}
        dataComponent={ItemComponent}
        keeps={22}
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

      <Form autoComplete="off">
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

const NameComponent = ({ index, name }) => {
  if (index % 3 === 0) return null

  // sleep(20)

  return (
    <>
      <Button>{name}</Button>
    </>
  )
}

export default Misc
