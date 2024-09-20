import { observer } from 'mobx-react-lite'
import Aside from './Aside'
import Flow from './Flow'
import { store } from './store'

function ZrDragIndex() {
  const text = JSON.stringify(store.rootNode, null, 2)

  return (
    <div className="flex h-full">
      <Aside />

      <Flow />

      <div className="w-[300px]">
        <button
          onClick={() => {
            store.up()

            navigator.clipboard.writeText(text).then(() => {
              console.log('copy success')
            })
          }}
        >
          copy
        </button>
        <pre>{text}</pre>
      </div>
    </div>
  )
}

export default observer(ZrDragIndex)
