import Portal from '@/components/Portal/Portal'
import { Button } from '@arco-design/web-react'
import { useState } from 'react'

const Sector = () => {
  const [count, setCount] = useState(1)

  return (
    <div className="sec-root">
      <Portal.Host>
        <Other />

        <Portal>
          <>
            modal1
            <Button onClick={() => setCount(count + 1)}>{count}</Button>
          </>
        </Portal>

        <Portal>
          <>
            modal2
            <Button onClick={() => setCount(count + 1)}>{count}</Button>
          </>
        </Portal>
      </Portal.Host>
    </div>
  )
}

export default Sector

function Other() {
  console.log('o render')

  return <>other</>
}
