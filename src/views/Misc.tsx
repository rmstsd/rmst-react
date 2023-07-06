import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import VirtualList from '@/components/virtual-scroll-list'
import { Form, Button, Input, Tag, Checkbox, TimePicker, Radio } from '@arco-design/web-react'
import VirtualTinyList from 'react-tiny-virtual-list'

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

const data = [...Array(100)]

const Misc = () => {
  return (
    <div>
      <VirtualTinyList
        width={300}
        height={300}
        itemCount={data.length}
        itemSize={30}
        style={{ border: '1px solid' }}
        renderItem={Item}
      />
      {/*   
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
      /> */}
    </div>
  )
}

const Item = ({ index, style }) => {
  let date = Date.now()

  return (
    <div key={index} style={style}>
      Row: #{index}
      <br />
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
