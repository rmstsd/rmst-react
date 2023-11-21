import { useState, useRef } from 'react'
import Host from './components/Host'
import Portal from './components/Portal'
import { Button, Input } from '@arco-design/web-react'
import { useUpdate } from '@/utils/hooks'

const MyPortalTest = () => {
  console.log('MyPortalTest render')
  const up = useUpdate()

  const [ppList, setPplist] = useState([
    { idx: 1, bool: true },
    { idx: 2, bool: true },
    { idx: 3, bool: true }
  ])

  const [multi, setMulti] = useState(true)

  const h1Ref = useRef()

  return (
    <>
      <h1 ref={h1Ref}>my</h1>
      <hr />

      <div onMouseDown={evt => evt.preventDefault()} className="border border-orange-400 p-3">
        <Button onClick={() => up()}>up</Button>
        <hr />

        <>
          {ppList.map(item => (
            <Button
              key={item.idx}
              onClick={() => {
                item.bool = !item.bool
                setPplist([...ppList])
              }}
            >
              {item.idx} {String(item.bool)}
            </Button>
          ))}
        </>

        <Button onClick={() => setMulti(!multi)} className="ml-3">
          multi
        </Button>
      </div>

      <hr />

      <Host>
        <>PortalTest page in Host</>

        <hr />

        {ppList.map(item =>
          item.bool ? (
            <Portal key={item.idx}>
              <div className="border p-2 my-2">
                {item.idx} portal内容 <Input />
              </div>
            </Portal>
          ) : null
        )}

        {multi && (
          <>
            <Portal>
              <div className="border p-2 my-2">
                201 portal内容 <Input />{' '}
              </div>
            </Portal>

            <Portal>
              <div className="border p-2 my-2">
                202 portal内容 <Input />
              </div>
            </Portal>

            <Portal>
              <div className="border p-2 my-2">
                203 portal内容
                <Input />
              </div>
            </Portal>
          </>
        )}
      </Host>
    </>
  )
}

export default MyPortalTest
