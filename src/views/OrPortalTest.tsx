import Portal from '@/components/Portal/Portal'
import { useUpdate } from '@/utils/hooks'
import { Button } from '@arco-design/web-react'
import { useState } from 'react'

const OrPortalTest = () => {
  console.log('Sector render')
  const up = useUpdate()

  const [hbool, sehtBool] = useState(true)
  const [bool, setBool] = useState(true)

  const [multi, setMulti] = useState(true)

  return (
    <div className="sec-root">
      <h1>or</h1>

      <hr />

      <Button onClick={() => up()}>up</Button>

      <hr />

      <Button onClick={() => sehtBool(!hbool)}>h {String(hbool)}</Button>

      <Button onClick={() => setBool(!bool)}>Portal {String(bool)}</Button>

      <Button onClick={() => setMulti(!multi)} className="ml-3">
        multi
      </Button>

      <hr />

      {hbool && (
        <Portal.Host>
          {bool && <Portal>1</Portal>}

          <Portal>2</Portal>

          {multi && (
            <>
              <Portal>
                <div className="border p-2 my-2">201 portal内容</div>
              </Portal>

              <Portal>
                <div className="border p-2 my-2">202 portal内容</div>
              </Portal>

              <Portal>
                <div className="border p-2 my-2">203 portal内容</div>
              </Portal>
            </>
          )}
        </Portal.Host>
      )}
    </div>
  )
}

export default OrPortalTest

function Other() {
  const [count, setCount] = useState(1)
  console.log('o render')

  return (
    <div>
      other <Button onClick={() => setCount(count + 1)}>{count}</Button>
    </div>
  )
}

function Aa() {
  const [count, setCount] = useState(1)
  console.log('Aa render')

  return (
    <div>
      Aa <Button onClick={() => setCount(count + 1)}>{count}</Button>
    </div>
  )
}
