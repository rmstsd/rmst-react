import { useState } from 'react'
import Host from './components/Host'
import Portal from './components/Portal'
import { Button } from '@arco-design/web-react'
import { useUpdate } from '@/utils/hooks'

const PortalTest = () => {
  console.log('pt render')
  const up = useUpdate()

  const [b1, setB1] = useState(true)
  const [b2, setB2] = useState(true)

  return (
    <>
      <Button onClick={() => up()}>up</Button>
      <br />

      <Button onClick={() => setB1(!b1)}>setB1</Button>
      <Button onClick={() => setB2(!b2)}>setB2</Button>

      <hr />

      <Host>
        <>PortalTest page</>

        <hr />

        {b1 && <Child idx="1" />}
        {b2 && <Child idx="2" />}
      </Host>
    </>
  )
}

export default PortalTest

function Child({ idx }) {
  return <Portal>Child portal-{idx}</Portal>
}
