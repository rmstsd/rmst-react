import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'

const Misc = () => {
  const ref = useRef({})

  useEffect(() => {
    console.log(ref.current.getValue?.())
  }, [])

  return (
    <div>
      <Child ref={ref}></Child>
    </div>
  )
}

export default Misc
const Child = forwardRef((props, ref) => {
  const [v, sv] = useState(1)

  useEffect(() => {
    sv(2)
  }, [])

  useImperativeHandle(ref, () => ({
    getValue: () => v
  }))

  return <>123</>
})
