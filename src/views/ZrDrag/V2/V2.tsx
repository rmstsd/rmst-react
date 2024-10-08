import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'

import Aside from './Aside'
import Flow from './Flow'
import Ghost from './Ghost'
import { store } from './store'

function V2() {
  useEffect(() => {
    store.init()
  }, [])

  return (
    <div className="flex h-full">
      <Aside />

      <Flow />

      <Ghost />

      <pre
        onClick={() => {
          navigator.clipboard.writeText(JSON.stringify(store.rootNode, null, 2)).then(() => {
            console.log('Copied to clipboard')
          })
        }}
      >
        {JSON.stringify(store.rootNode, null, 2)}
      </pre>
    </div>
  )
}

export default observer(V2)
