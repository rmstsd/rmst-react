import React, { useContext, useRef, useState } from 'react'
import { Button, Checkbox, Input } from 'antd'

type FormProps = {
  children: React.ReactNode | React.ReactElement[]
  name?: string
  initialValues?: any
  onFinish?: (values) => void
  onFinishFailed?: (errorInfo) => void
}

type IFormItemProps = {
  children: React.ReactElement
  label?: React.ReactNode
  name?: string
  rules?: any[]
  valuePropName?: string

  errMsg?: string
}
type IForm = React.FC<FormProps> & { Item: React.FC<IFormItemProps> }

const FormContext = React.createContext<
  FormProps & {
    valuesRef: React.RefObject<any>
    handleFinish: () => void
    validateItemField: (name: string, _val: any) => void
  }
>(undefined)

const validate = (_val, rules) => {
  for (const ruleItem of rules) {
    if (ruleItem.required && !_val) {
      return {
        isValidate: false,
        errMsg: ruleItem.message
      }
    }
  }

  return { isValidate: true, errMsg: '' }
}

const Form: IForm = props => {
  const { children, name, initialValues, onFinish, onFinishFailed } = props

  const valuesRef = useRef(initialValues || {})

  const [errMsg, setErrMsg] = useState({})

  const childrenArray = React.Children.toArray(children) as React.ReactElement[]

  const validateItemField = (name: string, _val: any) => {
    const rules = childrenArray.find(item => item.props.name === name).props.rules

    if (!rules) {
      setErrMsg({ ...errMsg, [name]: '' })
      return { isValidate: true, errMsg: '' }
    }

    const validateRes = validate(_val, rules)

    setErrMsg({ ...errMsg, [name]: validateRes.isValidate ? '' : validateRes.errMsg })

    return validateRes
  }

  const validateAllField = () => {
    const validateFailedResult = []
    for (const childrenItem of childrenArray) {
      const { name } = childrenItem.props
      const _val = valuesRef.current[name]

      const { isValidate, errMsg } = validateItemField(name, _val)

      if (!isValidate) {
        validateFailedResult.push({ name, errMsg })
      }
    }

    return validateFailedResult
  }

  const handleFinish = () => {
    const errArray = validateAllField()

    if (errArray.length) {
      onFinishFailed(errArray)

      setErrMsg(errArray.reduce((acc, item) => Object.assign(acc, { [item.name]: item.errMsg }), {}))
      return
    }

    onFinish(valuesRef.current)
  }

  const childrenJsx = childrenArray.map(item => {
    const isFormItemComponent = item.type === Form.Item

    if (!isFormItemComponent) return item

    return {
      ...item,
      props: {
        ...item.props,
        errMsg: errMsg[item.props.name]
      }
    }
  })

  return (
    <FormContext.Provider value={{ ...props, valuesRef, handleFinish, validateItemField }}>
      {childrenJsx}
    </FormContext.Provider>
  )
}

Form.Item = props => {
  const { label, name, rules, valuePropName, children, errMsg } = props

  const context = useContext(FormContext)

  const initialValue = context.initialValues[name]

  const defaultValKey = valuePropName
    ? 'default' + valuePropName.replace(/^./, firstChar => firstChar.toUpperCase()) // 将第一个首字母大写
    : 'defaultValue'

  const valKey = valuePropName ? valuePropName : 'value'

  const ChildElement = React.cloneElement(children, {
    [defaultValKey]: initialValue,
    onChange: evt => {
      const _val = evt.target[valKey]

      context.valuesRef.current[name] = _val

      context.validateItemField(name, _val)
    },
    onClick: () => {
      if (children.props.htmlType === 'submit') {
        context.handleFinish()
      }
    }
  })

  const hasRequired = rules ? [].concat(rules).some(rule => rule.required) : false

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: 100 }}>
        {hasRequired && <span style={{ color: 'red' }}>*</span>}
        {label}
      </div>

      <div>
        {ChildElement}
        {errMsg && <div style={{ color: 'red' }}>{errMsg}</div>}
      </div>
    </div>
  )
}

const FormDe: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <h4 style={{ fontSize: 18 }}>我不是Form.Item </h4>

      <Form.Item
        label="用户名"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="密码"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>
      <Form.Item>
        <Button type="default" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default FormDe
