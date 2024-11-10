import { Select } from '@arco-design/web-react'
import { useState, forwardRef, useImperativeHandle, useEffect } from 'react'

export default function Tt() {
  const [flag, setFlag] = useState(false)
  const [value, setValue] = useState('')

  console.log('render')

  const [options, setOptions] = useState(() => {
    return Array.from({ length: 30 }, (_, index) => ({ label: `Option ${index + 1}`, value: index }))
  })

  return (
    <>
      <button onClick={() => setFlag(!flag)}>btn</button>

      <Select
        value={value}
        options={options}
        mode="multiple"
        onChange={value => {
          setValue(value)

          setOptions([])

          setTimeout(() => {
            setOptions(Array.from({ length: 30 }, (_, index) => ({ label: `Option ${index + 1}`, value: index })))
          }, 500)
        }}
      ></Select>
    </>
  )
}

let Child = forwardRef(function Child(props, ref) {
  useImperativeHandle(ref, () => ({
    ip: 1
  }))

  return <div></div>
})
