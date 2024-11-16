import { Input } from '@arco-design/web-react'
import { RefInputType } from '@arco-design/web-react/es/Input'
import { toJS } from 'mobx'
import { observer, useLocalObservable } from 'mobx-react-lite'
import { useRef, useState } from 'react'

interface User {
  name: string
  gender: string
}

export default observer(function ImDemo() {
  const store = useLocalObservable(() => ({ name: '', gender: '', list: [] }))

  const nameRef = useRef<RefInputType>(null)

  return (
    <div>
      <>FocusDemo</>

      <hr />

      <div style={{ display: 'flex', gap: '10px' }}>
        <div>
          <span>name:</span>
          <Input autoFocus value={store.name} onChange={v => (store.name = v)} ref={nameRef} />
        </div>
        <div>
          <span>gender:</span>
          <Input
            value={store.gender}
            onChange={v => (store.gender = v)}
            onPressEnter={event => {
              console.log(toJS(store))

              store.list.push({ name: store.name, gender: store.gender })
              store.name = ''
              store.gender = ''
              nameRef.current.focus()
            }}
          />
        </div>
      </div>
      <hr />
      {store.list.map((item, index) => (
        <div key={index}>
          {item.name}-{item.gender}
        </div>
      ))}
    </div>
  )
})
