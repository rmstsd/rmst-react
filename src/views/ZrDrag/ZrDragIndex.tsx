import Aside from './Aside'
import Flow from './Flow'
import { useStore } from './store'

export default function ZrDragIndex() {
  const snap = useStore()

  return (
    <div className="flex h-full">
      <Aside />

      <Flow />

      <div className="w-[300px]">
        <pre>{JSON.stringify(snap.rootNode, null, 2)}</pre>
      </div>
    </div>
  )
}
