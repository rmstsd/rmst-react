import { Form, Input, Button, InputNumber } from '@arco-design/web-react'
import { useEffect } from 'react'
import { Schema } from 'b-validate'

const FormItem = Form.Item

function App() {
  const [form] = Form.useForm()

  useEffect(() => {
    const schema = new Schema({
      name: [
        { type: 'string', required: true, message: '必填字段' },
        { type: 'string', maxLength: 10, message: '最大长度是10' }
      ],
      age: [{ type: 'number', min: 2, max: 5, message: '在2和5之间' }],
      email: [{ type: 'email', message: '邮箱格式不对' }],
      ip: [{ type: 'ip', message: 'ip格式不对' }],
      url: [{ type: 'url', message: 'url格式不对' }],
      custom: [
        {
          validator: (value, callback) => {
            if (value > 10) {
              callback('不能大于10！')
            }
          }
        }
      ],
      // Async validate
      async: [
        {
          validator: async (value, callback) => {
            if (value > 10) {
              callback('不能大于10！')
            }
          }
        }
      ]
    })

    schema.validate(
      {
        name: 'pengjiyuan is a nice boy',
        age: 23,
        email: 'pengjiyuan@bytedance.com',
        ip: '127.0.0.1',
        url: 'https://ncecom',
        custom: 20,
        async: 20
      },
      errors => {
        console.log(errors)
      }
    )
  }, [])

  return (
    <>
      <Input value={undefined} placeholder="pl"></Input>
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
