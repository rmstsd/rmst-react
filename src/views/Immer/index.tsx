import { useState, forwardRef, useImperativeHandle, useEffect } from 'react'

export default function Tt() {
  const [flag, setFlag] = useState(false)

  console.log('render')

  return (
    <>
      <button onClick={() => setFlag(!flag)}>btn</button>
      <Child
        ref={rr => {
          console.log('rr', rr)
        }}
      />
    </>
  )
}

let Child = forwardRef(function Child(props, ref) {
  useImperativeHandle(ref, () => ({
    ip: 1
  }))

  return <div></div>
})
