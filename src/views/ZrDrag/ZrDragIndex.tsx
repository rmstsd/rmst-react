import { Store } from './store'
import Aside from './Aside'
import Flow from './Flow'

export default function ZrDragIndex() {
  return (
    <Store.Provider>
      <div className="flex h-full">
        <Aside />

        <Flow />
      </div>
    </Store.Provider>
  )
}
