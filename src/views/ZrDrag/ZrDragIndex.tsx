import Aside from './Aside'
import Flow from './Flow'
import { useStore } from './store'

export default function ZrDragIndex() {
  const snap = useStore()

  const text = JSON.stringify(snap.rootNode, null, 2)

  return (
    <div className="flex h-full">
      <Aside />

      <Flow />

      <div className="w-[300px]">
        <button
          onClick={() =>
            navigator.clipboard.writeText(text).then(() => {
              console.log('copy success')
            })
          }
        >
          copy
        </button>
        <pre>{text}</pre>
      </div>
    </div>
  )
}
