import { Form, Input, Button, InputNumber } from '@arco-design/web-react'
import { useEffect, useState } from 'react'
import { Schema } from 'b-validate'
import { useUpdate } from '@/utils/hooks'

const FormItem = Form.Item

const Child = props => {
  const [count, setCount] = useState(props.count)

  return <div onClick={() => setCount(props.count + 1)}>{count}</div>
}

function App() {
  const u = useUpdate()

  const one = <Child count={1} />
  const two = <Child count={2} />

  console.log(one)
  console.log(two)

  return (
    <>
      <button onClick={() => u()}>r</button>
      {one}
      {two}
    </>
  )
}

export default App

class StringValidator {}

class Validator {
  constructor(rules: any) {
    this.rules = rules
    this.string = new StringValidator()
  }

  string: StringValidator

  rules = []

  validate(data, callbackError: (errors: any) => void) {
    for (const key of Object.keys(data)) {
      const rules = this.rules[key]

      for (const ruleItem of rules) {
        const { type = 'string' } = ruleItem
      }
    }
  }
}

const rules = {
  name: [
    { type: 'string', required: true, message: '必填字段' },
    { type: 'string', maxLength: 10, message: '最大长度是10' }
  ],
  age: [{ type: 'number', min: 2, max: 5, message: '在2和5之间' }]
}
const sc = new Validator(rules)

sc.validate({ name: 'aasdsd', age: 122 }, errors => {
  console.log(errors)
})
