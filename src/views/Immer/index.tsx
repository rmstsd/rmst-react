import Trigger from '@/components/Trigger/Trigger'
import { Select } from '@arco-design/web-react'
import React, { cloneElement, forwardRef, isValidElement, useEffect, useRef, useState, ReactNode } from 'react'

const ChChild = () => {
  console.log('render chchild')

  return <div>cc</div>
}

const Child = props => {
  console.log('render child')
  const [count, setCount] = useState(0)

  if (count !== props.count) {
  }

  useEffect(() => {
    setCount(props.count)
  }, [props.count])

  return (
    <div>
      {count}

      <ChChild />
    </div>
  )
}

export default function Tt() {
  const fieldRef = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState(false)
  const [count, setCount] = useState(0)

  const [value, setValue] = useState('a')
  const [options, setOptions] = useState(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'])

  useEffect(() => {
    setTimeout(() => {
      console.log('set')
      setValue('g')
      // setOptions(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'])
    }, 2000)
  }, [])

  return (
    <>
      <Select value={value} options={options} />
    </>
  )

  return (
    <div className="tt relative h-[600px] overflow-auto">
      <h1 className="h-[100px]">asd</h1>
      <h1 className="h-[100px]">asd</h1>
      <h1 className="h-[100px]">asd</h1>
      <h1 className="h-[100px]">asd</h1>
      <h1 className="h-[100px]">asd</h1>
      <h1 className="h-[100px]">asd</h1>

      <button onClick={() => setCount(count + 1)}>s</button>
      <Child count={count} />

      <button ref={fieldRef} onClick={() => setOpen(true)}>
        trigger
      </button>

      {/* {open && (
        <Trigger close={() => setOpen(false)} triggerElementRef={fieldRef}>
          <span className="inline-block rounded-md border bg-white px-4 py-2 shadow-sm">w</span>
        </Trigger>
      )} */}

      <h1 className="h-[100px]">asd</h1>
      <h1 className="h-[100px]">asd</h1>
      <h1 className="h-[100px]">asd</h1>
      <h1 className="h-[100px]">asd</h1>
      <h1 className="h-[100px]">asd</h1>
      <h1 className="h-[100px]">asd</h1>
      <h1 className="h-[100px]">asd</h1>
      <h1 className="h-[100px]">asd</h1>
      <h1 className="h-[100px]">asd</h1>
      <h1 className="h-[100px]">asd</h1>
      <h1 className="h-[100px]">asd</h1>
      <h1 className="h-[100px]">asd</h1>
      <h1 className="h-[100px]">asd</h1>
      <h1 className="h-[100px]">asd</h1>
      <h1 className="h-[100px]">asd</h1>
      <h1 className="h-[100px]">asd</h1>
    </div>
  )
}
