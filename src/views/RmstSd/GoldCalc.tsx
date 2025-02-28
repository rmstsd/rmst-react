import { Form, Input, Button, Checkbox, InputNumber } from '@arco-design/web-react'
import { useState } from 'react'
const FormItem = Form.Item

export default function GoldCalc() {
  const [form] = Form.useForm()
  const [realRmb, setRealRmb] = useState('')

  const calc = () => {
    const values = form.getFieldsValue()
    const serviceCharge = (values.count * values.nowPrice * 0.3) / 100
    const rmb = values.count * values.nowPrice - serviceCharge
    setRealRmb(rmb.toFixed(2))
  }

  const iniValues = {
    nowPrice: 670.26,
    count: 13.3604
  }

  return (
    <div>
      <Form form={form} initialValues={iniValues} style={{ maxWidth: 600 }} autoComplete="off">
        {/* <FormItem field="oldPrice" label="成本均价">
          <InputNumber />
        </FormItem> */}
        <FormItem field="nowPrice" label="实时金价">
          <InputNumber />
        </FormItem>
        <FormItem field="count" label="卖出克重">
          <InputNumber />
        </FormItem>
        <FormItem>
          <Button onClick={calc}>计算</Button>
        </FormItem>
        <FormItem>
          <p>到账: {realRmb}</p>
        </FormItem>
      </Form>
    </div>
  )
}
