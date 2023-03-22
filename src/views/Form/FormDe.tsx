import { Form, Input, Button, InputNumber } from '@arco-design/web-react'
const FormItem = Form.Item

function App() {
  const [form] = Form.useForm()

  return (
    <Form
      form={form}
      style={{ width: 600 }}
      initialValues={{ name: 'admin' }}
      autoComplete="off"
      onValuesChange={(v, vs) => {
        console.log(v, vs)
      }}
      onSubmit={v => {
        console.log(v)
      }}
    >
      <FormItem label="Username" field="name" rules={[{ required: true }]}>
        <Input placeholder="please enter your username" />
      </FormItem>
      <FormItem label="Age" field="age" rules={[{ required: true, type: 'number', min: 0, max: 99 }]}>
        <InputNumber placeholder="please enter your age" />
      </FormItem>
      <FormItem wrapperCol={{ offset: 5 }}>
        <Button type="primary" htmlType="submit" style={{ marginRight: 24 }}>
          Submit
        </Button>
        <Button
          style={{ marginRight: 24 }}
          onClick={() => {
            form.resetFields()
          }}
        >
          Reset
        </Button>
        <Button
          type="text"
          onClick={() => {
            debugger
            form.setFieldsValue({
              name: 'admin',
              age: 11
            })
          }}
        >
          Fill Form
        </Button>

        <Button
          type="text"
          onClick={() => {
            console.log(form.getFieldsValue())
          }}
        >
          获取所有值
        </Button>
      </FormItem>
    </Form>
  )
}

export default App
